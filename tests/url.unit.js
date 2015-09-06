var test = require('tape');
var benv = require('benv');

test('URL utility', function (t) {
  t.test('constructor', function (t) {
    setup(function (url, done) {
      t.ok(url, 'should be instantiated');
      t.ok(url.location, 'should have a reference to the global location object');
      done(t);
    });
  });

  t.test('updateQueryParams', function (t) {
    setup(function (url, done) {
      url.updateQueryParams({
        test: true
      });

      t.isEqual(url.location.search, '?test=true', 'should update the locations query string');
      done(t);
    });
  });

  t.test('getQueryParams', function (t) {
    setup(function (url, done) {
      var q = {
        key: 'value'
      };

      url.updateQueryParams(q);
      t.deepEqual(url.getQueryParams(), q, 'should return hash of query params key/values');
      done(t);
    });
  });
});

// utils
function setup(cb) {
  benv.setup(function () {
    var $   = require('jquery');
    var url = require('../lib/url');

    cb(url, function (t) {
      t.end();
      benv.teardown();
    });
  });
}
