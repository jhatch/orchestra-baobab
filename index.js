'use strict'

// the main controller
var Baobab      = require('baobab');
var $           = require('jquery');
var url         = require('./lib/url');
var SearchInput = require('./lib/SearchInput');
var ResultsGrid = require('./lib/ResultsGrid');
var Button      = require('./lib/Button');
var bing        = require('./lib/bing');

// -------------------------------------------------- //
// -------------------------------------------------- //

// centralized state
var state = new Baobab({
  searchQuery: {
    term: ''
  }
});

// store a cursor to our the search query
var query = state.select('searchQuery');

// keep the URL up-to-date
query.on('update', function () {
  url.updateQueryParams(query.get());
});

// -------------------------------------------------- //
// -------------------------------------------------- //

// ui components

// 1. Inputs
var mySearchInput  = new SearchInput('.search-control');

// 2. Outputs
var myResultsGrid  = new ResultsGrid('.search-results', function fetchResults(done) {
  bing.search(query.select('term').get(), done);
});

// 3. Triggers
function runSearch() {
  query.set('term', mySearchInput.get());
  state.commit();
  myResultsGrid.render();
}

var mySearchButton = new Button('.search-button', 'Search!', runSearch);

$(global.document).on('keypress', function (evt) {
  if (evt.which === 13) {
    runSearch();
  }
});

// -------------------------------------------------- //
// -------------------------------------------------- //

// main
$(function () {

  // init state
  query.merge(url.getQueryParams());
  state.commit();

  // render view
  // 1. 
  mySearchInput.set(query.get('term'));
  mySearchInput.render();

  // 2.
  myResultsGrid.render();
 
  // 3.
  mySearchButton.render();
});