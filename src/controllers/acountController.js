const dataBank = require('../bancodedados');

exports.listAcounts = (req, res) => {
    const bankPassword = req.query.senha_banco;

    if (!bankPassword) {
        return res.status(400).json({ error: 'Senha do banco não foi informada' });
    }

    else if (bankPassword !== dataBank.banco.senha) {
        return res.status(401).json({ error: 'Senha do banco incorreta' });
    }

    res.json(dataBank.contas);
};

