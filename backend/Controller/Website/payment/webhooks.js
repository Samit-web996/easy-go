const crypto = require("crypto");
const database = require("../../../Model/dbConnect");
const sendEmail = require("../../nodemailer"); 

const handleRazorpayWebhook = async (req, res) => {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
  const signature = req.headers["x-razorpay-signature"];

  // Verify Signature
  const shasum = crypto.createHmac("sha256", secret);
  shasum.update(JSON.stringify(req.body));
  const digest = shasum.digest("hex");

  if (digest === signature) {
    console.log("--- Webhook Verified! ✅ ---");

    const event = req.body.event;
    const payment = req.body.payload.payment.entity;

    // Extract Details
    const orderId =
      payment.order_id ||
      (req.body.payload.order ? req.body.payload.order.entity.id : null);
    const paymentId = payment.id;
    const email = payment.email; 
    const contact = payment.contact;
    const amount = payment.amount / 100;
    const failureReason = payment.error_description || null;

    let status = null;

    // Step 1: Status Handling & Email Trigger
    if (event === "payment.captured") {
      status = "PAID";
      console.log("Sending mail to:", email);
      
      const dynamicCarQuery = `
        SELECT rv.carName, rv.brand, b.user_id 
        FROM registered_vehicle rv 
        JOIN bookings b ON b.car_id = rv.carid 
        WHERE b.order_id = ?`;

    database.query(dynamicCarQuery, [orderId], async (err, results) => {
        if (err) {
            console.error("DB Query Error:", err.message);
            return;
        }
        let carName = "Your Rental Car"; 
        let uid = null;

        if (results.length > 0) {
            carName = `${results[0].brand} ${results[0].carName}`;
            uid = results[0].user_id;
        }
      try {
        if (email) {
          // const carName = "Nexon EV"; // Bhai, ise dynamic banana agar possible ho (DB query se)
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
    `,
          });
          console.log("✅ Confirmation Email Sent to:", email);
        } else {
          console.log("⚠️ Email not found in payload, skipping email trigger.");
        }
      } catch (err) {
        console.error("Nodemailer Error:", err.message);
      }
      });
    } else if (event === "payment.failed") {
      status = "FAILED";
    }

    // Ignore other events (like authorized)
    if (!status) {
      console.log(`ℹ️ Ignoring extra event: ${event}`);
      return res.status(200).json({ status: "ignored" });
    }

    // Step 2: DB Operations (Fetch User ID first)
    const findUserQuery = "SELECT user_id FROM bookings WHERE order_id = ?";

    database.query(findUserQuery, [orderId], (err, results) => {
      if (err) {
        console.error("DB Search Error:", err.message);
        return res.status(500).send("Internal Server Error");
      }

      const uid = results.length > 0 ? results[0].user_id : null;

      // Step 3: Insert into Payment Logs
      const logQuery = `INSERT INTO payment_logs 
                (order_id, uid, payment_id, user_email, user_contact, amount, status, failure_reason) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

      database.query(
        logQuery,
        [
          orderId,
          uid,
          paymentId,
          email,
          contact,
          amount,
          status,
          failureReason,
        ],
        (err) => {
          if (err) console.error("❌ Log insertion error:", err.message);
          else console.log(`📝 Log saved as ${status} with UID:`, uid);
        },
      );

      // Step 4: Update Booking Status
      const updateBookingQuery =
        "UPDATE bookings SET payment_status = ? WHERE order_id = ?";
      database.query(updateBookingQuery, [status, orderId], (err) => {
        if (err) console.error("Booking update error:", err.message);
        else console.log(`🚗 Booking status updated to ${status} in DB.`);
      });
    });

    // Success response to Razorpay
    res.status(200).json({ status: "ok" });
  } else {
    console.log("Invalid Signature!");
    res.status(400).send("Invalid signature");
  }
};

module.exports = handleRazorpayWebhook;
