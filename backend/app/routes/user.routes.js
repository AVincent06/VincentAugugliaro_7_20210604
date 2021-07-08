module.exports = app => {
    const users = require("../controllers/user.controller");
    const router = require("express").Router();

// créer un nouvel utilisateur
router.post("/", users.create);

// récupérer tous les utilisateurs
router.get("/", users.findAll);

// récupérer un utilisateur par id
router.get("/:id", users.findOne);

// mettre à jour un utilisateur par id
router.put("/:id", users.update);

// effacer un utilisateur par id
router.delete("/:id", users.delete);

app.use("/api/users", router);
};