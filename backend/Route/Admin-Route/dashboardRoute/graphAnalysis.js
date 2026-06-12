const express = require('express');
const graphRouter = express.Router();
const getCarDistribution = require('../../../Controller/admin/dashboardController/graphAnalysis');

graphRouter.get('/car-category-graph' , getCarDistribution);

module.exports = graphRouter;