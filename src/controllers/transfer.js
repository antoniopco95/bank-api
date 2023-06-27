const dataBank = require("../bancodedados");

exports.transfer = (req, res) => {
  const { numero_conta_origem, numero_conta_destino, valor, senha } = req.body;

  if (!numero_conta_origem) {
    return res
      .status(400)
      .json({ message: "O número da conta de origem deve ser informado!" });
  }

  if (!numero_conta_destino) {
    return res
      .status(400)
      .json({ message: "O número da conta de destino deve ser informado!" });
  }

  if (!valor) {
    return res
      .status(400)
      .json({ message: "O valor da transferência deve ser informado!" });
  }

  if (!senha) {
    return res
      .status(400)
      .json({ message: "A senha da conta de origem deve ser informada!" });
  }

  const originAccount = dataBank.contas.find(
    (origin) => origin.numero === numero_conta_origem
  );

  const destinyAccount = dataBank.contas.find(
    (destiny) => destiny.numero === numero_conta_destino
  );

  if (!originAccount) {
    return res
      .status(400)
      .json({ message: "A conta bancária de origem informada não existe!" });
  }

  if (!destinyAccount) {
    return res
      .status(400)
      .json({ message: "A conta bancária de destino informada não existe!" });
  }

  if (originAccount.usuario.senha !== senha) {
    return res.status(400).json({
      message: "A senha informada para a conta de origem não é válida!",
    });
  }

  if (!originAccount.saldo) {
    return res
      .status(400)
      .json({ messagem: "Não há saldo disponível na conta de origem!" });
  }

  originAccount.saldo -= valor;
  destinyAccount.saldo += valor;

  const transfer = {
    data: new Date()
      .toLocaleString("pt-BR", { timeZone: "UTC" })
      .replace(",", ""),
    numero_conta_origem,
    numero_conta_destino,
    valor,
  };

  dataBank.transferencias.push(transfer);

  return res
    .status(200)
    .json({ message: "Transferência realizada com sucesso!" });
};
