var test = require('tape');
var benv = require('benv');

test('SearchInput', function (t) {
  t.test('constructor', function (t) {
    benv.setup(function () {
      var SearchInput = require('../lib/SearchInput')
      var input       = new SearchInput('.test');

      t.ok(input, 'should be instantiated');
      t.ok(input.$el, 'should have a reference to its element');

      t.end();
      benv.teardown();
    });
  });
});