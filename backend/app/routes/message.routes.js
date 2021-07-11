module.exports = app => {
    const messages = require("../controllers/message.controller");
    const router = require("express").Router();

    // créer un nouveau message
    router.post("/", messages.create);

    // récupérer les nb derniers messages
    router.get("/amount/:nb", messages.findAllByAmount);

    // récupérer les messages jusqu'à date
    router.get("/date/:date", messages.findAllByDate);

    // récupérer tous les message par userId
    router.get("/user/:userId", messages.findAllByUser);

    // récupérer un message par id
    router.get("/:id", messages.findOne);

    // mettre à jour un message par id
    router.put("/:id", messages.update);

    // effacer un message par id
    router.delete("/:id", messages.delete);

    app.use("/api/messages", router);
};