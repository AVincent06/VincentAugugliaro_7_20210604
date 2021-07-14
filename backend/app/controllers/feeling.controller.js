const db = require("../models");
const Feeling = db.feelings;
const Op = db.Sequelize.Op;
const LIKE = 1;
const DISLIKE = 2;

// ajouter un like sur le message par id
exports.addLike = (req, res) => {
    const id = req.params.id;

    // Est ce qu'il y a déjà un like de cet utilisateur pour ce message?
    Feeling.count({
        where: {
            [Op.and]: [
                { MessageId: id }, 
                { UserId: req.body.user_id },
                { CategoryId: LIKE }
            ]
        }
    })
        .then((isLiked) => {
            if(isLiked) { // Oui, like déjà ajouté
                res.status(403).send({ 
                    message: "Un seul Like autorisé par message pour un utilisateur!" 
                });
                return;
            } else { // Non, pas encore de like ajouté
                // Création du like
                const feeling = {
                    MessageId: id,
                    UserId: req.body.user_id,
                    CategoryId: LIKE
                }

                // Sauvegarde du like dans la BDD
                Feeling.create(feeling)
                    .then(data => {
                        res.send(data);
                    })
                    .catch(err => {
                        res.status(500).send({
                            message: err.message || "erreur pendant la sauvegarde du like!"
                        });
                    });
            }
        })
        .catch(() => {
            res.status(500).send({
                message: "erreur pendant la vérification de l'existence du like!"
            });
        });
};

// ajouter un dislike sur le message par id
exports.addDislike = (req, res) => {
    const id = req.params.id;

    // Est ce qu'il y a déjà un dislike de cet utilisateur pour ce message?
    Feeling.count({
        where: {
            [Op.and]: [
                { MessageId: id }, 
                { UserId: req.body.user_id },
                { CategoryId: DISLIKE }
            ]
        }
    })
        .then((isDisliked) => {
            if(isDisliked) { // Oui, dislike déjà ajouté
                res.status(403).send({ 
                    message: "Un seul Dislike autorisé par message pour un utilisateur!" 
                });
                return;
            } else { // Non, pas encore de dislike ajouté
                // Création du dislike
                const feeling = {
                    MessageId: id,
                    UserId: req.body.user_id,
                    CategoryId: DISLIKE
                }

                // Sauvegarde du dislike dans la BDD
                Feeling.create(feeling)
                    .then(data => {
                        res.send(data);
                    })
                    .catch(err => {
                        res.status(500).send({
                            message: err.message || "erreur pendant la sauvegarde du dislike!"
                        });
                    });
            }
        })
        .catch(() => {
            res.status(500).send({
                message: "erreur pendant la vérification de l'existence du dislike!"
            });
        });
};

// récupérer tous les like pour le message par id
exports.findAllLike = (req, res) => {
    const id = req.params.id;

    Feeling.findAll({
        where: {
            [Op.and]: [
                { MessageId: id }, 
                { CategoryId: LIKE }
            ]
        }
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "erreur pendant la récupération des likes!"
            });
        });
};

// récupérer tous les dislike pour le message par id
exports.findAllDislike = (req, res) => {
    const id = req.params.id;

    Feeling.findAll({
        where: {
            [Op.and]: [
                { MessageId: id }, 
                { CategoryId: DISLIKE }
            ]
        }
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "erreur pendant la récupération des dislikes!"
            });
        });
};

// effacer un like sur le message par id
exports.delLike = (req, res) => {
    const id = req.params.id;

    Feeling.destroy({
        where: {
            [Op.and]: [
                { MessageId: id }, 
                { UserId: req.body.user_id },
                { CategoryId: LIKE }
            ]
        }
    })
        .then( isDeleted => {
            if(isDeleted) {
                res.send({
                    message: `Le like de l'utilisateur n°${req.body.user_id} a été retiré!`
                });
            } else {
                res.send({
                    message: `Le like de l'utilisateur n°${req.body.user_id} n'a pas été retiré!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `erreur pendant la suppression du like de l'utilisateur n° ${id}`
            });
        });
};

// effacer un dislike sur le message par id
exports.delDislike = (req, res) => {
    const id = req.params.id;

    Feeling.destroy({
        where: {
            [Op.and]: [
                { MessageId: id }, 
                { UserId: req.body.user_id },
                { CategoryId: DISLIKE }
            ]
        }
    })
        .then( isDeleted => {
            if(isDeleted) {
                res.send({
                    message: `Le dislike de l'utilisateur n°${req.body.user_id} a été retiré!`
                });
            } else {
                res.send({
                    message: `Le dislike de l'utilisateur n°${req.body.user_id} n'a pas été retiré!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `erreur pendant la suppression du dislike de l'utilisateur n° ${id}`
            });
        });
};