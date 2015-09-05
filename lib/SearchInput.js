'use strict'

var $ = require('jquery');
var _ = require('lodash');

function SearchInput(el) {
  this.$el = $(el);
  return this;
}

SearchInput.prototype.render = function () {
  var template = _.template('<input type="text" value="{{value}}"/>', {
    interpolate: /\{\{(.+?)\}\}/g
  });

  this.$el.html(template({
    value: this.val
  }));

  return this;
};

SearchInput.prototype.setValue = function (v) {
  this.val = v;
  return this;
};

module.exports = SearchInput;