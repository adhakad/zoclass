'use strict';
const express = require('express');
const router = express.Router();
const { CreateIssuedTransferCertificate} = require('../controllers/issued-transfer-certificate');


router.post('/', CreateIssuedTransferCertificate);


module.exports = router;