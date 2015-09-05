'use strict';

var $    = require('jquery');
var _    = require('lodash');
var bing = require('./bing');

// constructor
function ResultsGrid(el, fetch) {
  this.$el = $(el);
  this.fetch = fetch;
  return this;
}

// static fields
ResultsGrid.templateSettings = {};
ResultsGrid.template         = '<ul><% _.each( results, function (result) { %> <li><%- result.Title %></li><% }); %></ul>';
ResultsGrid.view             = _.template(ResultsGrid.template, ResultsGrid.templateSettings);

// core methods
ResultsGrid.prototype.render = function () {
  this.fetch(_.bind(this._render, this));
  return this;
};

ResultsGrid.prototype._render = function (results) {
  this.$el.html(ResultsGrid.view({
    results: results
  }));
};

ResultsGrid.prototype.fetch = function () {
  throw new Error('Fetch must be defined by the consumer!');
};

module.exports = ResultsGrid;
