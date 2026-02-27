const express = require("express");
const employeeRouter = express.Router();
const getEmployees = require("../../Controller/employeeController/employeeController");

employeeRouter.get("/employees", getEmployees);

module.exports = employeeRouter;