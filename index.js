'use strict'

// the main controller
var SearchInput  = require('./lib/SearchInput');
var ResultsGrid  = require('./lib/ResultsGrid');

var mySearchInput = new SearchInput('.search-control');
var myResultsGrid = new ResultsGrid('.search-results');

mySearchInput.render();
myResultsGrid.render();

