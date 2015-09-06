'use strict'

var $    = require('jquery');
var _    = require('lodash');
var uuid = require('uuid');

// constructor
function Button(el, label, onclick) {
  this.$el     = $(el);
  this.label   = label;
  this.onclick = onclick;
  this.id      = uuid.v4();

  this.bindClickHandler();

  return this;
}

// static fields
Button.templateSettings = {
  interpolate: /\{\{(.+?)\}\}/g
};

Button.template = '<button id="btn_{{ id }}" type="button">{{ label }}</button>';

Button.view = _.template(Button.template, Button.templateSettings);

// core methods
Button.prototype.render = function () {
  this.$el.html(Button.view({
    label: this.label,
    id: this.id
  }));

  return this;
};

Button.prototype.bindClickHandler = function () {
  this.$el.on('click', '#btn_' + this.id, this.onclick);
  return this;
};

module.exports = Button;
