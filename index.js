'use strict'

// the main controller
var Baobab      = require('baobab');
var $           = require('jquery');
var url         = require('./lib/url');
var SearchInput = require('./lib/SearchInput');
var ResultsGrid = require('./lib/ResultsGrid');
var Button      = require('./lib/Button');
var CurrentLoc  = require('./lib/CurrentLocation');
var bing        = require('./lib/bing');

// -------------------------------------------------- //
// -------------------------------------------------- //

// centralized state
var state = new Baobab({
  searchQuery: {
    Query: ''
  }
});

// store a cursor to our the search query
var searchParams = state.select('searchQuery');

// keep the URL up-to-date
searchParams.on('update', function () {
  url.updateQueryParams(searchParams.get());
});

// -------------------------------------------------- //
// -------------------------------------------------- //

// ui components

// 1. Inputs
// - Keyword Search
var mySearchInput  = new SearchInput('.search-control');

$(global.document).on('keypress', function (evt) {
  if (evt.which === 13) {
    searchParams.set('Query', mySearchInput.get());
    state.commit();
  }
});

// - search button
var mySearchButton = new Button('.search-button', 'Search!', function onclick() {
  searchParams.set('Query', mySearchInput.get());
  state.commit();
});

// - Use my current location
var myCurrentLoc   = new CurrentLoc('.use-my-current-location', function onclick(lat, lng) {
  searchParams.merge({
    Latitude: lat,
    Longitude: lng
  });
  state.commit();
});

// 2. Outputs
var myResultsGrid  = new ResultsGrid('.search-results', function fetchResults(done) {
  bing.search(searchParams.get(), done);
});

searchParams.on('update', function () {
  myResultsGrid.render();
});

// -------------------------------------------------- //
// -------------------------------------------------- //

// main
$(function () {

  // init state
  searchParams.merge(url.getQueryParams());
  state.commit();

  // render view
  // 1. 
  mySearchInput.set(searchParams.get('Query'));
  mySearchInput.render();
  myCurrentLoc.render();
  mySearchButton.render();

  // 2.
  myResultsGrid.render();  
});