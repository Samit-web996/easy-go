const express = require('express');
const clientRouter = express.Router();
const {verifyOrRejectUser,actionButton} = require('../../../Controller/admin/clientController/clientController');

clientRouter.get('/client-approval' ,verifyOrRejectUser);
clientRouter.post('/api/update-client-status' ,actionButton);

module.exports = clientRouter;