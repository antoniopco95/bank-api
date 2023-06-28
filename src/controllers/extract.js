const dataBank = require("../bancodedados");

exports.extract = (req, res) => {
  const { numero_conta, senha } = req.query;

  if (!numero_conta) {
    return res
      .status(400)
      .json({ message: "O número da conta deve ser informado!" });
  }

  if (!senha) {
    return res.status(400).json({ message: "A senha deve ser informada!" });
  }

  const informedAccount = dataBank.contas.find(
    (account) => account.numero === numero_conta
  );

  if (informedAccount.usuario.senha !== senha) {
    return res.status(400).json({
      message: "A senha informada não é válida para a conta informada!",
    });
  }

  const sentTransfer = dataBank.transferencias.filter((item) => {
    return item.numero_conta_destino === numero_conta;
  });

  const receivedTransfer = dataBank.transferencias.filter((item) => {
    return item.numero_conta_origem === numero_conta;
  });

  res.status(200).json({
    depositos: dataBank.depositos,
    saques: dataBank.saques,
    transferenciasEnviadas: sentTransfer,
    transferenciasRecebidas: receivedTransfer,
  });
};
