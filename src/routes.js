const express = require("express");
const router = express.Router();
const acountController = require("./controllers/acountController");
const creatAcount = require("./controllers/createAcount");
const acountUpdate = require("./controllers/acountUpdate");
const acountDelete = require("./controllers/acountDelete");
const cashDeposit = require("./controllers/cashDeposit");
const withdrawMoney = require("./controllers/withdrawMoney");
const transfer = require("./controllers/transfer");
const balance = require("./controllers/balance");
const extract = require("./controllers/extract");

router.get("/contas", acountController.listAcounts);
router.post("/contas", creatAcount.createAcounts);
router.put(`/contas/:numero/usuario`, acountUpdate.acountUpdates);
router.delete("/contas/:numero", acountDelete.deleteAcount);
router.post("/transacoes/depositar", cashDeposit.depositAmount);
router.post("/transacoes/sacar", withdrawMoney.withdrawTransaction);
router.post("/transacoes/transferir", transfer.transfer);
router.get("/contas/saldo", balance.getBalance);
router.get("/contas/extrato", extract.extract);

module.exports = router;
