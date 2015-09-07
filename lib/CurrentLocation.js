'use strict'

var $    = require('jquery');
var _    = require('lodash');

// -------------------------------------------------- //

// constructor
function CurrentLocation(el, onclick) {
  this.$el     = $(el);
  this.onclick = onclick;
  this.bindClickHandler();
  return this;
}

// -------------------------------------------------- //

// core methods
CurrentLocation.prototype.render = function () {
  this.$el.html(CurrentLocation.view({
    label: this.label,
    id: this.id
  }));

  return this;
};

CurrentLocation.prototype.bindClickHandler = function () {
  var self = this;
  this.$el.on('click', function () {
    global.navigator.geolocation.getCurrentPosition(function (position) {
      self.onclick(position.coords.longitude, position.coords.latitude);
    });
  });
  return this;
};

// -------------------------------------------------- //

// static fields
CurrentLocation.templateSettings = {
  interpolate: /\{\{(.+?)\}\}/g
};

CurrentLocation.template = '<span>NEAR ME</span>';
CurrentLocation.view     = _.template(CurrentLocation.template, CurrentLocation.templateSettings);

// -------------------------------------------------- //

module.exports = CurrentLocation;
