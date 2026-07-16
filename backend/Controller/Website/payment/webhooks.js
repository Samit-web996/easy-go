const crypto = require("crypto");
const database = require("../../../Model/dbConnect");
const sendEmail = require("../../nodemailer");
const Razorpay = require("razorpay");

const handleRazorpayWebhook = async (req, res) => {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
  const signature = req.headers["x-razorpay-signature"];

  // 1. Signature Verification
  const isValid = Razorpay.validateWebhookSignature(
    JSON.stringify(req.body),
    signature,
    secret
  );

  if (!isValid) {
    console.log("Invalid Signature! ❌");
    return res.status(400).send("Invalid signature");
  }

  console.log("--- Webhook Verified! ✅ ---");
  const { event, payload } = req.body;
  const payment = payload.payment.entity;

  const orderId = payment.order_id || (payload.order ? payload.order.entity.id : null);
  const paymentId = payment.id;
  
  const email = payment.email || (req.body.payload && req.body.payload.order ? req.body.payload.order.entity.email : null);
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
        FROM bookings b
        LEFT JOIN registered_vehicle rv ON b.car_id = rv.carid 
        WHERE b.order_id = ?`;

  database.query(dynamicCarQuery, [orderId], (err, results) => {
    if (err) {
      console.error("DB Query Error:", err.message);
      return res.status(500).send("Internal Error");
    }

    const carData = results[0] || {};
    const carName = carData.carName ? `${carData.brand} ${carData.carName}` : "Your Rental Car";
    const carId = carData.carid || null;
    const uid = carData.user_id || null; 

   // webhooks.js ke andar sendEmail block ko aise update karke check karo:
if (status === "PAID" && email) {
  console.log(`Triggering Email flow for address: ${email}`);
  
  // Yahan await laga kar check karte hain ki error kya aa raha hai
  try {
    await sendEmail({
      email: email,
      subject: `Booking Confirmed: Your trip with ${carName} is ready! 🚗`,
      html: `<h1>Booking Confirmed!</h1>` // Chhota HTML test ke liye
    });
    console.log("✅ Nodemailer reported SUCCESS inside try block.");
  } catch (mailErr) {
    // Yeh error live pakad mein aayega ab
    console.error("🚨 CRITICAL GMAIL REJECTION ERROR:", mailErr.message);
    console.error("Full Error Object:", mailErr);
  }
}

    const logQuery = `INSERT INTO payment_logs (order_id, uid, payment_id, user_email, user_contact, amount, status, failure_reason) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    const updateBookingQuery = "UPDATE bookings SET payment_status = ? WHERE order_id = ?";
    const updateVehicleQuery = "UPDATE registered_vehicle SET status = 'UNAVAILABLE' WHERE carid = ?";

    // Safe transaction updates
    database.query(logQuery, [orderId, uid, paymentId, email, contact, amount, status, failureReason], (logErr) => {
      if (logErr) console.error("Log Error Details:", logErr.message);

      database.query(updateBookingQuery, [status, orderId], (updateErr) => {
        if (updateErr) console.error("Booking Status Update Error:", updateErr.message);
        else console.log(`✅ Booking table updated to status: ${status}`);

        if (status === "PAID" && carId) {
          database.query(updateVehicleQuery, [carId], (vehErr) => {
            if (vehErr) console.error("Vehicle Status Update Error:", vehErr.message);
            else console.log("🚗 Vehicle marked UNAVAILABLE successfully.");
            
            return res.status(200).json({ status: "ok" });
          });
        } else {
          return res.status(200).json({ status: "ok" });
        }
      });
    });

  });
};

module.exports = handleRazorpayWebhook;