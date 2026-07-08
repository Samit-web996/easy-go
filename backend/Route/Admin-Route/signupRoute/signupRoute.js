const express = require('express')
const signupRouter = express.Router()
const signupUser = require('../../../Controller/Admin/signupController/signupController')
const validateSchema = require('../../../Controller/admin/signupController/signupValidation')

signupRouter.post('/signup', validateSchema,signupUser)

module.exports = signupRouter;