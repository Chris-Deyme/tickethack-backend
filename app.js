
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors"); // Installation de Cors

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var tripRouter = require('./routes/trip'); // Importation de la route des voyages
var cartRouter = require('./routes/cart'); // Importation de la route du panier
var bookingRouter = require('./routes/booking'); // Importation de la route des réservations


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
app.use('/trip', tripRouter); // Utilisation de la route des voyages
app.use('/cart', cartRouter); // Utilisation de la route du panier
app.use('/booking', bookingRouter); // Utilisation de la route des réservations


module.exports = app;
