var test = require('tape');
var benv = require('benv');

test('Button', function (t) {
  t.test('constructor', function (t) {
    setup(function (btn, done) {
      t.ok(btn, 'should be instantiated');
      t.ok(btn.$el, 'should store its target element');
      t.ok(btn.id, 'should create a random uuid');
      t.ok(btn.label, 'should store given button display label');
      done(t);
    });
  });

  t.test('render', function (t) {
    setup(function (btn, done) {
      btn.render();

      t.equal(btn.$el.find('button').size(), 1, 'should render a button tag');
      t.equal(btn.$el.find('button').text(), btn.label, 'should render the given button label');
      t.equal(btn.$el.find('#btn_' + btn.id).size(), 1, 'should use the uuid in the button id');

      done(t);
    });
  });
});

// utils
function setup(cb) {
  benv.setup(function () {
    var $      = require('jquery');
    var Button = require('../lib/Button');
    var btn    = new Button($('<div></div>'), 'PUSH ME');

    cb(btn, function (t) {
      t.end();
      benv.teardown();
    });
  });
}
