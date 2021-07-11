module.exports = app => {
    const feelings = require("../controllers/feeling.controller");
    const router = require("express").Router();

    // ajouter un like sur le message par id
    router.post("/like/:id", feelings.addLike);

    // ajouter un dislike sur le message par id
    router.post("/dislike/:id", feelings.addDislike);

    // récupérer tous les like pour le message par id
    router.get("/like/:id", feelings.findAllLike);

    // récupérer tous les dislike pour le message par id
    router.get("/dislike/:id", feelings.findAllDislike);

    // effacer un like sur le message par id
    router.delete("/like/:id", feelings.delLike);

    // effacer un dislike sur le message par id
    router.delete("/dislike/:id", feelings.delDislike);

    app.use("/api/feelings", router);
};