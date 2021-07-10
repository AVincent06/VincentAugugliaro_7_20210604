const express = require("express");
const cors = require("cors");

const app = express();

const corsOptions = {
    origin: "http://localhost:8080"
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
db.sequelize.sync({ force: true }).then(() => { // {force: true} juste pour le développement
    console.log("BDD supprimée et synchronisée avec Sequelize");

    /* initialisation de la table Categories */
    db.categories.bulkCreate([
        { 'name': 'like' },     // id = 1
        { 'name': 'dislike' }   // id = 2
    ]).then(() => {
        console.log("Table Categories initialisée!");
    });
});

require("./app/routes/user.routes")(app);
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Le serveur tourne sur le port ${PORT}`);
});