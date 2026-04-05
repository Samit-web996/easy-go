const express = require('express')
const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
const cors = require('cors')
app.use(cors({
    origin : ["http://localhost:5173","http://localhost:5174"],
    credentials:true
}))
const signupRouter = require('./Route/Admin-Route/signupRoute/signupRoute')
app.use('/', signupRouter)
const loginRouter = require('./Route/Admin-Route/loginRoute/loginRoute')
app.use('/admin', loginRouter)
const veLoginRoute = require('./Route/VehicleOwner_Route/logInRoute/logInRoute')
app.use('/' , veLoginRoute)
const employeeRouter = require("./Route/Admin-Route/employeeRoute/employeeRoutea")
app.use('/', employeeRouter)
const modalRouter = require('./Route/Admin-Route/employeeRoute/modalRoute')
app.use('/', modalRouter)
const veOwnerSignup = require('./Route/VehicleOwner_Route/signUpRoute/signUpRoute')
app.use('/' ,veOwnerSignup)
const myVehicleRouter = require("./Route/VehicleOwner_Route/myVehicleRoute/myVehicleRoute")
app.use('/' , myVehicleRouter)
const myVehicleModal = require('./Route/VehicleOwner_Route/myVehicleRoute/modalRoute')
app.use('/', myVehicleModal)
app.use("/uploads", express.static("uploads"));
const getFuelType = require('./Route/VehicleOwner_Route/myVehicleRoute/modalRoute')
app.use('/' ,getFuelType)
const vehicleTable = require('./Route/Admin-Route/vehicleRoute/vehicleRoute');
app.use('/' ,vehicleTable)
const approveVehicle = require('./Route/Admin-Route/vehicleRoute/vehicleRoute');
app.use('/' , approveVehicle)
const chkEmailVOwner = require('./Route/VehicleOwner_Route/myVehicleRoute/modalRoute') ;
app.use('/', chkEmailVOwner)
const kycModal = require('./Route/VehicleOwner_Route/settingRoutes/kycRoutes')
app.use('/' , kycModal)
const ve_owner_info = require('./Route/Admin-Route/vehicleRoute/vehicleRoute');
app.use('/' ,ve_owner_info)
const viewVehicleInfo = require('./Route/Admin-Route/vehicleRoute/vehicleRoute');
app.use('/' ,viewVehicleInfo)


port = 3006;


app.listen(port, () => {
    console.log(`Server is running on port ${port} successfully`);
});