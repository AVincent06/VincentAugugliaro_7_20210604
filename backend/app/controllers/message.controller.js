const db = require("../models");
const Message = db.messages;
const Op = db.Sequelize.Op;

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
    // CONTINUER ICI
};

// récupérer les messages jusqu'à date
exports.findAllByDate = (req, res) => {

};

// récupérer tous les message par userId
exports.findAllByUser = (req, res) => {

};

// récupérer un message par id
exports.findOne = (req, res) => {

};

// mettre à jour un message par id
exports.update = (req, res) => {

};

// effacer un message par id
exports.delete = (req, res) => {

};