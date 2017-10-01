(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["react"], factory);
	else if(typeof exports === 'object')
		exports["MindMap"] = factory(require("react"));
	else
		root["MindMap"] = factory(root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_10__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout() {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
})();
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch (e) {
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch (e) {
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }
}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e) {
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e) {
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }
}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while (len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) {
    return [];
};

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () {
    return '/';
};
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function () {
    return 0;
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

function makeEmptyFunction(arg) {
  return function () {
    return arg;
  };
}

/**
 * This function accepts and discards inputs; it has no side effects. This is
 * primarily useful idiomatically for overridable function endpoints which
 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
 */
var emptyFunction = function emptyFunction() {};

emptyFunction.thatReturns = makeEmptyFunction;
emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
emptyFunction.thatReturnsNull = makeEmptyFunction(null);
emptyFunction.thatReturnsThis = function () {
  return this;
};
emptyFunction.thatReturnsArgument = function (arg) {
  return arg;
};

module.exports = emptyFunction;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var validateFormat = function validateFormat(format) {};

if (process.env.NODE_ENV !== 'production') {
  validateFormat = function validateFormat(format) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  };
}

function invariant(condition, format, a, b, c, d, e, f) {
  validateFormat(format);

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
}

module.exports = invariant;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



var emptyFunction = __webpack_require__(1);

/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var warning = emptyFunction;

if (process.env.NODE_ENV !== 'production') {
  var printWarning = function printWarning(format) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var argIndex = 0;
    var message = 'Warning: ' + format.replace(/%s/g, function () {
      return args[argIndex++];
    });
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };

  warning = function warning(condition, format) {
    if (format === undefined) {
      throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
    }

    if (format.indexOf('Failed Composite propType: ') === 0) {
      return; // Ignore CompositeComponent proptype check.
    }

    if (!condition) {
      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        args[_key2 - 2] = arguments[_key2];
      }

      printWarning.apply(undefined, [format].concat(args));
    }
  };
}

module.exports = warning;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

