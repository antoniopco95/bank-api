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


    if (nome) {
        acountNumberExist.usuario.nome = nome;
    }
    if (cpf) {
        acountNumberExist.usuario.cpf = cpf;
    }
    if (dataNascimento) {
        acountNumberExist.usuario.data_nascimento = dataNascimento;
    }
    if (telefone) {
        acountNumberExist.usuario.telefone = telefone;
    }
    if (email) {
        acountNumberExist.usuario.email = email;
    }
    if (senha) {
        acountNumberExist.usuario.senha = senha;
    }

    res.status(200).json({ mensagem: 'Conta atualizada com sucesso!' });

}

