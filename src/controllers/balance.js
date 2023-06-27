const dataBank = require("../bancodedados");

exports.getBalance = (req, res) => {
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

  if (!informedAccount) {
    return res.status(400).json({ message: "A conta informada não existe!" });
  }

  if (informedAccount.usuario.senha !== senha) {
    return res.status(400).json({
      message: "A senha informada não é válida para a conta informada!",
    });
  }

  return res.status(200).json({ saldo: `${informedAccount.saldo}` });
};
