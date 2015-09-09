'use strict'

var $    = require('jquery');
var _    = require('lodash');

// -------------------------------------------------- //

function CurrentLocation(el, geolocation) {
  this.$el = $(el);
  this.geolocation = geolocation;
  return this;
}

CurrentLocation.prototype.render = function () {
  this.$el.html(CurrentLocation.view({}));
  return this;
};

CurrentLocation.prototype.get = function () {
  return {
    lng: this.lng,
    lat: this.lat
  };
};

CurrentLocation.prototype.click = function (onclick) {
  var self = this;
  this.$el.on('click', function () {
    self.geolocation.getCurrentPosition(function (position) {
      self.lng = position.coords.longitude;
      self.lat = position.coords.latitude;
      onclick(self.lng, self.lat);
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
