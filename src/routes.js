const express = require('express');
const router = express.Router();
const accountController = require('./controllers/acountController');

router.get('/contas?senha_banco', accountController.listAccounts);

module.exports = router;
