'use strict'

// the main controller
var Baobab      = require('baobab');
var SearchInput = require('./lib/SearchInput');
var ResultsGrid = require('./lib/ResultsGrid');
var Button      = require('./lib/Button');
var bing        = require('./lib/bing');

var state = new Baobab({
  searchQuery: {
    term: ''
  }
});

var query = state.select('searchQuery');

var mySearchInput  = new SearchInput('.search-control');

var myResultsGrid  = new ResultsGrid('.search-results', function fetchResults(done) {
  bing.search(query.select('term').get(), done);
});

var mySearchButton = new Button('.search-button', 'Search!', function () {
  query.set('term', mySearchInput.get());
  myResultsGrid.render();
});

mySearchInput.render();
mySearchButton.render();

