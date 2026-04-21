const Razorpay = require('razorpay');
const dotenv = require('dotenv')
dotenv.config()

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

const options = async (req,res) => {
      const { amount } = req.body;

  const options = {
    amount: amount * 100,
    currency: "INR",
    receipt: `receipt_${Date.now()}`,
  };

  try {
    const order = await razorpay.orders.create(options);
    console.log(order, "userdata")
    res.json({
      success: true,
      order_id: order.id,
      amount: order.amount
    });
  } catch (error) {
    console.error("Razorpay Error:", error);
    res.status(500).json({ success: false, message: "Order nahi ban paya" });
  }
};

module.exports = options;