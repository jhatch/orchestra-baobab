'use strict';

var $    = require('jquery');
var _    = require('lodash');
var bing = require('./bing');

// constructor
function ResultsGrid(el) {
  this.$el = $(el);
  return this;
}

// static fields
ResultsGrid.templateSettings = {
  // interpolate: /\{\{(.+?)\}\}/g
};

ResultsGrid.template = '<ul><% _.each( results, function (result) { %> <li><%- result.Title %></li><% }); %></ul>';

ResultsGrid.view = _.template(ResultsGrid.template, ResultsGrid.templateSettings);

// core methods
ResultsGrid.prototype.render = function () {
  var self = this;

  // XXX the actual bign search should be handled by consumer and not by results grid itself
  bing.search('test', function (results) {
    console.log('results', results);
    self.$el.html(ResultsGrid.view({
      results: results
    }));
  });

  return this;
};

module.exports = ResultsGrid;
