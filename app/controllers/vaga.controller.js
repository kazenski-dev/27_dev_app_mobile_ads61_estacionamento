const db = require("../models");
const Vaga = db.vaga;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    if (!req.body.valor) {
        res.status(400).send({
            message: "O conteúdo não pode ser vazio!"
        });
        return;
    }

    const vaga = {
        valor: req.body.valor,
        tipovaga: req.body.tipovaga
    }

    Vaga.create(vaga).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Ocorreu algum erro ao criar a vaga"
        })
    })


};

exports.findAll = (req, res) => {
    const valor = req.query.valor;
    var condition = valor ? { valor: { [Op.like]: `%${valor}%` } } : null

    Vaga.findAll({ where: condition }).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Ocorreu algum erro ao recuperar as vagas"
        })
    })

};

exports.findOne = (req, res) => {
    const id =  req.params.id;

    Vaga.findByPk(id).then(data => {
        if (data) {
            res.send(data);
        } else {
            res.status(404).send({
                message: `Não é possível encontrar o vaga de id=${id}.`
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: "Erro ao recuperar vaga com id = " + id
        });
    });
};

exports.update = (req, res) => {
    const id = req.params.id;

    Vaga.update(req.body, {
        where: { id: id }
    }).then(num => {
        if (num == 1) {
            res.send({
                message: "Vaga foi atualizado com sucesso."
            });
        } else {
            message: `Não foi possivel atualizar com o id=${id}. Talvez vaga não foi encontrado ou req.body esteja vazio!`
        }
    }).catch(err => {
        res.status(500).send({
            message: "Error ao atualizar vaga with id=" + id
        });
    });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Vaga.destroy({
        where: { id: id }
    }).then(num => {
        if (num == 1) {
            res.send({
                message: "Vaga foi deletado com sucesso!"
            });
        } else {
            res.send({
                message: `Não foi possivel deletar vaga de id=${id}. Talvez Estacionamento não foi encontrado`
            })
        }
    }).catch(err => {
        res.status(500).send({
            message: "Não foi possivel deletar vaga de id=" + id
        });
    });

};