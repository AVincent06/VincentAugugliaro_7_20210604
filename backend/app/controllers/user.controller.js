require('dotenv').config();

const passwordValidator = require('password-validator');//A2:2017 OWASP
const bcrypt = require('bcrypt');                       //A2:2017 OWASP
const emailValidator = require("email-validator");
const jwt = require('jsonwebtoken');

const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;

// créer un nouvel utilisateur
exports.create = (req, res) => {
    // Création d'un schéma pour le mot de passe
    const schema = new passwordValidator();
    schema
        .is().min(12)
        .is().max(64)
        .has().uppercase()
        .has().lowercase()
        .has().digits()
        .has().not().spaces();
    const emailValidated = emailValidator.validate(req.body.email);
    const passwordValidated = schema.validate(req.body.password);
    
    let feedback1 = '';
    let feedback2 = '';
    if(!emailValidated) feedback1 = 'Format email non valide. ';
    if(!passwordValidated) feedback2 = 'Pour valider le password il faut entre 12 et 64 caractères sans espace et au moins une majuscule, une minuscule et un chiffre';

    if(emailValidated && passwordValidated) { 
        bcrypt.hash(req.body.password, 10)
            .then((hash) => {
                // Création d'un utilisateur
                const user = {
                    email: req.body.email,
                    password: hash,
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
            })
            .catch((error) => res.status(500).json({ error }));
    }else{
        res.status(500).json({ error : feedback1+feedback2 });
    }
};

// identifier un utilisateur existant
exports.identify = (req, res) => {
    User.findOne({
        where: {email : req.body.email}
    })
        .then((data) => {
            bcrypt.compare(req.body.password, data.password)
                .then((valid) => {
                    if(!valid) return res.status(401).json({ error : 'mot de passe incorrect !'});
                    res.status(200).json({
                        userId : data.id,
                        token : jwt.sign(
                            { userId : data.id },
                            process.env.TOKEN_KEY,
                            { expiresIn : process.env.TOKEN_DURATION }
                        )
                    });
                })
                .catch((error) => res.status(500).json({ error: 'erreur de vérification du mot de passe' }));
        })
        .catch((error) => res.status(401).json({ error : 'utilisateur non trouvé !'}));   
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