const express = require('express');
const router = express.Router()
const kycModal = require('../../../Controller/VehicleOwner/settings/kycModal')
// const upload = require('../../../Controller/VehicleOwner/middleware/multerMiddleware')
const uploadCloud = require('../../../cloudinaryConfig')

router.post('/kyc-update' , uploadCloud.single('profile_img'),kycModal)

module.exports = router ;
