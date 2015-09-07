'use strict'

// the main controller
var $           = require('jquery');
var Ohio        = require('./lib/Ohio');
var url         = require('./lib/url');
var SearchInput = require('./lib/SearchInput');
var ResultsGrid = require('./lib/ResultsGrid');
var Button      = require('./lib/Button');
var CurrentLoc  = require('./lib/CurrentLocation');
var bing        = require('./lib/bing');

// -------------------------------------------------- //
// -------------------------------------------------- //

// centralized state
var state = new Ohio({
  searchQuery: {
    // Query: 'search something',
    // Latitude: 74.123143,
    // Longitude: 45.3413
  }
});

// store useful cursors
state.curse('searchQuery');

// keep the URL up-to-date
state.cursors.searchQuery.on('update', function () {
  url.updateQueryParams(state.cursors.searchQuery.get());
});

// -------------------------------------------------- //

// create basic state helpers
// search term updates
function updateQueryState() {
  state.cursors.searchQuery.set('Query', mySearchInput.get());
  state.commit();
}

// current location
function updateLocationState() {
  state.cursors.searchQuery.merge({
    Latitude: myCurrentLoc.lat,
    Longitude: myCurrentLoc.lng
  });
  state.commit();
}

// actually run the search
function fetchSearchResults(done) {
  bing.search(state.cursors.searchQuery.get(), done);
}

// -------------------------------------------------- //
// -------------------------------------------------- //

// ui components

// -------------------------------------------------- //

// 1. Inputs
// keyword search
var mySearchInput = new SearchInput('.search-control');
$(global.document).on('keypress', function (evt) {
  if (evt.which === 13) { // ENTER
    updateQueryState();
  }
});

// main search button
var mySearchButton = new Button('.search-button', 'Search!').click(updateQueryState);

// use my current location
var myCurrentLoc = new CurrentLoc('.use-my-current-location').click(updateLocationState);

// -------------------------------------------------- //

// 2. Outputs
// result grid / data fetcher
var myResultsGrid = new ResultsGrid('.search-results', fetchSearchResults);
state.cursors.searchQuery.on('update', function () {
  myResultsGrid.render();
});

// -------------------------------------------------- //
// -------------------------------------------------- //

// main
$(function () {

  // init state comes from the url
  state.cursors.searchQuery.merge(url.getQueryParams());
  state.commit();

  // render view
  // 1. 
  mySearchInput.set(state.cursors.searchQuery.get('Query'));
  mySearchInput.render();
  myCurrentLoc.render();
  mySearchButton.render();

  // 2.
  myResultsGrid.render();  
});