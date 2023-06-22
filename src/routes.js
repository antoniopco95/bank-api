const express = require('express');
const router = express.Router();
const acountController = require('./controllers/acountController');
const creatAcount = require('./controllers/createAcount');

router.get('/contas', acountController.listAcounts);
router.post('/contas', creatAcount.createAcounts);

module.exports = router;
