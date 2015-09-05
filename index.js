'use strict'

// the main controller
var StateManager = require('./lib/StateManager');
var SearchInput  = require('./lib/SearchInput');
var ResultsGrid  = require('./lib/ResultsGrid');

var mySearchInput = new SearchInput('.search-control');
var myResultsGrid = new ResultsGrid('.search-results');

 