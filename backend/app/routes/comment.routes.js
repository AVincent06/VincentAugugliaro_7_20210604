module.exports = app => {
    const comments = require("../controllers/comment.controller");
    const router = require("express").Router();

    // créer un nouveau commentaire
    router.post("/", comments.create);

    // récupérer tous les commentaires du message par messageId
    router.get("/message/:messageId", comments.findAllByMessage);

    // récupérer un commentaire par id
    router.get("/:id", comments.findOne);

    // mettre à jour un commentaire par id
    router.put("/:id", comments.update);

    // effacer un commentaire par id
    router.delete("/:id", comments.delete);

    app.use("/api/comments", router);
};