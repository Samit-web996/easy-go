const express = require("express");
const employeeRouter = express.Router();
const {getEmployees,updateRole} = require("../../../Controller/Admin/employeeController/employeeController");


employeeRouter.put("/update-role", updateRole)
employeeRouter.get("/employees", getEmployees);

module.exports = employeeRouter;