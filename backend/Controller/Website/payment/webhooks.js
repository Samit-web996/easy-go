const crypto = require('crypto');

const handleRazorpayWebhook = async (req, res) => {
    // 1. Razorpay ka secret jo humne .env mein rakha tha
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;

    // 2. Razorpay se aane wala signature header se pakdo
    const signature = req.headers['x-razorpay-signature'];

    // 3. Verification Logic (Security ke liye)
    const shasum = crypto.createHmac('sha256', secret);
    shasum.update(JSON.stringify(req.body));
    const digest = shasum.digest('hex');

    // 4. Check karo ki data sahi hai ya nahi
    if (digest === signature) {
        console.log('Webhook Verified! ✅');

        const event = req.body.event; // Konsa event hua (e.g. payment.captured)
        
        if (event === 'payment.captured') {
            const payment = req.body.payload.payment.entity;
            const orderId = payment.order_id;
            
            console.log(`Payment successful for Order ID: ${orderId}`);
            
            // 🔥 YAHAN AAP APNA DB UPDATE KARO
            // Example: await Booking.update({ status: 'PAID' }, { where: { order_id: orderId } });
        }

        // Razorpay ko batana padta hai ki hume message mil gaya (200 OK)
        res.status(200).json({ status: 'ok' });
    } else {
        console.log('Invalid Signature! ❌');
        res.status(400).send('Invalid signature');
    }
};

module.exports = handleRazorpayWebhook;