'use strict';
const express = require('express');
const router = express.Router();
const { CreateIssuedTransferCertificate,GetIssuedTransferCertificatePagination} = require('../controllers/issued-transfer-certificate');


router.post('/issued-transfer-certificate-pagination', GetIssuedTransferCertificatePagination);
router.post('/', CreateIssuedTransferCertificate);


module.exports = router;