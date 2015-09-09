'use strict';

var _ = require('lodash');

// -------------------------------------------------- //

function UI() {
  this.requiredMethods = _.toArray(arguments);
  this.components = {};
  return this;
}

// -------------------------------------------------- //

UI.prototype.add = function (name, component) {
  if (this.validate(component)) {
    this.components[name] = component;
  }
  return this;
};

UI.prototype.validate = function (component) {
  var isValid = _.reduce(this.requiredMethods, function (isValid, method) {
    return isValid && (typeof component[method] === 'function');
  }, true);

  return isValid;
};

UI.prototype.each = function (cb) {
  var names = _.keys(this.components);
  _.each(names, function (name) {
    cb(this.components[name]);
  }, this);

  return this;
};

// -------------------------------------------------- //

module.exports = new UI('render');