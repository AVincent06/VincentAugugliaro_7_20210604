const db = require("../models");
const Feeling = db.feelings;
const Op = db.Sequelize.Op;
const LIKE = 1;
const DISLIKE = 2;

// ajouter un like sur le message par id
exports.addLike = (req, res) => {
    const id = req.params.id;

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
};

// ajouter un dislike sur le message par id
exports.addDislike = (req, res) => {

};

// récupérer tous les like pour le message par id
exports.findAllLike = (req, res) => {

};

// récupérer tous les dislike pour le message par id
exports.findAllDislike = (req, res) => {

};

// effacer un like sur le message par id
exports.delLike = (req, res) => {

};

// effacer un dislike sur le message par id
exports.delDislike = (req, res) => {

};