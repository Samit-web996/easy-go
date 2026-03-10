const express = require("express");
const employeeRouter = express.Router();
const {getEmployees,updateRole} = require("../../Controller/employeeController/employeeController");
// const updateRole = require("../../Controller/employeeController/employeeController");

employeeRouter.put("/update-role", updateRole)
employeeRouter.get("/employees", getEmployees);

module.exports = employeeRouter;