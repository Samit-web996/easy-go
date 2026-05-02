const Razorpay = require('razorpay');
const dotenv = require('dotenv');
const database = require('../../../Model/dbConnect');
dotenv.config()

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

const options = async (req,res) => {
      const { amount, uid, car_id } = req.body;

  const options = {
    amount: amount * 100,
    currency: "INR",
    receipt: `receipt_${Date.now()}`,
  };

  try {
    const order = await razorpay.orders.create(options);
    console.log(order, "userdata");

    const bookingQuery = `INSERT INTO bookings 
        (user_id, car_id, order_id, total_amount, payment_status) 
        VALUES (?, ?, ?, ?, 'PENDING')`;

    database.query(bookingQuery, [uid, car_id, order.id, amount], (err) => {
      if (err) {
        console.error("Database Booking Error:", err.message);
        return res.status(500).json({ success: false, message: "DB mein booking save nahi hui" });
      }


    res.json({
      success: true,
      order_id: order.id,
      amount: order.amount,
      key_id: process.env.RAZORPAY_KEY_ID
    })
    });
  } catch (error) {
    console.error("Razorpay Error:", error);
    res.status(500).json({ success: false, message: "Order nahi ban paya" });
  }
};


module.exports = options;