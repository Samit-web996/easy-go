const express = require('express')
const loginRouter = express.Router()
const userLogin = require('../../../Controller/Admin/loginController/loginController')
const validateSchema = require('../../../Controller/admin/loginController/loginValidation')

loginRouter.post('/login', validateSchema, userLogin)

module.exports = loginRouter;