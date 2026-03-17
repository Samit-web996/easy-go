const express = require('express');
const modalRouter = express.Router();
const {addEmployees, getEmployees} = require('../../../Controller/Admin/employeeController/employeeModal');

modalRouter.post('/add-employee', addEmployees);
modalRouter.get('/get-employees', getEmployees);     

module.exports = modalRouter;