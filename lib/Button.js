'use strict'

var $    = require('jquery');
var _    = require('lodash');
var uuid = require('uuid');

// -------------------------------------------------- //

// constructor
function Button(el, label) {
  this.$el     = $(el);
  this.label   = label;
  this.onclick = function () {};
  this.id      = uuid.v4();
  return this;
}

// -------------------------------------------------- //

// core methods
Button.prototype.render = function () {
  this.$el.html(Button.view({
    label: _.escape(this.label),
    id: this.id
  }));

  return this;
};

Button.prototype.click = function (onclick) {
  this.onclick = onclick;
  this.bindClickHandler();
  return this;
};

Button.prototype.bindClickHandler = function () {
  this.$el.on('click', '#btn_' + this.id, this.onclick);
  return this;
};

// -------------------------------------------------- //

// static fields
Button.templateSettings = {
  interpolate: /\{\{(.+?)\}\}/g
};

Button.template = '<button id="btn_{{ id }}" type="button">{{ label }}</button>';
Button.view     = _.template(Button.template, Button.templateSettings);

// -------------------------------------------------- //

module.exports = Button;
