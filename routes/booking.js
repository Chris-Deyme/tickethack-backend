var express = require('express');
var router = express.Router();

const moment = require('moment');
const Trip = require('../models/trips'); // Importer le modèle de trajet

// Route GET pour afficher les trajets payés
router.get('/booking', (req, res) => {
    Trip.find({ isPaid: true }).then(paidTrips => {
        res.json({ result: true, paidTrips: paidTrips });
    }).catch(error => {
        res.status(500).json({ result: false, error: 'Une erreur s\'est produite lors de la récupération des trajets payés' });
    });
});

module.exports = router;
