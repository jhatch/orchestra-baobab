'use strict'

// the main controller
var Baobab      = require('baobab');
var history     = require('html5-history-api');
var url         = require('url');
var $           = require('jquery');
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
  history.pushState(null, null, '?' + $.param(query.get()));
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

$(function () {
  var search = url.parse(history.location.search, true).query;
  query.merge(search);
  state.commit();
  mySearchInput.set(query.get('term'));
  mySearchInput.render();
  mySearchButton.render();
  myResultsGrid.render();
});

