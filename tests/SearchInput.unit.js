var test = require('tape');
var benv = require('benv');

test('SearchInput', function (t) {
  t.test('constructor', function (t) {
    setup(function (input, done) {
      t.ok(input, 'should be instantiated');
      t.ok(input.$el, 'should have a reference to the target DOM element');
      done(t);
    });
  });

  t.test('render', function (t) {
    setup(function (input, done) {
      input.render();
      t.isEqual(input.$el.find('input').size(), 1, 'should render the base template');
      done(t);
    });
  });

  t.test('set', function (t) {
    setup(function (input, done) {
      input.set('searching for stuff');
      t.isEqual(input.val, 'searching for stuff', 'should store the value');

      input.render();
      t.isEqual(input.$el.find('input').val(), 'searching for stuff', 'should render the current value into the input');

      done(t);
    });
  });

  t.test('get', function (t) {
    setup(function (input, done) {
      input.val = 50;
      t.isEqual(input.get(), input.val, 'should return the current value');
      done(t);
    });
  });

  t.test('clear', function (t) {
    setup(function (input, done) {
      input.val = 'manager';
      input.clear();
      t.notOk(input.val, 'should delete the value');
      done(t);
    });
  });
});

// utils
function setup(cb) {
  benv.setup(function () {
    var $           = require('jquery');
    var SearchInput = require('../lib/SearchInput')
    var input       = new SearchInput($('<div />'));

    cb(input, function (t) {
      t.end();
      benv.teardown();
    });
  });
}