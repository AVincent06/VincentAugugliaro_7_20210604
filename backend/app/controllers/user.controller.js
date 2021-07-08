const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;

// créer un nouvel utilisateur
exports.create = (req, res) => {
    // Validation de la requète
    if(!req.body.email || !req.body.password) {
        res.status(400).send({ 
            message: "Les champs email et password doivent être renseignés!" 
        });
        return;
    }

    // Création d'un utilisateur
    const user = {
        email: req.body.email,
        password: req.body.password,
        is_admin: req.body.is_admin ? req.body.is_admin : false
    }

    // Sauvegarde de l'utilisateur dans la BDD
    User.create(user)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "erreur pendant la création de l'utilisateur!"
            });
        });
};

// récupérer tous les utilisateurs
exports.findAll = (req, res) => {

};

// récupérer un utilisateur par id
exports.findOne = (req, res) => {

};

// mettre à jour un utilisateur par id
exports.update = (req, res) => {

};

// effacer un utilisateur par id
exports.delete = (req, res) => {

};