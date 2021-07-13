const db = require("../models");
const Comment = db.comments;
const Op = db.Sequelize.Op;

// créer un nouveau commentaire
exports.create = (req, res) => {
    // Validation de la requète
    if(!req.body.feedback) {
        res.status(400).send({ 
            message: "Votre commentaire est vide" 
        });
        return;
    }

    // Création d'un commentaire
    const comment = {
        feedback: req.body.feedback,
        MessageId: req.body.MessageId,
        UserId: req.body.UserId
    }

    // Sauvegarde du commentaire dans la BDD
    Comment.create(comment)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "erreur pendant la création du commentaire!"
            });
        });
};

// récupérer tous les commentaires du message par messageId
exports.findAllByMessage = (req, res) => {
    const messageId = req.params.messageId;

    Comment.findAll({
        where: {
            MessageId: {
                [Op.eq]: messageId
            }
        }
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "erreur pendant la récupération des commentaires!"
            });
        });
};

// récupérer un commentaire par id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Comment.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: `erreur pendant la récupération du commentaire n° ${id}`
            });
        });
};

// mettre à jour un commentaire par id
exports.update = (req, res) => {
    const id = req.params.id;

    Comment.update(req.body, {
        where: {id: id}
    })
        .then( isUpdated => {
            if(isUpdated) {
                res.send({
                    message: `Le commentaire n°${id} a été mise à jour!`
                });
            } else {
                res.send({
                    message: `Le commentaire n°${id} n'a pas pu être mise à jour!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `erreur pendant la mise à jour du commentaire n° ${id}`
            });
        });
};

// effacer un commentaire par id
exports.delete = (req, res) => {
    const id = req.params.id;

    Comment.destroy({
        where: {id: id }
    })
        .then( isDeleted => {
            if(isDeleted) {
                res.send({
                    message: `Le commentaire n°${id} a été effacé!`
                });
            } else {
                res.send({
                    message: `Le commentaire n°${id} n'a pas pu être effacé!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `erreur pendant la suppression du commentaire n° ${id}`
            });
        });
};