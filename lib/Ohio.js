var Baobab = require('baobab');
var _      = require('lodash');

// centralized state
function Ohio(initialState) {
  this.state = new Baobab(initialState);
  this.cursors = {};
  this.modifiers = {};
}

Ohio.prototype.commit = function () {
  return this.state.commit();
};

Ohio.prototype.curse = function (selector) {
  this.cursors[selector] = this.state.select(selector);
  return this.cursors[selector];
};

Ohio.prototype.define = function (name, customFn) {
  this.modifiers[name] = _.bind(customFn, this);
};

module.exports = Ohio;