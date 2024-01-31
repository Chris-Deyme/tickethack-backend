const mongoose = require('mongoose')
const cartSchema = mongoose.Schema({
    isPaid: Boolean,
    trip: { type: mongoose.Schema.Types.ObjectId, ref: 'trips' },
   });
   
   const Cart = mongoose.model('carts', cartSchema);

   module.exports = Cart
