const express = require('express');
const router = express.Router();
const {chkUser,userDetails} = require('../../../Controller/Website/userLogin/userLogin');


router.post("/api/check-user", chkUser);
router.post("/api/auth/login", userDetails);

module.exports = router;