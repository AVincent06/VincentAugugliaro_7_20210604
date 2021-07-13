const db = require("../models");
const Message = db.messages;
const Op = db.Sequelize.Op;
const Sequelize = require("sequelize");

// créer un nouveau message
exports.create = (req, res) => {
    // Validation de la requète
    if(!req.body.picture && !req.body.article) {
        res.status(400).send({ 
            message: "Ce message n'a ni texte, ni image!" 
        });
        return;
    }

    // Création d'un message
    const message = {
        picture: req.body.picture,
        article: req.body.article,
        UserId: req.body.user_id
    }

    // Sauvegarde du message dans la BDD
    Message.create(message)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "erreur pendant la sauvegarde du message!"
            });
        });
};

// récupérer les nb derniers messages
exports.findAllByAmount = (req, res) => {
    const nb = parseInt(req.params.nb, 10);

    Message.findAll({
        order: Sequelize.literal('createdAt DESC'),
        limit: nb
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "erreur pendant la récupération des messages!"
            });
        });
};

// récupérer les messages jusqu'à date
exports.findAllByDate = (req, res) => {
    const date = req.params.date;

    Message.findAll({
        where: {
            createdAt: {
                [Op.lte]: date
            }
        }
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "erreur pendant la récupération des messages!"
            });
        });
};

// récupérer tous les message par userId
exports.findAllByUser = (req, res) => {
    const userId = req.params.userId;

    Message.findAll({
        where: {
            UserId: {
                [Op.eq]: userId
            }
        }
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "erreur pendant la récupération des messages!"
            });
        });
};

// récupérer un message par id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Message.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: `erreur pendant la récupération du message n° ${id}`
            });
        });
};

// mettre à jour un message par id
exports.update = (req, res) => {
    const id = req.params.id;

    Message.update(req.body, {
        where: {id: id}
    })
        .then( isUpdated => {
            if(isUpdated) {
                res.send({
                    message: `Le message n°${id} a été mise à jour!`
                });
            } else {
                res.send({
                    message: `Le message n°${id} n'a pas pu être mise à jour!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `erreur pendant la mise à jour du message n° ${id}`
            });
        });
};

// effacer un message par id
exports.delete = (req, res) => {
    const id = req.params.id;

    Message.destroy({
        where: {id: id }
    })
        .then( isDeleted => {
            if(isDeleted) {
                res.send({
                    message: `Le message n°${id} a été effacé!`
                });
            } else {
                res.send({
                    message: `Le message n°${id} n'a pas pu être effacé!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `erreur pendant la suppression du message n° ${id}`
            });
        });
};