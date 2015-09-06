'use strict'

// the main controller
var Baobab      = require('baobab');
var $           = require('jquery');
var url         = require('./lib/url');
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

// keep the URL up-to-date
query.on('update', function () {
  url.updateQueryParams(query.get());
});

var mySearchInput  = new SearchInput('.search-control');

var myResultsGrid  = new ResultsGrid('.search-results', function fetchResults(done) {
  bing.search(query.select('term').get(), done);
});

var mySearchButton = new Button('.search-button', 'Search!', function () {
  query.set('term', mySearchInput.get());
  state.commit();
  myResultsGrid.render();
});

// MAIN
$(function () {

  // init state
  query.merge(url.getQueryParams());
  state.commit();

  // render view
  // 1.
  mySearchInput.set(query.get('term'));
  mySearchInput.render();

  // 2.
  mySearchButton.render();
 
  // 3.
  myResultsGrid.render();
});