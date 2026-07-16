const express = require('express');
const router = express.Router();
const sendEmail = require('../../../../nodemailer'); // Apne original sendEmail function ka sahi path check kar lena yahan

// 👇 Callback function ke aage 'async' lgana zaroori hai
router.post('/razorpay-webhook', async (req, res) => {
    const { status, email, carName } = req.body; // Ya jo bhi aapka webhook payload structure hai

    try {
        // ... aapka purana status update aur vehicle code yahan rahega ...
        console.log("✅ Booking table updated to status: PAID");
        console.log("🚗 Vehicle marked UNAVAILABLE successfully.");

        if (status === "PAID" && email) {
            console.log(`Triggering Email flow for address: ${email}`);
            
            // 👇 Await block handler jo humne add kiya tha
            try {
                await sendEmail({
                    email: email,
                    subject: `Booking Confirmed: Your trip with ${carName || 'your car'} is ready! 🚗`,
                    html: `<h1>Booking Confirmed!</h1><p>Thank you for choosing EasyGo.</p>`
                });
                console.log("✅ Nodemailer reported SUCCESS inside try block.");
            } catch (mailErr) {
                console.error("🚨 CRITICAL GMAIL REJECTION ERROR:", mailErr.message);
            }
        }

        return res.status(200).json({ success: true });

    } catch (err) {
        console.error("Webhook processing failed:", err.message);
        return res.status(500).json({ success: false, error: err.message });
    }
});

module.exports = router;