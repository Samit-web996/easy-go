const express = require('express')
const vehicleRouter = express.Router();
const {getVehicleTable,approveVehicle,ve_host_info,viewVehicleInfo,updateVehicleStatus} = require('../../../Controller/admin/vehicles/vehicle')

vehicleRouter.get('/vehicle-req' ,getVehicleTable);
vehicleRouter.post('/vehicle-approve' ,approveVehicle); 
vehicleRouter.get('/vehicle-owner-information/:email' , ve_host_info);
vehicleRouter.get('/view-vehicle-information/:email' , viewVehicleInfo)
vehicleRouter.post("/update-vehicle-status", updateVehicleStatus);

module.exports = vehicleRouter;