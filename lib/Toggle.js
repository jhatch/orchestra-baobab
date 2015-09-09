'use strict';

var $    = require('jquery');
var _    = require('lodash');

// -------------------------------------------------- //

function Toggle(el, name, whenTrue, whenFalse) {
  this.$el       = $(el);
  this.name      = name;
  this.whenTrue  = whenTrue;
  this.whenFalse = whenFalse;
  this.value     = this.whenTrue;
  return this;
}

Toggle.prototype.render = function () {
  this.$el.html(Toggle.view({
    name:      this.name,
    whenTrue:  this.whenTrue,
    whenFalse: this.whenFalse
  }));

  this.$el.find('input').removeAttr('checked');
  this.$el.find('input[value="' +  this.value + '"]').attr('checked', true);

  return this;
};

Toggle.prototype.get = function () {
  return this.value;
};

Toggle.prototype.set = function (value) {
  this.value = value;
  return this;
};

Toggle.prototype.click = function (cb) {
  var self = this;
  this.$el.on('click', 'input[name=' + this.name + ']', function () {
    self.set(self.$el.find(':checked').val());
    cb(self.get());
  });
  return this;
};

// -------------------------------------------------- //

// static fields
Toggle.templateSettings = {
  interpolate: /\{\{(.+?)\}\}/g
};

Toggle.template = '<input type="radio" name="{{ name }}" value="{{ whenTrue }}" /> \
                   <input type="radio" name="{{ name }}" value="{{ whenFalse }}" />';
Toggle.view     = _.template(Toggle.template, Toggle.templateSettings);

// -------------------------------------------------- //

module.exports = Toggle;
