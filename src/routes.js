const express = require('express');
const router = express.Router();
const acountController = require('./controllers/acountController');
const creatAcount = require('./controllers/createAcount');
const acountUpdate = require('./controllers/acountUpdate');

router.get('/contas', acountController.listAcounts);
router.post('/contas', creatAcount.createAcounts);
router.put(`/contas/:numero/usuario`, acountUpdate.acountUpdates);

module.exports = router;
