const db = require("../models");
const Veiculo = db.veiculo;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    if (!req.body.placa) {
        res.status(400).send({
            message: "O conteúdo não pode ficar vazio!"
        });
        return;
    }

    const veiculo = {
        placa: req.body.placa,
        cor: req.body.cor,
        cliente_id: req.body.cliente_id,
        modelo_id: req.body.modelo_id
    }

    Veiculo.create(veiculo).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Ocorreu algum erro ao criar o veiculo"
        });
    });

};

exports.findAll = (req, res) => {
    const placa = req.query.placa;
    var condition = placa ? { placa: { [Op.like]: `%${placa}%` } } : null

    Veiculo.findAll({ where: condition }).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Ocorreu algum erro ao recuperar os veiculos"
        })
    })

};

exports.findOne = (req, res) => {
    const id =  req.params.id;

    Veiculo.findByPk(id).then(data => {
        if (data) {
            res.send(data);
        } else {
            res.status(404).send({
                message: `Não é possível encontrar o veiculo de id=${id}.`
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: "Erro ao recuperar o veiculo com id = " + id
        });
    });
};

exports.update = (req, res) => {
    const id = req.params.id;

    Veiculo.update(req.body, {
        where: { id: id }
    }).then(num => {
        if (num == 1) {
            res.send({
                message: "veiculo foi atualizado com sucesso."
            });
        } else {
            message: `Não foi possivel atualizar com o id=${id}. Talvez veiculo não foi encontrado ou req.body esteja vazio`
        }
    }).catch(err => {
        res.status(500).send({
            message: "Error ao atualizar veiculo with id=" + id
        });
    });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Veiculo.destroy({
        where: { id: id }
    }).then(num => {
        if (num == 1) {
            res.send({
                message: "veiculo foi deletado com sucesso!"
            });
        } else {
            res.send({
                message: `Não foi possivel deletar o veiculo de id=${id}. Talvez veiculo não foi encontrado`
            })
        }
    }).catch(err => {
        res.status(500).send({
            message: "Não foi possivel deletar o veiculo de id=" + id
        });
    });

};

