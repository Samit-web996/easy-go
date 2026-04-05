const express = require('express')
const vehicleRouter = express.Router();
const {getVehicleTable,approveVehicle,ve_owner_info,viewVehicleInfo} = require('../../../Controller/admin/vehicles/vehicle')

vehicleRouter.get('/vehicle-req' ,getVehicleTable);
vehicleRouter.post('/vehicle-approve' ,approveVehicle); 
vehicleRouter.get('/vehicle-owner-information/:email' , ve_owner_info);
vehicleRouter.get('/view-vehicle-information/:email' , viewVehicleInfo)

module.exports = vehicleRouter;