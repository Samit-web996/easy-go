const express = require('express');
const modalRouter = express.Router();
const {addEmployees, getEmployees ,getRole, getDept} = require('../../../Controller/Admin/employeeController/employeeModal');

modalRouter.post('/add-employee', addEmployees);
modalRouter.get('/get-employees', getEmployees);    
modalRouter.get('/get-role' , getRole);
modalRouter.get('/get-dept' , getDept);

module.exports = modalRouter;