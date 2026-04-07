const express = require('express');
const router = express.Router()
const {addVehicle,chkEmailVOwner,getFuelType} = require('../../../Controller/VehicleOwner/myVehicle/myvehicleController/modal');
const upload = require('../../../Controller/VehicleOwner/middleware/multerMiddleware')

router.post('/vehicle-request' ,upload.single("image"), addVehicle);
router.get('/check-owner/:email', chkEmailVOwner)
router.get('/fuel-type', getFuelType)

module.exports = router;