const dataBank = require('../bancodedados');

exports.depositAmount = (req, res) => {
    const { numero, valor } = req.body;

    if (!numero || !valor) {
        return res.status(400).json({ error: 'O numero da conta e o valor do deposito são obrigatorios para prosseguir' });
    }

    const acount = dataBank.contas.find((conta) => conta.numero === numero);

    if (!acount) {
        return res.status(400).json({ error: 'Conta inexistente' })
    }

    if (valor <= 0) {
        return res.status(400).json({ error: 'O valor depositado deve ser maior que zero' })
    }

    acount.saldo += valor * 100;

    const depositTransaction = {
        numero,
        valor,
        data: new Date().toLocaleString('pt-BR', { timeZone: 'UTC' }).replace(',', '')
    };

    dataBank.depositos.push(depositTransaction);

    res.status(200).json({ message: 'Depósito relizado com sucesso' });

};
