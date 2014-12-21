// alerts.js
// version: 0.1.3  
// author: Arturo Castillo Delgado  
// license: MIT  
// https://github.com/acstll/alerts

(function () {

var initialized;
var container = document.createElement('div');

var alert = function (message, options) {
  return (new Alert(message, options)).show();
};

// Config options
alert.transitionTime = 0;
alert.containerClassName = 'alerts';
alert.showClassName = 'alert-show';
alert.dismissClassName = 'alert-dismiss';

alert.Alert = Alert;
alert.container = container;

try { module.exports = alert; }
catch (err) { window.al = alert; }



function Alert (message, options) {
  if (!initialized) initialize();

  options = options || {};
  this.options = options;

  this.message = message || '';
  this.timeout = options.timeout || false;
  this.className = options.className || '';
  this.onshow = options.onshow;
  this.ondismiss = options.ondismiss;
}

Alert.prototype.create = function () {
  var el = this.el = document.createElement('div');
  var timeout = alert.transitionTime || 0;
  var optsClassName = this.className;
  el.className = ['alert', this.className].join(' ');
  el.innerHTML = this.message;
  
  setTimeout(function () { 
    el.className = ['alert', alert.showClassName, optsClassName].join(' ');
  }, timeout);
  container.appendChild(this.el);
};

Alert.prototype.show = function () {
  this.create();
  this.configure();

  if (typeof this.onshow === 'function') this.onshow.call(this.el, this.options);
  return this;
};

Alert.prototype.configure = function () {
  var self = this;
  var timeout;

  if (this.timeout) {
    timeout = setTimeout(function () { self.destroy(); }, this.timeout);
  }

  this.el.addEventListener('click', function (e) {
    if (timeout) clearTimeout(timeout);
    self.destroy();
  }, false);
};

Alert.prototype.destroy = function () {
  var el = this.el;
  var timeout = alert.transitionTime || 0;
  var self = this;

  el.className = ['alert', alert.dismissClassName, this.className].join(' ');
  setTimeout(function () { 
    if (typeof self.ondismiss === 'function') self.ondismiss.call(self);
    container.removeChild(el);
  }, timeout);
};

function initialize () {
  initialized = true;
  container.className = alert.containerClassName;
  document.body.appendChild(container);
}

}());