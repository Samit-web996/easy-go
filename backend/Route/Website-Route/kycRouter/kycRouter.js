const express = require('express');
const router = express.Router();
const upload = require('../../../Controller/VehicleOwner/middleware/multerMiddleware');
const {updateKYC,kycStatus} = require('../../../Controller/Website/kycController/kycController');

router.patch('/user-kyc/:uid', upload.single('user_photo') ,updateKYC); 
router.get('/kyc-status/:uid' ,kycStatus)

module.exports = router;