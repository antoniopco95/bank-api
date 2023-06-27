const dataBank = require("../bancodedados");

function depositAmount(req, res) {
  const { numero, valor } = req.body;

  const validationResult = transactionValidation(numero, valor);

  if (validationResult.error) {
    return res.status(400).json({ error: validationResult.error });
  }

  const acount = validationResult.acount;

  acount.saldo += valor * 100;

  const depositTransaction = {
    data: new Date()
      .toLocaleString("pt-BR", { timeZone: "UTC" })
      .replace(",", ""),
    numero,
    valor,
  };

  dataBank.depositos.push(depositTransaction);

  res.status(200).json({ message: "Depósito realizado com sucesso" });
}

function transactionValidation(number, value) {
  if (!number || !value) {
    return {
      error:
        "O número da conta e o valor da transação são obrigatórios para prosseguir",
    };
  }

  const acount = dataBank.contas.find((conta) => conta.numero === number);

  if (!acount) {
    return { error: "Conta inexistente" };
  }

  if (value <= 0) {
    return { error: "O valor da transação deve ser maior que zero" };
  }

  return { acount };
}

module.exports = {
  depositAmount,
  transactionValidation,
};
