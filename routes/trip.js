var express = require('express');
var router = express.Router();

const moment = require('moment');
const Trip = require('../models/trips'); // Importer le modèle de trajet
const Cart = require('../models/carts'); // Importer le modèle de panier

router.get('/', (req, res) => {
    // Recherche de tous les documents dans la collection de trajets
    Trip.find().then(data => {
        // Envoi d'une réponse JSON contenant les trajets trouvés
        res.json({ result: true , allTrips: data });
    });
});

// Route POST pour rechercher des trajets disponibles pour aujourd'hui
router.post("/", (req, res) =>{
    const today = moment(req.body.date) // Obtenir la date actuelle
console.log(today.toDate())

console.log(moment(today).endOf('day').toDate())


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

router.post("/store", (req, res) => {
    const newCart = new Cart({
        isPaid:false,
        trip:req.body.id
    });
    // Sauvegarder le nouveau panier dans la base de données
    newCart.save()
        .then(savedCart => {
            res.json({ result: true, message: "Panier enregistré avec succès", cart: savedCart });
        })
        .catch(error => {
            res.status(500).json({ result: false, error: "Une erreur s'est produite lors de l'enregistrement du panier." });
        });
});


router.get("/getcarts", (req, res) => {
    cart.find({isPaid:false}).then(trips=> {
        res.json({trips})
    });
})

module.exports = router;




