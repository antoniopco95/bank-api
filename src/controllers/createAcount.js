const dataBank = require('../bancodedados');

exports.createAcounts = (req, res) => {
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

    if (!nome || !cpf || !data_nascimento || !telefone || !email || !senha) {
        return res.status(400).json({ error: 'Todos os campos são obrigatorios' });
    }

    const existentAcount = dataBank.contas.find((conta) => conta.usuario.cpf === cpf || conta.usuario.email === email)
    if (existentAcount) {
        return res.status(400).json({ error: 'Cpf ou email já estão em uso' });
    }

    const numberAcount = generateAcountNumber();

    const newAcount = {
        numero: numberAcount,
        saldo: 0,
        usuario: {
            nome,
            cpf,
            data_nascimento,
            telefone,
            email,
            senha
        }
    };

    dataBank.contas.push(newAcount);

    res.json({
        usuario: newAcount.usuario, numberAcount,
        saldo: newAcount.saldo
    });
};

function generateAcountNumber() {
    const randomNumber = Math.floor(Math.random() * 1000000);
    const acountNumber = String(randomNumber).padStart(6, '0');
    return acountNumber;
}