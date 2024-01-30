var express = require('express');
var router = express.Router();

const moment = require('moment'); // Importation de Moment.js

const NB_TRIPS = 2000;
const CITIES = ['Paris', 'Lyon', 'Marseille', 'Bruxelles'];
const MIN_PRICE = 25;
const MAX_PRICE = 150;

function randomElement(array, nb) {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, nb);
}

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// Endpoint pour générer les voyages
router.get('/generate', (req, res) => {
  const trips = [];
  for (let i = 0; i < NB_TRIPS; i++) {
    const [departure, arrival] = randomElement(CITIES, 2);
    const date = moment().add(Math.floor(Math.random() * 30), 'days'); // Date aléatoire dans les 30 prochains jours
    trips.push({ departure, arrival, date: date.format('YYYY-MM-DD HH:mm'), price: randomNumber(MIN_PRICE, MAX_PRICE) });
  }
  res.json(trips);
});

module.exports = router;

