var alert = require('./');
var events = require('dom-events');
var test = require('tape');

alert.transitionTime = 200;



test('exports', function (t) {
  t.equal(typeof alert, 'function', 'is function');
  t.end();
});

test('alert', function (t) {
  t.plan(6);

  var alerted = alert('Foo');
  var el = document.body.children[1].firstChild;

  t.equal(alerted.el, el, 'instance holds the element at .el');
  t.equal(el.innerHTML, 'Foo', 'innerHTML');
  t.equal(el.className, 'alert ', 'className');

  setTimeout(function () {
    t.equal(el.className, 'alert alert-show ', 'className after show');

    dismiss();
  }, 250);

  function dismiss () {
    alerted.destroy();
    t.equal(el.className, 'alert alert-dismiss ', 'className after dismiss');

    setTimeout(function () {
      t.notOk(document.body.children[1].firstChild, 'dismissed');
    }, 250);
  }
});

test('stack, click, className, timeout and callbacks', function (t) {
  t.plan(6);

  var container = document.body.children[1];

  // Wait for previous test to end.
  setTimeout(run, 1000);

  function run () {
    var alerted = alert('1', { className: 'baz' });
    alert('2');
    alert('3');
    alert('4', {
      timeout: 1000,
      onshow: onshow,
      ondismiss: ondismiss
    });

    t.equal(container.children.length, 4, 'alerts stack');
    t.equal(alerted.el.className, 'alert baz', 'custom className');

    events.emit(alerted.el, 'click');
    setTimeout(function() {
      t.equal(container.children.length, 3, 'dismissed on click');
    }, 250);
  }

  function onshow () {
    t.pass('onshow callback called');
  }

  function ondismiss () {
    t.pass('ondismiss callback called');
    
    setTimeout(function () {
      t.equal(container.children.length, 2, 'alert dismissed after timeout');
      alert('done');
    }, 250);
  }
});