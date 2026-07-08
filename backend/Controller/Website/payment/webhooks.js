const crypto = require("crypto");
const database = require("../../../Model/dbConnect");
const sendEmail = require("../../nodemailer");

const handleRazorpayWebhook = async (req, res) => {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
  const signature = req.headers["x-razorpay-signature"];

  // 1. Signature Verification
  const shasum = crypto.createHmac("sha256", secret);
  shasum.update(JSON.stringify(req.body));
  const digest = shasum.digest("hex");

  if (digest !== signature) {
    console.log("Invalid Signature! ❌");
    return res.status(400).send("Invalid signature");
  }

  console.log("--- Webhook Verified! ✅ ---");
  const { event, payload } = req.body;
  const payment = payload.payment.entity;

  const orderId =
    payment.order_id || (payload.order ? payload.order.entity.id : null);
  const paymentId = payment.id;
  const email = payment.email;
  const contact = payment.contact;
  const amount = payment.amount / 100;
  const failureReason = payment.error_description || null;

  let status = null;
  if (event === "payment.captured") status = "PAID";
  else if (event === "payment.failed") status = "FAILED";

  if (!status) {
    return res.status(200).json({ status: "ignored" });
  }

  const dynamicCarQuery = `
        SELECT rv.carid, rv.carName, rv.brand, b.user_id 
        FROM registered_vehicle rv 
        JOIN bookings b ON b.car_id = rv.carid 
        WHERE b.order_id = ?`;

  database.query(dynamicCarQuery, [orderId], async (err, results) => {
    if (err) {
      console.error("DB Query Error:", err.message);
      return res.status(500).send("Internal Error");
    }

    const carData = results[0] || {};
    const carName = carData.carName
      ? `${carData.brand} ${carData.carName}`
      : "Your Rental Car";
    const carId = carData.carid;
    const uid = carData.user_id;

    if (status === "PAID" && email) {
      try {
        const bookingDate = new Date().toLocaleDateString();
        await sendEmail({
          email: email,
          subject: `Booking Confirmed: Your trip with ${carName} is ready! 🚗`,
          html: `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 10px; overflow: hidden;">
        <div style="background-color: #f97316; color: white; padding: 20px; text-align: center;">
            <h1 style="margin: 0;">Congratulations! 🎉</h1>
            <p style="font-size: 18px; margin: 5px 0 0 0;">Your EasyGo Booking is Confirmed</p>
        </div>

        <div style="padding: 20px;">
            <p>Hi there,</p>
            <p>Great news! Your booking for <b>${carName}</b> has been successfully confirmed. Get ready for a smooth and comfortable ride.</p>
            
            <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">

            <h3 style="color: #f97316;">Booking Summary</h3>
            <table style="width: 100%; border-collapse: collapse;">
                <tr>
                    <td style="padding: 8px 0; color: #666;">Order ID:</td>
                    <td style="padding: 8px 0; text-align: right; font-weight: bold;">${orderId}</td>
                </tr>
                <tr>
                    <td style="padding: 8px 0; color: #666;">Payment ID:</td>
                    <td style="padding: 8px 0; text-align: right; font-weight: bold;">${paymentId}</td>
                </tr>
                <tr>
                    <td style="padding: 8px 0; color: #666;">Date of Booking:</td>
                    <td style="padding: 8px 0; text-align: right; font-weight: bold;">${bookingDate}</td>
                </tr>
                <tr style="background-color: #fff7ed;">
                    <td style="padding: 12px 8px; color: #333; font-weight: bold;">Total Paid:</td>
                    <td style="padding: 12px 8px; text-align: right; color: #f97316; font-size: 18px; font-weight: bold;">₹${amount}</td>
                </tr>
            </table>

            <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">

            <p style="font-size: 14px; color: #666;">
                <b>Note:</b> Please keep your original ID and license ready at the time of pick-up. 
                If you have any questions, feel free to contact our support team.
            </p>
            
            <div style="text-align: center; margin-top: 30px;">
                <a href="#" style="background-color: #f97316; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold;">View Booking Details</a>
            </div>
        </div>

        <div style="background-color: #f4f4f4; padding: 15px; text-align: center; font-size: 12px; color: #888;">
            © 2026 EasyGo Rentals. All rights reserved.<br>
            Bhopal, Madhya Pradesh, India.
        </div>
    </div>
    `, // Add your full HTML here
        });
        console.log("✅ Confirmation Email Sent.");
      } catch (mailErr) {
        console.error("Nodemailer Error:", mailErr.message);
      }
    }

    const logQuery = `INSERT INTO payment_logs (order_id, uid, payment_id, user_email, user_contact, amount, status, failure_reason) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    const updateBookingQuery =
      "UPDATE bookings SET payment_status = ? WHERE order_id = ?";
    const updateVehicleQuery =
      "UPDATE registered_vehicle SET status = 'UNAVAILABLE' WHERE carid = ?";

    database.query(
      logQuery,
      [orderId, uid, paymentId, email, contact, amount, status, failureReason],
      (err) => {
        if (err) console.error("Log Error:", err.message);

        database.query(updateBookingQuery, [status, orderId], (err) => {
          if (err) console.error("Booking Update Error:", err.message);

          if (status === "PAID" && carId) {
            database.query(updateVehicleQuery, [carId], (err) => {
              if (err) console.error("Vehicle Status Error:", err.message);
              else console.log("🚗 Vehicle marked UNAVAILABLE.");
              return res.status(200).json({ status: "ok" });
            });
          } else {
            return res.status(200).json({ status: "ok" });
          }
        });
      },
    );
  });
};

module.exports = handleRazorpayWebhook;
