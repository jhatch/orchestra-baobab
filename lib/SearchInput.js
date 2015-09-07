'use strict';

var $    = require('jquery');
var _    = require('lodash');
var uuid = require('uuid');

// -------------------------------------------------- //

// constructor
function SearchInput(el, onchange) {
  this.$el = $(el);
  this.id = uuid.v4();
  this.onchange = onchange;
  this.bindChangeHandler();
  return this;
}

// -------------------------------------------------- //

// core methods
SearchInput.prototype.render = function () {
  this.$el.html(SearchInput.view({
    value: this.val,
    id: this.id
  }));

  return this;
};

SearchInput.prototype.bindChangeHandler = function () {
  var self = this;
  this.$el.on('keyup', '#ctrl_' + this.id, function (evt) {
    self.set(self.$el.find('#ctrl_' + self.id).val());
  });
};

SearchInput.prototype.set = function (v) {
  this.val = v;
  return this;
};

SearchInput.prototype.get = function () {
  return this.val;
};

SearchInput.prototype.clear = function () {
  delete this.val;
  return this;
};

// -------------------------------------------------- //

// static fields
SearchInput.templateSettings = {
  interpolate: /\{\{(.+?)\}\}/g
};

SearchInput.template = '<input id="ctrl_{{ id }}" type="text" value="{{ value }}"/>';
SearchInput.view     = _.template(SearchInput.template, SearchInput.templateSettings);

// -------------------------------------------------- //

module.exports = SearchInput;