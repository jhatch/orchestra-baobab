'use strict'

var $    = require('jquery');
var _    = require('lodash');

// -------------------------------------------------- //

// constructor
function CurrentLocation(el) {
  this.$el     = $(el);
  this.onclick = function () {};
  return this;
}

// -------------------------------------------------- //

// core methods
CurrentLocation.prototype.render = function () {
  this.$el.html(CurrentLocation.view({

  }));

  return this;
};

CurrentLocation.prototype.click = function (onclick) {
  this.onclick = onclick;
  this.bindClickHandler();
  return this;
};

CurrentLocation.prototype.bindClickHandler = function () {
  var self = this;
  this.$el.on('click', function () {
    global.navigator.geolocation.getCurrentPosition(function (position) {
      self.lng = position.coords.longitude;
      self.lat = position.coords.latitude;
      self.onclick(self.lng, self.lat);
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
