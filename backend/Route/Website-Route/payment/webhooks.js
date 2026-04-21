const express = require('express');
const router = express.Router();
const handleRazorpayWebhook  = require('../../../Controller/Website/payment/webhooks');

// Ye route Razorpay ke liye hai
router.post('/api/webhook', handleRazorpayWebhook);

module.exports = router;