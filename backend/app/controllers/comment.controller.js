require('dotenv').config();

const jwt = require('jsonwebtoken');
const db = require("../models");
const Comment = db.comments;
const User = db.users;
const Op = db.Sequelize.Op;

// créer un nouveau commentaire
exports.create = async (req, res) => {
    // Validation de la requète
    if(!req.body.feedback) {
        res.status(400).send({ 
            message: "Votre commentaire est vide" 
        });
        return;
    }

    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
    const userId = decodedToken.userId;

    // Création d'un commentaire
    const comment = {
        feedback: req.body.feedback,
        MessageId: req.body.messageId,
        UserId: userId
    }

    // Sauvegarde du commentaire dans la BDD
    await Comment.create(comment)
        .then(() => {
            res.status(201).send({
                message: "Commentaire créé!"
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "erreur pendant la création du commentaire!"
            });
        });
};

// récupérer tous les commentaires du message par messageId
exports.findAllByMessage = async (req, res) => {
    const messageId = req.params.messageId;
    let receptacles = [];

    // étape 1 : récupération de la partie "Comments" des commentaires
    await Comment.findAll({
        where: {
            MessageId: {
                [Op.eq]: messageId
            },
            UserId: {
                [Op.not]: null  // Pour éviter les commentaires dont l'auteur a supprimé son compte
            }
        }
    })
        .then(async (partOne) => {
            receptacles = partOne.map((element) => {
                return element.dataValues;
            });

            // étape 2 : récupération de la partie "Users" des commentaires
            for (let i = 0; i < receptacles.length; i++) {
                await User.findByPk(receptacles[i].UserId)
                    .then(partTwo => {
                        partTwo = partTwo.dataValues; 
                        const pieceOfpartTwo = {
                            firstname: partTwo.firstname,
                            name: partTwo.name,
                            photo: partTwo.photo
                        };
                        receptacles[i] = Object.assign({}, receptacles[i], pieceOfpartTwo);
                    })
                    .catch(err => {
                        res.status(500).send({
                            message: "erreur pendant la récupération de l'utilisateur"
                        });
                    });
            }
            res.status(200).send(receptacles);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "erreur pendant la récupération des commentaires!"
            });
        });
};

// récupérer un commentaire par id
exports.findOne = async (req, res) => {
    const id = req.params.id;

    await Comment.findByPk(id)
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: `erreur pendant la récupération du commentaire n° ${id}`
            });
        });
};

// mettre à jour un commentaire par id
exports.update = async (req, res) => {
    const id = req.params.id;

    await Comment.update(req.body, {
        where: {id: id}
    })
        .then( isUpdated => {
            if(isUpdated) {
                res.status(200).send({
                    message: `Le commentaire n°${id} a été mise à jour!`
                });
            } else {
                res.status(400).send({
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
exports.delete = async (req, res) => {
    const id = req.params.id;

    await Comment.destroy({
        where: {id: id }
    })
        .then( isDeleted => {
            if(isDeleted) {
                res.status(200).send({
                    message: `Le commentaire n°${id} a été effacé!`
                });
            } else {
                res.status(403).send({
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