const express = require('express')
const signupRouter = express.Router()
const signupUser = require('../../Controller/signupController/signupController')
const validateSchema = require('../../Controller/signupController/signupValidation')

signupRouter.post('/signup', validateSchema,signupUser)

module.exports = signupRouter;