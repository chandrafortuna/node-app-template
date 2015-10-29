var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/nodetest2');
mongoose.connection.on('error', function() {
  console.error('MongoDB Connection Error. Make sure MongoDB is running.');
});
var ListingsSchema = new mongoose.Schema({
  name: String,
  // email: {type: String, lowercase: true},
  location: String,
  // telephone: Array,
  // fax: Array,
  // website: {type: String, default: '', lowercase: true},
  // postalAddress: Array,
  image: String,
  category: String
});
module.exports = mongoose.model('Listings', ListingsSchema);