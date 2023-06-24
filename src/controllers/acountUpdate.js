const dataBank = require('../bancodedados');

exports.acountUpdates = (req, res) => {
    const acountNumber = req.params.numero;
    const { nome, cpf, dataNascimento, telefone, email, senha } = req.body;

    if (!nome && !cpf && !dataNascimento && !telefone && !email && !senha) {
        return res.status(400).json({ error: 'Pelo menos um campo deve ser informado para atualização' });
    }

    const acountNumberExist = dataBank.contas.find((conta) => conta.numero === acountNumber);

    if (!acountNumberExist) {
        return res.status(400).json({ error: 'Numero da conta inválido' });
    }

    const cpfExist = dataBank.contas.find((conta) => conta.usuario.cpf === cpf);

    if (cpfExist && cpfExist.numero !== acountNumber) {
        return res.status(400).json({ error: 'Já existe outro registro com o mesmo CPF' });
    }

    const emailExist = dataBank.contas.find((conta) => conta.usuario.email === email);

    if (emailExist && emailExist.numero !== acountNumber) {
        return res.status(400).json({ error: 'Já existe outro registro com o mesmo email' });
    }


    const fieldsToUpdate = { nome, cpf, data_nascimento: dataNascimento, telefone, email, senha };

    for (const field in fieldsToUpdate) {
        if (fieldsToUpdate[field]) {
            acountNumberExist.usuario[field] = fieldsToUpdate[field];
        }
    }

    res.status(200).json({ mensagem: 'Conta atualizada com sucesso!' });

}

