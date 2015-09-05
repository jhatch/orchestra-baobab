'use strict'

// the main controller
var SearchInput  = require('./lib/SearchInput');
var ResultsGrid  = require('./lib/ResultsGrid');
var Button       = require('./lib/Button');
var bing         = require('./lib/bing');

var mySearchInput  = new SearchInput('.search-control');

var myResultsGrid  = new ResultsGrid('.search-results', function (done) {
  bing.search('test', done);
});

var mySearchButton = new Button('.search-button', 'Search!', function () {
  alert('a');
  myResultsGrid.render();
});

mySearchInput.render();
mySearchButton.render();

