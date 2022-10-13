const db = require("../models");
const Cliente = db.cliente;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    if (!req.body.nome) {
        res.status(400).send({
            message: "O conteúdo não pode ficar vazio!"
        });
        return;
    }

    const cliente = {
        nome: req.body.nome,
        cpf: req.body.cpf
    }

    Cliente.create(cliente).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Ocorreu algum erro ao criar o cliente"
        });
    });

};

exports.findAll = (req, res) => {
    const nome = req.query.nome;
    var condition = nome ? { nome: { [Op.like]: `%${nome}%` } } : null

    Cliente.findAll({ where: condition }).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Ocorreu algum erro ao recuperar os clientes"
        })
    })

};

exports.findOne = (req, res) => {
    const id =  req.params.id;

    Cliente.findByPk(id).then(data => {
        if (data) {
            res.send(data);
        } else {
            res.status(404).send({
                message: `Não é possível encontrar o cliente de id=${id}.`
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: "Erro ao recuperar o cliente com id = " + id
        });
    });
};

exports.update = (req, res) => {
    const id = req.params.id;

    Cliente.update(req.body, {
        where: { id: id }
    }).then(num => {
        if (num == 1) {
            res.send({
                message: "cliente foi atualizado com sucesso."
            });
        } else {
            message: `Não foi possivel atualizar com o id=${id}. Talvez cliente não foi encontrado ou req.body esteja vazio!`
        }
    }).catch(err => {
        res.status(500).send({
            message: "Error ao atualizar cliente with id=" + id
        });
    });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Cliente.destroy({
        where: { id: id }
    }).then(num => {
        if (num == 1) {
            res.send({
                message: "cliente foi deletado com sucesso!"
            });
        } else {
            res.send({
                message: `Não foi possivel deletar o cliente de id=${id}. Talvez cliente não foi encontrado`
            })
        }
    }).catch(err => {
        res.status(500).send({
            message: "Não foi possivel deletar o cliente de id=" + id
        });
    });

};

