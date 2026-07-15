const express = require('express');
const router = express.Router();
// const upload = require('../../../Controller/VehicleOwner/middleware/multerMiddleware');
const {updateKYC,kycStatus} = require('../../../Controller/Website/kycController/kycController');
const uploadCloud = require('../../../cloudinaryConfig');

router.patch('/user-kyc/:uid', uploadCloud.single('user_photo') ,updateKYC); 
router.get('/kyc-status/:uid' ,kycStatus)

module.exports = router;