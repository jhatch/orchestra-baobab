'use strict'

var $ = require('jquery');
var _ = require('lodash');

// constructor
function SearchInput(el) {
  this.$el = $(el);
  return this;
}

// static fields
SearchInput.templateSettings = {
  interpolate: /\{\{(.+?)\}\}/g
};

SearchInput.template = '<input type="text" value="{{value}}"/>';

SearchInput.view = _.template(SearchInput.template, SearchInput.templateSettings);

// core methods
SearchInput.prototype.render = function () {
  this.$el.html(SearchInput.view({
    value: this.val
  }));

  return this;
};

SearchInput.prototype.set = function (v) {
  this.val = v;
  return this;
};

SearchInput.prototype.get = function () {
  return this.val;
  return this;
};

SearchInput.prototype.clear = function () {
  delete this.val;
  return this;
};

module.exports = SearchInput;