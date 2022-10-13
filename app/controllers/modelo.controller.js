const db = require("../models");
const Modelo = db.modelo;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    if (!req.body.nome) {
        res.status(400).send({
            message: "O conteúdo não pode ficar vazio!"
        });
        return;
    }

    const modelo = {
        nome: req.body.nome,
    }

    Modelo.create(modelo).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Ocorreu algum erro ao criar o modelo"
        });
    });

};

exports.findAll = (req, res) => {
    const nome = req.query.nome;
    var condition = nome ? { nome: { [Op.like]: `%${nome}%` } } : null

    Modelo.findAll({ where: condition }).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Ocorreu algum erro ao recuperar os modelos"
        })
    })

};

exports.findOne = (req, res) => {
    const id =  req.params.id;

    Modelo.findByPk(id).then(data => {
        if (data) {
            res.send(data);
        } else {
            res.status(404).send({
                message: `Não é possível encontrar o modelo de id=${id}.`
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: "Erro ao recuperar o modelo com id = " + id
        });
    });
};

exports.update = (req, res) => {
    const id = req.params.id;

    Modelo.update(req.body, {
        where: { id: id }
    }).then(num => {
        if (num == 1) {
            res.send({
                message: "modelo foi atualizado com sucesso."
            });
        } else {
            message: `Não foi possivel atualizar com o id=${id}. Talvez modelo não foi encontrado ou req.body esteja vazio!`
        }
    }).catch(err => {
        res.status(500).send({
            message: "Error ao atualizar modelo with id=" + id
        });
    });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Modelo.destroy({
        where: { id: id }
    }).then(num => {
        if (num == 1) {
            res.send({
                message: "modelo foi deletado com sucesso!"
            });
        } else {
            res.send({
                message: `Não foi possivel deletar o modelo de id=${id}. Talvez modelo não foi encontrado`
            })
        }
    }).catch(err => {
        res.status(500).send({
            message: "Não foi possivel deletar o modelo de id=" + id
        });
    });

};

