var express = require('express');
var router = express.Router();

const moment = require('moment');
const Trip = require('../models/trips'); // Importer le modèle de trajet

// Route GET pour afficher tous les trajets ou rechercher des trajets par critères spécifiques
router.get('/', (req, res) => {
    const { departure, arrival, date } = req.query; // Récupérer les paramètres de requête

    // Vérifier si des paramètres de recherche sont fournis
    if (departure && arrival && date) {
        // Formater la date avec Moment.js
        const formattedDate = moment(date, 'YYYY-MM-DD').toDate();

        // Rechercher les trajets correspondant aux critères de recherche
        Trip.find({ departure, arrival, 'date.$date': formattedDate }).then(foundTrips => {
            res.json({ result: true, trips: foundTrips }); // Renvoyer les trajets trouvés en réponse JSON
        }).catch(error => {
            res.status(500).json({ result: false, error: 'Une erreur s\'est produite lors de la recherche des trajets.' });
        });
    } else {
        // Si aucun paramètre de recherche n'est fourni, renvoyer tous les trajets
        Trip.find().then(allTrips => {
            res.json({ result: true, allTrips }); // Renvoyer tous les trajets en réponse JSON
        }).catch(error => {
            res.status(500).json({ result: false, error: 'Une erreur s\'est produite lors de la récupération de tous les trajets.' });
        });
    }
});

// Route POST pour rechercher des trajets disponibles pour aujourd'hui
router.post("/", (req, res) =>{
    const today = moment() // Obtenir la date actuelle
    Trip.find({
        departure: req.body.departure, // Départ spécifié dans le corps de la requête POST
        arrival: req.body.arrival, // Arrivée spécifiée dans le corps de la requête POST
        date: {
            $gte: today.toDate(), // Date de départ doit être supérieure ou égale à la date actuelle
            $lte: moment(today).endOf('day').toDate() // Date de départ doit être inférieure ou égale à la fin de la journée actuelle
        }
    }).then((data) => {
        console.log(data);
        if (data.length === 0) {
            res.json({ result :false, error: "Aucun trajet disponible pour aujourd'hui." });
        } else {
            res.json({ result: true, allTrips: data }); // Renvoyer les trajets trouvés en réponse JSON
        }
    }).catch(error => {
        res.status(500).json({ result: false, error: 'Une erreur s\'est produite lors de la recherche des trajets.' });
    });
});

module.exports = router;




