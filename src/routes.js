const express = require('express');
const router = express.Router();
const acountController = require('./controllers/acountController');
const creatAcount = require('./controllers/createAcount');
const acountUpdate = require('./controllers/acountUpdate');
const acountDelete = require('./controllers/acountDelete')

router.get('/contas', acountController.listAcounts);
router.post('/contas', creatAcount.createAcounts);
router.put(`/contas/:numero/usuario`, acountUpdate.acountUpdates);
router.delete('/contas/:numero', acountDelete.deleteAcount);

module.exports = router;
