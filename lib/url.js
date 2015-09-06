'use strict';

var history = require('html5-history-api');
var url     = require('url');
var $       = require('jquery');

function URL(location) {
  this.location = location;
}

URL.prototype.updateQueryParams = function (queryObj) {
  history.pushState(null, null, '?' + $.param(queryObj));
};

URL.prototype.getQueryParams = function () {
  return url.parse(this.location.search, true).query;
};

module.exports = new URL(global.location);