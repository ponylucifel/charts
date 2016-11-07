var express = require('express');
var router = express.Router();
var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
var xmlhttp = new XMLHttpRequest();
var data;

function getData(url) {
    var result;
    xmlhttp.open("GET", url, true);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.onloadend = function() {
        result = JSON.parse(this.responseText);
        data = result.dataset.data;
        //console.log(data);
        xmlhttp.abort();
    }
    xmlhttp.send();
    //return result.dataset.data;
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/chartjs', function (req, res, next) {
  var key = 'H6BTgHsYhWyF8yLjYAA-';
  //var url = 'http://www.quandl.com/api/v3/datasets/ZILL/Z92841_SF.json?api_key='+key;
  var url = 'https://www.quandl.com/api/v3/datasets/WIKI/FB.json?column_index=4&start_date=2014-01-01&end_date=2014-12-31&collapse=monthly&transform=diff&api_key=H6BTgHsYhWyF8yLjYAA-';
  //handle quandl data here
  console.log(url);
  //var data = getData(url);
  getData(url);
  console.log(data);
  res.render('chart', {title: 'chartjs', data: data});
});

router.get('/nvd3js', function (req, res, next) {
  //handle quandl data here
  res.render('nvd3', {title: 'nvd3js'});
});

router.get('/dcjs', function (req, res, next) {
  //handle quandl data here
  res.render('dc', {title: 'dcjs'});
});
module.exports = router;
