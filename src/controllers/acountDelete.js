const dataBank = require('../bancodedados');

exports.deleteAcount = (req, res) => {
    const acountNumber = req.params.numero;

    const acountindex = dataBank.contas.findIndex(
        (conta) => conta.numero === acountNumber
    );

    if (acountindex === -1) {
        return res.status(404).json({ error: 'Número da conta inválido' });
    }

    const acount = dataBank.contas[acountindex];

    if (acount.saldo !== 0) {
        return res.status(400).json({ error: 'Não é possível excluir uma conta com saldo acima de 0' })
    }

    dataBank.contas.splice(acountindex, 1);

    return res.status(200).json({ mensagem: 'Conta excluida com sucesso' });

};