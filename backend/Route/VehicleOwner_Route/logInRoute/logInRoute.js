const express = require('express')
const loginRouter = express.Router()
const userLogin = require('../../../Controller/VehicleOwner/logInController/logInController')
const validateSchema = require('../../../Controller/VehicleOwner/logInController/loginValidation')

loginRouter.post('/userlogin',validateSchema, userLogin)

module.exports = loginRouter;