!function (t, n) {
  "object" == ( false ? "undefined" : _typeof(exports)) && "undefined" != typeof module ? n(exports) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (n),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : n(t.d3 = {});
}(undefined, function (t) {
  "use strict";
  function n() {
    for (var t, n = 0, r = arguments.length, i = {}; n < r; ++n) {
      if (!(t = arguments[n] + "") || t in i) throw new Error("illegal type: " + t);i[t] = [];
    }return new e(i);
  }function e(t) {
    this._ = t;
  }function r(t, n) {
    return t.trim().split(/^|\s+/).map(function (t) {
      var e = "",
          r = t.indexOf(".");if (r >= 0 && (e = t.slice(r + 1), t = t.slice(0, r)), t && !n.hasOwnProperty(t)) throw new Error("unknown type: " + t);return { type: t, name: e };
    });
  }function i(t, n) {
    for (var e, r = 0, i = t.length; r < i; ++r) {
      if ((e = t[r]).name === n) return e.value;
    }
  }function o(t, n, e) {
    for (var r = 0, i = t.length; r < i; ++r) {
      if (t[r].name === n) {
        t[r] = gr, t = t.slice(0, r).concat(t.slice(r + 1));break;
      }
    }return null != e && t.push({ name: n, value: e }), t;
  }function a(t) {
    return function () {
      var n = this.ownerDocument,
          e = this.namespaceURI;return e === br && n.documentElement.namespaceURI === br ? n.createElement(t) : n.createElementNS(e, t);
    };
  }function u(t) {
    return function () {
      return this.ownerDocument.createElementNS(t.space, t.local);
    };
  }function c(t, n, e) {
    return t = f(t, n, e), function (n) {
      var e = n.relatedTarget;e && (e === this || 8 & e.compareDocumentPosition(this)) || t.call(this, n);
    };
  }function f(n, e, r) {
    return function (i) {
      var o = t.event;t.event = i;try {
        n.call(this, this.__data__, e, r);
      } finally {
        t.event = o;
      }
    };
  }function s(t) {
    return t.trim().split(/^|\s+/).map(function (t) {
      var n = "",
          e = t.indexOf(".");return e >= 0 && (n = t.slice(e + 1), t = t.slice(0, e)), { type: t, name: n };
    });
  }function h(t) {
    return function () {
      var n = this.__on;if (n) {
        for (var e, r = 0, i = -1, o = n.length; r < o; ++r) {
          e = n[r], t.type && e.type !== t.type || e.name !== t.name ? n[++i] = e : this.removeEventListener(e.type, e.listener, e.capture);
        }++i ? n.length = i : delete this.__on;
      }
    };
  }function l(t, n, e) {
    var r = kr.hasOwnProperty(t.type) ? c : f;return function (i, o, a) {
      var u,
          c = this.__on,
          f = r(n, o, a);if (c) for (var s = 0, h = c.length; s < h; ++s) {
        if ((u = c[s]).type === t.type && u.name === t.name) return this.removeEventListener(u.type, u.listener, u.capture), this.addEventListener(u.type, u.listener = f, u.capture = e), void (u.value = n);
      }this.addEventListener(t.type, f, e), u = { type: t.type, name: t.name, value: n, listener: f, capture: e }, c ? c.push(u) : this.__on = [u];
    };
  }function d(n, e, r, i) {
    var o = t.event;n.sourceEvent = t.event, t.event = n;try {
      return e.apply(r, i);
    } finally {
      t.event = o;
    }
  }function p() {}function v() {
    return [];
  }function y(t, n) {
    this.ownerDocument = t.ownerDocument, this.namespaceURI = t.namespaceURI, this._next = null, this._parent = t, this.__data__ = n;
  }function g(t, n, e, r, i, o) {
    for (var a, u = 0, c = n.length, f = o.length; u < f; ++u) {
      (a = n[u]) ? (a.__data__ = o[u], r[u] = a) : e[u] = new y(t, o[u]);
    }for (; u < c; ++u) {
      (a = n[u]) && (i[u] = a);
    }
  }function b(t, n, e, r, i, o, a) {
    var u,
        c,
        f,
        s = {},
        h = n.length,
        l = o.length,
        d = new Array(h);for (u = 0; u < h; ++u) {
      (c = n[u]) && (d[u] = f = Yr + a.call(c, c.__data__, u, n), f in s ? i[u] = c : s[f] = c);
    }for (u = 0; u < l; ++u) {
      (c = s[f = Yr + a.call(t, o[u], u, o)]) ? (r[u] = c, c.__data__ = o[u], s[f] = null) : e[u] = new y(t, o[u]);
    }for (u = 0; u < h; ++u) {
      (c = n[u]) && s[d[u]] === c && (i[u] = c);
    }
  }function m(t, n) {
    return t < n ? -1 : t > n ? 1 : t >= n ? 0 : NaN;
  }function _(t) {
    return function () {
      this.removeAttribute(t);
    };
  }function w(t) {
    return function () {
      this.removeAttributeNS(t.space, t.local);
    };
  }function x(t, n) {
    return function () {
      this.setAttribute(t, n);
    };
  }function M(t, n) {
    return function () {
      this.setAttributeNS(t.space, t.local, n);
    };
  }function T(t, n) {
    return function () {
      var e = n.apply(this, arguments);null == e ? this.removeAttribute(t) : this.setAttribute(t, e);
    };
  }function A(t, n) {
    return function () {
      var e = n.apply(this, arguments);null == e ? this.removeAttributeNS(t.space, t.local) : this.setAttributeNS(t.space, t.local, e);
    };
  }function k(t) {
    return function () {
      this.style.removeProperty(t);
    };
  }function N(t, n, e) {
    return function () {
      this.style.setProperty(t, n, e);
    };
  }function C(t, n, e) {
    return function () {
      var r = n.apply(this, arguments);null == r ? this.style.removeProperty(t) : this.style.setProperty(t, r, e);
    };
  }function S(t, n) {
    return t.style.getPropertyValue(n) || Fr(t).getComputedStyle(t, null).getPropertyValue(n);
  }function z(t) {
    return function () {
      delete this[t];
    };
  }function U(t, n) {
    return function () {
      this[t] = n;
    };
  }function D(t, n) {
    return function () {
      var e = n.apply(this, arguments);null == e ? delete this[t] : this[t] = e;
    };
  }function E(t) {
    return t.trim().split(/^|\s+/);
  }function Y(t) {
    return t.classList || new F(t);
  }function F(t) {
    this._node = t, this._names = E(t.getAttribute("class") || "");
  }function q(t, n) {
    for (var e = Y(t), r = -1, i = n.length; ++r < i;) {
      e.add(n[r]);
    }
  }function P(t, n) {
    for (var e = Y(t), r = -1, i = n.length; ++r < i;) {
      e.remove(n[r]);
    }
  }function H(t) {
    return function () {
      q(this, t);
    };
  }function X(t) {
    return function () {
      P(this, t);
    };
  }function j(t, n) {
    return function () {
      (n.apply(this, arguments) ? q : P)(this, t);
    };
  }function L() {
    this.textContent = "";
  }function O(t) {
    return function () {
      this.textContent = t;
    };
  }function I(t) {
    return function () {
      var n = t.apply(this, arguments);this.textContent = null == n ? "" : n;
    };
  }function $() {
    this.innerHTML = "";
  }function R(t) {
    return function () {
      this.innerHTML = t;
    };
  }function V(t) {
    return function () {
      var n = t.apply(this, arguments);this.innerHTML = null == n ? "" : n;
    };
  }function B() {
    this.nextSibling && this.parentNode.appendChild(this);
  }function Z() {
    this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
  }function W() {
    return null;
  }function J() {
    var t = this.parentNode;t && t.removeChild(this);
  }function G(t, n, e) {
    var r = Fr(t),
        i = r.CustomEvent;"function" == typeof i ? i = new i(n, e) : (i = r.document.createEvent("Event"), e ? (i.initEvent(n, e.bubbles, e.cancelable), i.detail = e.detail) : i.initEvent(n, !1, !1)), t.dispatchEvent(i);
  }function K(t, n) {
    return function () {
      return G(this, t, n);
    };
  }function Q(t, n) {
    return function () {
      return G(this, t, n.apply(this, arguments));
    };
  }function tt(t, n) {
    this._groups = t, this._parents = n;
  }function nt() {
    return new tt([[document.documentElement]], qr);
  }function et() {
    t.event.stopImmediatePropagation();
  }function rt(t, n) {
    var e = t.document.documentElement,
        r = Pr(t).on("dragstart.drag", null);n && (r.on("click.drag", Xr, !0), setTimeout(function () {
      r.on("click.drag", null);
    }, 0)), "onselectstart" in e ? r.on("selectstart.drag", null) : (e.style.MozUserSelect = e.__noselect, delete e.__noselect);
  }function it(t, n, e, r, i, o, a, u, c, f) {
    this.target = t, this.type = n, this.subject = e, this.identifier = r, this.active = i, this.x = o, this.y = a, this.dx = u, this.dy = c, this._ = f;
  }function ot() {
    return !t.event.button;
  }function at() {
    return this.parentNode;
  }function ut(n) {
    return null == n ? { x: t.event.x, y: t.event.y } : n;
  }function ct() {
    return "ontouchstart" in this;
  }function ft(t, n) {
    var e = Object.create(t.prototype);for (var r in n) {
      e[r] = n[r];
    }return e;
  }function st() {}function ht(t) {
    var n;return t = (t + "").trim().toLowerCase(), (n = Vr.exec(t)) ? (n = parseInt(n[1], 16), new yt(n >> 8 & 15 | n >> 4 & 240, n >> 4 & 15 | 240 & n, (15 & n) << 4 | 15 & n, 1)) : (n = Br.exec(t)) ? lt(parseInt(n[1], 16)) : (n = Zr.exec(t)) ? new yt(n[1], n[2], n[3], 1) : (n = Wr.exec(t)) ? new yt(255 * n[1] / 100, 255 * n[2] / 100, 255 * n[3] / 100, 1) : (n = Jr.exec(t)) ? dt(n[1], n[2], n[3], n[4]) : (n = Gr.exec(t)) ? dt(255 * n[1] / 100, 255 * n[2] / 100, 255 * n[3] / 100, n[4]) : (n = Kr.exec(t)) ? gt(n[1], n[2] / 100, n[3] / 100, 1) : (n = Qr.exec(t)) ? gt(n[1], n[2] / 100, n[3] / 100, n[4]) : ti.hasOwnProperty(t) ? lt(ti[t]) : "transparent" === t ? new yt(NaN, NaN, NaN, 0) : null;
  }function lt(t) {
    return new yt(t >> 16 & 255, t >> 8 & 255, 255 & t, 1);
  }function dt(t, n, e, r) {
    return r <= 0 && (t = n = e = NaN), new yt(t, n, e, r);
  }function pt(t) {
    return t instanceof st || (t = ht(t)), t ? (t = t.rgb(), new yt(t.r, t.g, t.b, t.opacity)) : new yt();
  }function vt(t, n, e, r) {
    return 1 === arguments.length ? pt(t) : new yt(t, n, e, null == r ? 1 : r);
  }function yt(t, n, e, r) {
    this.r = +t, this.g = +n, this.b = +e, this.opacity = +r;
  }function gt(t, n, e, r) {
    return r <= 0 ? t = n = e = NaN : e <= 0 || e >= 1 ? t = n = NaN : n <= 0 && (t = NaN), new mt(t, n, e, r);
  }function bt(t) {
    if (t instanceof mt) return new mt(t.h, t.s, t.l, t.opacity);if (t instanceof st || (t = ht(t)), !t) return new mt();if (t instanceof mt) return t;var n = (t = t.rgb()).r / 255,
        e = t.g / 255,
        r = t.b / 255,
        i = Math.min(n, e, r),
        o = Math.max(n, e, r),
        a = NaN,
        u = o - i,
        c = (o + i) / 2;return u ? (a = n === o ? (e - r) / u + 6 * (e < r) : e === o ? (r - n) / u + 2 : (n - e) / u + 4, u /= c < .5 ? o + i : 2 - o - i, a *= 60) : u = c > 0 && c < 1 ? 0 : a, new mt(a, u, c, t.opacity);
  }function mt(t, n, e, r) {
    this.h = +t, this.s = +n, this.l = +e, this.opacity = +r;
  }function _t(t, n, e) {
    return 255 * (t < 60 ? n + (e - n) * t / 60 : t < 180 ? e : t < 240 ? n + (e - n) * (240 - t) / 60 : n);
  }function wt(t) {
    if (t instanceof xt) return new xt(t.l, t.a, t.b, t.opacity);if (t instanceof Ct) {
      var n = t.h * ni;return new xt(t.l, Math.cos(n) * t.c, Math.sin(n) * t.c, t.opacity);
    }t instanceof yt || (t = pt(t));var e = kt(t.r),
        r = kt(t.g),
        i = kt(t.b),
        o = Mt((.4124564 * e + .3575761 * r + .1804375 * i) / ri),
        a = Mt((.2126729 * e + .7151522 * r + .072175 * i) / ii);return new xt(116 * a - 16, 500 * (o - a), 200 * (a - Mt((.0193339 * e + .119192 * r + .9503041 * i) / oi)), t.opacity);
  }function xt(t, n, e, r) {
    this.l = +t, this.a = +n, this.b = +e, this.opacity = +r;
  }function Mt(t) {
    return t > fi ? Math.pow(t, 1 / 3) : t / ci + ai;
  }function Tt(t) {
    return t > ui ? t * t * t : ci * (t - ai);
  }function At(t) {
    return 255 * (t <= .0031308 ? 12.92 * t : 1.055 * Math.pow(t, 1 / 2.4) - .055);
  }function kt(t) {
    return (t /= 255) <= .04045 ? t / 12.92 : Math.pow((t + .055) / 1.055, 2.4);
  }function Nt(t) {
    if (t instanceof Ct) return new Ct(t.h, t.c, t.l, t.opacity);t instanceof xt || (t = wt(t));var n = Math.atan2(t.b, t.a) * ei;return new Ct(n < 0 ? n + 360 : n, Math.sqrt(t.a * t.a + t.b * t.b), t.l, t.opacity);
  }function Ct(t, n, e, r) {
    this.h = +t, this.c = +n, this.l = +e, this.opacity = +r;
  }function St(t) {
    if (t instanceof Ut) return new Ut(t.h, t.s, t.l, t.opacity);t instanceof yt || (t = pt(t));var n = t.r / 255,
        e = t.g / 255,
        r = t.b / 255,
        i = (gi * r + vi * n - yi * e) / (gi + vi - yi),
        o = r - i,
        a = (pi * (e - i) - li * o) / di,
        u = Math.sqrt(a * a + o * o) / (pi * i * (1 - i)),
        c = u ? Math.atan2(a, o) * ei - 120 : NaN;return new Ut(c < 0 ? c + 360 : c, u, i, t.opacity);
  }function zt(t, n, e, r) {
    return 1 === arguments.length ? St(t) : new Ut(t, n, e, null == r ? 1 : r);
  }function Ut(t, n, e, r) {
    this.h = +t, this.s = +n, this.l = +e, this.opacity = +r;
  }function Dt(t, n) {
    return function (e) {
      return t + e * n;
    };
  }function Et(t, n, e) {
    return t = Math.pow(t, e), n = Math.pow(n, e) - t, e = 1 / e, function (r) {
      return Math.pow(t + r * n, e);
    };
  }function Yt(t) {
    return 1 == (t = +t) ? Ft : function (n, e) {
      return e - n ? Et(n, e, t) : xi(isNaN(n) ? e : n);
    };
  }function Ft(t, n) {
    var e = n - t;return e ? Dt(t, e) : xi(isNaN(t) ? n : t);
  }function qt(t) {
    return function () {
      return t;
    };
  }function Pt(t) {
    return function (n) {
      return t(n) + "";
    };
  }function Ht(t, n, e, r) {
    function i(t) {
      return t.length ? t.pop() + " " : "";
    }function o(t, r, i, o, a, u) {
      if (t !== i || r !== o) {
        var c = a.push("translate(", null, n, null, e);u.push({ i: c - 4, x: Ti(t, i) }, { i: c - 2, x: Ti(r, o) });
      } else (i || o) && a.push("translate(" + i + n + o + e);
    }function a(t, n, e, o) {
      t !== n ? (t - n > 180 ? n += 360 : n - t > 180 && (t += 360), o.push({ i: e.push(i(e) + "rotate(", null, r) - 2, x: Ti(t, n) })) : n && e.push(i(e) + "rotate(" + n + r);
    }function u(t, n, e, o) {
      t !== n ? o.push({ i: e.push(i(e) + "skewX(", null, r) - 2, x: Ti(t, n) }) : n && e.push(i(e) + "skewX(" + n + r);
    }function c(t, n, e, r, o, a) {
      if (t !== e || n !== r) {
        var u = o.push(i(o) + "scale(", null, ",", null, ")");a.push({ i: u - 4, x: Ti(t, e) }, { i: u - 2, x: Ti(n, r) });
      } else 1 === e && 1 === r || o.push(i(o) + "scale(" + e + "," + r + ")");
    }return function (n, e) {
      var r = [],
          i = [];return n = t(n), e = t(e), o(n.translateX, n.translateY, e.translateX, e.translateY, r, i), a(n.rotate, e.rotate, r, i), u(n.skewX, e.skewX, r, i), c(n.scaleX, n.scaleY, e.scaleX, e.scaleY, r, i), n = e = null, function (t) {
        for (var n, e = -1, o = i.length; ++e < o;) {
          r[(n = i[e]).i] = n.x(t);
        }return r.join("");
      };
    };
  }function Xt(t) {
    return ((t = Math.exp(t)) + 1 / t) / 2;
  }function jt(t) {
    return ((t = Math.exp(t)) - 1 / t) / 2;
  }function Lt(t) {
    return ((t = Math.exp(2 * t)) - 1) / (t + 1);
  }function Ot(t) {
    return function n(e) {
      function r(n, r) {
        var i = t((n = zt(n)).h, (r = zt(r)).h),
            o = Ft(n.s, r.s),
            a = Ft(n.l, r.l),
            u = Ft(n.opacity, r.opacity);return function (t) {
          return n.h = i(t), n.s = o(t), n.l = a(Math.pow(t, e)), n.opacity = u(t), n + "";
        };
      }return e = +e, r.gamma = n, r;
    }(1);
  }function It() {
    return Ii || (Vi($t), Ii = Ri.now() + $i);
  }function $t() {
    Ii = 0;
  }function Rt() {
    this._call = this._time = this._next = null;
  }function Vt(t, n, e) {
    var r = new Rt();return r.restart(t, n, e), r;
  }function Bt() {
    It(), ++Hi;for (var t, n = Fi; n;) {
      (t = Ii - n._time) >= 0 && n._call.call(null, t), n = n._next;
    }--Hi;
  }function Zt() {
    Ii = (Oi = Ri.now()) + $i, Hi = Xi = 0;try {
      Bt();
    } finally {
      Hi = 0, Jt(), Ii = 0;
    }
  }function Wt() {
    var t = Ri.now(),
        n = t - Oi;n > Li && ($i -= n, Oi = t);
  }function Jt() {
    for (var t, n, e = Fi, r = 1 / 0; e;) {
      e._call ? (r > e._time && (r = e._time), t = e, e = e._next) : (n = e._next, e._next = null, e = t ? t._next = n : Fi = n);
    }qi = t, Gt(r);
  }function Gt(t) {
    Hi || (Xi && (Xi = clearTimeout(Xi)), t - Ii > 24 ? (t < 1 / 0 && (Xi = setTimeout(Zt, t - Ri.now() - $i)), ji && (ji = clearInterval(ji))) : (ji || (Oi = Ri.now(), ji = setInterval(Wt, Li)), Hi = 1, Vi(Zt)));
  }function Kt(t, n) {
    var e = t.__transition;if (!e || !(e = e[n]) || e.state > Ji) throw new Error("too late");return e;
  }function Qt(t, n) {
    var e = t.__transition;if (!e || !(e = e[n]) || e.state > Ki) throw new Error("too late");return e;
  }function tn(t, n) {
    var e = t.__transition;if (!e || !(e = e[n])) throw new Error("too late");return e;
  }function nn(t, n, e) {
    function r(c) {
      var f, s, h, l;if (e.state !== Gi) return o();for (f in u) {
        if ((l = u[f]).name === e.name) {
          if (l.state === Qi) return Bi(r);l.state === to ? (l.state = eo, l.timer.stop(), l.on.call("interrupt", t, t.__data__, l.index, l.group), delete u[f]) : +f < n && (l.state = eo, l.timer.stop(), delete u[f]);
        }
      }if (Bi(function () {
        e.state === Qi && (e.state = to, e.timer.restart(i, e.delay, e.time), i(c));
      }), e.state = Ki, e.on.call("start", t, t.__data__, e.index, e.group), e.state === Ki) {
        for (e.state = Qi, a = new Array(h = e.tween.length), f = 0, s = -1; f < h; ++f) {
          (l = e.tween[f].value.call(t, t.__data__, e.index, e.group)) && (a[++s] = l);
        }a.length = s + 1;
      }
    }function i(n) {
      for (var r = n < e.duration ? e.ease.call(null, n / e.duration) : (e.timer.restart(o), e.state = no, 1), i = -1, u = a.length; ++i < u;) {
        a[i].call(null, r);
      }e.state === no && (e.on.call("end", t, t.__data__, e.index, e.group), o());
    }function o() {
      e.state = eo, e.timer.stop(), delete u[n];for (var r in u) {
        return;
      }delete t.__transition;
    }var a,
        u = t.__transition;u[n] = e, e.timer = Vt(function (t) {
      e.state = Gi, e.timer.restart(r, e.delay, e.time), e.delay <= t && r(t - e.delay);
    }, 0, e.time);
  }function en(t, n) {
    var e, r;return function () {
      var i = Qt(this, t),
          o = i.tween;if (o !== e) for (var a = 0, u = (r = e = o).length; a < u; ++a) {
        if (r[a].name === n) {
          (r = r.slice()).splice(a, 1);break;
        }
      }i.tween = r;
    };
  }function rn(t, n, e) {
    var r, i;if ("function" != typeof e) throw new Error();return function () {
      var o = Qt(this, t),
          a = o.tween;if (a !== r) {
        i = (r = a).slice();for (var u = { name: n, value: e }, c = 0, f = i.length; c < f; ++c) {
          if (i[c].name === n) {
            i[c] = u;break;
          }
        }c === f && i.push(u);
      }o.tween = i;
    };
  }function on(t, n, e) {
    var r = t._id;return t.each(function () {
      var t = Qt(this, r);(t.value || (t.value = {}))[n] = e.apply(this, arguments);
    }), function (t) {
      return tn(t, r).value[n];
    };
  }function an(t) {
    return function () {
      this.removeAttribute(t);
    };
  }function un(t) {
    return function () {
      this.removeAttributeNS(t.space, t.local);
    };
  }function cn(t, n, e) {
    var r, i;return function () {
      var o = this.getAttribute(t);return o === e ? null : o === r ? i : i = n(r = o, e);
    };
  }function fn(t, n, e) {
    var r, i;return function () {
      var o = this.getAttributeNS(t.space, t.local);return o === e ? null : o === r ? i : i = n(r = o, e);
    };
  }function sn(t, n, e) {
    var r, i, o;return function () {
      var a,
          u = e(this);{
        if (null != u) return (a = this.getAttribute(t)) === u ? null : a === r && u === i ? o : o = n(r = a, i = u);this.removeAttribute(t);
      }
    };
  }function hn(t, n, e) {
    var r, i, o;return function () {
      var a,
          u = e(this);{
        if (null != u) return (a = this.getAttributeNS(t.space, t.local)) === u ? null : a === r && u === i ? o : o = n(r = a, i = u);this.removeAttributeNS(t.space, t.local);
      }
    };
  }function ln(t, n) {
    function e() {
      var e = this,
          r = n.apply(e, arguments);return r && function (n) {
        e.setAttributeNS(t.space, t.local, r(n));
      };
    }return e._value = n, e;
  }function dn(t, n) {
    function e() {
      var e = this,
          r = n.apply(e, arguments);return r && function (n) {
        e.setAttribute(t, r(n));
      };
    }return e._value = n, e;
  }function pn(t, n) {
    return function () {
      Kt(this, t).delay = +n.apply(this, arguments);
    };
  }function vn(t, n) {
    return n = +n, function () {
      Kt(this, t).delay = n;
    };
  }function yn(t, n) {
    return function () {
      Qt(this, t).duration = +n.apply(this, arguments);
    };
  }function gn(t, n) {
    return n = +n, function () {
      Qt(this, t).duration = n;
    };
  }function bn(t, n) {
    if ("function" != typeof n) throw new Error();return function () {
      Qt(this, t).ease = n;
    };
  }function mn(t) {
    return (t + "").trim().split(/^|\s+/).every(function (t) {
      var n = t.indexOf(".");return n >= 0 && (t = t.slice(0, n)), !t || "start" === t;
    });
  }function _n(t, n, e) {
    var r,
        i,
        o = mn(n) ? Kt : Qt;return function () {
      var a = o(this, t),
          u = a.on;u !== r && (i = (r = u).copy()).on(n, e), a.on = i;
    };
  }function wn(t) {
    return function () {
      var n = this.parentNode;for (var e in this.__transition) {
        if (+e !== t) return;
      }n && n.removeChild(this);
    };
  }function xn(t, n) {
    var e, r, i;return function () {
      var o = S(this, t),
          a = (this.style.removeProperty(t), S(this, t));return o === a ? null : o === e && a === r ? i : i = n(e = o, r = a);
    };
  }function Mn(t) {
    return function () {
      this.style.removeProperty(t);
    };
  }function Tn(t, n, e) {
    var r, i;return function () {
      var o = S(this, t);return o === e ? null : o === r ? i : i = n(r = o, e);
    };
  }function An(t, n, e) {
    var r, i, o;return function () {
      var a = S(this, t),
          u = e(this);return null == u && (this.style.removeProperty(t), u = S(this, t)), a === u ? null : a === r && u === i ? o : o = n(r = a, i = u);
    };
  }function kn(t, n, e) {
    function r() {
      var r = this,
          i = n.apply(r, arguments);return i && function (n) {
        r.style.setProperty(t, i(n), e);
      };
    }return r._value = n, r;
  }function Nn(t) {
    return function () {
      this.textContent = t;
    };
  }function Cn(t) {
    return function () {
      var n = t(this);this.textContent = null == n ? "" : n;
    };
  }function Sn(t, n, e, r) {
    this._groups = t, this._parents = n, this._name = e, this._id = r;
  }function zn() {
    return ++uo;
  }function Un(t, n) {
    for (var e; !(e = t.__transition) || !(e = e[n]);) {
      if (!(t = t.parentNode)) return fo.time = It(), fo;
    }return e;
  }function Dn(t) {
    return { type: t };
  }function En() {}function Yn(t, n) {
    var e = new En();if (t instanceof En) t.each(function (t, n) {
      e.set(n, t);
    });else if (Array.isArray(t)) {
      var r,
          i = -1,
          o = t.length;if (null == n) for (; ++i < o;) {
        e.set(i, t[i]);
      } else for (; ++i < o;) {
        e.set(n(r = t[i], i, t), r);
      }
    } else if (t) for (var a in t) {
      e.set(a, t[a]);
    }return e;
  }function Fn(t) {
    return new Function("d", "return {" + t.map(function (t, n) {
      return JSON.stringify(t) + ": d[" + n + "]";
    }).join(",") + "}");
  }function qn(t, n) {
    var e = Fn(t);return function (r, i) {
      return n(e(r), i, t);
    };
  }function Pn(t) {
    var n = Object.create(null),
        e = [];return t.forEach(function (t) {
      for (var r in t) {
        r in n || e.push(n[r] = r);
      }
    }), e;
  }function Hn(t, n, e, r) {
    if (isNaN(n) || isNaN(e)) return t;var i,
        o,
        a,
        u,
        c,
        f,
        s,
        h,
        l,
        d = t._root,
        p = { data: r },
        v = t._x0,
        y = t._y0,
        g = t._x1,
        b = t._y1;if (!d) return t._root = p, t;for (; d.length;) {
      if ((f = n >= (o = (v + g) / 2)) ? v = o : g = o, (s = e >= (a = (y + b) / 2)) ? y = a : b = a, i = d, !(d = d[h = s << 1 | f])) return i[h] = p, t;
    }if (u = +t._x.call(null, d.data), c = +t._y.call(null, d.data), n === u && e === c) return p.next = d, i ? i[h] = p : t._root = p, t;do {
      i = i ? i[h] = new Array(4) : t._root = new Array(4), (f = n >= (o = (v + g) / 2)) ? v = o : g = o, (s = e >= (a = (y + b) / 2)) ? y = a : b = a;
    } while ((h = s << 1 | f) == (l = (c >= a) << 1 | u >= o));return i[l] = d, i[h] = p, t;
  }function Xn(t) {
    return t[0];
  }function jn(t) {
    return t[1];
  }function Ln(t, n, e) {
    var r = new On(null == n ? Xn : n, null == e ? jn : e, NaN, NaN, NaN, NaN);return null == t ? r : r.addAll(t);
  }function On(t, n, e, r, i, o) {
    this._x = t, this._y = n, this._x0 = e, this._y0 = r, this._x1 = i, this._y1 = o, this._root = void 0;
  }function In(t) {
    for (var n = { data: t.data }, e = n; t = t.next;) {
      e = e.next = { data: t.data };
    }return n;
  }function $n(t) {
    return t.x + t.vx;
  }function Rn(t) {
    return t.y + t.vy;
  }function Vn(t) {
    return t.index;
  }function Bn(t, n) {
    var e = t.get(n);if (!e) throw new Error("missing: " + n);return e;
  }function Zn(t) {
    return t.x;
  }function Wn(t) {
    return t.y;
  }function Jn() {
    this.reset();
  }function Gn(t, n, e) {
    var r = t.s = n + e,
        i = r - n,
        o = r - i;t.t = n - o + (e - i);
  }function Kn(t) {
    return t > 1 ? 0 : t < -1 ? zo : Math.acos(t);
  }function Qn(t) {
    return t > 1 ? Uo : t < -1 ? -Uo : Math.asin(t);
  }function te(t) {
    return function (n, e) {
      var r = Yo(n),
          i = Yo(e),
          o = t(r * i);return [o * i * Fo(n), o * Fo(e)];
    };
  }function ne(t) {
    return function (n, e) {
      var r = qo(n * n + e * e),
          i = t(r),
          o = Fo(i),
          a = Yo(i);return [Eo(n * o, r * a), Qn(r && e * o / r)];
    };
  }function ee(t, n, e, r) {
    function i(n) {
      return t(n = new Date(+n)), n;
    }return i.floor = i, i.ceil = function (e) {
      return t(e = new Date(e - 1)), n(e, 1), t(e), e;
    }, i.round = function (t) {
      var n = i(t),
          e = i.ceil(t);return t - n < e - t ? n : e;
    }, i.offset = function (t, e) {
      return n(t = new Date(+t), null == e ? 1 : Math.floor(e)), t;
    }, i.range = function (e, r, o) {
      var a = [];if (e = i.ceil(e), o = null == o ? 1 : Math.floor(o), !(e < r && o > 0)) return a;do {
        a.push(new Date(+e));
      } while ((n(e, o), t(e), e < r));return a;
    }, i.filter = function (e) {
      return ee(function (n) {
        if (n >= n) for (; t(n), !e(n);) {
          n.setTime(n - 1);
        }
      }, function (t, r) {
        if (t >= t) if (r < 0) for (; ++r <= 0;) {
          for (; n(t, -1), !e(t);) {}
        } else for (; --r >= 0;) {
          for (; n(t, 1), !e(t);) {}
        }
      });
    }, e && (i.count = function (n, r) {
      return Po.setTime(+n), Ho.setTime(+r), t(Po), t(Ho), Math.floor(e(Po, Ho));
    }, i.every = function (t) {
      return t = Math.floor(t), isFinite(t) && t > 0 ? t > 1 ? i.filter(r ? function (n) {
        return r(n) % t == 0;
      } : function (n) {
        return i.count(0, n) % t == 0;
      }) : i : null;
    }), i;
  }function re(t) {
    return ee(function (n) {
      n.setDate(n.getDate() - (n.getDay() + 7 - t) % 7), n.setHours(0, 0, 0, 0);
    }, function (t, n) {
      t.setDate(t.getDate() + 7 * n);
    }, function (t, n) {
      return (n - t - (n.getTimezoneOffset() - t.getTimezoneOffset()) * jo) / Lo;
    });
  }function ie(t) {
    return ee(function (n) {
      n.setUTCDate(n.getUTCDate() - (n.getUTCDay() + 7 - t) % 7), n.setUTCHours(0, 0, 0, 0);
    }, function (t, n) {
      t.setUTCDate(t.getUTCDate() + 7 * n);
    }, function (t, n) {
      return (n - t) / Lo;
    });
  }function oe(t) {
    if (0 <= t.y && t.y < 100) {
      var n = new Date(-1, t.m, t.d, t.H, t.M, t.S, t.L);return n.setFullYear(t.y), n;
    }return new Date(t.y, t.m, t.d, t.H, t.M, t.S, t.L);
  }function ae(t) {
    if (0 <= t.y && t.y < 100) {
      var n = new Date(Date.UTC(-1, t.m, t.d, t.H, t.M, t.S, t.L));return n.setUTCFullYear(t.y), n;
    }return new Date(Date.UTC(t.y, t.m, t.d, t.H, t.M, t.S, t.L));
  }function ue(t) {
    return { y: t, m: 0, d: 1, H: 0, M: 0, S: 0, L: 0 };
  }function ce(t) {
    function n(t, n) {
      return function (e) {
        var r,
            i,
            o,
            a = [],
            u = -1,
            c = 0,
            f = t.length;for (e instanceof Date || (e = new Date(+e)); ++u < f;) {
          37 === t.charCodeAt(u) && (a.push(t.slice(c, u)), null != (i = Qo[r = t.charAt(++u)]) ? r = t.charAt(++u) : i = "e" === r ? " " : "0", (o = n[r]) && (r = o(e, i)), a.push(r), c = u + 1);
        }return a.push(t.slice(c, u)), a.join("");
      };
    }function e(t, n) {
      return function (e) {
        var i = ue(1900);if (r(i, t, e += "", 0) != e.length) return null;if ("p" in i && (i.H = i.H % 12 + 12 * i.p), "W" in i || "U" in i) {
          "w" in i || (i.w = "W" in i ? 1 : 0);var o = "Z" in i ? ae(ue(i.y)).getUTCDay() : n(ue(i.y)).getDay();i.m = 0, i.d = "W" in i ? (i.w + 6) % 7 + 7 * i.W - (o + 5) % 7 : i.w + 7 * i.U - (o + 6) % 7;
        }return "Z" in i ? (i.H += i.Z / 100 | 0, i.M += i.Z % 100, ae(i)) : n(i);
      };
    }function r(t, n, e, r) {
      for (var i, o, a = 0, u = n.length, c = e.length; a < u;) {
        if (r >= c) return -1;if (37 === (i = n.charCodeAt(a++))) {
          if (i = n.charAt(a++), !(o = T[i in Qo ? n.charAt(a++) : i]) || (r = o(t, e, r)) < 0) return -1;
        } else if (i != e.charCodeAt(r++)) return -1;
      }return r;
    }var i = t.dateTime,
        o = t.date,
        a = t.time,
        u = t.periods,
        c = t.days,
        f = t.shortDays,
        s = t.months,
        h = t.shortMonths,
        l = he(u),
        d = le(u),
        p = he(c),
        v = le(c),
        y = he(f),
        g = le(f),
        b = he(s),
        m = le(s),
        _ = he(h),
        w = le(h),
        x = { a: function a(t) {
        return f[t.getDay()];
      }, A: function A(t) {
        return c[t.getDay()];
      }, b: function b(t) {
        return h[t.getMonth()];
      }, B: function B(t) {
        return s[t.getMonth()];
      }, c: null, d: Ne, e: Ne, H: Ce, I: Se, j: ze, L: Ue, m: De, M: Ee, p: function p(t) {
        return u[+(t.getHours() >= 12)];
      }, S: Ye, U: Fe, w: qe, W: Pe, x: null, X: null, y: He, Y: Xe, Z: je, "%": nr },
        M = { a: function a(t) {
        return f[t.getUTCDay()];
      }, A: function A(t) {
        return c[t.getUTCDay()];
      }, b: function b(t) {
        return h[t.getUTCMonth()];
      }, B: function B(t) {
        return s[t.getUTCMonth()];
      }, c: null, d: Le, e: Le, H: Oe, I: Ie, j: $e, L: Re, m: Ve, M: Be, p: function p(t) {
        return u[+(t.getUTCHours() >= 12)];
      }, S: Ze, U: We, w: Je, W: Ge, x: null, X: null, y: Ke, Y: Qe, Z: tr, "%": nr },
        T = { a: function a(t, n, e) {
        var r = y.exec(n.slice(e));return r ? (t.w = g[r[0].toLowerCase()], e + r[0].length) : -1;
      }, A: function A(t, n, e) {
        var r = p.exec(n.slice(e));return r ? (t.w = v[r[0].toLowerCase()], e + r[0].length) : -1;
      }, b: function b(t, n, e) {
        var r = _.exec(n.slice(e));return r ? (t.m = w[r[0].toLowerCase()], e + r[0].length) : -1;
      }, B: function B(t, n, e) {
        var r = b.exec(n.slice(e));return r ? (t.m = m[r[0].toLowerCase()], e + r[0].length) : -1;
      }, c: function c(t, n, e) {
        return r(t, i, n, e);
      }, d: _e, e: _e, H: xe, I: xe, j: we, L: Ae, m: me, M: Me, p: function p(t, n, e) {
        var r = l.exec(n.slice(e));return r ? (t.p = d[r[0].toLowerCase()], e + r[0].length) : -1;
      }, S: Te, U: pe, w: de, W: ve, x: function x(t, n, e) {
        return r(t, o, n, e);
      }, X: function X(t, n, e) {
        return r(t, a, n, e);
      }, y: ge, Y: ye, Z: be, "%": ke };return x.x = n(o, x), x.X = n(a, x), x.c = n(i, x), M.x = n(o, M), M.X = n(a, M), M.c = n(i, M), { format: function format(t) {
        var e = n(t += "", x);return e.toString = function () {
          return t;
        }, e;
      }, parse: function parse(t) {
        var n = e(t += "", oe);return n.toString = function () {
          return t;
        }, n;
      }, utcFormat: function utcFormat(t) {
        var e = n(t += "", M);return e.toString = function () {
          return t;
        }, e;
      }, utcParse: function utcParse(t) {
        var n = e(t, ae);return n.toString = function () {
          return t;
        }, n;
      } };
  }function fe(t, n, e) {
    var r = t < 0 ? "-" : "",
        i = (r ? -t : t) + "",
        o = i.length;return r + (o < e ? new Array(e - o + 1).join(n) + i : i);
  }function se(t) {
    return t.replace(ea, "\\$&");
  }function he(t) {
    return new RegExp("^(?:" + t.map(se).join("|") + ")", "i");
  }function le(t) {
    for (var n = {}, e = -1, r = t.length; ++e < r;) {
      n[t[e].toLowerCase()] = e;
    }return n;
  }function de(t, n, e) {
    var r = ta.exec(n.slice(e, e + 1));return r ? (t.w = +r[0], e + r[0].length) : -1;
  }function pe(t, n, e) {
    var r = ta.exec(n.slice(e));return r ? (t.U = +r[0], e + r[0].length) : -1;
  }function ve(t, n, e) {
    var r = ta.exec(n.slice(e));return r ? (t.W = +r[0], e + r[0].length) : -1;
  }function ye(t, n, e) {
    var r = ta.exec(n.slice(e, e + 4));return r ? (t.y = +r[0], e + r[0].length) : -1;
  }function ge(t, n, e) {
    var r = ta.exec(n.slice(e, e + 2));return r ? (t.y = +r[0] + (+r[0] > 68 ? 1900 : 2e3), e + r[0].length) : -1;
  }function be(t, n, e) {
    var r = /^(Z)|([+-]\d\d)(?:\:?(\d\d))?/.exec(n.slice(e, e + 6));return r ? (t.Z = r[1] ? 0 : -(r[2] + (r[3] || "00")), e + r[0].length) : -1;
  }function me(t, n, e) {
    var r = ta.exec(n.slice(e, e + 2));return r ? (t.m = r[0] - 1, e + r[0].length) : -1;
  }function _e(t, n, e) {
    var r = ta.exec(n.slice(e, e + 2));return r ? (t.d = +r[0], e + r[0].length) : -1;
  }function we(t, n, e) {
    var r = ta.exec(n.slice(e, e + 3));return r ? (t.m = 0, t.d = +r[0], e + r[0].length) : -1;
  }function xe(t, n, e) {
    var r = ta.exec(n.slice(e, e + 2));return r ? (t.H = +r[0], e + r[0].length) : -1;
  }function Me(t, n, e) {
    var r = ta.exec(n.slice(e, e + 2));return r ? (t.M = +r[0], e + r[0].length) : -1;
  }function Te(t, n, e) {
    var r = ta.exec(n.slice(e, e + 2));return r ? (t.S = +r[0], e + r[0].length) : -1;
  }function Ae(t, n, e) {
    var r = ta.exec(n.slice(e, e + 3));return r ? (t.L = +r[0], e + r[0].length) : -1;
  }function ke(t, n, e) {
    var r = na.exec(n.slice(e, e + 1));return r ? e + r[0].length : -1;
  }function Ne(t, n) {
    return fe(t.getDate(), n, 2);
  }function Ce(t, n) {
    return fe(t.getHours(), n, 2);
  }function Se(t, n) {
    return fe(t.getHours() % 12 || 12, n, 2);
  }function ze(t, n) {
    return fe(1 + Oo.count(Ro(t), t), n, 3);
  }function Ue(t, n) {
    return fe(t.getMilliseconds(), n, 3);
  }function De(t, n) {
    return fe(t.getMonth() + 1, n, 2);
  }function Ee(t, n) {
    return fe(t.getMinutes(), n, 2);
  }function Ye(t, n) {
    return fe(t.getSeconds(), n, 2);
  }function Fe(t, n) {
    return fe(Io.count(Ro(t), t), n, 2);
  }function qe(t) {
    return t.getDay();
  }function Pe(t, n) {
    return fe($o.count(Ro(t), t), n, 2);
  }function He(t, n) {
    return fe(t.getFullYear() % 100, n, 2);
  }function Xe(t, n) {
    return fe(t.getFullYear() % 1e4, n, 4);
  }function je(t) {
    var n = t.getTimezoneOffset();return (n > 0 ? "-" : (n *= -1, "+")) + fe(n / 60 | 0, "0", 2) + fe(n % 60, "0", 2);
  }function Le(t, n) {
    return fe(t.getUTCDate(), n, 2);
  }function Oe(t, n) {
    return fe(t.getUTCHours(), n, 2);
  }function Ie(t, n) {
    return fe(t.getUTCHours() % 12 || 12, n, 2);
  }function $e(t, n) {
    return fe(1 + Vo.count(Wo(t), t), n, 3);
  }function Re(t, n) {
    return fe(t.getUTCMilliseconds(), n, 3);
  }function Ve(t, n) {
    return fe(t.getUTCMonth() + 1, n, 2);
  }function Be(t, n) {
    return fe(t.getUTCMinutes(), n, 2);
  }function Ze(t, n) {
    return fe(t.getUTCSeconds(), n, 2);
  }function We(t, n) {
    return fe(Bo.count(Wo(t), t), n, 2);
  }function Je(t) {
    return t.getUTCDay();
  }function Ge(t, n) {
    return fe(Zo.count(Wo(t), t), n, 2);
  }function Ke(t, n) {
    return fe(t.getUTCFullYear() % 100, n, 2);
  }function Qe(t, n) {
    return fe(t.getUTCFullYear() % 1e4, n, 4);
  }function tr() {
    return "+0000";
  }function nr() {
    return "%";
  }function er(t) {
    var n = t.length;return function (e) {
      return t[Math.max(0, Math.min(n - 1, Math.floor(e * n)))];
    };
  }function rr(t) {
    return t < 0 ? -1 : 1;
  }function ir(t, n, e) {
    var r = t._x1 - t._x0,
        i = n - t._x1,
        o = (t._y1 - t._y0) / (r || i < 0 && -0),
        a = (e - t._y1) / (i || r < 0 && -0),
        u = (o * i + a * r) / (r + i);return (rr(o) + rr(a)) * Math.min(Math.abs(o), Math.abs(a), .5 * Math.abs(u)) || 0;
  }function or(t, n) {
    var e = t._x1 - t._x0;return e ? (3 * (t._y1 - t._y0) / e - n) / 2 : n;
  }function ar(t, n, e) {
    var r = t._x0,
        i = t._y0,
        o = t._x1,
        a = t._y1,
        u = (o - r) / 3;t._context.bezierCurveTo(r + u, i + u * n, o - u, a - u * e, o, a);
  }function ur(t) {
    this._context = t;
  }function cr(t) {
    this._context = t;
  }function fr(t, n, e) {
    this.target = t, this.type = n, this.transform = e;
  }function sr(t, n, e) {
    this.k = t, this.x = n, this.y = e;
  }function hr() {
    t.event.stopImmediatePropagation();
  }function lr() {
    return !t.event.button;
  }function dr() {
    var t,
        n,
        e = this;return e instanceof SVGElement ? (t = (e = e.ownerSVGElement || e).width.baseVal.value, n = e.height.baseVal.value) : (t = e.clientWidth, n = e.clientHeight), [[0, 0], [t, n]];
  }function pr() {
    return this.__zoom || oa;
  }function vr() {
    return -t.event.deltaY * (t.event.deltaMode ? 120 : 1) / 500;
  }function yr() {
    return "ontouchstart" in this;
  }var gr = { value: function value() {} };e.prototype = n.prototype = { constructor: e, on: function on(t, n) {
      var e,
          a = this._,
          u = r(t + "", a),
          c = -1,
          f = u.length;{
        if (!(arguments.length < 2)) {
          if (null != n && "function" != typeof n) throw new Error("invalid callback: " + n);for (; ++c < f;) {
            if (e = (t = u[c]).type) a[e] = o(a[e], t.name, n);else if (null == n) for (e in a) {
              a[e] = o(a[e], t.name, null);
            }
          }return this;
        }for (; ++c < f;) {
          if ((e = (t = u[c]).type) && (e = i(a[e], t.name))) return e;
        }
      }
    }, copy: function copy() {
      var t = {},
          n = this._;for (var r in n) {
        t[r] = n[r].slice();
      }return new e(t);
    }, call: function call(t, n) {
      if ((e = arguments.length - 2) > 0) for (var e, r, i = new Array(e), o = 0; o < e; ++o) {
        i[o] = arguments[o + 2];
      }if (!this._.hasOwnProperty(t)) throw new Error("unknown type: " + t);for (o = 0, e = (r = this._[t]).length; o < e; ++o) {
        r[o].value.apply(n, i);
      }
    }, apply: function apply(t, n, e) {
      if (!this._.hasOwnProperty(t)) throw new Error("unknown type: " + t);for (var r = this._[t], i = 0, o = r.length; i < o; ++i) {
        r[i].value.apply(n, e);
      }
    } };var br = "http://www.w3.org/1999/xhtml",
      mr = { svg: "http://www.w3.org/2000/svg", xhtml: br, xlink: "http://www.w3.org/1999/xlink", xml: "http://www.w3.org/XML/1998/namespace", xmlns: "http://www.w3.org/2000/xmlns/" },
      _r = function _r(t) {
    var n = t += "",
        e = n.indexOf(":");return e >= 0 && "xmlns" !== (n = t.slice(0, e)) && (t = t.slice(e + 1)), mr.hasOwnProperty(n) ? { space: mr[n], local: t } : t;
  },
      wr = function wr(t) {
    var n = _r(t);return (n.local ? u : a)(n);
  },
      xr = function xr(t) {
    return function () {
      return this.matches(t);
    };
  };if ("undefined" != typeof document) {
    var Mr = document.documentElement;if (!Mr.matches) {
      var Tr = Mr.webkitMatchesSelector || Mr.msMatchesSelector || Mr.mozMatchesSelector || Mr.oMatchesSelector;xr = function xr(t) {
        return function () {
          return Tr.call(this, t);
        };
      };
    }
  }var Ar = xr,
      kr = {};t.event = null, "undefined" != typeof document && ("onmouseenter" in document.documentElement || (kr = { mouseenter: "mouseover", mouseleave: "mouseout" }));var Nr = function Nr() {
    for (var n, e = t.event; n = e.sourceEvent;) {
      e = n;
    }return e;
  },
      Cr = function Cr(t, n) {
    var e = t.ownerSVGElement || t;if (e.createSVGPoint) {
      var r = e.createSVGPoint();return r.x = n.clientX, r.y = n.clientY, r = r.matrixTransform(t.getScreenCTM().inverse()), [r.x, r.y];
    }var i = t.getBoundingClientRect();return [n.clientX - i.left - t.clientLeft, n.clientY - i.top - t.clientTop];
  },
      Sr = function Sr(t) {
    var n = Nr();return n.changedTouches && (n = n.changedTouches[0]), Cr(t, n);
  },
      zr = function zr(t) {
    return null == t ? p : function () {
      return this.querySelector(t);
    };
  },
      Ur = function Ur(t) {
    return null == t ? v : function () {
      return this.querySelectorAll(t);
    };
  },
      Dr = function Dr(t) {
    return new Array(t.length);
  };y.prototype = { constructor: y, appendChild: function appendChild(t) {
      return this._parent.insertBefore(t, this._next);
    }, insertBefore: function insertBefore(t, n) {
      return this._parent.insertBefore(t, n);
    }, querySelector: function querySelector(t) {
      return this._parent.querySelector(t);
    }, querySelectorAll: function querySelectorAll(t) {
      return this._parent.querySelectorAll(t);
    } };var Er = function Er(t) {
    return function () {
      return t;
    };
  },
      Yr = "$",
      Fr = function Fr(t) {
    return t.ownerDocument && t.ownerDocument.defaultView || t.document && t || t.defaultView;
  };F.prototype = { add: function add(t) {
      this._names.indexOf(t) < 0 && (this._names.push(t), this._node.setAttribute("class", this._names.join(" ")));
    }, remove: function remove(t) {
      var n = this._names.indexOf(t);n >= 0 && (this._names.splice(n, 1), this._node.setAttribute("class", this._names.join(" ")));
    }, contains: function contains(t) {
      return this._names.indexOf(t) >= 0;
    } };var qr = [null];tt.prototype = nt.prototype = { constructor: tt, select: function select(t) {
      "function" != typeof t && (t = zr(t));for (var n = this._groups, e = n.length, r = new Array(e), i = 0; i < e; ++i) {
        for (var o, a, u = n[i], c = u.length, f = r[i] = new Array(c), s = 0; s < c; ++s) {
          (o = u[s]) && (a = t.call(o, o.__data__, s, u)) && ("__data__" in o && (a.__data__ = o.__data__), f[s] = a);
        }
      }return new tt(r, this._parents);
    }, selectAll: function selectAll(t) {
      "function" != typeof t && (t = Ur(t));for (var n = this._groups, e = n.length, r = [], i = [], o = 0; o < e; ++o) {
        for (var a, u = n[o], c = u.length, f = 0; f < c; ++f) {
          (a = u[f]) && (r.push(t.call(a, a.__data__, f, u)), i.push(a));
        }
      }return new tt(r, i);
    }, filter: function filter(t) {
      "function" != typeof t && (t = Ar(t));for (var n = this._groups, e = n.length, r = new Array(e), i = 0; i < e; ++i) {
        for (var o, a = n[i], u = a.length, c = r[i] = [], f = 0; f < u; ++f) {
          (o = a[f]) && t.call(o, o.__data__, f, a) && c.push(o);
        }
      }return new tt(r, this._parents);
    }, data: function data(t, n) {
      if (!t) return d = new Array(this.size()), f = -1, this.each(function (t) {
        d[++f] = t;
      }), d;var e = n ? b : g,
          r = this._parents,
          i = this._groups;"function" != typeof t && (t = Er(t));for (var o = i.length, a = new Array(o), u = new Array(o), c = new Array(o), f = 0; f < o; ++f) {
        var s = r[f],
            h = i[f],
            l = h.length,
            d = t.call(s, s && s.__data__, f, r),
            p = d.length,
            v = u[f] = new Array(p),
            y = a[f] = new Array(p);e(s, h, v, y, c[f] = new Array(l), d, n);for (var m, _, w = 0, x = 0; w < p; ++w) {
          if (m = v[w]) {
            for (w >= x && (x = w + 1); !(_ = y[x]) && ++x < p;) {}m._next = _ || null;
          }
        }
      }return a = new tt(a, r), a._enter = u, a._exit = c, a;
    }, enter: function enter() {
      return new tt(this._enter || this._groups.map(Dr), this._parents);
    }, exit: function exit() {
      return new tt(this._exit || this._groups.map(Dr), this._parents);
    }, merge: function merge(t) {
      for (var n = this._groups, e = t._groups, r = n.length, i = e.length, o = Math.min(r, i), a = new Array(r), u = 0; u < o; ++u) {
        for (var c, f = n[u], s = e[u], h = f.length, l = a[u] = new Array(h), d = 0; d < h; ++d) {
          (c = f[d] || s[d]) && (l[d] = c);
        }
      }for (; u < r; ++u) {
        a[u] = n[u];
      }return new tt(a, this._parents);
    }, order: function order() {
      for (var t = this._groups, n = -1, e = t.length; ++n < e;) {
        for (var r, i = t[n], o = i.length - 1, a = i[o]; --o >= 0;) {
          (r = i[o]) && (a && a !== r.nextSibling && a.parentNode.insertBefore(r, a), a = r);
        }
      }return this;
    }, sort: function sort(t) {
      t || (t = m);for (var n = this._groups, e = n.length, r = new Array(e), i = 0; i < e; ++i) {
        for (var o, a = n[i], u = a.length, c = r[i] = new Array(u), f = 0; f < u; ++f) {
          (o = a[f]) && (c[f] = o);
        }c.sort(function (n, e) {
          return n && e ? t(n.__data__, e.__data__) : !n - !e;
        });
      }return new tt(r, this._parents).order();
    }, call: function call() {
      var t = arguments[0];return arguments[0] = this, t.apply(null, arguments), this;
    }, nodes: function nodes() {
      var t = new Array(this.size()),
          n = -1;return this.each(function () {
        t[++n] = this;
      }), t;
    }, node: function node() {
      for (var t = this._groups, n = 0, e = t.length; n < e; ++n) {
        for (var r = t[n], i = 0, o = r.length; i < o; ++i) {
          var a = r[i];if (a) return a;
        }
      }return null;
    }, size: function size() {
      var t = 0;return this.each(function () {
        ++t;
      }), t;
    }, empty: function empty() {
      return !this.node();
    }, each: function each(t) {
      for (var n = this._groups, e = 0, r = n.length; e < r; ++e) {
        for (var i, o = n[e], a = 0, u = o.length; a < u; ++a) {
          (i = o[a]) && t.call(i, i.__data__, a, o);
        }
      }return this;
    }, attr: function attr(t, n) {
      var e = _r(t);if (arguments.length < 2) {
        var r = this.node();return e.local ? r.getAttributeNS(e.space, e.local) : r.getAttribute(e);
      }return this.each((null == n ? e.local ? w : _ : "function" == typeof n ? e.local ? A : T : e.local ? M : x)(e, n));
    }, style: function style(t, n, e) {
      return arguments.length > 1 ? this.each((null == n ? k : "function" == typeof n ? C : N)(t, n, null == e ? "" : e)) : S(this.node(), t);
    }, property: function property(t, n) {
      return arguments.length > 1 ? this.each((null == n ? z : "function" == typeof n ? D : U)(t, n)) : this.node()[t];
    }, classed: function classed(t, n) {
      var e = E(t + "");if (arguments.length < 2) {
        for (var r = Y(this.node()), i = -1, o = e.length; ++i < o;) {
          if (!r.contains(e[i])) return !1;
        }return !0;
      }return this.each(("function" == typeof n ? j : n ? H : X)(e, n));
    }, text: function text(t) {
      return arguments.length ? this.each(null == t ? L : ("function" == typeof t ? I : O)(t)) : this.node().textContent;
    }, html: function html(t) {
      return arguments.length ? this.each(null == t ? $ : ("function" == typeof t ? V : R)(t)) : this.node().innerHTML;
    }, raise: function raise() {
      return this.each(B);
    }, lower: function lower() {
      return this.each(Z);
    }, append: function append(t) {
      var n = "function" == typeof t ? t : wr(t);return this.select(function () {
        return this.appendChild(n.apply(this, arguments));
      });
    }, insert: function insert(t, n) {
      var e = "function" == typeof t ? t : wr(t),
          r = null == n ? W : "function" == typeof n ? n : zr(n);return this.select(function () {
        return this.insertBefore(e.apply(this, arguments), r.apply(this, arguments) || null);
      });
    }, remove: function remove() {
      return this.each(J);
    }, datum: function datum(t) {
      return arguments.length ? this.property("__data__", t) : this.node().__data__;
    }, on: function on(t, n, e) {
      var r,
          i,
          o = s(t + ""),
          a = o.length;{
        if (!(arguments.length < 2)) {
          for (u = n ? l : h, null == e && (e = !1), r = 0; r < a; ++r) {
            this.each(u(o[r], n, e));
          }return this;
        }var u = this.node().__on;if (u) for (var c, f = 0, d = u.length; f < d; ++f) {
          for (r = 0, c = u[f]; r < a; ++r) {
            if ((i = o[r]).type === c.type && i.name === c.name) return c.value;
          }
        }
      }
    }, dispatch: function dispatch(t, n) {
      return this.each(("function" == typeof n ? Q : K)(t, n));
    } };var Pr = function Pr(t) {
    return "string" == typeof t ? new tt([[document.querySelector(t)]], [document.documentElement]) : new tt([[t]], qr);
  },
      Hr = function Hr(t, n, e) {
    arguments.length < 3 && (e = n, n = Nr().changedTouches);for (var r, i = 0, o = n ? n.length : 0; i < o; ++i) {
      if ((r = n[i]).identifier === e) return Cr(t, r);
    }return null;
  },
      Xr = function Xr() {
    t.event.preventDefault(), t.event.stopImmediatePropagation();
  },
      jr = function jr(t) {
    var n = t.document.documentElement,
        e = Pr(t).on("dragstart.drag", Xr, !0);"onselectstart" in n ? e.on("selectstart.drag", Xr, !0) : (n.__noselect = n.style.MozUserSelect, n.style.MozUserSelect = "none");
  },
      Lr = function Lr(t) {
    return function () {
      return t;
    };
  };it.prototype.on = function () {
    var t = this._.on.apply(this._, arguments);return t === this._ ? this : t;
  };var Or = function Or(t, n, e) {
    t.prototype = n.prototype = e, e.constructor = t;
  },
      Ir = "\\s*([+-]?\\d+)\\s*",
      $r = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)\\s*",
      Rr = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)%\\s*",
      Vr = /^#([0-9a-f]{3})$/,
      Br = /^#([0-9a-f]{6})$/,
      Zr = new RegExp("^rgb\\(" + [Ir, Ir, Ir] + "\\)$"),
      Wr = new RegExp("^rgb\\(" + [Rr, Rr, Rr] + "\\)$"),
      Jr = new RegExp("^rgba\\(" + [Ir, Ir, Ir, $r] + "\\)$"),
      Gr = new RegExp("^rgba\\(" + [Rr, Rr, Rr, $r] + "\\)$"),
      Kr = new RegExp("^hsl\\(" + [$r, Rr, Rr] + "\\)$"),
      Qr = new RegExp("^hsla\\(" + [$r, Rr, Rr, $r] + "\\)$"),
      ti = { aliceblue: 15792383, antiquewhite: 16444375, aqua: 65535, aquamarine: 8388564, azure: 15794175, beige: 16119260, bisque: 16770244, black: 0, blanchedalmond: 16772045, blue: 255, blueviolet: 9055202, brown: 10824234, burlywood: 14596231, cadetblue: 6266528, chartreuse: 8388352, chocolate: 13789470, coral: 16744272, cornflowerblue: 6591981, cornsilk: 16775388, crimson: 14423100, cyan: 65535, darkblue: 139, darkcyan: 35723, darkgoldenrod: 12092939, darkgray: 11119017, darkgreen: 25600, darkgrey: 11119017, darkkhaki: 12433259, darkmagenta: 9109643, darkolivegreen: 5597999, darkorange: 16747520, darkorchid: 10040012, darkred: 9109504, darksalmon: 15308410, darkseagreen: 9419919, darkslateblue: 4734347, darkslategray: 3100495, darkslategrey: 3100495, darkturquoise: 52945, darkviolet: 9699539, deeppink: 16716947, deepskyblue: 49151, dimgray: 6908265, dimgrey: 6908265, dodgerblue: 2003199, firebrick: 11674146, floralwhite: 16775920, forestgreen: 2263842, fuchsia: 16711935, gainsboro: 14474460, ghostwhite: 16316671, gold: 16766720, goldenrod: 14329120, gray: 8421504, green: 32768, greenyellow: 11403055, grey: 8421504, honeydew: 15794160, hotpink: 16738740, indianred: 13458524, indigo: 4915330, ivory: 16777200, khaki: 15787660, lavender: 15132410, lavenderblush: 16773365, lawngreen: 8190976, lemonchiffon: 16775885, lightblue: 11393254, lightcoral: 15761536, lightcyan: 14745599, lightgoldenrodyellow: 16448210, lightgray: 13882323, lightgreen: 9498256, lightgrey: 13882323, lightpink: 16758465, lightsalmon: 16752762, lightseagreen: 2142890, lightskyblue: 8900346, lightslategray: 7833753, lightslategrey: 7833753, lightsteelblue: 11584734, lightyellow: 16777184, lime: 65280, limegreen: 3329330, linen: 16445670, magenta: 16711935, maroon: 8388608, mediumaquamarine: 6737322, mediumblue: 205, mediumorchid: 12211667, mediumpurple: 9662683, mediumseagreen: 3978097, mediumslateblue: 8087790, mediumspringgreen: 64154, mediumturquoise: 4772300, mediumvioletred: 13047173, midnightblue: 1644912, mintcream: 16121850, mistyrose: 16770273, moccasin: 16770229, navajowhite: 16768685, navy: 128, oldlace: 16643558, olive: 8421376, olivedrab: 7048739, orange: 16753920, orangered: 16729344, orchid: 14315734, palegoldenrod: 15657130, palegreen: 10025880, paleturquoise: 11529966, palevioletred: 14381203, papayawhip: 16773077, peachpuff: 16767673, peru: 13468991, pink: 16761035, plum: 14524637, powderblue: 11591910, purple: 8388736, rebeccapurple: 6697881, red: 16711680, rosybrown: 12357519, royalblue: 4286945, saddlebrown: 9127187, salmon: 16416882, sandybrown: 16032864, seagreen: 3050327, seashell: 16774638, sienna: 10506797, silver: 12632256, skyblue: 8900331, slateblue: 6970061, slategray: 7372944, slategrey: 7372944, snow: 16775930, springgreen: 65407, steelblue: 4620980, tan: 13808780, teal: 32896, thistle: 14204888, tomato: 16737095, turquoise: 4251856, violet: 15631086, wheat: 16113331, white: 16777215, whitesmoke: 16119285, yellow: 16776960, yellowgreen: 10145074 };Or(st, ht, { displayable: function displayable() {
      return this.rgb().displayable();
    }, toString: function toString() {
      return this.rgb() + "";
    } }), Or(yt, vt, ft(st, { brighter: function brighter(t) {
      return t = null == t ? 1 / .7 : Math.pow(1 / .7, t), new yt(this.r * t, this.g * t, this.b * t, this.opacity);
    }, darker: function darker(t) {
      return t = null == t ? .7 : Math.pow(.7, t), new yt(this.r * t, this.g * t, this.b * t, this.opacity);
    }, rgb: function rgb() {
      return this;
    }, displayable: function displayable() {
      return 0 <= this.r && this.r <= 255 && 0 <= this.g && this.g <= 255 && 0 <= this.b && this.b <= 255 && 0 <= this.opacity && this.opacity <= 1;
    }, toString: function toString() {
      var t = this.opacity;return (1 === (t = isNaN(t) ? 1 : Math.max(0, Math.min(1, t))) ? "rgb(" : "rgba(") + Math.max(0, Math.min(255, Math.round(this.r) || 0)) + ", " + Math.max(0, Math.min(255, Math.round(this.g) || 0)) + ", " + Math.max(0, Math.min(255, Math.round(this.b) || 0)) + (1 === t ? ")" : ", " + t + ")");
    } })), Or(mt, function (t, n, e, r) {
    return 1 === arguments.length ? bt(t) : new mt(t, n, e, null == r ? 1 : r);
  }, ft(st, { brighter: function brighter(t) {
      return t = null == t ? 1 / .7 : Math.pow(1 / .7, t), new mt(this.h, this.s, this.l * t, this.opacity);
    }, darker: function darker(t) {
      return t = null == t ? .7 : Math.pow(.7, t), new mt(this.h, this.s, this.l * t, this.opacity);
    }, rgb: function rgb() {
      var t = this.h % 360 + 360 * (this.h < 0),
          n = isNaN(t) || isNaN(this.s) ? 0 : this.s,
          e = this.l,
          r = e + (e < .5 ? e : 1 - e) * n,
          i = 2 * e - r;return new yt(_t(t >= 240 ? t - 240 : t + 120, i, r), _t(t, i, r), _t(t < 120 ? t + 240 : t - 120, i, r), this.opacity);
    }, displayable: function displayable() {
      return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
    } }));var ni = Math.PI / 180,
      ei = 180 / Math.PI,
      ri = .95047,
      ii = 1,
      oi = 1.08883,
      ai = 4 / 29,
      ui = 6 / 29,
      ci = 3 * ui * ui,
      fi = ui * ui * ui;Or(xt, function (t, n, e, r) {
    return 1 === arguments.length ? wt(t) : new xt(t, n, e, null == r ? 1 : r);
  }, ft(st, { brighter: function brighter(t) {
      return new xt(this.l + 18 * (null == t ? 1 : t), this.a, this.b, this.opacity);
    }, darker: function darker(t) {
      return new xt(this.l - 18 * (null == t ? 1 : t), this.a, this.b, this.opacity);
    }, rgb: function rgb() {
      var t = (this.l + 16) / 116,
          n = isNaN(this.a) ? t : t + this.a / 500,
          e = isNaN(this.b) ? t : t - this.b / 200;return t = ii * Tt(t), n = ri * Tt(n), e = oi * Tt(e), new yt(At(3.2404542 * n - 1.5371385 * t - .4985314 * e), At(-.969266 * n + 1.8760108 * t + .041556 * e), At(.0556434 * n - .2040259 * t + 1.0572252 * e), this.opacity);
    } })), Or(Ct, function (t, n, e, r) {
    return 1 === arguments.length ? Nt(t) : new Ct(t, n, e, null == r ? 1 : r);
  }, ft(st, { brighter: function brighter(t) {
      return new Ct(this.h, this.c, this.l + 18 * (null == t ? 1 : t), this.opacity);
    }, darker: function darker(t) {
      return new Ct(this.h, this.c, this.l - 18 * (null == t ? 1 : t), this.opacity);
    }, rgb: function rgb() {
      return wt(this).rgb();
    } }));var si = -.14861,
      hi = 1.78277,
      li = -.29227,
      di = -.90649,
      pi = 1.97294,
      vi = pi * di,
      yi = pi * hi,
      gi = hi * li - di * si;Or(Ut, zt, ft(st, { brighter: function brighter(t) {
      return t = null == t ? 1 / .7 : Math.pow(1 / .7, t), new Ut(this.h, this.s, this.l * t, this.opacity);
    }, darker: function darker(t) {
      return t = null == t ? .7 : Math.pow(.7, t), new Ut(this.h, this.s, this.l * t, this.opacity);
    }, rgb: function rgb() {
      var t = isNaN(this.h) ? 0 : (this.h + 120) * ni,
          n = +this.l,
          e = isNaN(this.s) ? 0 : this.s * n * (1 - n),
          r = Math.cos(t),
          i = Math.sin(t);return new yt(255 * (n + e * (si * r + hi * i)), 255 * (n + e * (li * r + di * i)), 255 * (n + e * (pi * r)), this.opacity);
    } }));var bi,
      mi,
      _i,
      wi,
      xi = function xi(t) {
    return function () {
      return t;
    };
  },
      Mi = function t(n) {
    function e(t, n) {
      var e = r((t = vt(t)).r, (n = vt(n)).r),
          i = r(t.g, n.g),
          o = r(t.b, n.b),
          a = Ft(t.opacity, n.opacity);return function (n) {
        return t.r = e(n), t.g = i(n), t.b = o(n), t.opacity = a(n), t + "";
      };
    }var r = Yt(n);return e.gamma = t, e;
  }(1),
      Ti = function Ti(t, n) {
    return t = +t, n -= t, function (e) {
      return t + n * e;
    };
  },
      Ai = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
      ki = new RegExp(Ai.source, "g"),
      Ni = function Ni(t, n) {
    var e,
        r,
        i,
        o = Ai.lastIndex = ki.lastIndex = 0,
        a = -1,
        u = [],
        c = [];for (t += "", n += ""; (e = Ai.exec(t)) && (r = ki.exec(n));) {
      (i = r.index) > o && (i = n.slice(o, i), u[a] ? u[a] += i : u[++a] = i), (e = e[0]) === (r = r[0]) ? u[a] ? u[a] += r : u[++a] = r : (u[++a] = null, c.push({ i: a, x: Ti(e, r) })), o = ki.lastIndex;
    }return o < n.length && (i = n.slice(o), u[a] ? u[a] += i : u[++a] = i), u.length < 2 ? c[0] ? Pt(c[0].x) : qt(n) : (n = c.length, function (t) {
      for (var e, r = 0; r < n; ++r) {
        u[(e = c[r]).i] = e.x(t);
      }return u.join("");
    });
  },
      Ci = 180 / Math.PI,
      Si = { translateX: 0, translateY: 0, rotate: 0, skewX: 0, scaleX: 1, scaleY: 1 },
      zi = function zi(t, n, e, r, i, o) {
    var a, u, c;return (a = Math.sqrt(t * t + n * n)) && (t /= a, n /= a), (c = t * e + n * r) && (e -= t * c, r -= n * c), (u = Math.sqrt(e * e + r * r)) && (e /= u, r /= u, c /= u), t * r < n * e && (t = -t, n = -n, c = -c, a = -a), { translateX: i, translateY: o, rotate: Math.atan2(n, t) * Ci, skewX: Math.atan(c) * Ci, scaleX: a, scaleY: u };
  },
      Ui = Ht(function (t) {
    return "none" === t ? Si : (bi || (bi = document.createElement("DIV"), mi = document.documentElement, _i = document.defaultView), bi.style.transform = t, t = _i.getComputedStyle(mi.appendChild(bi), null).getPropertyValue("transform"), mi.removeChild(bi), t = t.slice(7, -1).split(","), zi(+t[0], +t[1], +t[2], +t[3], +t[4], +t[5]));
  }, "px, ", "px)", "deg)"),
      Di = Ht(function (t) {
    return null == t ? Si : (wi || (wi = document.createElementNS("http://www.w3.org/2000/svg", "g")), wi.setAttribute("transform", t), (t = wi.transform.baseVal.consolidate()) ? (t = t.matrix, zi(t.a, t.b, t.c, t.d, t.e, t.f)) : Si);
  }, ", ", ")", ")"),
      Ei = Math.SQRT2,
      Yi = function Yi(t, n) {
    var e,
        r,
        i = t[0],
        o = t[1],
        a = t[2],
        u = n[0],
        c = n[1],
        f = n[2],
        s = u - i,
        h = c - o,
        l = s * s + h * h;if (l < 1e-12) r = Math.log(f / a) / Ei, e = function e(t) {
      return [i + t * s, o + t * h, a * Math.exp(Ei * t * r)];
    };else {
      var d = Math.sqrt(l),
          p = (f * f - a * a + 4 * l) / (2 * a * 2 * d),
          v = (f * f - a * a - 4 * l) / (2 * f * 2 * d),
          y = Math.log(Math.sqrt(p * p + 1) - p),
          g = Math.log(Math.sqrt(v * v + 1) - v);r = (g - y) / Ei, e = function e(t) {
        var n = t * r,
            e = Xt(y),
            u = a / (2 * d) * (e * Lt(Ei * n + y) - jt(y));return [i + u * s, o + u * h, a * e / Xt(Ei * n + y)];
      };
    }return e.duration = 1e3 * r, e;
  };Ot(function (t, n) {
    var e = n - t;return e ? Dt(t, e > 180 || e < -180 ? e - 360 * Math.round(e / 360) : e) : xi(isNaN(t) ? n : t);
  });var Fi,
      qi,
      Pi = Ot(Ft),
      Hi = 0,
      Xi = 0,
      ji = 0,
      Li = 1e3,
      Oi = 0,
      Ii = 0,
      $i = 0,
      Ri = "object" == (typeof performance === "undefined" ? "undefined" : _typeof(performance)) && performance.now ? performance : Date,
      Vi = "object" == (typeof window === "undefined" ? "undefined" : _typeof(window)) && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function (t) {
    setTimeout(t, 17);
  };Rt.prototype = Vt.prototype = { constructor: Rt, restart: function restart(t, n, e) {
      if ("function" != typeof t) throw new TypeError("callback is not a function");e = (null == e ? It() : +e) + (null == n ? 0 : +n), this._next || qi === this || (qi ? qi._next = this : Fi = this, qi = this), this._call = t, this._time = e, Gt();
    }, stop: function stop() {
      this._call && (this._call = null, this._time = 1 / 0, Gt());
    } };var Bi = function Bi(t, n, e) {
    var r = new Rt();return n = null == n ? 0 : +n, r.restart(function (e) {
      r.stop(), t(e + n);
    }, n, e), r;
  },
      Zi = n("start", "end", "interrupt"),
      Wi = [],
      Ji = 0,
      Gi = 1,
      Ki = 2,
      Qi = 3,
      to = 4,
      no = 5,
      eo = 6,
      ro = function ro(t, n, e, r, i, o) {
    var a = t.__transition;if (a) {
      if (e in a) return;
    } else t.__transition = {};nn(t, e, { name: n, index: r, group: i, on: Zi, tween: Wi, time: o.time, delay: o.delay, duration: o.duration, ease: o.ease, timer: null, state: Ji });
  },
      io = function io(t, n) {
    var e,
        r,
        i,
        o = t.__transition,
        a = !0;if (o) {
      n = null == n ? null : n + "";for (i in o) {
        (e = o[i]).name === n ? (r = e.state > Ki && e.state < no, e.state = eo, e.timer.stop(), r && e.on.call("interrupt", t, t.__data__, e.index, e.group), delete o[i]) : a = !1;
      }a && delete t.__transition;
    }
  },
      oo = function oo(t, n) {
    var e;return ("number" == typeof n ? Ti : n instanceof ht ? Mi : (e = ht(n)) ? (n = e, Mi) : Ni)(t, n);
  },
      ao = nt.prototype.constructor,
      uo = 0,
      co = nt.prototype;Sn.prototype = function (t) {
    return nt().transition(t);
  }.prototype = { constructor: Sn, select: function select(t) {
      var n = this._name,
          e = this._id;"function" != typeof t && (t = zr(t));for (var r = this._groups, i = r.length, o = new Array(i), a = 0; a < i; ++a) {
        for (var u, c, f = r[a], s = f.length, h = o[a] = new Array(s), l = 0; l < s; ++l) {
          (u = f[l]) && (c = t.call(u, u.__data__, l, f)) && ("__data__" in u && (c.__data__ = u.__data__), h[l] = c, ro(h[l], n, e, l, h, tn(u, e)));
        }
      }return new Sn(o, this._parents, n, e);
    }, selectAll: function selectAll(t) {
      var n = this._name,
          e = this._id;"function" != typeof t && (t = Ur(t));for (var r = this._groups, i = r.length, o = [], a = [], u = 0; u < i; ++u) {
        for (var c, f = r[u], s = f.length, h = 0; h < s; ++h) {
          if (c = f[h]) {
            for (var l, d = t.call(c, c.__data__, h, f), p = tn(c, e), v = 0, y = d.length; v < y; ++v) {
              (l = d[v]) && ro(l, n, e, v, d, p);
            }o.push(d), a.push(c);
          }
        }
      }return new Sn(o, a, n, e);
    }, filter: function filter(t) {
      "function" != typeof t && (t = Ar(t));for (var n = this._groups, e = n.length, r = new Array(e), i = 0; i < e; ++i) {
        for (var o, a = n[i], u = a.length, c = r[i] = [], f = 0; f < u; ++f) {
          (o = a[f]) && t.call(o, o.__data__, f, a) && c.push(o);
        }
      }return new Sn(r, this._parents, this._name, this._id);
    }, merge: function merge(t) {
      if (t._id !== this._id) throw new Error();for (var n = this._groups, e = t._groups, r = n.length, i = e.length, o = Math.min(r, i), a = new Array(r), u = 0; u < o; ++u) {
        for (var c, f = n[u], s = e[u], h = f.length, l = a[u] = new Array(h), d = 0; d < h; ++d) {
          (c = f[d] || s[d]) && (l[d] = c);
        }
      }for (; u < r; ++u) {
        a[u] = n[u];
      }return new Sn(a, this._parents, this._name, this._id);
    }, selection: function selection() {
      return new ao(this._groups, this._parents);
    }, transition: function transition() {
      for (var t = this._name, n = this._id, e = zn(), r = this._groups, i = r.length, o = 0; o < i; ++o) {
        for (var a, u = r[o], c = u.length, f = 0; f < c; ++f) {
          if (a = u[f]) {
            var s = tn(a, n);ro(a, t, e, f, u, { time: s.time + s.delay + s.duration, delay: 0, duration: s.duration, ease: s.ease });
          }
        }
      }return new Sn(r, this._parents, t, e);
    }, call: co.call, nodes: co.nodes, node: co.node, size: co.size, empty: co.empty, each: co.each, on: function on(t, n) {
      var e = this._id;return arguments.length < 2 ? tn(this.node(), e).on.on(t) : this.each(_n(e, t, n));
    }, attr: function attr(t, n) {
      var e = _r(t),
          r = "transform" === e ? Di : oo;return this.attrTween(t, "function" == typeof n ? (e.local ? hn : sn)(e, r, on(this, "attr." + t, n)) : null == n ? (e.local ? un : an)(e) : (e.local ? fn : cn)(e, r, n + ""));
    }, attrTween: function attrTween(t, n) {
      var e = "attr." + t;if (arguments.length < 2) return (e = this.tween(e)) && e._value;if (null == n) return this.tween(e, null);if ("function" != typeof n) throw new Error();var r = _r(t);return this.tween(e, (r.local ? ln : dn)(r, n));
    }, style: function style(t, n, e) {
      var r = "transform" == (t += "") ? Ui : oo;return null == n ? this.styleTween(t, xn(t, r)).on("end.style." + t, Mn(t)) : this.styleTween(t, "function" == typeof n ? An(t, r, on(this, "style." + t, n)) : Tn(t, r, n + ""), e);
    }, styleTween: function styleTween(t, n, e) {
      var r = "style." + (t += "");if (arguments.length < 2) return (r = this.tween(r)) && r._value;if (null == n) return this.tween(r, null);if ("function" != typeof n) throw new Error();return this.tween(r, kn(t, n, null == e ? "" : e));
    }, text: function text(t) {
      return this.tween("text", "function" == typeof t ? Cn(on(this, "text", t)) : Nn(null == t ? "" : t + ""));
    }, remove: function remove() {
      return this.on("end.remove", wn(this._id));
    }, tween: function tween(t, n) {
      var e = this._id;if (t += "", arguments.length < 2) {
        for (var r, i = tn(this.node(), e).tween, o = 0, a = i.length; o < a; ++o) {
          if ((r = i[o]).name === t) return r.value;
        }return null;
      }return this.each((null == n ? en : rn)(e, t, n));
    }, delay: function delay(t) {
      var n = this._id;return arguments.length ? this.each(("function" == typeof t ? pn : vn)(n, t)) : tn(this.node(), n).delay;
    }, duration: function duration(t) {
      var n = this._id;return arguments.length ? this.each(("function" == typeof t ? yn : gn)(n, t)) : tn(this.node(), n).duration;
    }, ease: function ease(t) {
      var n = this._id;return arguments.length ? this.each(bn(n, t)) : tn(this.node(), n).ease;
    } };var fo = { time: null, delay: 0, duration: 250, ease: function ease(t) {
      return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
    } };nt.prototype.interrupt = function (t) {
    return this.each(function () {
      io(this, t);
    });
  }, nt.prototype.transition = function (t) {
    var n, e;t instanceof Sn ? (n = t._id, t = t._name) : (n = zn(), (e = fo).time = It(), t = null == t ? null : t + "");for (var r = this._groups, i = r.length, o = 0; o < i; ++o) {
      for (var a, u = r[o], c = u.length, f = 0; f < c; ++f) {
        (a = u[f]) && ro(a, t, n, f, u, e || Un(a, n));
      }
    }return new Sn(r, this._parents, t, n);
  };["e", "w"].map(Dn), ["n", "s"].map(Dn), ["n", "e", "s", "w", "nw", "ne", "se", "sw"].map(Dn);En.prototype = Yn.prototype = { constructor: En, has: function has(t) {
      return "$" + t in this;
    }, get: function get(t) {
      return this["$" + t];
    }, set: function set(t, n) {
      return this["$" + t] = n, this;
    }, remove: function remove(t) {
      var n = "$" + t;return n in this && delete this[n];
    }, clear: function clear() {
      for (var t in this) {
        "$" === t[0] && delete this[t];
      }
    }, keys: function keys() {
      var t = [];for (var n in this) {
        "$" === n[0] && t.push(n.slice(1));
      }return t;
    }, values: function values() {
      var t = [];for (var n in this) {
        "$" === n[0] && t.push(this[n]);
      }return t;
    }, entries: function entries() {
      var t = [];for (var n in this) {
        "$" === n[0] && t.push({ key: n.slice(1), value: this[n] });
      }return t;
    }, size: function size() {
      var t = 0;for (var n in this) {
        "$" === n[0] && ++t;
      }return t;
    }, empty: function empty() {
      for (var t in this) {
        if ("$" === t[0]) return !1;
      }return !0;
    }, each: function each(t) {
      for (var n in this) {
        "$" === n[0] && t(this[n], n.slice(1), this);
      }
    } };var so = {},
      ho = {},
      lo = 34,
      po = 10,
      vo = 13,
      yo = function yo(t) {
    function n(t, n) {
      function e() {
        if (f) return ho;if (s) return s = !1, so;var n,
            e,
            r = u;if (t.charCodeAt(r) === lo) {
          for (; u++ < a && t.charCodeAt(u) !== lo || t.charCodeAt(++u) === lo;) {}return (n = u) >= a ? f = !0 : (e = t.charCodeAt(u++)) === po ? s = !0 : e === vo && (s = !0, t.charCodeAt(u) === po && ++u), t.slice(r + 1, n - 1).replace(/""/g, '"');
        }for (; u < a;) {
          if ((e = t.charCodeAt(n = u++)) === po) s = !0;else if (e === vo) s = !0, t.charCodeAt(u) === po && ++u;else if (e !== o) continue;return t.slice(r, n);
        }return f = !0, t.slice(r, a);
      }var r,
          i = [],
          a = t.length,
          u = 0,
          c = 0,
          f = a <= 0,
          s = !1;for (t.charCodeAt(a - 1) === po && --a, t.charCodeAt(a - 1) === vo && --a; (r = e()) !== ho;) {
        for (var h = []; r !== so && r !== ho;) {
          h.push(r), r = e();
        }n && null == (h = n(h, c++)) || i.push(h);
      }return i;
    }function e(n) {
      return n.map(r).join(t);
    }function r(t) {
      return null == t ? "" : i.test(t += "") ? '"' + t.replace(/"/g, '""') + '"' : t;
    }var i = new RegExp('["' + t + "\n\r]"),
        o = t.charCodeAt(0);return { parse: function parse(t, e) {
        var r,
            i,
            o = n(t, function (t, n) {
          if (r) return r(t, n - 1);i = t, r = e ? qn(t, e) : Fn(t);
        });return o.columns = i, o;
      }, parseRows: n, format: function format(n, e) {
        return null == e && (e = Pn(n)), [e.map(r).join(t)].concat(n.map(function (n) {
          return e.map(function (t) {
            return r(n[t]);
          }).join(t);
        })).join("\n");
      }, formatRows: function formatRows(t) {
        return t.map(e).join("\n");
      } };
  },
      go = (yo(","), yo("\t"), function (t) {
    return function () {
      return t;
    };
  }),
      bo = function bo() {
    return 1e-6 * (Math.random() - .5);
  },
      mo = function mo(t, n, e, r, i) {
    this.node = t, this.x0 = n, this.y0 = e, this.x1 = r, this.y1 = i;
  },
      _o = Ln.prototype = On.prototype;_o.copy = function () {
    var t,
        n,
        e = new On(this._x, this._y, this._x0, this._y0, this._x1, this._y1),
        r = this._root;if (!r) return e;if (!r.length) return e._root = In(r), e;for (t = [{ source: r, target: e._root = new Array(4) }]; r = t.pop();) {
      for (var i = 0; i < 4; ++i) {
        (n = r.source[i]) && (n.length ? t.push({ source: n, target: r.target[i] = new Array(4) }) : r.target[i] = In(n));
      }
    }return e;
  }, _o.add = function (t) {
    var n = +this._x.call(null, t),
        e = +this._y.call(null, t);return Hn(this.cover(n, e), n, e, t);
  }, _o.addAll = function (t) {
    var n,
        e,
        r,
        i,
        o = t.length,
        a = new Array(o),
        u = new Array(o),
        c = 1 / 0,
        f = 1 / 0,
        s = -1 / 0,
        h = -1 / 0;for (e = 0; e < o; ++e) {
      isNaN(r = +this._x.call(null, n = t[e])) || isNaN(i = +this._y.call(null, n)) || (a[e] = r, u[e] = i, r < c && (c = r), r > s && (s = r), i < f && (f = i), i > h && (h = i));
    }for (s < c && (c = this._x0, s = this._x1), h < f && (f = this._y0, h = this._y1), this.cover(c, f).cover(s, h), e = 0; e < o; ++e) {
      Hn(this, a[e], u[e], t[e]);
    }return this;
  }, _o.cover = function (t, n) {
    if (isNaN(t = +t) || isNaN(n = +n)) return this;var e = this._x0,
        r = this._y0,
        i = this._x1,
        o = this._y1;if (isNaN(e)) i = (e = Math.floor(t)) + 1, o = (r = Math.floor(n)) + 1;else {
      if (!(e > t || t > i || r > n || n > o)) return this;var a,
          u,
          c = i - e,
          f = this._root;switch (u = (n < (r + o) / 2) << 1 | t < (e + i) / 2) {case 0:
          do {
            a = new Array(4), a[u] = f, f = a;
          } while ((c *= 2, i = e + c, o = r + c, t > i || n > o));break;case 1:
          do {
            a = new Array(4), a[u] = f, f = a;
          } while ((c *= 2, e = i - c, o = r + c, e > t || n > o));break;case 2:
          do {
            a = new Array(4), a[u] = f, f = a;
          } while ((c *= 2, i = e + c, r = o - c, t > i || r > n));break;case 3:
          do {
            a = new Array(4), a[u] = f, f = a;
          } while ((c *= 2, e = i - c, r = o - c, e > t || r > n));}this._root && this._root.length && (this._root = f);
    }return this._x0 = e, this._y0 = r, this._x1 = i, this._y1 = o, this;
  }, _o.data = function () {
    var t = [];return this.visit(function (n) {
      if (!n.length) do {
        t.push(n.data);
      } while (n = n.next);
    }), t;
  }, _o.extent = function (t) {
    return arguments.length ? this.cover(+t[0][0], +t[0][1]).cover(+t[1][0], +t[1][1]) : isNaN(this._x0) ? void 0 : [[this._x0, this._y0], [this._x1, this._y1]];
  }, _o.find = function (t, n, e) {
    var r,
        i,
        o,
        a,
        u,
        c,
        f,
        s = this._x0,
        h = this._y0,
        l = this._x1,
        d = this._y1,
        p = [],
        v = this._root;for (v && p.push(new mo(v, s, h, l, d)), null == e ? e = 1 / 0 : (s = t - e, h = n - e, l = t + e, d = n + e, e *= e); c = p.pop();) {
      if (!(!(v = c.node) || (i = c.x0) > l || (o = c.y0) > d || (a = c.x1) < s || (u = c.y1) < h)) if (v.length) {
        var y = (i + a) / 2,
            g = (o + u) / 2;p.push(new mo(v[3], y, g, a, u), new mo(v[2], i, g, y, u), new mo(v[1], y, o, a, g), new mo(v[0], i, o, y, g)), (f = (n >= g) << 1 | t >= y) && (c = p[p.length - 1], p[p.length - 1] = p[p.length - 1 - f], p[p.length - 1 - f] = c);
      } else {
        var b = t - +this._x.call(null, v.data),
            m = n - +this._y.call(null, v.data),
            _ = b * b + m * m;if (_ < e) {
          var w = Math.sqrt(e = _);s = t - w, h = n - w, l = t + w, d = n + w, r = v.data;
        }
      }
    }return r;
  }, _o.remove = function (t) {
    if (isNaN(o = +this._x.call(null, t)) || isNaN(a = +this._y.call(null, t))) return this;var n,
        e,
        r,
        i,
        o,
        a,
        u,
        c,
        f,
        s,
        h,
        l,
        d = this._root,
        p = this._x0,
        v = this._y0,
        y = this._x1,
        g = this._y1;if (!d) return this;if (d.length) for (;;) {
      if ((f = o >= (u = (p + y) / 2)) ? p = u : y = u, (s = a >= (c = (v + g) / 2)) ? v = c : g = c, n = d, !(d = d[h = s << 1 | f])) return this;if (!d.length) break;(n[h + 1 & 3] || n[h + 2 & 3] || n[h + 3 & 3]) && (e = n, l = h);
    }for (; d.data !== t;) {
      if (r = d, !(d = d.next)) return this;
    }return (i = d.next) && delete d.next, r ? (i ? r.next = i : delete r.next, this) : n ? (i ? n[h] = i : delete n[h], (d = n[0] || n[1] || n[2] || n[3]) && d === (n[3] || n[2] || n[1] || n[0]) && !d.length && (e ? e[l] = d : this._root = d), this) : (this._root = i, this);
  }, _o.removeAll = function (t) {
    for (var n = 0, e = t.length; n < e; ++n) {
      this.remove(t[n]);
    }return this;
  }, _o.root = function () {
    return this._root;
  }, _o.size = function () {
    var t = 0;return this.visit(function (n) {
      if (!n.length) do {
        ++t;
      } while (n = n.next);
    }), t;
  }, _o.visit = function (t) {
    var n,
        e,
        r,
        i,
        o,
        a,
        u = [],
        c = this._root;for (c && u.push(new mo(c, this._x0, this._y0, this._x1, this._y1)); n = u.pop();) {
      if (!t(c = n.node, r = n.x0, i = n.y0, o = n.x1, a = n.y1) && c.length) {
        var f = (r + o) / 2,
            s = (i + a) / 2;(e = c[3]) && u.push(new mo(e, f, s, o, a)), (e = c[2]) && u.push(new mo(e, r, s, f, a)), (e = c[1]) && u.push(new mo(e, f, i, o, s)), (e = c[0]) && u.push(new mo(e, r, i, f, s));
      }
    }return this;
  }, _o.visitAfter = function (t) {
    var n,
        e = [],
        r = [];for (this._root && e.push(new mo(this._root, this._x0, this._y0, this._x1, this._y1)); n = e.pop();) {
      var i = n.node;if (i.length) {
        var o,
            a = n.x0,
            u = n.y0,
            c = n.x1,
            f = n.y1,
            s = (a + c) / 2,
            h = (u + f) / 2;(o = i[0]) && e.push(new mo(o, a, u, s, h)), (o = i[1]) && e.push(new mo(o, s, u, c, h)), (o = i[2]) && e.push(new mo(o, a, h, s, f)), (o = i[3]) && e.push(new mo(o, s, h, c, f));
      }r.push(n);
    }for (; n = r.pop();) {
      t(n.node, n.x0, n.y0, n.x1, n.y1);
    }return this;
  }, _o.x = function (t) {
    return arguments.length ? (this._x = t, this) : this._x;
  }, _o.y = function (t) {
    return arguments.length ? (this._y = t, this) : this._y;
  };var wo,
      xo = 10,
      Mo = Math.PI * (3 - Math.sqrt(5)),
      To = function To(t, n) {
    if ((e = (t = n ? t.toExponential(n - 1) : t.toExponential()).indexOf("e")) < 0) return null;var e,
        r = t.slice(0, e);return [r.length > 1 ? r[0] + r.slice(2) : r, +t.slice(e + 1)];
  },
      Ao = function Ao(t, n) {
    var e = To(t, n);if (!e) return t + "";var r = e[0],
        i = e[1];return i < 0 ? "0." + new Array(-i).join("0") + r : r.length > i + 1 ? r.slice(0, i + 1) + "." + r.slice(i + 1) : r + new Array(i - r.length + 2).join("0");
  },
      ko = { "": function _(t, n) {
      t: for (var e, r = (t = t.toPrecision(n)).length, i = 1, o = -1; i < r; ++i) {
        switch (t[i]) {case ".":
            o = e = i;break;case "0":
            0 === o && (o = i), e = i;break;case "e":
            break t;default:
            o > 0 && (o = 0);}
      }return o > 0 ? t.slice(0, o) + t.slice(e + 1) : t;
    }, "%": function _(t, n) {
      return (100 * t).toFixed(n);
    }, b: function b(t) {
      return Math.round(t).toString(2);
    }, c: function c(t) {
      return t + "";
    }, d: function d(t) {
      return Math.round(t).toString(10);
    }, e: function e(t, n) {
      return t.toExponential(n);
    }, f: function f(t, n) {
      return t.toFixed(n);
    }, g: function g(t, n) {
      return t.toPrecision(n);
    }, o: function o(t) {
      return Math.round(t).toString(8);
    }, p: function p(t, n) {
      return Ao(100 * t, n);
    }, r: Ao, s: function s(t, n) {
      var e = To(t, n);if (!e) return t + "";var r = e[0],
          i = e[1],
          o = i - (wo = 3 * Math.max(-8, Math.min(8, Math.floor(i / 3)))) + 1,
          a = r.length;return o === a ? r : o > a ? r + new Array(o - a + 1).join("0") : o > 0 ? r.slice(0, o) + "." + r.slice(o) : "0." + new Array(1 - o).join("0") + To(t, Math.max(0, n + o - 1))[0];
    }, X: function X(t) {
      return Math.round(t).toString(16).toUpperCase();
    }, x: function x(t) {
      return Math.round(t).toString(16);
    } },
      No = /^(?:(.)?([<>=^]))?([+\-\( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?([a-z%])?$/i;(function (t) {
    if (!(n = No.exec(t))) throw new Error("invalid format: " + t);var n,
        e = n[1] || " ",
        r = n[2] || ">",
        i = n[3] || "-",
        o = n[4] || "",
        a = !!n[5],
        u = n[6] && +n[6],
        c = !!n[7],
        f = n[8] && +n[8].slice(1),
        s = n[9] || "";"n" === s ? (c = !0, s = "g") : ko[s] || (s = ""), (a || "0" === e && "=" === r) && (a = !0, e = "0", r = "="), this.fill = e, this.align = r, this.sign = i, this.symbol = o, this.zero = a, this.width = u, this.comma = c, this.precision = f, this.type = s;
  }).prototype.toString = function () {
    return this.fill + this.align + this.sign + this.symbol + (this.zero ? "0" : "") + (null == this.width ? "" : Math.max(1, 0 | this.width)) + (this.comma ? "," : "") + (null == this.precision ? "" : "." + Math.max(0, 0 | this.precision)) + this.type;
  };var Co = function Co() {
    return new Jn();
  };Jn.prototype = { constructor: Jn, reset: function reset() {
      this.s = this.t = 0;
    }, add: function add(t) {
      Gn(So, t, this.t), Gn(this, So.s, this.s), this.s ? this.t += So.t : this.s = So.t;
    }, valueOf: function valueOf() {
      return this.s;
    } };var So = new Jn(),
      zo = Math.PI,
      Uo = zo / 2,
      Do = Math.atan,
      Eo = Math.atan2,
      Yo = Math.cos,
      Fo = Math.sin,
      qo = Math.sqrt;Co(), Co(), Co(), Co(), Co(), Co(), Co(), Co();te(function (t) {
    return qo(2 / (1 + t));
  }).invert = ne(function (t) {
    return 2 * Qn(t / 2);
  }), te(function (t) {
    return (t = Kn(t)) && t / Fo(t);
  }).invert = ne(function (t) {
    return t;
  }), function (t, n) {
    var e = Yo(n),
        r = Yo(t) * e;return [e * Fo(t) / r, Fo(n) / r];
  }.invert = ne(Do), function (t, n) {
    return [Yo(n) * Fo(t), Fo(n)];
  }.invert = ne(Qn), function (t, n) {
    var e = Yo(n),
        r = 1 + Yo(t) * e;return [e * Fo(t) / r, Fo(n) / r];
  }.invert = ne(function (t) {
    return 2 * Do(t);
  });var Po = new Date(),
      Ho = new Date(),
      Xo = ee(function () {}, function (t, n) {
    t.setTime(+t + n);
  }, function (t, n) {
    return n - t;
  });Xo.every = function (t) {
    return t = Math.floor(t), isFinite(t) && t > 0 ? t > 1 ? ee(function (n) {
      n.setTime(Math.floor(n / t) * t);
    }, function (n, e) {
      n.setTime(+n + e * t);
    }, function (n, e) {
      return (e - n) / t;
    }) : Xo : null;
  };var jo = 6e4,
      Lo = 6048e5,
      Oo = (ee(function (t) {
    t.setTime(1e3 * Math.floor(t / 1e3));
  }, function (t, n) {
    t.setTime(+t + 1e3 * n);
  }, function (t, n) {
    return (n - t) / 1e3;
  }, function (t) {
    return t.getUTCSeconds();
  }), ee(function (t) {
    t.setTime(Math.floor(t / jo) * jo);
  }, function (t, n) {
    t.setTime(+t + n * jo);
  }, function (t, n) {
    return (n - t) / jo;
  }, function (t) {
    return t.getMinutes();
  }), ee(function (t) {
    var n = t.getTimezoneOffset() * jo % 36e5;n < 0 && (n += 36e5), t.setTime(36e5 * Math.floor((+t - n) / 36e5) + n);
  }, function (t, n) {
    t.setTime(+t + 36e5 * n);
  }, function (t, n) {
    return (n - t) / 36e5;
  }, function (t) {
    return t.getHours();
  }), ee(function (t) {
    t.setHours(0, 0, 0, 0);
  }, function (t, n) {
    t.setDate(t.getDate() + n);
  }, function (t, n) {
    return (n - t - (n.getTimezoneOffset() - t.getTimezoneOffset()) * jo) / 864e5;
  }, function (t) {
    return t.getDate() - 1;
  })),
      Io = re(0),
      $o = re(1),
      Ro = (re(2), re(3), re(4), re(5), re(6), ee(function (t) {
    t.setDate(1), t.setHours(0, 0, 0, 0);
  }, function (t, n) {
    t.setMonth(t.getMonth() + n);
  }, function (t, n) {
    return n.getMonth() - t.getMonth() + 12 * (n.getFullYear() - t.getFullYear());
  }, function (t) {
    return t.getMonth();
  }), ee(function (t) {
    t.setMonth(0, 1), t.setHours(0, 0, 0, 0);
  }, function (t, n) {
    t.setFullYear(t.getFullYear() + n);
  }, function (t, n) {
    return n.getFullYear() - t.getFullYear();
  }, function (t) {
    return t.getFullYear();
  }));Ro.every = function (t) {
    return isFinite(t = Math.floor(t)) && t > 0 ? ee(function (n) {
      n.setFullYear(Math.floor(n.getFullYear() / t) * t), n.setMonth(0, 1), n.setHours(0, 0, 0, 0);
    }, function (n, e) {
      n.setFullYear(n.getFullYear() + e * t);
    }) : null;
  };ee(function (t) {
    t.setUTCSeconds(0, 0);
  }, function (t, n) {
    t.setTime(+t + n * jo);
  }, function (t, n) {
    return (n - t) / jo;
  }, function (t) {
    return t.getUTCMinutes();
  }), ee(function (t) {
    t.setUTCMinutes(0, 0, 0);
  }, function (t, n) {
    t.setTime(+t + 36e5 * n);
  }, function (t, n) {
    return (n - t) / 36e5;
  }, function (t) {
    return t.getUTCHours();
  });var Vo = ee(function (t) {
    t.setUTCHours(0, 0, 0, 0);
  }, function (t, n) {
    t.setUTCDate(t.getUTCDate() + n);
  }, function (t, n) {
    return (n - t) / 864e5;
  }, function (t) {
    return t.getUTCDate() - 1;
  }),
      Bo = ie(0),
      Zo = ie(1),
      Wo = (ie(2), ie(3), ie(4), ie(5), ie(6), ee(function (t) {
    t.setUTCDate(1), t.setUTCHours(0, 0, 0, 0);
  }, function (t, n) {
    t.setUTCMonth(t.getUTCMonth() + n);
  }, function (t, n) {
    return n.getUTCMonth() - t.getUTCMonth() + 12 * (n.getUTCFullYear() - t.getUTCFullYear());
  }, function (t) {
    return t.getUTCMonth();
  }), ee(function (t) {
    t.setUTCMonth(0, 1), t.setUTCHours(0, 0, 0, 0);
  }, function (t, n) {
    t.setUTCFullYear(t.getUTCFullYear() + n);
  }, function (t, n) {
    return n.getUTCFullYear() - t.getUTCFullYear();
  }, function (t) {
    return t.getUTCFullYear();
  }));Wo.every = function (t) {
    return isFinite(t = Math.floor(t)) && t > 0 ? ee(function (n) {
      n.setUTCFullYear(Math.floor(n.getUTCFullYear() / t) * t), n.setUTCMonth(0, 1), n.setUTCHours(0, 0, 0, 0);
    }, function (n, e) {
      n.setUTCFullYear(n.getUTCFullYear() + e * t);
    }) : null;
  };var Jo,
      Go,
      Ko,
      Qo = { "-": "", _: " ", 0: "0" },
      ta = /^\s*\d+/,
      na = /^%/,
      ea = /[\\\^\$\*\+\?\|\[\]\(\)\.\{\}]/g;!function (t) {
    Jo = ce(t), Go = Jo.utcFormat, Ko = Jo.utcParse;
  }({ dateTime: "%x, %X", date: "%-m/%-d/%Y", time: "%-I:%M:%S %p", periods: ["AM", "PM"], days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"] });Date.prototype.toISOString || Go("%Y-%m-%dT%H:%M:%S.%LZ"), +new Date("2000-01-01T00:00:00.000Z") || Ko("%Y-%m-%dT%H:%M:%S.%LZ");var ra = function ra(t) {
    return t.match(/.{6}/g).map(function (t) {
      return "#" + t;
    });
  };ra("1f77b4ff7f0e2ca02cd627289467bd8c564be377c27f7f7fbcbd2217becf"), ra("393b795254a36b6ecf9c9ede6379398ca252b5cf6bcedb9c8c6d31bd9e39e7ba52e7cb94843c39ad494ad6616be7969c7b4173a55194ce6dbdde9ed6"), ra("3182bd6baed69ecae1c6dbefe6550dfd8d3cfdae6bfdd0a231a35474c476a1d99bc7e9c0756bb19e9ac8bcbddcdadaeb636363969696bdbdbdd9d9d9"), ra("1f77b4aec7e8ff7f0effbb782ca02c98df8ad62728ff98969467bdc5b0d58c564bc49c94e377c2f7b6d27f7f7fc7c7c7bcbd22dbdb8d17becf9edae5"), Pi(zt(300, .5, 0), zt(-240, .5, 1));Pi(zt(-100, .75, .35), zt(80, 1.5, .8)), Pi(zt(260, .75, .35), zt(80, 1.5, .8)), zt();er(ra("44015444025645045745055946075a46085c460a5d460b5e470d60470e6147106347116447136548146748166848176948186a481a6c481b6d481c6e481d6f481f70482071482173482374482475482576482677482878482979472a7a472c7a472d7b472e7c472f7d46307e46327e46337f463480453581453781453882443983443a83443b84433d84433e85423f854240864241864142874144874045884046883f47883f48893e49893e4a893e4c8a3d4d8a3d4e8a3c4f8a3c508b3b518b3b528b3a538b3a548c39558c39568c38588c38598c375a8c375b8d365c8d365d8d355e8d355f8d34608d34618d33628d33638d32648e32658e31668e31678e31688e30698e306a8e2f6b8e2f6c8e2e6d8e2e6e8e2e6f8e2d708e2d718e2c718e2c728e2c738e2b748e2b758e2a768e2a778e2a788e29798e297a8e297b8e287c8e287d8e277e8e277f8e27808e26818e26828e26828e25838e25848e25858e24868e24878e23888e23898e238a8d228b8d228c8d228d8d218e8d218f8d21908d21918c20928c20928c20938c1f948c1f958b1f968b1f978b1f988b1f998a1f9a8a1e9b8a1e9c891e9d891f9e891f9f881fa0881fa1881fa1871fa28720a38620a48621a58521a68522a78522a88423a98324aa8325ab8225ac8226ad8127ad8128ae8029af7f2ab07f2cb17e2db27d2eb37c2fb47c31b57b32b67a34b67935b77937b87838b9773aba763bbb753dbc743fbc7340bd7242be7144bf7046c06f48c16e4ac16d4cc26c4ec36b50c46a52c56954c56856c66758c7655ac8645cc8635ec96260ca6063cb5f65cb5e67cc5c69cd5b6ccd5a6ece5870cf5773d05675d05477d1537ad1517cd2507fd34e81d34d84d44b86d54989d5488bd6468ed64590d74393d74195d84098d83e9bd93c9dd93ba0da39a2da37a5db36a8db34aadc32addc30b0dd2fb2dd2db5de2bb8de29bade28bddf26c0df25c2df23c5e021c8e020cae11fcde11dd0e11cd2e21bd5e21ad8e219dae319dde318dfe318e2e418e5e419e7e419eae51aece51befe51cf1e51df4e61ef6e620f8e621fbe723fde725"));er(ra("00000401000501010601010802010902020b02020d03030f03031204041405041606051806051a07061c08071e0907200a08220b09240c09260d0a290e0b2b100b2d110c2f120d31130d34140e36150e38160f3b180f3d19103f1a10421c10441d11471e114920114b21114e22115024125325125527125829115a2a115c2c115f2d11612f116331116533106734106936106b38106c390f6e3b0f703d0f713f0f72400f74420f75440f764510774710784910784a10794c117a4e117b4f127b51127c52137c54137d56147d57157e59157e5a167e5c167f5d177f5f187f601880621980641a80651a80671b80681c816a1c816b1d816d1d816e1e81701f81721f817320817521817621817822817922827b23827c23827e24828025828125818326818426818627818827818928818b29818c29818e2a81902a81912b81932b80942c80962c80982d80992d809b2e7f9c2e7f9e2f7fa02f7fa1307ea3307ea5317ea6317da8327daa337dab337cad347cae347bb0357bb2357bb3367ab5367ab73779b83779ba3878bc3978bd3977bf3a77c03a76c23b75c43c75c53c74c73d73c83e73ca3e72cc3f71cd4071cf4070d0416fd2426fd3436ed5446dd6456cd8456cd9466bdb476adc4869de4968df4a68e04c67e24d66e34e65e44f64e55064e75263e85362e95462ea5661eb5760ec5860ed5a5fee5b5eef5d5ef05f5ef1605df2625df2645cf3655cf4675cf4695cf56b5cf66c5cf66e5cf7705cf7725cf8745cf8765cf9785df9795df97b5dfa7d5efa7f5efa815ffb835ffb8560fb8761fc8961fc8a62fc8c63fc8e64fc9065fd9266fd9467fd9668fd9869fd9a6afd9b6bfe9d6cfe9f6dfea16efea36ffea571fea772fea973feaa74feac76feae77feb078feb27afeb47bfeb67cfeb77efeb97ffebb81febd82febf84fec185fec287fec488fec68afec88cfeca8dfecc8ffecd90fecf92fed194fed395fed597fed799fed89afdda9cfddc9efddea0fde0a1fde2a3fde3a5fde5a7fde7a9fde9aafdebacfcecaefceeb0fcf0b2fcf2b4fcf4b6fcf6b8fcf7b9fcf9bbfcfbbdfcfdbf")), er(ra("00000401000501010601010802010a02020c02020e03021004031204031405041706041907051b08051d09061f0a07220b07240c08260d08290e092b10092d110a30120a32140b34150b37160b39180c3c190c3e1b0c411c0c431e0c451f0c48210c4a230c4c240c4f260c51280b53290b552b0b572d0b592f0a5b310a5c320a5e340a5f3609613809623909633b09643d09653e0966400a67420a68440a68450a69470b6a490b6a4a0c6b4c0c6b4d0d6c4f0d6c510e6c520e6d540f6d550f6d57106e59106e5a116e5c126e5d126e5f136e61136e62146e64156e65156e67166e69166e6a176e6c186e6d186e6f196e71196e721a6e741a6e751b6e771c6d781c6d7a1d6d7c1d6d7d1e6d7f1e6c801f6c82206c84206b85216b87216b88226a8a226a8c23698d23698f24699025689225689326679526679727669827669a28659b29649d29649f2a63a02a63a22b62a32c61a52c60a62d60a82e5fa92e5eab2f5ead305dae305cb0315bb1325ab3325ab43359b63458b73557b93556ba3655bc3754bd3853bf3952c03a51c13a50c33b4fc43c4ec63d4dc73e4cc83f4bca404acb4149cc4248ce4347cf4446d04545d24644d34743d44842d54a41d74b3fd84c3ed94d3dda4e3cdb503bdd513ade5238df5337e05536e15635e25734e35933e45a31e55c30e65d2fe75e2ee8602de9612bea632aeb6429eb6628ec6726ed6925ee6a24ef6c23ef6e21f06f20f1711ff1731df2741cf3761bf37819f47918f57b17f57d15f67e14f68013f78212f78410f8850ff8870ef8890cf98b0bf98c0af98e09fa9008fa9207fa9407fb9606fb9706fb9906fb9b06fb9d07fc9f07fca108fca309fca50afca60cfca80dfcaa0ffcac11fcae12fcb014fcb216fcb418fbb61afbb81dfbba1ffbbc21fbbe23fac026fac228fac42afac62df9c72ff9c932f9cb35f8cd37f8cf3af7d13df7d340f6d543f6d746f5d949f5db4cf4dd4ff4df53f4e156f3e35af3e55df2e661f2e865f2ea69f1ec6df1ed71f1ef75f1f179f2f27df2f482f3f586f3f68af4f88ef5f992f6fa96f8fb9af9fc9dfafda1fcffa4")), er(ra("0d088710078813078916078a19068c1b068d1d068e20068f2206902406912605912805922a05932c05942e05952f059631059733059735049837049938049a3a049a3c049b3e049c3f049c41049d43039e44039e46039f48039f4903a04b03a14c02a14e02a25002a25102a35302a35502a45601a45801a45901a55b01a55c01a65e01a66001a66100a76300a76400a76600a76700a86900a86a00a86c00a86e00a86f00a87100a87201a87401a87501a87701a87801a87a02a87b02a87d03a87e03a88004a88104a78305a78405a78606a68707a68808a68a09a58b0aa58d0ba58e0ca48f0da4910ea3920fa39410a29511a19613a19814a099159f9a169f9c179e9d189d9e199da01a9ca11b9ba21d9aa31e9aa51f99a62098a72197a82296aa2395ab2494ac2694ad2793ae2892b02991b12a90b22b8fb32c8eb42e8db52f8cb6308bb7318ab83289ba3388bb3488bc3587bd3786be3885bf3984c03a83c13b82c23c81c33d80c43e7fc5407ec6417dc7427cc8437bc9447aca457acb4679cc4778cc4977cd4a76ce4b75cf4c74d04d73d14e72d24f71d35171d45270d5536fd5546ed6556dd7566cd8576bd9586ada5a6ada5b69db5c68dc5d67dd5e66de5f65de6164df6263e06363e16462e26561e26660e3685fe4695ee56a5de56b5de66c5ce76e5be76f5ae87059e97158e97257ea7457eb7556eb7655ec7754ed7953ed7a52ee7b51ef7c51ef7e50f07f4ff0804ef1814df1834cf2844bf3854bf3874af48849f48948f58b47f58c46f68d45f68f44f79044f79143f79342f89441f89540f9973ff9983ef99a3efa9b3dfa9c3cfa9e3bfb9f3afba139fba238fca338fca537fca636fca835fca934fdab33fdac33fdae32fdaf31fdb130fdb22ffdb42ffdb52efeb72dfeb82cfeba2cfebb2bfebd2afebe2afec029fdc229fdc328fdc527fdc627fdc827fdca26fdcb26fccd25fcce25fcd025fcd225fbd324fbd524fbd724fad824fada24f9dc24f9dd25f8df25f8e125f7e225f7e425f6e626f6e826f5e926f5eb27f4ed27f3ee27f3f027f2f227f1f426f1f525f0f724f0f921"));ur.prototype = { areaStart: function areaStart() {
      this._line = 0;
    }, areaEnd: function areaEnd() {
      this._line = NaN;
    }, lineStart: function lineStart() {
      this._x0 = this._x1 = this._y0 = this._y1 = this._t0 = NaN, this._point = 0;
    }, lineEnd: function lineEnd() {
      switch (this._point) {case 2:
          this._context.lineTo(this._x1, this._y1);break;case 3:
          ar(this, this._t0, or(this, this._t0));}(this._line || 0 !== this._line && 1 === this._point) && this._context.closePath(), this._line = 1 - this._line;
    }, point: function point(t, n) {
      var e = NaN;if (t = +t, n = +n, t !== this._x1 || n !== this._y1) {
        switch (this._point) {case 0:
            this._point = 1, this._line ? this._context.lineTo(t, n) : this._context.moveTo(t, n);break;case 1:
            this._point = 2;break;case 2:
            this._point = 3, ar(this, or(this, e = ir(this, t, n)), e);break;default:
            ar(this, this._t0, e = ir(this, t, n));}this._x0 = this._x1, this._x1 = t, this._y0 = this._y1, this._y1 = n, this._t0 = e;
      }
    } }, (function (t) {
    this._context = new cr(t);
  }.prototype = Object.create(ur.prototype)).point = function (t, n) {
    ur.prototype.point.call(this, n, t);
  }, cr.prototype = { moveTo: function moveTo(t, n) {
      this._context.moveTo(n, t);
    }, closePath: function closePath() {
      this._context.closePath();
    }, lineTo: function lineTo(t, n) {
      this._context.lineTo(n, t);
    }, bezierCurveTo: function bezierCurveTo(t, n, e, r, i, o) {
      this._context.bezierCurveTo(n, t, r, e, o, i);
    } };var ia = function ia(t) {
    return function () {
      return t;
    };
  };sr.prototype = { constructor: sr, scale: function scale(t) {
      return 1 === t ? this : new sr(this.k * t, this.x, this.y);
    }, translate: function translate(t, n) {
      return 0 === t & 0 === n ? this : new sr(this.k, this.x + this.k * t, this.y + this.k * n);
    }, apply: function apply(t) {
      return [t[0] * this.k + this.x, t[1] * this.k + this.y];
    }, applyX: function applyX(t) {
      return t * this.k + this.x;
    }, applyY: function applyY(t) {
      return t * this.k + this.y;
    }, invert: function invert(t) {
      return [(t[0] - this.x) / this.k, (t[1] - this.y) / this.k];
    }, invertX: function invertX(t) {
      return (t - this.x) / this.k;
    }, invertY: function invertY(t) {
      return (t - this.y) / this.k;
    }, rescaleX: function rescaleX(t) {
      return t.copy().domain(t.range().map(this.invertX, this).map(t.invert, t));
    }, rescaleY: function rescaleY(t) {
      return t.copy().domain(t.range().map(this.invertY, this).map(t.invert, t));
    }, toString: function toString() {
      return "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")";
    } };var oa = new sr(1, 0, 0),
      aa = function aa() {
    t.event.preventDefault(), t.event.stopImmediatePropagation();
  };t.forceCollide = function (t) {
    function n() {
      for (var t, n, r, c, f, s, h, l = i.length, d = 0; d < u; ++d) {
        for (n = Ln(i, $n, Rn).visitAfter(e), t = 0; t < l; ++t) {
          r = i[t], s = o[r.index], h = s * s, c = r.x + r.vx, f = r.y + r.vy, n.visit(function (t, n, e, i, o) {
            var u = t.data,
                l = t.r,
                d = s + l;if (!u) return n > c + d || i < c - d || e > f + d || o < f - d;if (u.index > r.index) {
              var p = c - u.x - u.vx,
                  v = f - u.y - u.vy,
                  y = p * p + v * v;y < d * d && (0 === p && (p = bo(), y += p * p), 0 === v && (v = bo(), y += v * v), y = (d - (y = Math.sqrt(y))) / y * a, r.vx += (p *= y) * (d = (l *= l) / (h + l)), r.vy += (v *= y) * d, u.vx -= p * (d = 1 - d), u.vy -= v * d);
            }
          });
        }
      }
    }function e(t) {
      if (t.data) return t.r = o[t.data.index];for (var n = t.r = 0; n < 4; ++n) {
        t[n] && t[n].r > t.r && (t.r = t[n].r);
      }
    }function r() {
      if (i) {
        var n,
            e,
            r = i.length;for (o = new Array(r), n = 0; n < r; ++n) {
          e = i[n], o[e.index] = +t(e, n, i);
        }
      }
    }var i,
        o,
        a = 1,
        u = 1;return "function" != typeof t && (t = go(null == t ? 1 : +t)), n.initialize = function (t) {
      i = t, r();
    }, n.iterations = function (t) {
      return arguments.length ? (u = +t, n) : u;
    }, n.strength = function (t) {
      return arguments.length ? (a = +t, n) : a;
    }, n.radius = function (e) {
      return arguments.length ? (t = "function" == typeof e ? e : go(+e), r(), n) : t;
    }, n;
  }, t.forceLink = function (t) {
    function n(n) {
      for (var e = 0, r = t.length; e < d; ++e) {
        for (var i, u, c, s, h, l, p, v = 0; v < r; ++v) {
          u = (i = t[v]).source, s = (c = i.target).x + c.vx - u.x - u.vx || bo(), h = c.y + c.vy - u.y - u.vy || bo(), s *= l = ((l = Math.sqrt(s * s + h * h)) - a[v]) / l * n * o[v], h *= l, c.vx -= s * (p = f[v]), c.vy -= h * p, u.vx += s * (p = 1 - p), u.vy += h * p;
        }
      }
    }function e() {
      if (u) {
        var n,
            e,
            h = u.length,
            l = t.length,
            d = Yn(u, s);for (n = 0, c = new Array(h); n < l; ++n) {
          (e = t[n]).index = n, "object" != _typeof(e.source) && (e.source = Bn(d, e.source)), "object" != _typeof(e.target) && (e.target = Bn(d, e.target)), c[e.source.index] = (c[e.source.index] || 0) + 1, c[e.target.index] = (c[e.target.index] || 0) + 1;
        }for (n = 0, f = new Array(l); n < l; ++n) {
          e = t[n], f[n] = c[e.source.index] / (c[e.source.index] + c[e.target.index]);
        }o = new Array(l), r(), a = new Array(l), i();
      }
    }function r() {
      if (u) for (var n = 0, e = t.length; n < e; ++n) {
        o[n] = +h(t[n], n, t);
      }
    }function i() {
      if (u) for (var n = 0, e = t.length; n < e; ++n) {
        a[n] = +l(t[n], n, t);
      }
    }var o,
        a,
        u,
        c,
        f,
        s = Vn,
        h = function h(t) {
      return 1 / Math.min(c[t.source.index], c[t.target.index]);
    },
        l = go(30),
        d = 1;return null == t && (t = []), n.initialize = function (t) {
      u = t, e();
    }, n.links = function (r) {
      return arguments.length ? (t = r, e(), n) : t;
    }, n.id = function (t) {
      return arguments.length ? (s = t, n) : s;
    }, n.iterations = function (t) {
      return arguments.length ? (d = +t, n) : d;
    }, n.strength = function (t) {
      return arguments.length ? (h = "function" == typeof t ? t : go(+t), r(), n) : h;
    }, n.distance = function (t) {
      return arguments.length ? (l = "function" == typeof t ? t : go(+t), i(), n) : l;
    }, n;
  }, t.forceManyBody = function () {
    function t(t) {
      var n,
          u = i.length,
          c = Ln(i, Zn, Wn).visitAfter(e);for (a = t, n = 0; n < u; ++n) {
        o = i[n], c.visit(r);
      }
    }function n() {
      if (i) {
        var t,
            n,
            e = i.length;for (u = new Array(e), t = 0; t < e; ++t) {
          n = i[t], u[n.index] = +c(n, t, i);
        }
      }
    }function e(t) {
      var n,
          e,
          r,
          i,
          o,
          a = 0;if (t.length) {
        for (r = i = o = 0; o < 4; ++o) {
          (n = t[o]) && (e = n.value) && (a += e, r += e * n.x, i += e * n.y);
        }t.x = r / a, t.y = i / a;
      } else {
        (n = t).x = n.data.x, n.y = n.data.y;do {
          a += u[n.data.index];
        } while (n = n.next);
      }t.value = a;
    }function r(t, n, e, r) {
      if (!t.value) return !0;var i = t.x - o.x,
          c = t.y - o.y,
          l = r - n,
          d = i * i + c * c;if (l * l / h < d) return d < s && (0 === i && (i = bo(), d += i * i), 0 === c && (c = bo(), d += c * c), d < f && (d = Math.sqrt(f * d)), o.vx += i * t.value * a / d, o.vy += c * t.value * a / d), !0;if (!(t.length || d >= s)) {
        (t.data !== o || t.next) && (0 === i && (i = bo(), d += i * i), 0 === c && (c = bo(), d += c * c), d < f && (d = Math.sqrt(f * d)));do {
          t.data !== o && (l = u[t.data.index] * a / d, o.vx += i * l, o.vy += c * l);
        } while (t = t.next);
      }
    }var i,
        o,
        a,
        u,
        c = go(-30),
        f = 1,
        s = 1 / 0,
        h = .81;return t.initialize = function (t) {
      i = t, n();
    }, t.strength = function (e) {
      return arguments.length ? (c = "function" == typeof e ? e : go(+e), n(), t) : c;
    }, t.distanceMin = function (n) {
      return arguments.length ? (f = n * n, t) : Math.sqrt(f);
    }, t.distanceMax = function (n) {
      return arguments.length ? (s = n * n, t) : Math.sqrt(s);
    }, t.theta = function (n) {
      return arguments.length ? (h = n * n, t) : Math.sqrt(h);
    }, t;
  }, t.forceSimulation = function (t) {
    function e() {
      r(), p.call("tick", a), u < c && (d.stop(), p.call("end", a));
    }function r() {
      var n,
          e,
          r = t.length;for (u += (s - u) * f, l.each(function (t) {
        t(u);
      }), n = 0; n < r; ++n) {
        null == (e = t[n]).fx ? e.x += e.vx *= h : (e.x = e.fx, e.vx = 0), null == e.fy ? e.y += e.vy *= h : (e.y = e.fy, e.vy = 0);
      }
    }function i() {
      for (var n, e = 0, r = t.length; e < r; ++e) {
        if (n = t[e], n.index = e, isNaN(n.x) || isNaN(n.y)) {
          var i = xo * Math.sqrt(e),
              o = e * Mo;n.x = i * Math.cos(o), n.y = i * Math.sin(o);
        }(isNaN(n.vx) || isNaN(n.vy)) && (n.vx = n.vy = 0);
      }
    }function o(n) {
      return n.initialize && n.initialize(t), n;
    }var a,
        u = 1,
        c = .001,
        f = 1 - Math.pow(c, 1 / 300),
        s = 0,
        h = .6,
        l = Yn(),
        d = Vt(e),
        p = n("tick", "end");return null == t && (t = []), i(), a = { tick: r, restart: function restart() {
        return d.restart(e), a;
      }, stop: function stop() {
        return d.stop(), a;
      }, nodes: function nodes(n) {
        return arguments.length ? (t = n, i(), l.each(o), a) : t;
      }, alpha: function alpha(t) {
        return arguments.length ? (u = +t, a) : u;
      }, alphaMin: function alphaMin(t) {
        return arguments.length ? (c = +t, a) : c;
      }, alphaDecay: function alphaDecay(t) {
        return arguments.length ? (f = +t, a) : +f;
      }, alphaTarget: function alphaTarget(t) {
        return arguments.length ? (s = +t, a) : s;
      }, velocityDecay: function velocityDecay(t) {
        return arguments.length ? (h = 1 - t, a) : 1 - h;
      }, force: function force(t, n) {
        return arguments.length > 1 ? (null == n ? l.remove(t) : l.set(t, o(n)), a) : l.get(t);
      }, find: function find(n, e, r) {
        var i,
            o,
            a,
            u,
            c,
            f = 0,
            s = t.length;for (null == r ? r = 1 / 0 : r *= r, f = 0; f < s; ++f) {
          (a = (i = n - (u = t[f]).x) * i + (o = e - u.y) * o) < r && (c = u, r = a);
        }return c;
      }, on: function on(t, n) {
        return arguments.length > 1 ? (p.on(t, n), a) : p.on(t);
      } };
  }, t.select = Pr, t.drag = function () {
    function e(t) {
      t.on("mousedown.drag", r).filter(ct).on("touchstart.drag", a).on("touchmove.drag", u).on("touchend.drag touchcancel.drag", c).style("touch-action", "none").style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
    }function r() {
      if (!p && v.apply(this, arguments)) {
        var n = f("mouse", y.apply(this, arguments), Sr, this, arguments);n && (Pr(t.event.view).on("mousemove.drag", i, !0).on("mouseup.drag", o, !0), jr(t.event.view), et(), l = !1, s = t.event.clientX, h = t.event.clientY, n("start"));
      }
    }function i() {
      if (Xr(), !l) {
        var n = t.event.clientX - s,
            e = t.event.clientY - h;l = n * n + e * e > w;
      }b.mouse("drag");
    }function o() {
      Pr(t.event.view).on("mousemove.drag mouseup.drag", null), rt(t.event.view, l), Xr(), b.mouse("end");
    }function a() {
      if (v.apply(this, arguments)) {
        var n,
            e,
            r = t.event.changedTouches,
            i = y.apply(this, arguments),
            o = r.length;for (n = 0; n < o; ++n) {
          (e = f(r[n].identifier, i, Hr, this, arguments)) && (et(), e("start"));
        }
      }
    }function u() {
      var n,
          e,
          r = t.event.changedTouches,
          i = r.length;for (n = 0; n < i; ++n) {
        (e = b[r[n].identifier]) && (Xr(), e("drag"));
      }
    }function c() {
      var n,
          e,
          r = t.event.changedTouches,
          i = r.length;for (p && clearTimeout(p), p = setTimeout(function () {
        p = null;
      }, 500), n = 0; n < i; ++n) {
        (e = b[r[n].identifier]) && (et(), e("end"));
      }
    }function f(n, r, i, o, a) {
      var u,
          c,
          f,
          s = i(r, n),
          h = m.copy();if (d(new it(e, "beforestart", u, n, _, s[0], s[1], 0, 0, h), function () {
        return null != (t.event.subject = u = g.apply(o, a)) && (c = u.x - s[0] || 0, f = u.y - s[1] || 0, !0);
      })) return function t(l) {
        var p,
            v = s;switch (l) {case "start":
            b[n] = t, p = _++;break;case "end":
            delete b[n], --_;case "drag":
            s = i(r, n), p = _;}d(new it(e, l, u, n, p, s[0] + c, s[1] + f, s[0] - v[0], s[1] - v[1], h), h.apply, h, [l, o, a]);
      };
    }var s,
        h,
        l,
        p,
        v = ot,
        y = at,
        g = ut,
        b = {},
        m = n("start", "drag", "end"),
        _ = 0,
        w = 0;return e.filter = function (t) {
      return arguments.length ? (v = "function" == typeof t ? t : Lr(!!t), e) : v;
    }, e.container = function (t) {
      return arguments.length ? (y = "function" == typeof t ? t : Lr(t), e) : y;
    }, e.subject = function (t) {
      return arguments.length ? (g = "function" == typeof t ? t : Lr(t), e) : g;
    }, e.on = function () {
      var t = m.on.apply(m, arguments);return t === m ? e : t;
    }, e.clickDistance = function (t) {
      return arguments.length ? (w = (t = +t) * t, e) : Math.sqrt(w);
    }, e;
  }, t.zoom = function () {
    function e(t) {
      t.property("__zoom", pr).on("wheel.zoom", s).on("mousedown.zoom", h).on("dblclick.zoom", l).filter(yr).on("touchstart.zoom", p).on("touchmove.zoom", v).on("touchend.zoom touchcancel.zoom", y).style("touch-action", "none").style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
    }function r(t, n) {
      return (n = Math.max(x, Math.min(M, n))) === t.k ? t : new sr(n, t.x, t.y);
    }function i(t, n, e) {
      var r = n[0] - e[0] * t.k,
          i = n[1] - e[1] * t.k;return r === t.x && i === t.y ? t : new sr(t.k, r, i);
    }function o(t, n) {
      var e = t.invertX(n[0][0]) - T,
          r = t.invertX(n[1][0]) - A,
          i = t.invertY(n[0][1]) - k,
          o = t.invertY(n[1][1]) - N;return t.translate(r > e ? (e + r) / 2 : Math.min(0, e) || Math.max(0, r), o > i ? (i + o) / 2 : Math.min(0, i) || Math.max(0, o));
    }function a(t) {
      return [(+t[0][0] + +t[1][0]) / 2, (+t[0][1] + +t[1][1]) / 2];
    }function u(t, n, e) {
      t.on("start.zoom", function () {
        c(this, arguments).start();
      }).on("interrupt.zoom end.zoom", function () {
        c(this, arguments).end();
      }).tween("zoom", function () {
        var t = this,
            r = arguments,
            i = c(t, r),
            o = _.apply(t, r),
            u = e || a(o),
            f = Math.max(o[1][0] - o[0][0], o[1][1] - o[0][1]),
            s = t.__zoom,
            h = "function" == typeof n ? n.apply(t, r) : n,
            l = S(s.invert(u).concat(f / s.k), h.invert(u).concat(f / h.k));return function (t) {
          if (1 === t) t = h;else {
            var n = l(t),
                e = f / n[2];t = new sr(e, u[0] - n[0] * e, u[1] - n[1] * e);
          }i.zoom(null, t);
        };
      });
    }function c(t, n) {
      for (var e, r = 0, i = z.length; r < i; ++r) {
        if ((e = z[r]).that === t) return e;
      }return new f(t, n);
    }function f(t, n) {
      this.that = t, this.args = n, this.index = -1, this.active = 0, this.extent = _.apply(t, n);
    }function s() {
      if (m.apply(this, arguments)) {
        var t = c(this, arguments),
            n = this.__zoom,
            e = Math.max(x, Math.min(M, n.k * Math.pow(2, w.apply(this, arguments)))),
            a = Sr(this);if (t.wheel) t.mouse[0][0] === a[0] && t.mouse[0][1] === a[1] || (t.mouse[1] = n.invert(t.mouse[0] = a)), clearTimeout(t.wheel);else {
          if (n.k === e) return;t.mouse = [a, n.invert(a)], io(this), t.start();
        }aa(), t.wheel = setTimeout(function () {
          t.wheel = null, t.end();
        }, E), t.zoom("mouse", o(i(r(n, e), t.mouse[0], t.mouse[1]), t.extent));
      }
    }function h() {
      if (!b && m.apply(this, arguments)) {
        var n = c(this, arguments),
            e = Pr(t.event.view).on("mousemove.zoom", function () {
          if (aa(), !n.moved) {
            var e = t.event.clientX - a,
                r = t.event.clientY - u;n.moved = e * e + r * r > Y;
          }n.zoom("mouse", o(i(n.that.__zoom, n.mouse[0] = Sr(n.that), n.mouse[1]), n.extent));
        }, !0).on("mouseup.zoom", function () {
          e.on("mousemove.zoom mouseup.zoom", null), rt(t.event.view, n.moved), aa(), n.end();
        }, !0),
            r = Sr(this),
            a = t.event.clientX,
            u = t.event.clientY;jr(t.event.view), hr(), n.mouse = [r, this.__zoom.invert(r)], io(this), n.start();
      }
    }function l() {
      if (m.apply(this, arguments)) {
        var n = this.__zoom,
            a = Sr(this),
            c = n.invert(a),
            f = o(i(r(n, n.k * (t.event.shiftKey ? .5 : 2)), a, c), _.apply(this, arguments));aa(), C > 0 ? Pr(this).transition().duration(C).call(u, f, a) : Pr(this).call(e.transform, f);
      }
    }function p() {
      if (m.apply(this, arguments)) {
        var n,
            e,
            r,
            i,
            o = c(this, arguments),
            a = t.event.changedTouches,
            u = a.length;for (hr(), e = 0; e < u; ++e) {
          r = a[e], i = [i = Hr(this, a, r.identifier), this.__zoom.invert(i), r.identifier], o.touch0 ? o.touch1 || (o.touch1 = i) : (o.touch0 = i, n = !0);
        }if (g && (g = clearTimeout(g), !o.touch1)) return o.end(), void ((i = Pr(this).on("dblclick.zoom")) && i.apply(this, arguments));n && (g = setTimeout(function () {
          g = null;
        }, D), io(this), o.start());
      }
    }function v() {
      var n,
          e,
          a,
          u,
          f = c(this, arguments),
          s = t.event.changedTouches,
          h = s.length;for (aa(), g && (g = clearTimeout(g)), n = 0; n < h; ++n) {
        e = s[n], a = Hr(this, s, e.identifier), f.touch0 && f.touch0[2] === e.identifier ? f.touch0[0] = a : f.touch1 && f.touch1[2] === e.identifier && (f.touch1[0] = a);
      }if (e = f.that.__zoom, f.touch1) {
        var l = f.touch0[0],
            d = f.touch0[1],
            p = f.touch1[0],
            v = f.touch1[1],
            y = (y = p[0] - l[0]) * y + (y = p[1] - l[1]) * y,
            b = (b = v[0] - d[0]) * b + (b = v[1] - d[1]) * b;e = r(e, Math.sqrt(y / b)), a = [(l[0] + p[0]) / 2, (l[1] + p[1]) / 2], u = [(d[0] + v[0]) / 2, (d[1] + v[1]) / 2];
      } else {
        if (!f.touch0) return;a = f.touch0[0], u = f.touch0[1];
      }f.zoom("touch", o(i(e, a, u), f.extent));
    }function y() {
      var n,
          e,
          r = c(this, arguments),
          i = t.event.changedTouches,
          o = i.length;for (hr(), b && clearTimeout(b), b = setTimeout(function () {
        b = null;
      }, D), n = 0; n < o; ++n) {
        e = i[n], r.touch0 && r.touch0[2] === e.identifier ? delete r.touch0 : r.touch1 && r.touch1[2] === e.identifier && delete r.touch1;
      }r.touch1 && !r.touch0 && (r.touch0 = r.touch1, delete r.touch1), r.touch0 ? r.touch0[1] = this.__zoom.invert(r.touch0[0]) : r.end();
    }var g,
        b,
        m = lr,
        _ = dr,
        w = vr,
        x = 0,
        M = 1 / 0,
        T = -M,
        A = M,
        k = T,
        N = A,
        C = 250,
        S = Yi,
        z = [],
        U = n("start", "zoom", "end"),
        D = 500,
        E = 150,
        Y = 0;return e.transform = function (t, n) {
      var e = t.selection ? t.selection() : t;e.property("__zoom", pr), t !== e ? u(t, n) : e.interrupt().each(function () {
        c(this, arguments).start().zoom(null, "function" == typeof n ? n.apply(this, arguments) : n).end();
      });
    }, e.scaleBy = function (t, n) {
      e.scaleTo(t, function () {
        return this.__zoom.k * ("function" == typeof n ? n.apply(this, arguments) : n);
      });
    }, e.scaleTo = function (t, n) {
      e.transform(t, function () {
        var t = _.apply(this, arguments),
            e = this.__zoom,
            u = a(t),
            c = e.invert(u);return o(i(r(e, "function" == typeof n ? n.apply(this, arguments) : n), u, c), t);
      });
    }, e.translateBy = function (t, n, r) {
      e.transform(t, function () {
        return o(this.__zoom.translate("function" == typeof n ? n.apply(this, arguments) : n, "function" == typeof r ? r.apply(this, arguments) : r), _.apply(this, arguments));
      });
    }, e.translateTo = function (t, n, r) {
      e.transform(t, function () {
        var t = _.apply(this, arguments),
            e = this.__zoom,
            i = a(t);return o(oa.translate(i[0], i[1]).scale(e.k).translate("function" == typeof n ? -n.apply(this, arguments) : -n, "function" == typeof r ? -r.apply(this, arguments) : -r), t);
      });
    }, f.prototype = { start: function start() {
        return 1 == ++this.active && (this.index = z.push(this) - 1, this.emit("start")), this;
      }, zoom: function zoom(t, n) {
        return this.mouse && "mouse" !== t && (this.mouse[1] = n.invert(this.mouse[0])), this.touch0 && "touch" !== t && (this.touch0[1] = n.invert(this.touch0[0])), this.touch1 && "touch" !== t && (this.touch1[1] = n.invert(this.touch1[0])), this.that.__zoom = n, this.emit("zoom"), this;
      }, end: function end() {
        return 0 == --this.active && (z.splice(this.index, 1), this.index = -1, this.emit("end")), this;
      }, emit: function emit(t) {
        d(new fr(e, t, this.that.__zoom), U.apply, U, [t, this.that, this.args]);
      } }, e.wheelDelta = function (t) {
      return arguments.length ? (w = "function" == typeof t ? t : ia(+t), e) : w;
    }, e.filter = function (t) {
      return arguments.length ? (m = "function" == typeof t ? t : ia(!!t), e) : m;
    }, e.extent = function (t) {
      return arguments.length ? (_ = "function" == typeof t ? t : ia([[+t[0][0], +t[0][1]], [+t[1][0], +t[1][1]]]), e) : _;
    }, e.scaleExtent = function (t) {
      return arguments.length ? (x = +t[0], M = +t[1], e) : [x, M];
    }, e.translateExtent = function (t) {
      return arguments.length ? (T = +t[0][0], A = +t[1][0], k = +t[0][1], N = +t[1][1], e) : [[T, k], [A, N]];
    }, e.duration = function (t) {
      return arguments.length ? (C = +t, e) : C;
    }, e.interpolate = function (t) {
      return arguments.length ? (S = t, e) : S;
    }, e.on = function () {
      var t = U.on.apply(U, arguments);return t === U ? e : t;
    }, e.clickDistance = function (t) {
      return arguments.length ? (Y = (t = +t) * t, e) : Math.sqrt(Y);
    }, e;
  }, t.zoomIdentity = oa, Object.defineProperty(t, "__esModule", { value: !0 });
});

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/*
 * Return the dimensions (width & height) that some HTML
 * with a given style would take in the page.
 */
var getDimensions = exports.getDimensions = function getDimensions(html, style, classname) {
  var el = document.createElement('span');
  var dimensions = {};

  // Set display: inline-block so that the size of el
  // will depend on the size of its children.
  el.style.display = 'inline-block';

  // Hide the element (it will be added to the page for a short time).
  el.style.visibility = 'hidden';

  el.className = classname;
  el.innerHTML = html;

  // Apply CSS rules.
  Object.keys(style).forEach(function (rule) {
    el.style[rule] = style[rule];
  });
  document.body.append(el);

  dimensions.width = el.offsetWidth;
  dimensions.height = el.offsetHeight;

  el.remove();
  return dimensions;
};

/*
 * Return the dimensions of an SVG viewport calculated from
 * some given nodes.
 */
var getViewBox = exports.getViewBox = function getViewBox(nodes) {
  var Xs = [];
  var Ys = [];

  nodes.forEach(function (node) {
    var x = node.x || node.fx;
    var y = node.y || node.fy;

    if (x) {
      Xs.push(x);
    }

    if (y) {
      Ys.push(y);
    }
  });

  if (Xs.length === 0 || Ys.length === 0) {
    return '0 0 0 0';
  }

  // Find the smallest coordinates...
  var min = [Math.min.apply(Math, Xs) - 150, Math.min.apply(Math, Ys) - 150];

  // ...and the biggest ones.
  var max = [Math.max.apply(Math, Xs) - min[0] + 150, Math.max.apply(Math, Ys) - min[1] + 150];

  return min.join(' ') + ' ' + max.join(' ');
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Regex that matches all emojis in a string.
var matchEmojis = /([\uD800-\uDBFF][\uDC00-\uDFFF])/g;

// Emoji to category table.
var conversionTable = {
  '🗺': 'mindmap',
  '🌐': 'wiki',
  '🗂': 'stack exchange',
  '📝': 'course',
  '📖': 'free book',
  '📕': 'non-free book',
  '📄': 'paper',
  '👀': 'video',
  '🖋': 'article',
  '🗃': 'blog',
  '🐙': 'github',
  '👾': 'interactive',
  '🖌': 'image',
  '🎙': 'podcast',
  '📮': 'newsletter',
  '💬': 'chat',
  '🎥': 'youtube',
  '🤖': 'reddit',
  '🔎': 'quora',
  '🔗': undefined
};

// Category to emoji table, based on the table above.
var revConversionTable = {};

Object.keys(conversionTable).forEach(function (key) {
  revConversionTable[conversionTable[key]] = key;
});

/*
 * Return an emoji as a GitHub image.
 */
var emojiTemplate = function emojiTemplate(unicode, category) {
  return '<img class="mindmap-emoji" title="' + category + '" src="https://assets-cdn.github.com/images/icons/emoji/unicode/' + unicode + '.png">';
};

var customEmojiTemplate = function customEmojiTemplate(emoji, category) {
  return '<img class="mindmap-emoji" title="' + category + '" src="https://assets-cdn.github.com/images/icons/emoji/' + emoji + '.png">';
};

/*
 * Return the category represented by the given emoji.
 */
var emojiToCategory = function emojiToCategory(emoji) {
  return conversionTable[emoji] || '';
};

/*
 * Convert all emojis to an IMG tag.
 * The bitwise magic is explained at http://crocodillon.com/blog/parsing-emoji-unicode-in-javascript
 */
var emojiToIMG = function emojiToIMG(html) {
  return (
    /* eslint-disable no-bitwise */
    html.replace(matchEmojis, function (match) {
      switch (match) {
        case '🤖':
          return '<img class="mindmap-emoji reddit-emoji" title="reddit" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNpOQVZdTCyVamjJPl92KjaDHigNWVM8mOLHPRU4DHoVNJWxCg">';

        case '🗂':
          return '<img class="mindmap-emoji" title="stackexchange" src="https://cdn.sstatic.net/Sites/stackoverflow/company/img/logos/se/se-icon.png?v=93426798a1d4">';

        case '🐙':
          return customEmojiTemplate('octocat', 'github');

        case '🔎':
          return '<img class="mindmap-emoji" title="quora" src="https://www.shareicon.net/data/2016/11/03/849470_social_512x512.png">';

        // Regular unicode Emojis.
        default:
          {
            // Keep the first 10 bits.
            var lead = match.charCodeAt(0) & 0x3FF;
            var trail = match.charCodeAt(1) & 0x3FF;

            // 0x[lead][trail]
            var unicode = ((lead << 10) + trail).toString(16);

            return emojiTemplate('1' + unicode, emojiToCategory(match));
          }
      }
    })
    /* eslint-enable no-bitwise */

  );
};

/*
 * Inverse of emojiToCategory, but instead of returning an emoji
 * returns an IMG tag corresponding to that emoji.
 */
var categoryToIMG = function categoryToIMG(category) {
  return emojiToIMG(revConversionTable[category] || '');
};

module.exports = {
  matchEmojis: matchEmojis,
  emojiToIMG: emojiToIMG,
  emojiTemplate: emojiTemplate,
  emojiToCategory: emojiToCategory,
  categoryToIMG: categoryToIMG
};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _MindMap = __webpack_require__(9);

var _MindMap2 = _interopRequireDefault(_MindMap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _MindMap2.default;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(10);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(11);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _d = __webpack_require__(5);

var _d2 = __webpack_require__(16);

var _dimensions = __webpack_require__(6);

var _subnodesToHTML = __webpack_require__(17);

var _subnodesToHTML2 = _interopRequireDefault(_subnodesToHTML);

var _nodeToHTML = __webpack_require__(18);

var _nodeToHTML2 = _interopRequireDefault(_nodeToHTML);

__webpack_require__(19);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MindMap = function (_Component) {
  _inherits(MindMap, _Component);

  function MindMap(props) {
    _classCallCheck(this, MindMap);

    // Create force simulation to position nodes that have no coordinates,
    // and add it to the state.
    var _this = _possibleConstructorReturn(this, (MindMap.__proto__ || Object.getPrototypeOf(MindMap)).call(this, props));

    var simulation = (0, _d.forceSimulation)().force('link', (0, _d.forceLink)().id(function (node) {
      return node.text;
    })).force('charge', (0, _d.forceManyBody)()).force('collide', (0, _d.forceCollide)().radius(100));

    _this.state = { simulation: simulation };
    return _this;
  }

  /* eslint-disable no-param-reassign */
  /*
   * Generates HTML and dimensions for nodes and subnodes.
   */


  _createClass(MindMap, [{
    key: 'prepareNodes',
    value: function prepareNodes() {
      var render = function render(node) {
        node.html = (0, _nodeToHTML2.default)(node);
        node.nodesHTML = (0, _subnodesToHTML2.default)(node.nodes);

        var dimensions = (0, _dimensions.getDimensions)(node.html, {}, 'mindmap-node');
        node.width = dimensions.width;
        node.height = dimensions.height;

        var nodesDimensions = (0, _dimensions.getDimensions)(node.nodesHTML, {}, 'mindmap-subnode-text');
        node.nodesWidth = nodesDimensions.width;
        node.nodesHeight = nodesDimensions.height;
      };

      this.props.nodes.forEach(function (node) {
        return render(node);
      });
    }

    /*
     * Add new class to nodes, attach drag behavior, and start simulation.
     */

  }, {
    key: 'prepareEditor',
    value: function prepareEditor(svg, conns, nodes, subnodes) {
      var _this2 = this;

      nodes.attr('class', 'mindmap-node mindmap-node--editable').on('dblclick', function (node) {
        node.fx = null;
        node.fy = null;
      });

      nodes.call((0, _d2.d3Drag)(this.state.simulation, svg, nodes));

      // Tick the simulation 100 times.
      for (var i = 0; i < 100; i += 1) {
        this.state.simulation.tick();
      }
      (0, _d2.onTick)(conns, nodes, subnodes);

      setTimeout(function () {
        _this2.state.simulation.alphaTarget(0.5).on('tick', function () {
          return (0, _d2.onTick)(conns, nodes, subnodes);
        });
      }, 200);
    }
    /* eslint-enable no-param-reassign */

    /*
     * Render mind map using D3.
     */

  }, {
    key: 'renderMap',
    value: function renderMap() {
      var svg = (0, _d.select)(this.mountPoint);

      // Clear the SVG in case there's stuff already there.
      svg.selectAll('*').remove();

      // Add subnode group
      svg.append('g').attr('id', 'mindmap-subnodes');
      this.prepareNodes();

      // Bind data to SVG elements and set all the properties to render them.
      var connections = (0, _d2.d3Connections)(svg, this.props.connections);

      var _d3Nodes = (0, _d2.d3Nodes)(svg, this.props.nodes),
          nodes = _d3Nodes.nodes,
          subnodes = _d3Nodes.subnodes;

      nodes.append('title').text(function (node) {
        return node.note;
      });

      // Bind nodes and connections to the simulation.
      this.state.simulation.nodes(this.props.nodes).force('link').links(this.props.connections);

      if (this.props.editable) {
        this.prepareEditor(svg, connections, nodes, subnodes);
      }

      // Tick the simulation 100 times.
      for (var i = 0; i < 100; i += 1) {
        this.state.simulation.tick();
      }
      (0, _d2.onTick)(connections, nodes, subnodes);

      // Add pan and zoom behavior and remove double click to zoom.
      svg.attr('viewBox', (0, _dimensions.getViewBox)(nodes.data())).call((0, _d2.d3PanZoom)(svg)).on('dblclick.zoom', null);
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.renderMap();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      (0, _d.zoom)().transform((0, _d.select)(this.refs.mountPoint), _d.zoomIdentity);
      this.renderMap();
    }

    // eslint-disable-next-line class-methods-use-this

  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement('svg', { className: 'mindmap-svg', ref: function ref(input) {
            _this3.mountPoint = input;
          } })
      );
    }
  }]);

  return MindMap;
}(_react.Component);

exports.default = MindMap;


MindMap.defaultProps = {
  nodes: [],
  connections: [],
  editable: false
};

MindMap.propTypes = {
  nodes: _propTypes2.default.array,
  connections: _propTypes2.default.array,
  editable: _propTypes2.default.bool
};

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_10__;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

if (process.env.NODE_ENV !== 'production') {
  var REACT_ELEMENT_TYPE = typeof Symbol === 'function' && Symbol.for && Symbol.for('react.element') || 0xeac7;

  var isValidElement = function isValidElement(object) {
    return (typeof object === 'undefined' ? 'undefined' : _typeof(object)) === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
  };

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  module.exports = __webpack_require__(12)(isValidElement, throwOnDirectAccess);
} else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = __webpack_require__(15)();
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var emptyFunction = __webpack_require__(1);
var invariant = __webpack_require__(2);
var warning = __webpack_require__(4);
var assign = __webpack_require__(13);

var ReactPropTypesSecret = __webpack_require__(3);
var checkPropTypes = __webpack_require__(14);

module.exports = function (isValidElement, throwOnDirectAccess) {
  /* global Symbol */
  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

  /**
   * Returns the iterator method function contained on the iterable object.
   *
   * Be sure to invoke the function with the iterable as context:
   *
   *     var iteratorFn = getIteratorFn(myIterable);
   *     if (iteratorFn) {
   *       var iterator = iteratorFn.call(myIterable);
   *       ...
   *     }
   *
   * @param {?object} maybeIterable
   * @return {?function}
   */
  function getIteratorFn(maybeIterable) {
    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }

  /**
   * Collection of methods that allow declaration and validation of props that are
   * supplied to React components. Example usage:
   *
   *   var Props = require('ReactPropTypes');
   *   var MyArticle = React.createClass({
   *     propTypes: {
   *       // An optional string prop named "description".
   *       description: Props.string,
   *
   *       // A required enum prop named "category".
   *       category: Props.oneOf(['News','Photos']).isRequired,
   *
   *       // A prop named "dialog" that requires an instance of Dialog.
   *       dialog: Props.instanceOf(Dialog).isRequired
   *     },
   *     render: function() { ... }
   *   });
   *
   * A more formal specification of how these methods are used:
   *
   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
   *   decl := ReactPropTypes.{type}(.isRequired)?
   *
   * Each and every declaration produces a function with the same signature. This
   * allows the creation of custom validation functions. For example:
   *
   *  var MyLink = React.createClass({
   *    propTypes: {
   *      // An optional string or URI prop named "href".
   *      href: function(props, propName, componentName) {
   *        var propValue = props[propName];
   *        if (propValue != null && typeof propValue !== 'string' &&
   *            !(propValue instanceof URI)) {
   *          return new Error(
   *            'Expected a string or an URI for ' + propName + ' in ' +
   *            componentName
   *          );
   *        }
   *      }
   *    },
   *    render: function() {...}
   *  });
   *
   * @internal
   */

  var ANONYMOUS = '<<anonymous>>';

  // Important!
  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
  var ReactPropTypes = {
    array: createPrimitiveTypeChecker('array'),
    bool: createPrimitiveTypeChecker('boolean'),
    func: createPrimitiveTypeChecker('function'),
    number: createPrimitiveTypeChecker('number'),
    object: createPrimitiveTypeChecker('object'),
    string: createPrimitiveTypeChecker('string'),
    symbol: createPrimitiveTypeChecker('symbol'),

    any: createAnyTypeChecker(),
    arrayOf: createArrayOfTypeChecker,
    element: createElementTypeChecker(),
    instanceOf: createInstanceTypeChecker,
    node: createNodeChecker(),
    objectOf: createObjectOfTypeChecker,
    oneOf: createEnumTypeChecker,
    oneOfType: createUnionTypeChecker,
    shape: createShapeTypeChecker,
    exact: createStrictShapeTypeChecker
  };

  /**
   * inlined Object.is polyfill to avoid requiring consumers ship their own
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
   */
  /*eslint-disable no-self-compare*/
  function is(x, y) {
    // SameValue algorithm
    if (x === y) {
      // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return x !== 0 || 1 / x === 1 / y;
    } else {
      // Step 6.a: NaN == NaN
      return x !== x && y !== y;
    }
  }
  /*eslint-enable no-self-compare*/

  /**
   * We use an Error-like object for backward compatibility as people may call
   * PropTypes directly and inspect their output. However, we don't use real
   * Errors anymore. We don't inspect their stack anyway, and creating them
   * is prohibitively expensive if they are created too often, such as what
   * happens in oneOfType() for any type before the one that matched.
   */
  function PropTypeError(message) {
    this.message = message;
    this.stack = '';
  }
  // Make `instanceof Error` still work for returned errors.
  PropTypeError.prototype = Error.prototype;

  function createChainableTypeChecker(validate) {
    if (process.env.NODE_ENV !== 'production') {
      var manualPropTypeCallCache = {};
      var manualPropTypeWarningCount = 0;
    }
    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
      componentName = componentName || ANONYMOUS;
      propFullName = propFullName || propName;

      if (secret !== ReactPropTypesSecret) {
        if (throwOnDirectAccess) {
          // New behavior only for users of `prop-types` package
          invariant(false, 'Calling PropTypes validators directly is not supported by the `prop-types` package. ' + 'Use `PropTypes.checkPropTypes()` to call them. ' + 'Read more at http://fb.me/use-check-prop-types');
        } else if (process.env.NODE_ENV !== 'production' && typeof console !== 'undefined') {
          // Old behavior for people using React.PropTypes
          var cacheKey = componentName + ':' + propName;
          if (!manualPropTypeCallCache[cacheKey] &&
          // Avoid spamming the console because they are often not actionable except for lib authors
          manualPropTypeWarningCount < 3) {
            warning(false, 'You are manually calling a React.PropTypes validation ' + 'function for the `%s` prop on `%s`. This is deprecated ' + 'and will throw in the standalone `prop-types` package. ' + 'You may be seeing this warning due to a third-party PropTypes ' + 'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.', propFullName, componentName);
            manualPropTypeCallCache[cacheKey] = true;
            manualPropTypeWarningCount++;
          }
        }
      }
      if (props[propName] == null) {
        if (isRequired) {
          if (props[propName] === null) {
            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
          }
          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
        }
        return null;
      } else {
        return validate(props, propName, componentName, location, propFullName);
      }
    }

    var chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);

    return chainedCheckType;
  }

  function createPrimitiveTypeChecker(expectedType) {
    function validate(props, propName, componentName, location, propFullName, secret) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== expectedType) {
        // `propValue` being instance of, say, date/regexp, pass the 'object'
        // check, but we can offer a more precise error message here rather than
        // 'of type `object`'.
        var preciseType = getPreciseType(propValue);

        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createAnyTypeChecker() {
    return createChainableTypeChecker(emptyFunction.thatReturnsNull);
  }

  function createArrayOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
      }
      var propValue = props[propName];
      if (!Array.isArray(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
      }
      for (var i = 0; i < propValue.length; i++) {
        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);
        if (error instanceof Error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!isValidElement(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createInstanceTypeChecker(expectedClass) {
    function validate(props, propName, componentName, location, propFullName) {
      if (!(props[propName] instanceof expectedClass)) {
        var expectedClassName = expectedClass.name || ANONYMOUS;
        var actualClassName = getClassName(props[propName]);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createEnumTypeChecker(expectedValues) {
    if (!Array.isArray(expectedValues)) {
      process.env.NODE_ENV !== 'production' ? warning(false, 'Invalid argument supplied to oneOf, expected an instance of array.') : void 0;
      return emptyFunction.thatReturnsNull;
    }

    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      for (var i = 0; i < expectedValues.length; i++) {
        if (is(propValue, expectedValues[i])) {
          return null;
        }
      }

      var valuesString = JSON.stringify(expectedValues);
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + propValue + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createObjectOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
      }
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
      }
      for (var key in propValue) {
        if (propValue.hasOwnProperty(key)) {
          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
          if (error instanceof Error) {
            return error;
          }
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createUnionTypeChecker(arrayOfTypeCheckers) {
    if (!Array.isArray(arrayOfTypeCheckers)) {
      process.env.NODE_ENV !== 'production' ? warning(false, 'Invalid argument supplied to oneOfType, expected an instance of array.') : void 0;
      return emptyFunction.thatReturnsNull;
    }

    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
      var checker = arrayOfTypeCheckers[i];
      if (typeof checker !== 'function') {
        warning(false, 'Invalid argument supplied to oneOfType. Expected an array of check functions, but ' + 'received %s at index %s.', getPostfixForTypeWarning(checker), i);
        return emptyFunction.thatReturnsNull;
      }
    }

    function validate(props, propName, componentName, location, propFullName) {
      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];
        if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret) == null) {
          return null;
        }
      }

      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createNodeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      if (!isNode(props[propName])) {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      for (var key in shapeTypes) {
        var checker = shapeTypes[key];
        if (!checker) {
          continue;
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createStrictShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      // We need to check all keys in case some are required but missing from
      // props.
      var allKeys = assign({}, props[propName], shapeTypes);
      for (var key in allKeys) {
        var checker = shapeTypes[key];
        if (!checker) {
          return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' + '\nBad object: ' + JSON.stringify(props[propName], null, '  ') + '\nValid keys: ' + JSON.stringify(Object.keys(shapeTypes), null, '  '));
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function isNode(propValue) {
    switch (typeof propValue === 'undefined' ? 'undefined' : _typeof(propValue)) {
      case 'number':
      case 'string':
      case 'undefined':
        return true;
      case 'boolean':
        return !propValue;
      case 'object':
        if (Array.isArray(propValue)) {
          return propValue.every(isNode);
        }
        if (propValue === null || isValidElement(propValue)) {
          return true;
        }

        var iteratorFn = getIteratorFn(propValue);
        if (iteratorFn) {
          var iterator = iteratorFn.call(propValue);
          var step;
          if (iteratorFn !== propValue.entries) {
            while (!(step = iterator.next()).done) {
              if (!isNode(step.value)) {
                return false;
              }
            }
          } else {
            // Iterator will provide entry [k,v] tuples rather than values.
            while (!(step = iterator.next()).done) {
              var entry = step.value;
              if (entry) {
                if (!isNode(entry[1])) {
                  return false;
                }
              }
            }
          }
        } else {
          return false;
        }

        return true;
      default:
        return false;
    }
  }

  function isSymbol(propType, propValue) {
    // Native Symbol.
    if (propType === 'symbol') {
      return true;
    }

    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
    if (propValue['@@toStringTag'] === 'Symbol') {
      return true;
    }

    // Fallback for non-spec compliant Symbols which are polyfilled.
    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
      return true;
    }

    return false;
  }

  // Equivalent of `typeof` but with special handling for array and regexp.
  function getPropType(propValue) {
    var propType = typeof propValue === 'undefined' ? 'undefined' : _typeof(propValue);
    if (Array.isArray(propValue)) {
      return 'array';
    }
    if (propValue instanceof RegExp) {
      // Old webkits (at least until Android 4.0) return 'function' rather than
      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
      // passes PropTypes.object.
      return 'object';
    }
    if (isSymbol(propType, propValue)) {
      return 'symbol';
    }
    return propType;
  }

  // This handles more types than `getPropType`. Only used for error messages.
  // See `createPrimitiveTypeChecker`.
  function getPreciseType(propValue) {
    if (typeof propValue === 'undefined' || propValue === null) {
      return '' + propValue;
    }
    var propType = getPropType(propValue);
    if (propType === 'object') {
      if (propValue instanceof Date) {
        return 'date';
      } else if (propValue instanceof RegExp) {
        return 'regexp';
      }
    }
    return propType;
  }

  // Returns a string that is postfixed to a warning about an invalid type.
  // For example, "undefined" or "of type array"
  function getPostfixForTypeWarning(value) {
    var type = getPreciseType(value);
    switch (type) {
      case 'array':
      case 'object':
        return 'an ' + type;
      case 'boolean':
      case 'date':
      case 'regexp':
        return 'a ' + type;
      default:
        return type;
    }
  }

  // Returns class name of the object, if any.
  function getClassName(propValue) {
    if (!propValue.constructor || !propValue.constructor.name) {
      return ANONYMOUS;
    }
    return propValue.constructor.name;
  }

  ReactPropTypes.checkPropTypes = checkPropTypes;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */

var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc'); // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !== 'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

if (process.env.NODE_ENV !== 'production') {
  var invariant = __webpack_require__(2);
  var warning = __webpack_require__(4);
  var ReactPropTypesSecret = __webpack_require__(3);
  var loggedTypeFailures = {};
}

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */
function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
  if (process.env.NODE_ENV !== 'production') {
    for (var typeSpecName in typeSpecs) {
      if (typeSpecs.hasOwnProperty(typeSpecName)) {
        var error;
        // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.
        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          invariant(typeof typeSpecs[typeSpecName] === 'function', '%s: %s type `%s` is invalid; it must be a function, usually from ' + 'the `prop-types` package, but received `%s`.', componentName || 'React class', location, typeSpecName, _typeof(typeSpecs[typeSpecName]));
          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
        } catch (ex) {
          error = ex;
        }
        warning(!error || error instanceof Error, '%s: type specification of %s `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', location, typeSpecName, typeof error === 'undefined' ? 'undefined' : _typeof(error));
        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;

          var stack = getStack ? getStack() : '';

          warning(false, 'Failed %s type: %s%s', location, error.message, stack != null ? stack : '');
        }
      }
    }
  }
}

module.exports = checkPropTypes;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var emptyFunction = __webpack_require__(1);
var invariant = __webpack_require__(2);
var ReactPropTypesSecret = __webpack_require__(3);

module.exports = function () {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret) {
      // It is still safe when called from React.
      return;
    }
    invariant(false, 'Calling PropTypes validators directly is not supported by the `prop-types` package. ' + 'Use PropTypes.checkPropTypes() to call them. ' + 'Read more at http://fb.me/use-check-prop-types');
  };
  shim.isRequired = shim;
  function getShim() {
    return shim;
  };
  // Important!
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
  var ReactPropTypes = {
    array: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,

    any: shim,
    arrayOf: getShim,
    element: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim,
    exact: getShim
  };

  ReactPropTypes.checkPropTypes = emptyFunction;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.d3PanZoom = exports.d3Drag = exports.onTick = exports.d3Nodes = exports.d3Connections = undefined;

var _d = __webpack_require__(5);

var _dimensions = __webpack_require__(6);

/*
 * Bind data to a <TAG> tag, inside a G element, inside the given root element.
 * Root is a D3 selection, data is an object or array, tag is a string.
 */
var bindData = function bindData(root, data, tag) {
  return root.append('g').selectAll(tag).data(data).enter().append(tag);
};

/*
 * Bind connections to PATH tags on the given SVG.
 */
var d3Connections = exports.d3Connections = function d3Connections(svg, connections) {
  return bindData(svg, connections, 'path').attr('class', 'mindmap-connection');
};

/* eslint-disable no-param-reassign */
/*
 * Bind nodes to FOREIGNOBJECT tags on the given SVG,
 * and set dimensions and html.
 */
var d3Nodes = exports.d3Nodes = function d3Nodes(svg, nodes) {
  var selection = svg.append('g').selectAll('foreignObject').data(nodes).enter();

  var d3nodes = selection.append('foreignObject').attr('class', 'mindmap-node').attr('width', function (node) {
    return node.width + 4;
  }).attr('height', function (node) {
    return node.height;
  }).html(function (node) {
    return node.html;
  });

  var d3subnodes = selection.append('foreignObject').attr('class', 'mindmap-subnodes').attr('width', function (node) {
    return node.nodesWidth + 4;
  }).attr('height', function (node) {
    return node.nodesHeight;
  }).html(function (subnode) {
    return subnode.nodesHTML;
  });

  return {
    nodes: d3nodes,
    subnodes: d3subnodes
  };
};

/*
 * Callback for forceSimulation tick event.
 */
var onTick = exports.onTick = function onTick(conns, nodes, subnodes) {
  var d = function d(conn) {
    return ['M', conn.source.x, conn.source.y, 'Q', conn.source.x + (conn.curve && conn.curve.x ? conn.curve.x : 0), conn.source.y + (conn.curve && conn.curve.y ? conn.curve.y : 0), ',', conn.target.x, conn.target.y].join(' ');
  };

  // Set the connections path.
  conns.attr('d', d);

  // Set nodes position.
  nodes.attr('x', function (node) {
    return node.x - node.width / 2;
  }).attr('y', function (node) {
    return node.y - node.height / 2;
  });

  // Set subnodes groups color and position.
  subnodes.attr('x', function (node) {
    return node.x + node.width / 2;
  }).attr('y', function (node) {
    return node.y - node.nodesHeight / 2;
  });
};

/*
 * Return drag behavior to use on d3.selection.call().
 */
var d3Drag = exports.d3Drag = function d3Drag(simulation, svg, nodes) {
  var dragStart = function dragStart(node) {
    if (!_d.event.active) {
      simulation.alphaTarget(0.2).restart();
    }

    node.fx = node.x;
    node.fy = node.y;
  };

  var dragged = function dragged(node) {
    node.fx = _d.event.x;
    node.fy = _d.event.y;
  };

  var dragEnd = function dragEnd() {
    if (!_d.event.active) {
      simulation.alphaTarget(0);
    }

    svg.attr('viewBox', (0, _dimensions.getViewBox)(nodes.data()));
  };

  return (0, _d.drag)().on('start', dragStart).on('drag', dragged).on('end', dragEnd);
};
/* eslint-enable no-param-reassign */

/*
 * Return pan and zoom behavior to use on d3.selection.call().
 */
var d3PanZoom = exports.d3PanZoom = function d3PanZoom(el) {
  return (0, _d.zoom)().scaleExtent([0.3, 5]).on('zoom', function () {
    return el.selectAll('svg > g').attr('transform', _d.event.transform);
  });
};

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _emojis = __webpack_require__(7);

/*
 * Return the HTML representation of a node.
 * The node is an object that has text, url, and category attributes;
 * all of them optional.
 */
var subnodesToHTML = function subnodesToHTML() {
  var subnodes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var fcolor = arguments[1];

  var color = fcolor || '';

  if (!fcolor && subnodes.length > 0 && subnodes[0].color) {
    color = 'style="border-left-color: ' + subnodes[0].color + '"';
  }

  return subnodes.map(function (subnode) {
    var href = 'href="' + subnode.url + '"';
    var emoji = (0, _emojis.categoryToIMG)(subnode.category);

    if (!subnode.url) {
      href = '';
      emoji = '';
    }

    return '<div class="mindmap-subnode-group" ' + color + '>\n      <a ' + href + '>' + (subnode.text || '') + ' ' + emoji + '</a>\n      <div>' + subnodesToHTML(subnode.nodes, color) + '</div>\n    </div>';
  }).join('');
};

exports.default = subnodesToHTML;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _emojis = __webpack_require__(7);

/*
 * Return the HTML representation of a node.
 * The node is an object that has text, url, and category attributes;
 * all of them optional.
 */
exports.default = function (node) {
  var href = 'href="' + node.url + '"';
  var emoji = (0, _emojis.categoryToIMG)(node.category);

  // If url is not specified remove the emoji and the href attribute,
  // so that the node isn't clickable, and the user can see that without
  // having to hover the node.
  if (!node.url) {
    href = '';
    emoji = '';
  }

  return '<a id="node-' + node.index + '" ' + href + '>' + (node.text || '') + ' ' + emoji + '</a>';
};

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(20);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(22)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/postcss-loader/lib/index.js!../node_modules/sass-loader/lib/loader.js!./main.sass", function() {
			var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/postcss-loader/lib/index.js!../node_modules/sass-loader/lib/loader.js!./main.sass");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(21)(undefined);
// imports


// module
exports.push([module.i, ".mindmap-svg {\n  height: 100vh;\n  width: 100%; }\n  .mindmap-svg:focus {\n    outline: none; }\n\n.mindmap-node > a {\n  background: #f5f5f5;\n  border-radius: 10px;\n  -webkit-box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);\n          box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);\n  color: #212121;\n  display: inline-block;\n  font-family: 'Raleway';\n  font-size: 22px;\n  margin: 0 auto;\n  padding: 15px;\n  text-align: center;\n  text-decoration: none;\n  -webkit-transition: background-color .2s, color .2s ease-out;\n  transition: background-color .2s, color .2s ease-out; }\n  .mindmap-node > a[href]:hover {\n    background-color: #f57c00;\n    color: #fff;\n    cursor: pointer; }\n\n.mindmap-node--editable {\n  cursor: all-scroll; }\n  .mindmap-node--editable > a {\n    pointer-events: none; }\n\n.mindmap-subnode-group {\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  border-left: 4px solid #9e9e9e;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  margin-left: 15px;\n  padding: 5px; }\n  .mindmap-subnode-group a {\n    color: #212121;\n    font-family: 'Raleway';\n    font-size: 16px;\n    padding: 2px 5px; }\n\n.mindmap-connection {\n  fill: transparent;\n  stroke: #9e9e9e;\n  stroke-dasharray: 10px 4px;\n  stroke-width: 3px; }\n\n.mindmap-emoji {\n  height: 24px;\n  vertical-align: bottom;\n  width: 24px; }\n\n.reddit-emoji {\n  border-radius: 50%; }\n", ""]);

// exports


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function (useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if (item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function (modules, mediaQuery) {
		if (typeof modules === "string") modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for (var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if (typeof id === "number") alreadyImportedModules[id] = true;
		}
		for (i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if (typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if (mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if (mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */';
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			memo[selector] = fn.call(this, selector);
		}

		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(23);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton) options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
	// get current location
	var location = typeof window !== "undefined" && window.location;

	if (!location) {
		throw new Error("fixUrls requires window.location");
	}

	// blank or null?
	if (!css || typeof css !== "string") {
		return css;
	}

	var baseUrl = location.protocol + "//" + location.host;
	var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
 This regular expression is just a way to recursively match brackets within
 a string.
 	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
    (  = Start a capturing group
      (?:  = Start a non-capturing group
          [^)(]  = Match anything that isn't a parentheses
          |  = OR
          \(  = Match a start parentheses
              (?:  = Start another non-capturing groups
                  [^)(]+  = Match anything that isn't a parentheses
                  |  = OR
                  \(  = Match a start parentheses
                      [^)(]*  = Match anything that isn't a parentheses
                  \)  = Match a end parentheses
              )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
  \)  = Match a close parens
 	 /gi  = Get all matches, not the first.  Be case insensitive.
  */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function (fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl.trim().replace(/^"(.*)"$/, function (o, $1) {
			return $1;
		}).replace(/^'(.*)'$/, function (o, $1) {
			return $1;
		});

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
			return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
			//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};

/***/ })
/******/ ]);
});