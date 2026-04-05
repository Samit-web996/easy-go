const express = require('express');
const myVehicleRouter = express.Router();
const getVehicleInfo = require("../../../Controller/VehicleOwner/myVehicle/myvehicleController/myvehicleController")

myVehicleRouter.get('/my-vehicles' , getVehicleInfo);

module.exports = myVehicleRouter;