const express = require('express');
const router = express.Router();
const options = require('../../../Controller/Website/payment/payment');

router.post('/api/create-order' , options);

module.exports = router;