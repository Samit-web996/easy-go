const express = require('express');
const modalRouter = express.Router();
const {addEmployees, getEmployees} = require('../../Controller/employeeController/employeeModal');


console.log("Handler Function:", addEmployees);
modalRouter.post('/add-employee', addEmployees);
modalRouter.get('/get-employees', getEmployees);     

module.exports = modalRouter;