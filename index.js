'use strict'

// the main controller
var $           = require('jquery');
var ui          = require('./lib/ui-component-mgr');
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

// when internal state changes, update the url and the grid
state.cursors.searchQuery.on('update', function () {
  url.updateQueryParams(state.cursors.searchQuery.get());
  ui.components.resultsGrid.render();
});

// -------------------------------------------------- //

// create basic state helpers
// search term updates
state.define('updateSearchTermState', function () {
  this.cursors.searchQuery.set('Query', ui.components.searchTerm.get());
  this.commit();
});

// current location
state.define('updateLocationState', function () {
  var loc = ui.components.useMyLocation.get();
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

// -------------------------------------------------- //

// 1. Inputs
// keyword search
ui.add('searchTerm', new SearchInput('.search-control'));
$(global.document).on('keypress', function (evt) {
  if (evt.which === 13) { // ENTER
    state.modifiers.updateSearchTermState();
  }
});

// main search button
ui.add('searchButton', new Button('.search-button', 'Search!'));
ui.components.searchButton.click(state.modifiers.updateSearchTermState);

// use my current location
ui.add('useMyLocation', new CurrentLoc('.near-me', global.navigator.geolocation));
ui.components.useMyLocation.click(state.modifiers.updateLocationState);

// toggle safe search
ui.add('safeSearchToggle', new Toggle('.toggle-safe-search', 'SafeSearch', 'Moderate', 'Off'));
ui.components.safeSearchToggle.click(state.modifiers.updateSafeSearchState);

// -------------------------------------------------- //

// 2. Outputs
// search results grid
ui.add('resultsGrid', new ResultsGrid('.search-results', function (done) {
  bing.search(state.cursors.searchQuery.get(), done);
}));

// -------------------------------------------------- //
// -------------------------------------------------- //

// main
$(function () {

  // init state comes from the url
  state.cursors.searchQuery.merge(url.getQueryParams());
  state.commit();

  // render view
  ui.components.searchTerm.set(state.cursors.searchQuery.get('Query'));
  ui.components.safeSearchToggle.set(state.cursors.searchQuery.get('Adult'));

  ui.each(function (component) {
    component.render();
  });
});