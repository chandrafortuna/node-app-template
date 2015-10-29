var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/tenantlist', function(req, res) {
  var db = req.db;
  var collection = db.get('listings');
  collection.find({}, {}, function(e,docs){
  	res.json(docs);
  });
});

router.get('/', function(req, res) {
  res.render('tenant', { title: 'Tenant' });
});

router.get('/api/get_tenant', function(req, res) {
  var db = req.db;
  var collection = db.get('listings');
  collection.find({}, {}, function(e,docs){
  	res.send(docs);
  });
});

module.exports = router;