const dataBank = require("../bancodedados");
const { transactionValidation } = require("./cashDeposit");

exports.withdrawTransaction = (req, res) => {
  const { numero, valor, senha } = req.body;

  const validationResult = transactionValidation(numero, valor);

  if (validationResult.error) {
    return res.status(400).json({ error: validationResult.error });
  }

  const acount = validationResult.acount;

  if (acount.usuario.senha !== senha) {
    return res
      .status(400)
      .json({ error: "Senha inválida para a conta informada" });
  }

  if (acount.saldo < valor * 100) {
    return res
      .status(400)
      .json({ error: "Saldo insuficiente para realizar o saque" });
  }

  acount.saldo -= valor * 100;

  const withDrawTransaction = {
    data: new Date()
      .toLocaleString("pt-BR", { timeZone: "UTC" })
      .replace(",", ""),
    numero,
    valor,
  };

  dataBank.saques.push(withDrawTransaction);

  res.status(200).json({ message: "Saque realizado com sucesso" });
};
