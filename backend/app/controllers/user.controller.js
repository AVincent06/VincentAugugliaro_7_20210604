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
    User.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "erreur pendant la récupération des utilisateurs!"
            });
        });
};

// récupérer un utilisateur par id
exports.findOne = (req, res) => {
    const id = req.params.id;

    User.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: `erreur pendant la récupération de l'utilisateur n° ${id}`
            });
        });
};

// mettre à jour un utilisateur par id
exports.update = (req, res) => {
    const id = req.params.id;

    User.update(req.body, {
        where: {id: id}
    })
        .then( isUpdated => {
            if(isUpdated) {
                res.send({
                    message: `L'utilisateur n°${id} a été mise à jour!`
                });
            } else {
                res.send({
                    message: `L'utilisateur n°${id} n'a pas pu être mise à jour!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `erreur pendant la mise à jour de l'utilisateur n° ${id}`
            });
        });
};

// effacer un utilisateur par id
exports.delete = (req, res) => {
    const id = req.params.id;

    User.destroy({
        where: {id: id }
    })
        .then( isDeleted => {
            if(isDeleted) {
                res.send({
                    message: `L'utilisateur n°${id} a été effacé!`
                });
            } else {
                res.send({
                    message: `L'utilisateur n°${id} n'a pas pu être effacé!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `erreur pendant la suppression de l'utilisateur n° ${id}`
            });
        });
};