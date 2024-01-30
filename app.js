
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors"); // Installation de Cors

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var tripRouter = require('./routes/trip'); // Importation de la route des voyages


var app = express();
require("dotenv").config(); // Lien .env (LIGNE 1 !!!)
require("./models/connection"); // Fichier de connexion à la BDD Mongoose très important !
app.use(cors()); // Installation de Cors
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/trips', tripRouter); // Utilisation de la route des voyages

module.exports = app;
