var Baobab = require('baobab');

// centralized state
function Ohio(initialState) {
  this.state = new Baobab(initialState);
  this.cursors = {};
}

Ohio.prototype.commit = function () {
  return this.state.commit();
};

Ohio.prototype.curse = function (selector) {
  this.cursors[selector] = this.state.select(selector);
  return this.cursors[selector];
};

module.exports = Ohio;