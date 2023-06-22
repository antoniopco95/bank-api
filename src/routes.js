const express = require('express');
const router = express.Router();
const acountController = require('./controllers/acountController');

router.get('/contas', acountController.listAcounts);

module.exports = router;
