'use strict'

// the main controller
var $           = require('jquery');
var Ohio        = require('./lib/Ohio');
var url         = require('./lib/url');
var SearchInput = require('./lib/SearchInput');
var ResultsGrid = require('./lib/ResultsGrid');
var Button      = require('./lib/Button');
var Toggle      = require('./lib/Toggle');
var CurrentLoc  = require('./lib/CurrentLocation');
var bing        = require('./lib/bing');

// -------------------------------------------------- //
// -------------------------------------------------- //

// centralized state
var state = new Ohio({
  searchQuery: {
    // Query: 'search something',
    // Latitude: 74.123143,
    // Longitude: 45.3413,
    // Adult: Moderate | Off | Strict
  }
});

// store useful cursors
state.curse('searchQuery');

// keep the URL up-to-date
state.cursors.searchQuery.on('update', function () {
  url.updateQueryParams(state.cursors.searchQuery.get());
  ui.resultsGrid.render();
});

// -------------------------------------------------- //

// create basic state helpers
// search term updates
state.define('updateSearchTermState', function () {
  this.cursors.searchQuery.set('Query', ui.searchTerm.get());
  this.commit();
});

// current location
state.define('updateLocationState', function () {
  var loc = ui.useMyLocation.get();
  this.cursors.searchQuery.merge({
    Latitude:  loc.lat,
    Longitude: loc.lng
  });
  this.commit();
});

// safe search
state.define('updateSafeSearchState', function (value) {
  this.cursors.searchQuery.set('Adult', value);
  this.commit();
});

// -------------------------------------------------- //
// -------------------------------------------------- //

// ui components
var ui = {};

// -------------------------------------------------- //

// 1. Inputs
// keyword search
ui.searchTerm = new SearchInput('.search-control');
$(global.document).on('keypress', function (evt) {
  if (evt.which === 13) { // ENTER
    state.modifiers.updateSearchTermState();
  }
});

// main search button
ui.searchButton = new Button('.search-button', 'Search!');
ui.searchButton .click(state.modifiers.updateSearchTermState);

// use my current location
ui.useMyLocation = new CurrentLoc('.near-me', global.navigator.geolocation);
ui.useMyLocation.click(state.modifiers.updateLocationState);

// toggle safe search
ui.safeSearchToggle = new Toggle('.toggle-safe-search', 'SafeSearch', 'Moderate', 'Off');
ui.safeSearchToggle.click(state.modifiers.updateSafeSearchState);

// -------------------------------------------------- //

// 2. Outputs
// search results grid
ui.resultsGrid = new ResultsGrid('.search-results', function (done) {
  bing.search(state.cursors.searchQuery.get(), done);
});

// -------------------------------------------------- //
// -------------------------------------------------- //

// main
$(function () {

  // init state comes from the url
  state.cursors.searchQuery.merge(url.getQueryParams());
  state.commit();

  // render view
  ui.searchTerm.set(state.cursors.searchQuery.get('Query'));
  ui.searchTerm.render();

  ui.safeSearchToggle.set(state.cursors.searchQuery.get('Adult'));
  ui.safeSearchToggle.render();

  ui.useMyLocation.render();
  ui.searchButton.render();
});