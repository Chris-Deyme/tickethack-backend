
const tripSchema = mongoose.Schema({
    departure: String,
    arrival: String,
    date: Date,
    price: Number,
   });
   
   const Trip = mongoose.model('trips', tripSchemaSchema);

   module.exports = Trip