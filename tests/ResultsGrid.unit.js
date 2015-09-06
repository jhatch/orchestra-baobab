var test = require('tape');
var benv = require('benv');

test('ResultsGrid', function (t) {
  t.test('constructor', function (t) {
    setup(function (grid, done) {
      t.ok(grid, 'should be instantiated');
      t.ok(grid.$el, 'should have a reference to the target DOM element');
      done(t);
    });
  });

  t.test('render', function (t) {
    setup(function (grid, done) {
      grid.render();
      t.isEqual(grid.$el.find('ul').size(), 1, 'should render the main UL element');
      t.isEqual(grid.$el.find('li').size(), 3, 'should render one LI per results item');
      done(t);
    });
  });
});

// utils
function setup(cb) {
  benv.setup(function () {
    var $           = require('jquery');
    var ResultsGrid = require('../lib/ResultsGrid')
    var grid        = new ResultsGrid($('<div />'), function (done) {
      done(['one', 'two', 'three']);
    });

    cb(grid, function (t) {
      t.end();
      benv.teardown();
    });
  });
}