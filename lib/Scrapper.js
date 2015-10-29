var http = require('http');
var cheerio = require('cheerio');
var util = require('util');
var EventEmitter = require('events').EventEmitter;
var STATUS_CODES = http.STATUS_CODES;
/*
 * Scraper Constructor
**/
function Scraper (url) {
    this.url = url;
    this.init();
}
/*
 * Make it an EventEmitter
**/
util.inherits(Scraper, EventEmitter);

/*
 * Initialize scraping
**/
Scraper.prototype.init = function () {
    var model;
    var self = this;
    self.on('loaded', function (html) {
        model = self.parsePage(html);
        self.emit('complete', model);
    });
    self.loadWebPage();
};

Scraper.prototype.loadWebPage = function () {
  var self = this;
  console.log('\n\nLoading ' + "website");
  http.get(self.url, function (res) {
    var body = '';
    if(res.statusCode !== 200) {
      return self.emit('error', STATUS_CODES[res.statusCode]);
    }
    res.on('data', function (chunk) {
      body += chunk;
    });
    res.on('end', function () {
      self.emit('loaded', body);
    });
  })
  .on('error', function (err) {
    self.emit('error', err);
  });      
};
/*
 * Parse html and return an object
**/
Scraper.prototype.parsePage = function (html) {
  var $ = cheerio.load(html);

var list_model = [];
  var list_sidebar = $(".list_tentant").length;
  for (var i = 0; i < list_sidebar; i++) {
    var list = $(".list_tentant").eq(i);
    var list_legth = list.find("ul > li").length;
    for (var j = 0; j < list_legth; j++) {

      //to get name
      var tenant = list.find("ul > li").eq(j);
      var name = tenant.text();

      //get relation
      var t_relation = tenant.find("a");
      var rel = t_relation.attr("rel");

      //get location and pict
      var detail = $(rel).find(".left");
      var image = detail.find("img").attr("src");
      var location = detail.find("p").text();
      var category = $("head > title").eq(0).text();
      if (name.trim() != ''){
        var model = {
            category: category.trim(),
            name: name.trim(),
            location: location.trim(),
            image: image
          };
        list_model.push(model);
      }
    };
  };

 //  var _list_li = $(".directory-list-item.has-display-ad").length;
 //  list_model = [];
 //  for (var i = 0; i < _list_li; i++) {
 //  	var _company = $(".directory-list-item.has-display-ad > .row").eq(i);
 //  	var name = _company.find(" .span3 > .name > a").text();
 //  	var address = _company.find(" .span3 > .address-group > .address-1").text();
	// var cell = _company.find(".span2 > .phone > a").text();
	// var model = {
	//     name: name.trim().split('\n'),
	//     address: address.trim(),
	//     cell: cell.trim().split('\n')
 //  	};
 //  	list_model.push(model);
 //  };
  return list_model;
};
module.exports = Scraper;