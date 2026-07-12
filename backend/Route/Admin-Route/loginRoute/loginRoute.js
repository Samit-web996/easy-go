const express = require('express')
const loginRouter = express.Router()
const userLogin = require('../../../Controller/admin/loginController/loginController')
const validateSchema = require('../../../Controller/admin/loginController/loginValidation')

loginRouter.post('/adminlogin', validateSchema, userLogin)

module.exports = loginRouter;