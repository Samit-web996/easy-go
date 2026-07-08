const express = require('express');
const router = express.Router()
const kycModal = require('../../../Controller/VehicleOwner/settings/kycModal')
const upload = require('../../../Controller/VehicleOwner/middleware/multerMiddleware')

router.post('/kyc-update' , upload.single('profile_img'),kycModal)

module.exports = router ;
