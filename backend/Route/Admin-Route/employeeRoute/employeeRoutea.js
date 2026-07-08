const express = require("express");
const employeeRouter = express.Router();
const {getEmployees, getEmployee,updateEmployee} = require("../../../Controller/Admin/employeeController/employeeController");


// employeeRouter.put("/update-role", updateRole);
employeeRouter.get("/employees", getEmployees);
employeeRouter.get("/get-employee/:eid" , getEmployee)
employeeRouter.patch("/update-emp/:eid" ,updateEmployee)
module.exports = employeeRouter;