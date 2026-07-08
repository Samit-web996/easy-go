const express = require('express');
const newVehicle = express.Router()
const {addVehicle,chkEmailVOwner,getFuelType,cityList} = require('../../../Controller/VehicleOwner/myVehicle/myvehicleController/modal');
const upload = require('../../../Controller/VehicleOwner/middleware/multerMiddleware')

newVehicle.post('/vehicle-request' ,upload.single("image"), addVehicle);
newVehicle.get('/check-owner/:email', chkEmailVOwner)
newVehicle.get('/fuel-type', getFuelType)
newVehicle.get('/select-city' ,cityList)

module.exports = newVehicle;