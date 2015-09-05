'use strict'

// the main controller
var SearchInput  = require('./lib/SearchInput');
var ResultsGrid  = require('./lib/ResultsGrid');
var bing         = require('./lib/bing');

var mySearchInput  = new SearchInput('.search-control');

var mySearchButton = new Button('.search-button', 'Search!', function () {
  // take current state, and pass to results grid to refresh
  
});

var myResultsGrid  = new ResultsGrid('.search-results', function (done) {
  bing.search('test', done);
});


mySearchInput.render();
myResultsGrid.render();

