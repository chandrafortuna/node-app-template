var mongoose = require('mongoose');
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost:27017/nodetest2');
// mongoose.connect('mongodb://heroku_qqwtrzpp:o0rlgp6ltkoh2rj0u1oh6aul8o@ds045734.mongolab.com:45734/heroku_qqwtrzpp');
mongoose.connection.on('error', function() {
  console.error('MongoDB Connection Error. Make sure MongoDB is running.');
});
// var mongo = require('mongodb');
// var Mongolian = require('mongolian');
// var server, db;

// if(process.env.MONGOHQ_URL) {
//   db = new Mongolian(process.env.MONGOHQ_URL);
// } else {
//   server = new Mongolian;
//   db = server.db('localhost:27017/nodetest2');
// }
var express = require('express');
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