const express = require('express')
const veOwnerSignUpRouter = express.Router()
const signupUser = require('../../../Controller/VehicleOwner/signUpController/signUpController')
const validateUser = require('../../../Controller/VehicleOwner/signUpController/signUpValidation')

veOwnerSignUpRouter.post('/ve-signup' , signupUser,validateUser)

module.exports = veOwnerSignUpRouter;