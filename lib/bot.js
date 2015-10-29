var Model = require('../model/company');
var Scraper = require('./scrapper');
var Pages = [];
function generateUrls(limit) {
  var url = 'http://kotakasablanka.co.id/tenant.php?id=';
  var urls = [];
  var i;
  for (i=1; i < limit; i++) {
    urls.push(url + i);
  }
  return urls;
}
// store all urls in a global variable  
Pages = generateUrls(15);
console.log('Done!!!!');
wizard();
function wizard() {
  // if the Pages array is empty, we are Done!!
  if (!Pages.length) {
    return console.log('Done!!!!');
  }
  var url = Pages.pop();
  var scraper = new Scraper(url);
  var model;
  console.log('Requests Left: ' + Pages.length);
  // if the error occurs we still want to create our
  // next request
  scraper.on('error', function (error) {
    console.log(error);
    wizard();
  });
  // if the request completed successfully
  // we want to store the results in our database
  scraper.on('complete', function (listing) {
    for (var i = 0; i < listing.length; i++) {
      model = new Model(listing[i]);
      model.save(function(err) {
      if (err) {
        console.log('Database err saving: ' + url);
      }
      });
    };
    wizard();
  });
}