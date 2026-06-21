const express = require('express');
const dashboardRouter = express.Router();
const getDashboardOverview = require('../../../Controller/admin/dashboardController/dashboard');

dashboardRouter.get('/dashboard-data' ,getDashboardOverview);

module.exports = dashboardRouter;