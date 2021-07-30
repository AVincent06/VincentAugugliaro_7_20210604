require('dotenv').config();

const express = require("express");
const bodyParser = require('body-parser');
const helmet = require('helmet');   //A7:2017 OWASP
const path = require('path');
const app = express();

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());    // extracts the JSON object from the request
app.use('/app/images', express.static(path.join(__dirname, '/app/images')));

/* Connexion à la base de données */
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

/* Cross Origin Resource Sharing (CORS) */
app.use((req, res, next) => {   //applies to all roads
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');  //origin of access
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');    //authorized headers
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');    //authorized methods
    next();
});

/* Déclaration des routes */
require("./app/routes/user.routes")(app);
require("./app/routes/message.routes")(app);
require("./app/routes/comment.routes")(app);
require("./app/routes/feeling.routes")(app);

const normalizePort = (val) => {    // returns a valid port
    const port = parseInt(val, 10);
    if(isNaN(port)) return val;
    if(port >= 0) return port;
    return false;
};
const PORT = normalizePort(process.env.PORT || process.env.APP_PORT);
app.listen(PORT, () => {
    console.log(`Le serveur tourne sur le port ${PORT}`);
});