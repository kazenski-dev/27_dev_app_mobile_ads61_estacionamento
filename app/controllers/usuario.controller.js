const db = require("../models");
const Usuario = db.usuario;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    if (!req.body.nome) {
        res.status(400).send({
            message: "O conteúdo não pode ficar vazio!"
        });
        return;
    }

    const usuario = {
        nome: req.body.nome,
        login: req.body.login,
        senha: req.body.senha
    }

    Usuario.create(usuario).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Ocorreu algum erro ao criar o usuario"
        });
    });

};

exports.findAll = (req, res) => {
    const nome = req.query.nome;
    var condition = nome ? { nome: { [Op.like]: `%${nome}%` } } : null

    Usuario.findAll({ where: condition }).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Ocorreu algum erro ao recuperar os usuarios"
        })
    })

};

exports.findOne = (req, res) => {
    const id =  req.params.id;

    Usuario.findByPk(id).then(data => {
        if (data) {
            res.send(data);
        } else {
            res.status(404).send({
                message: `Não é possível encontrar o usuario de id=${id}.`
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: "Erro ao recuperar o usuario com id = " + id
        });
    });
};

exports.update = (req, res) => {
    const id = req.params.id;

    Usuario.update(req.body, {
        where: { id: id }
    }).then(num => {
        if (num == 1) {
            res.send({
                message: "usuario foi atualizado com sucesso."
            });
        } else {
            message: `Não foi possivel atualizar com o id=${id}. Talvez usuario não foi encontrado ou  req.body esteja vazio!`
        }
    }).catch(err => {
        res.status(500).send({
            message: "Error ao atualizar usuario with id=" + id
        });
    });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Usuario.destroy({
        where: { id: id }
    }).then(num => {
        if (num == 1) {
            res.send({
                message: "usuario foi deletado com sucesso!"
            });
        } else {
            res.send({
                message: `Não foi possivel deletar o usuario de id=${id}. Talvez usuario não foi encontrado`
            })
        }
    }).catch(err => {
        res.status(500).send({
            message: "Não foi possivel deletar o usuario de id=" + id
        });
    });

};

