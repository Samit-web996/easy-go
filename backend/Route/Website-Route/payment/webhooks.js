const express = require('express');
const router = express.Router();
const handleRazorpayWebhook  = require('../../../Controller/Website/payment/webhooks');

router.post('/api/webhook/razorpay', handleRazorpayWebhook);

module.exports = router;