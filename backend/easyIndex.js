const express = require('express')
const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
const cors = require('cors')
app.use(cors({
    origin : ["http://localhost:5173","http://localhost:5174","http://localhost:3000"],
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
const ve_host_info = require('./Route/Admin-Route/vehicleRoute/vehicleRoute');
app.use('/' ,ve_host_info)
const viewVehicleInfo = require('./Route/Admin-Route/vehicleRoute/vehicleRoute');
app.use('/' ,viewVehicleInfo)
// app.use("/uploads", express.static("uploads"));
const updateVehicleStatus = require('./Route/Admin-Route/vehicleRoute/vehicleRoute')
app.use('/' ,updateVehicleStatus);


const carCategories =  require('./Route/Website-Route/carCategories/carCategories')
app.use('/', carCategories) 

const updateKYC = require('./Route/Website-Route/kycRouter/kycRouter');
app.use('/' ,updateKYC)
const kycStatus = require('./Route/Website-Route/kycRouter/kycRouter');
app.use('/' ,kycStatus)
const chkUser = require('./Route/Website-Route/loginRoute/userLogin');
app.use('/' ,chkUser);
const userDetails = require('./Route/Website-Route/loginRoute/userLogin');
app.use('/' , userDetails)

const options = require('./Route/Website-Route/payment/paymentRoute');
app.use('/', options)

const handleRazorpayWebhook = require('./Route/Website-Route/payment/webhooks');
app.use('/',handleRazorpayWebhook)

port = 3006;


app.listen(port, () => {
    console.log(`Server is running on port ${port} successfully`);
});