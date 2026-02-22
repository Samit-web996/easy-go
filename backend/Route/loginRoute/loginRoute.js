const express = require('express')
const loginRouter = express.Router()
const userLogin = require('../../Controller/loginController/loginController')
const validateSchema = require('../../Controller/loginController/loginValidation')

loginRouter.post('/login', validateSchema, userLogin)

module.exports = loginRouter;