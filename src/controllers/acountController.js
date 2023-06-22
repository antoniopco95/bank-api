const dataBank = require('../bancodedados');

exports.listAccounts = (req, res) => {
    const { senha_banco } = req.params;

    if (!senha_banco) {
        return res.status(400).json({ error: 'Senha do banco não foi informada' });
    }

    else if (senha_banco !== dataBank.banco.senha) {
        return res.status(401).json({ error: 'Senha do banco incorreta' });
    }

    res.json(dataBank.contas);
};

