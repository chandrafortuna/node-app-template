var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
	require('../lib/bot.js')
  res.send(1);
});

module.exports = router;