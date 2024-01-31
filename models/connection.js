
const mongoose = require('mongoose');

const connectionString = 'mongodb+srv://chrisdeyme:Chris@cluster0.lqac3xt.mongodb.net/tickethack';

mongoose.connect(connectionString, { connectTimeoutMS: 2000 })
 .then(() => console.log('Database connected'))
 .catch (error => console.error(error));