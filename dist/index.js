(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["react"], factory);
	else if(typeof exports === 'object')
		exports["MindMap"] = factory(require("react"));
	else
		root["MindMap"] = factory(root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_9__) {
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(9);

var _react2 = _interopRequireDefault(_react);

var _panzoom = __webpack_require__(4);

var _panzoom2 = _interopRequireDefault(_panzoom);

var _utils = __webpack_require__(3);

__webpack_require__(8);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint-disable class-methods-use-this */


var panzoomInstance = void 0;

var MindMap = function (_Component) {
  _inherits(MindMap, _Component);

  function MindMap(props) {
    _classCallCheck(this, MindMap);

    var _this = _possibleConstructorReturn(this, (MindMap.__proto__ || Object.getPrototypeOf(MindMap)).call(this, props));

    _this.state = {
      fetched: props.connections && props.nodes,
      connections: props.connections || [],
      nodes: props.nodes || []
    };
    return _this;
  }

  // Request map and load nodes and connections to state.


  _createClass(MindMap, [{
    key: 'fetchMap',
    value: function fetchMap() {
      var _this2 = this;

      (0, _utils.getJSON)(this.props.url, function (res) {
        return _this2.setState({
          connections: res.connections,
          nodes: res.nodes,
          fetched: true
        });
      });
    }

    // Calculate SVG viewport dimensions from the nodes.

  }, {
    key: 'viewBox',
    value: function viewBox() {
      if (!this.state.fetched || this.state.nodes.length === 0) {
        return '0 0 0 0';
      }

      var Xs = [];
      var Ys = [];

      this.state.nodes.forEach(function (node) {
        node.nodes.forEach(function (subnode) {
          return Xs.push(subnode.location.x);
        });
        Xs.push(node.location.x);
      });

      this.state.nodes.forEach(function (node) {
        node.nodes.forEach(function (subnode) {
          return Ys.push(subnode.location.y);
        });
        Ys.push(node.location.y);
      });

      var minX = Math.round(Math.min.apply(Math, Xs) - 150);
      var minY = Math.round(Math.min.apply(Math, Ys) - 150);
      var maxX = Math.round(Math.max.apply(Math, Xs) - minX) + 150;
      var maxY = Math.round(Math.max.apply(Math, Ys) - minY) + 150;

      return minX + ' ' + minY + ' ' + maxX + ' ' + maxY;
    }
  }, {
    key: 'renderConnections',
    value: function renderConnections() {
      // Hashmap for nodes lookup.
      var nodes = {};
      this.state.nodes.forEach(function (node) {
        nodes[node.id] = node;
      });

      return this.state.connections.map(function (conn) {
        // Parameters for drawing a quadratic bezier curve.
        var d = ['M', nodes[conn.startNodeID].location.x, nodes[conn.startNodeID].location.y, 'Q', nodes[conn.startNodeID].location.x + conn.wayPointOffset.x, nodes[conn.startNodeID].location.y + conn.wayPointOffset.y, ',', nodes[conn.endNodeID].location.x, nodes[conn.endNodeID].location.y];

        return _react2.default.createElement('path', { className: 'mindmap-connection', d: d.join(' ') });
      });
    }
  }, {
    key: 'renderSubNodes',
    value: function renderSubNodes() {
      var subnodes = [];

      this.state.nodes.forEach(function (node) {
        node.nodes.forEach(function (subnode) {
          // Unstyled HTML with parsed emojis.
          var innerHTML = (0, _utils.parseEmojis)(subnode.title.text.replace(_utils.matchStyle, ''));

          // Get subnode dimensions.
          var dimensions = (0, _utils.htmlDimensions)(innerHTML, {
            maxWidth: subnode.title.maxWidth
          }, 'mindmap-subnode-text');

          // Find offset for centering subnodes.
          var cx = subnode.location.x;
          var cy = subnode.location.y - dimensions.height / 2;

          // Parameters for drawing subnode connection.
          var d = ['M', node.location.x, node.location.y, 'C', node.location.x + (subnode.location.x - node.location.x) / 2, node.location.y, ',', node.location.x + (subnode.location.x - node.location.x) / 2, subnode.location.y, ',', subnode.location.x, subnode.location.y];

          subnodes.push(_react2.default.createElement(
            'g',
            { className: 'mindmap-subnode' },
            _react2.default.createElement('path', {
              className: 'mindmap-subnode-connection',
              stroke: subnode.shapeStyle.borderStrokeStyle.color,
              d: d.join(' ')
            }),
            _react2.default.createElement('foreignObject', {
              className: 'mindmap-subnode-text',
              dangerouslySetInnerHTML: { __html: innerHTML },
              transform: 'translate(' + cx + ', ' + cy + ')',
              width: subnode.title.maxWidth,
              height: dimensions.height + 4
            })
          ));
        });
      });

      return subnodes;
    }
  }, {
    key: 'renderNodes',
    value: function renderNodes() {
      return this.state.nodes.map(function (node) {
        // Unstyled HTML with parsed emojis.
        var innerHTML = (0, _utils.parseEmojis)(node.title.text.replace(_utils.matchStyle, ''));

        // Get node dimensions.
        var dimensions = (0, _utils.htmlDimensions)(innerHTML, {
          maxWidth: node.title.maxWidth
        }, 'mindmap-node');

        // Find offset for centering nodes.
        var cx = node.location.x - node.title.maxWidth / 2;
        var cy = node.location.y - dimensions.height / 2;

        return _react2.default.createElement('foreignObject', {
          className: 'mindmap-node',
          dangerouslySetInnerHTML: { __html: innerHTML },
          transform: 'translate(' + cx + ', ' + cy + ')',
          width: node.title.maxWidth,
          height: dimensions.height + 4
        });
      });
    }
  }, {
    key: 'render',
    value: function render() {
      // Request map if url is specified and map hasn't been requested yet.
      if (this.props.url && !this.state.fetched) {
        this.fetchMap();
      }

      return _react2.default.createElement(
        'svg',
        { viewBox: this.viewBox(), className: 'mindmap-svg', draggable: true },
        _react2.default.createElement(
          'g',
          { className: 'mindmap-svg-inner' },
          _react2.default.createElement(
            'g',
            null,
            this.renderConnections()
          ),
          _react2.default.createElement(
            'g',
            null,
            this.renderSubNodes()
          ),
          _react2.default.createElement(
            'g',
            null,
            this.renderNodes()
          )
        )
      );
    }

    // Create panzoom instance for pan and zoom.

  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      panzoomInstance = (0, _panzoom2.default)(document.querySelector('.mindmap-svg-inner'));
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      // If URL has changed, reload the map.
      if (prevProps.url !== this.props.url) {
        this.setState({ fetched: false });
      }

      // If nodes or connections have changes update state and update map.
      if (prevProps.nodes !== this.props.nodes || prevProps.connections !== this.props.connections) {
        this.setState({
          fetched: true,
          nodes: this.props.nodes,
          connections: this.props.connections
        });
      }
    }

    // Destroy panzoom instance with all its listeners, to prevent memory leaking.

  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      panzoomInstance.dispose();
    }
  }]);

  return MindMap;
}(_react.Component);

exports.default = MindMap;


MindMap.propTypes = {
  url: _react.PropTypes.string,
  nodes: _react.PropTypes.array,
  connections: _react.PropTypes.array
};

/***/ }),
/* 1 */
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
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _MindMap = __webpack_require__(0);

var _MindMap2 = _interopRequireDefault(_MindMap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _MindMap2.default;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/* eslint no-bitwise:off */

/* Make a GET request to the specified url and call callback with JSON
 * response when done.
 */
var getJSON = exports.getJSON = function getJSON(url, done) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);

  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE && typeof done === 'function') {
      done(JSON.parse(xhr.responseText));
    }
  };

  xhr.send();
};

// Match style attributes in an HTML string.
var matchStyle = exports.matchStyle = /style="([^"]*)"|style='([^']*)'/g;

// Return an emoji as a GitHub image.
var emojiTemplate = exports.emojiTemplate = function emojiTemplate(unicode) {
  return '<img class="mindmap-emoji" src="https://assets-cdn.github.com/images/icons/emoji/unicode/' + unicode + '.png">';
};

var customEmojiTemplate = exports.customEmojiTemplate = function customEmojiTemplate(emoji) {
  return '<img class="mindmap-emoji" src="https://assets-cdn.github.com/images/icons/emoji/' + emoji + '.png">';
};

/* Convert all emojis in an HTML string to GitHub images.
 * The bitwise magic is explained at:
 *    http://crocodillon.com/blog/parsing-emoji-unicode-in-javascript
 */
var parseEmojis = exports.parseEmojis = function parseEmojis(html) {
  return html.replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, function (match) {
    if (match === '🐙') {
      return customEmojiTemplate('octocat');
    }
    if (match === '🤖') {
      return '<img class="mindmap-emoji reddit-emoji" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNpOQVZdTCyVamjJPl92KjaDHigNWVM8mOLHPRU4DHoVNJWxCg">';
    }
    if (match === '🗂') {
      return '<img class="mindmap-emoji" src="https://cdn.sstatic.net/Sites/stackoverflow/company/img/logos/se/se-icon.png?v=93426798a1d4">';
    }

    // Keep the first 10 bits.
    var lead = match.charCodeAt(0) & 0x3FF;
    var trail = match.charCodeAt(1) & 0x3FF;

    // 0x[lead][trail]
    var unicode = ((lead << 10) + trail).toString(16);

    return emojiTemplate('1' + unicode);
  });
};

/* Returns the dimensions that some html with a given style would take
 * in the DOM.
 */
var htmlDimensions = exports.htmlDimensions = function htmlDimensions(html, style, classname) {
  var el = document.createElement('span');
  var dimensions = {};

  el.style.display = 'inline-block';
  el.style.visibility = 'hidden';
  el.className = classname;
  el.innerHTML = html;

  Object.keys(style).forEach(function (rule) {
    el.style[rule] = style[rule];
  });
  document.body.append(el);

  dimensions.width = el.offsetWidth;
  dimensions.height = el.offsetHeight;

  el.remove();
  return dimensions;
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var require;var require;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function (f) {
  if (( false ? "undefined" : _typeof(exports)) === "object" && typeof module !== "undefined") {
    module.exports = f();
  } else if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (f),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {
    var g;if (typeof window !== "undefined") {
      g = window;
    } else if (typeof global !== "undefined") {
      g = global;
    } else if (typeof self !== "undefined") {
      g = self;
    } else {
      g = this;
    }g.panzoom = f();
  }
})(function () {
  var define, module, exports;return function e(t, n, r) {
    function s(o, u) {
      if (!n[o]) {
        if (!t[o]) {
          var a = typeof require == "function" && require;if (!u && a) return require(o, !0);if (i) return i(o, !0);var f = new Error("Cannot find module '" + o + "'");throw f.code = "MODULE_NOT_FOUND", f;
        }var l = n[o] = { exports: {} };t[o][0].call(l.exports, function (e) {
          var n = t[o][1][e];return s(n ? n : e);
        }, l, l.exports, e, t, n, r);
      }return n[o].exports;
    }var i = typeof require == "function" && require;for (var o = 0; o < r.length; o++) {
      s(r[o]);
    }return s;
  }({ 1: [function (require, module, exports) {
      var wheel = require("wheel");var animate = require("amator");var kinetic = require("./lib/kinetic.js");var createEvent = require("./lib/createEvent.js");var preventTextSelection = require("./lib/textSlectionInterceptor.js")();var getTransform = require("./lib/getSvgTransformMatrix.js");var Transform = require("./lib/transform.js");var defaultZoomSpeed = .065;var defaultDoubleTapZoomSpeed = 1.75;var doubleTapSpeedInMS = 300;module.exports = createPanZoom;function createPanZoom(svgElement, options) {
        var elementValid = svgElement instanceof SVGElement;var isDirty = false;var transform = new Transform();if (!elementValid) {
          throw new Error("svg element is required for svg.panzoom to work");
        }var frameAnimation;var owner = svgElement.ownerSVGElement;if (!owner) {
          throw new Error("Do not apply panzoom to the root <svg> element. " + "Use its child instead (e.g. <g></g>). " + "As of March 2016 only FireFox supported transform on the root element");
        }owner.setAttribute("tabindex", 1);options = options || {};var beforeWheel = options.beforeWheel || noop;var speed = typeof options.zoomSpeed === "number" ? options.zoomSpeed : defaultZoomSpeed;var bounds = options.bounds;validateBounds(bounds);var maxZoom = typeof options.maxZoom === "number" ? options.maxZoom : Number.POSITIVE_INFINITY;var minZoom = typeof options.minZoom === "number" ? options.minZoom : 0;var boundsPadding = typeof options.boundsPaddding === "number" ? options.boundsPaddding : .05;var zoomDoubleClickSpeed = typeof options.zoomDoubleClickSpeed === "number" ? options.zoomDoubleClickSpeed : defaultDoubleTapZoomSpeed;var lastTouchEndTime = 0;var touchInProgress = false;var panstartFired = false;var mouseX;var mouseY;var pinchZoomLength;var smoothScroll = kinetic(getRect, scroll);var moveByAnimation;var zoomToAnimation;var multitouch;listenForEvents();return { dispose: dispose, moveBy: internalMoveBy, moveTo: moveTo, centerOn: centerOn, zoomTo: publicZoomTo, zoomAbs: zoomAbs, getTransform: getTransformModel };function getTransformModel() {
          return transform;
        }function getRect() {
          return { x: transform.x, y: transform.y };
        }function moveTo(x, y) {
          transform.x = x;transform.y = y;keepTransformInsideBounds();triggerEvent("pan");makeDirty();
        }function moveBy(dx, dy) {
          moveTo(transform.x + dx, transform.y + dy);
        }function keepTransformInsideBounds() {
          var boundingBox = getBoundingBox();if (!boundingBox) return;var adjusted = false;var clientRect = getClientRect();var diff = boundingBox.left - clientRect.right;if (diff > 0) {
            transform.x += diff;adjusted = true;
          }diff = boundingBox.right - clientRect.left;if (diff < 0) {
            transform.x += diff;adjusted = true;
          }diff = boundingBox.top - clientRect.bottom;if (diff > 0) {
            transform.y += diff;adjusted = true;
          }diff = boundingBox.bottom - clientRect.top;if (diff < 0) {
            transform.y += diff;adjusted = true;
          }return adjusted;
        }function getBoundingBox() {
          if (!bounds) return;if (typeof bounds === "boolean") {
            var sceneWidth = owner.clientWidth;var sceneHeight = owner.clientHeight;return { left: sceneWidth * boundsPadding, top: sceneHeight * boundsPadding, right: sceneWidth * (1 - boundsPadding), bottom: sceneHeight * (1 - boundsPadding) };
          }return bounds;
        }function getClientRect() {
          var bbox = svgElement.getBBox();var leftTop = client(bbox.x, bbox.y);return { left: leftTop.x, top: leftTop.y, right: bbox.width * transform.scale + leftTop.x, bottom: bbox.height * transform.scale + leftTop.y };
        }function client(x, y) {
          return { x: x * transform.scale + transform.x, y: y * transform.scale + transform.y };
        }function makeDirty() {
          isDirty = true;frameAnimation = window.requestAnimationFrame(frame);
        }function zoomByRatio(clientX, clientY, ratio) {
          if (isNaN(clientX) || isNaN(clientY) || isNaN(ratio)) {
            throw new Error("zoom requires valid numbers");
          }var newScale = transform.scale * ratio;if (newScale > maxZoom || newScale < minZoom) {
            return;
          }var parentCTM = owner.getScreenCTM();var x = clientX * parentCTM.a - parentCTM.e;var y = clientY * parentCTM.a - parentCTM.f;transform.x = x - ratio * (x - transform.x);transform.y = y - ratio * (y - transform.y);var transformAdjusted = keepTransformInsideBounds();if (!transformAdjusted) transform.scale *= ratio;triggerEvent("zoom");makeDirty();
        }function zoomAbs(clientX, clientY, zoomLevel) {
          var ratio = zoomLevel / transform.scale;zoomByRatio(clientX, clientY, ratio);
        }function centerOn(ui) {
          var parent = ui.ownerSVGElement;if (!parent) throw new Error("ui element is required to be within the scene");var clientRect = ui.getBoundingClientRect();var cx = clientRect.left + clientRect.width / 2;var cy = clientRect.top + clientRect.height / 2;var container = parent.getBoundingClientRect();var dx = container.width / 2 - cx;var dy = container.height / 2 - cy;internalMoveBy(dx, dy, true);
        }function internalMoveBy(dx, dy, smooth) {
          if (!smooth) {
            return moveBy(dx, dy);
          }if (moveByAnimation) moveByAnimation.cancel();var from = { x: 0, y: 0 };var to = { x: dx, y: dy };var lastX = 0;var lastY = 0;moveByAnimation = animate(from, to, { step: function step(v) {
              moveBy(v.x - lastX, v.y - lastY);lastX = v.x;lastY = v.y;
            } });
        }function scroll(x, y) {
          cancelZoomAnimation();moveTo(x, y);
        }function dispose() {
          wheel.removeWheelListener(svgElement, onMouseWheel);owner.removeEventListener("mousedown", onMouseDown);owner.removeEventListener("keydown", onKeyDown);owner.removeEventListener("dblclick", onDoubleClick);if (frameAnimation) {
            window.cancelAnimationFrame(frameAnimation);frameAnimation = 0;
          }smoothScroll.cancel();releaseDocumentMouse();releaseTouches();triggerPanEnd();
        }function listenForEvents() {
          owner.addEventListener("mousedown", onMouseDown);owner.addEventListener("dblclick", onDoubleClick);owner.addEventListener("touchstart", onTouch);owner.addEventListener("keydown", onKeyDown);wheel.addWheelListener(owner, onMouseWheel);makeDirty();
        }function frame() {
          if (isDirty) applyTransform();
        }function applyTransform() {
          isDirty = false;svgElement.setAttribute("transform", "matrix(" + transform.scale + " 0 0 " + transform.scale + " " + transform.x + " " + transform.y + ")");frameAnimation = 0;
        }function onKeyDown(e) {
          var x = 0,
              y = 0,
              z = 0;if (e.keyCode === 38) {
            y = 1;
          } else if (e.keyCode === 40) {
            y = -1;
          } else if (e.keyCode === 37) {
            x = 1;
          } else if (e.keyCode === 39) {
            x = -1;
          } else if (e.keyCode === 189 || e.keyCode === 109) {
            z = 1;
          } else if (e.keyCode === 187 || e.keyCode === 107) {
            z = -1;
          }if (x || y) {
            e.preventDefault();e.stopPropagation();var clientRect = owner.getBoundingClientRect();var offset = Math.min(clientRect.width, clientRect.height);var moveSpeedRatio = .05;var dx = offset * moveSpeedRatio * x;var dy = offset * moveSpeedRatio * y;internalMoveBy(dx, dy);
          }if (z) {
            var scaleMultiplier = getScaleMultiplier(z);publicZoomTo(owner.clientWidth / 2, owner.clientHeight / 2, scaleMultiplier);
          }
        }function onTouch(e) {
          if (e.touches.length === 1) {
            return handleSingleFingerTouch(e, e.touches[0]);
          } else if (e.touches.length === 2) {
            e.stopPropagation();e.preventDefault();pinchZoomLength = getPinchZoomLength(e.touches[0], e.touches[1]);multitouch = true;startTouchListenerIfNeeded();
          }
        }function handleSingleFingerTouch(e) {
          var touch = e.touches[0];mouseX = touch.clientX;mouseY = touch.clientY;startTouchListenerIfNeeded();
        }function startTouchListenerIfNeeded() {
          if (!touchInProgress) {
            touchInProgress = true;document.addEventListener("touchmove", handleTouchMove);document.addEventListener("touchend", handleTouchEnd);document.addEventListener("touchcancel", handleTouchEnd);
          }
        }function handleTouchMove(e) {
          if (e.touches.length === 1) {
            e.stopPropagation();var touch = e.touches[0];var dx = touch.clientX - mouseX;var dy = touch.clientY - mouseY;if (dx !== 0 && dy !== 0) {
              triggerPanStart();
            }mouseX = touch.clientX;mouseY = touch.clientY;internalMoveBy(dx, dy);
          } else if (e.touches.length === 2) {
            multitouch = true;var t1 = e.touches[0];var t2 = e.touches[1];var currentPinchLength = getPinchZoomLength(t1, t2);var delta = 0;if (currentPinchLength < pinchZoomLength) {
              delta = 1;
            } else if (currentPinchLength > pinchZoomLength) {
              delta = -1;
            }var scaleMultiplier = getScaleMultiplier(delta);mouseX = (t1.clientX + t2.clientX) / 2;mouseY = (t1.clientY + t2.clientY) / 2;publicZoomTo(mouseX, mouseY, scaleMultiplier);pinchZoomLength = currentPinchLength;e.stopPropagation();e.preventDefault();
          }
        }function handleTouchEnd(e) {
          if (e.touches.length > 0) {
            mouseX = e.touches[0].clientX;mouseY = e.touches[0].clientY;
          } else {
            var now = new Date();if (now - lastTouchEndTime < doubleTapSpeedInMS) {
              smoothZoom(mouseX, mouseY, zoomDoubleClickSpeed);
            }lastTouchEndTime = now;touchInProgress = false;triggerPanEnd();releaseTouches();
          }
        }function getPinchZoomLength(finger1, finger2) {
          return (finger1.clientX - finger2.clientX) * (finger1.clientX - finger2.clientX) + (finger1.clientY - finger2.clientY) * (finger1.clientY - finger2.clientY);
        }function onDoubleClick(e) {
          smoothZoom(e.clientX, e.clientY, zoomDoubleClickSpeed);e.preventDefault();e.stopPropagation();
        }function onMouseDown(e) {
          if (touchInProgress) {
            e.stopPropagation();return false;
          }var isLeftButton = e.button === 1 && window.event !== null || e.button === 0;if (!isLeftButton) return;mouseX = e.clientX;mouseY = e.clientY;document.addEventListener("mousemove", onMouseMove);document.addEventListener("mouseup", onMouseUp);preventTextSelection.capture(e.target || e.srcElement);return false;
        }function onMouseMove(e) {
          if (touchInProgress) return;triggerPanStart();var dx = e.clientX - mouseX;var dy = e.clientY - mouseY;mouseX = e.clientX;mouseY = e.clientY;internalMoveBy(dx, dy);
        }function onMouseUp() {
          preventTextSelection.release();triggerPanEnd();releaseDocumentMouse();
        }function releaseDocumentMouse() {
          document.removeEventListener("mousemove", onMouseMove);document.removeEventListener("mouseup", onMouseUp);panstartFired = false;
        }function releaseTouches() {
          document.removeEventListener("touchmove", handleTouchMove);document.removeEventListener("touchend", handleTouchEnd);document.removeEventListener("touchcancel", handleTouchEnd);panstartFired = false;multitouch = false;
        }function onMouseWheel(e) {
          if (beforeWheel(e)) return;smoothScroll.cancel();var scaleMultiplier = getScaleMultiplier(e.deltaY);if (scaleMultiplier !== 1) {
            publicZoomTo(e.clientX, e.clientY, scaleMultiplier);e.preventDefault();
          }
        }function smoothZoom(clientX, clientY, scaleMultiplier) {
          var transform = getTransform(svgElement);var fromValue = transform.matrix.a;var from = { scale: fromValue };var to = { scale: scaleMultiplier * fromValue };smoothScroll.cancel();cancelZoomAnimation();triggerEvent("zoom");zoomToAnimation = animate(from, to, { step: function step(v) {
              zoomAbs(clientX, clientY, v.scale);
            } });
        }function publicZoomTo(clientX, clientY, scaleMultiplier) {
          smoothScroll.cancel();cancelZoomAnimation();return zoomByRatio(clientX, clientY, scaleMultiplier);
        }function cancelZoomAnimation() {
          if (zoomToAnimation) {
            zoomToAnimation.cancel();zoomToAnimation = null;
          }
        }function getScaleMultiplier(delta) {
          var scaleMultiplier = 1;if (delta > 0) {
            scaleMultiplier = 1 - speed;
          } else if (delta < 0) {
            scaleMultiplier = 1 + speed;
          }return scaleMultiplier;
        }function triggerPanStart() {
          if (!panstartFired) {
            triggerEvent("panstart");panstartFired = true;smoothScroll.start();
          }
        }function triggerPanEnd() {
          if (panstartFired) {
            if (!multitouch) smoothScroll.stop();triggerEvent("panend");
          }
        }function triggerEvent(name) {
          var event = createEvent(name);svgElement.dispatchEvent(event);
        }
      }function noop() {}function validateBounds(bounds) {
        var boundsType = typeof bounds === "undefined" ? "undefined" : _typeof(bounds);if (boundsType === "undefined" || boundsType === "boolean") return;var validBounds = isNumber(bounds.left) && isNumber(bounds.top) && isNumber(bounds.bottom) && isNumber(bounds.right);if (!validBounds) throw new Error("Bounds object is not valid. It can be: " + "undefined, boolean (true|false) or an object {left, top, right, bottom}");
      }function isNumber(x) {
        return Number.isFinite(x);
      }function isNaN(value) {
        if (Number.isNaN) {
          return Number.isNaN(value);
        }return value !== value;
      }
    }, { "./lib/createEvent.js": 2, "./lib/getSvgTransformMatrix.js": 3, "./lib/kinetic.js": 4, "./lib/textSlectionInterceptor.js": 5, "./lib/transform.js": 6, amator: 7, wheel: 9 }], 2: [function (require, module, exports) {
      module.exports = createEvent;var isIE = typeof Event !== "function";function createEvent(name) {
        if (isIE) {
          var evt = document.createEvent("CustomEvent");evt.initCustomEvent(name, true, true, undefined);return evt;
        } else {
          return new Event(name, { bubbles: true });
        }
      }
    }, {}], 3: [function (require, module, exports) {
      module.exports = getSvgTransformMatrix;function getSvgTransformMatrix(svgElement) {
        var baseVal = svgElement.transform.baseVal;if (baseVal.numberOfItems) return baseVal.getItem(0);var owner = svgElement.ownerSVGElement || svgElement;var transform = owner.createSVGTransform();svgElement.transform.baseVal.appendItem(transform);return transform;
      }
    }, {}], 4: [function (require, module, exports) {
      module.exports = kinetic;var minVelocity = 10;var amplitude = .42;function kinetic(getRect, scroll) {
        var lastRect;var timestamp;var timeConstant = 342;var ticker;var vx, targetX, ax;var vy, targetY, ay;var raf;return { start: start, stop: stop, cancel: dispose };function dispose() {
          window.clearInterval(ticker);window.cancelAnimationFrame(raf);
        }function start() {
          lastRect = getRect();ax = ay = vx = vy = 0;timestamp = new Date();window.clearInterval(ticker);window.cancelAnimationFrame(raf);ticker = window.setInterval(track, 100);
        }function track() {
          var now = Date.now();var elapsed = now - timestamp;timestamp = now;var rect = getRect();var dx = rect.x - lastRect.x;var dy = rect.y - lastRect.y;lastRect = rect;var dt = 1e3 / (1 + elapsed);vx = .8 * dx * dt + .2 * vx;vy = .8 * dy * dt + .2 * vy;
        }function stop() {
          window.clearInterval(ticker);window.cancelAnimationFrame(raf);var rect = getRect();targetX = rect.x;targetY = rect.y;timestamp = Date.now();if (vx < -minVelocity || vx > minVelocity) {
            ax = amplitude * vx;targetX += ax;
          }if (vy < -minVelocity || vy > minVelocity) {
            ay = amplitude * vy;targetY += ay;
          }raf = window.requestAnimationFrame(autoScroll);
        }function autoScroll() {
          var elapsed = Date.now() - timestamp;var moving = false;var dx = 0;var dy = 0;if (ax) {
            dx = -ax * Math.exp(-elapsed / timeConstant);if (dx > .5 || dx < -.5) moving = true;else dx = ax = 0;
          }if (ay) {
            dy = -ay * Math.exp(-elapsed / timeConstant);if (dy > .5 || dy < -.5) moving = true;else dy = ay = 0;
          }if (moving) {
            scroll(targetX + dx, targetY + dy);raf = window.requestAnimationFrame(autoScroll);
          }
        }
      }
    }, {}], 5: [function (require, module, exports) {
      module.exports = createTextSelectionInterceptor;function createTextSelectionInterceptor() {
        var dragObject;var prevSelectStart;var prevDragStart;return { capture: capture, release: release };function capture(domObject) {
          prevSelectStart = window.document.onselectstart;prevDragStart = window.document.ondragstart;window.document.onselectstart = disabled;dragObject = domObject;dragObject.ondragstart = disabled;
        }function release() {
          window.document.onselectstart = prevSelectStart;if (dragObject) dragObject.ondragstart = prevDragStart;
        }
      }function disabled(e) {
        e.stopPropagation();return false;
      }
    }, {}], 6: [function (require, module, exports) {
      module.exports = Transform;function Transform() {
        this.x = 0;this.y = 0;this.scale = 1;
      }
    }, {}], 7: [function (require, module, exports) {
      var BezierEasing = require("bezier-easing");var animations = { ease: BezierEasing(.25, .1, .25, 1), easeIn: BezierEasing(.42, 0, 1, 1), easeOut: BezierEasing(0, 0, .58, 1), easeInOut: BezierEasing(.42, 0, .58, 1), linear: BezierEasing(0, 0, 1, 1) };module.exports = animate;function animate(source, target, options) {
        var start = Object.create(null);var diff = Object.create(null);options = options || {};var easing = typeof options.easing === "function" ? options.easing : animations[options.easing];if (!easing) {
          if (options.easing) {
            console.warn("Unknown easing function in amator: " + options.easing);
          }easing = animations.ease;
        }var step = typeof options.step === "function" ? options.step : noop;var done = typeof options.done === "function" ? options.done : noop;var scheduler = getScheduler(options.scheduler);var keys = Object.keys(target);keys.forEach(function (key) {
          start[key] = source[key];diff[key] = target[key] - source[key];
        });var durationInMs = options.duration || 400;var durationInFrames = Math.max(1, durationInMs * .06);var previousAnimationId;var frame = 0;previousAnimationId = scheduler.next(loop);return { cancel: cancel };function cancel() {
          scheduler.cancel(previousAnimationId);previousAnimationId = 0;
        }function loop() {
          var t = easing(frame / durationInFrames);frame += 1;setValues(t);if (frame <= durationInFrames) {
            previousAnimationId = scheduler.next(loop);step(source);
          } else {
            previousAnimationId = 0;setTimeout(function () {
              done(source);
            }, 0);
          }
        }function setValues(t) {
          keys.forEach(function (key) {
            source[key] = diff[key] * t + start[key];
          });
        }
      }function noop() {}function getScheduler(scheduler) {
        if (!scheduler) {
          var canRaf = typeof window !== "undefined" && window.requestAnimationFrame;return canRaf ? rafScheduler() : timeoutScheduler();
        }if (typeof scheduler.next !== "function") throw new Error("Scheduler is supposed to have next(cb) function");if (typeof scheduler.cancel !== "function") throw new Error("Scheduler is supposed to have cancel(handle) function");return scheduler;
      }function rafScheduler() {
        return { next: window.requestAnimationFrame.bind(window), cancel: window.cancelAnimationFrame.bind(window) };
      }function timeoutScheduler() {
        return { next: function next(cb) {
            return setTimeout(cb, 1e3 / 60);
          }, cancel: function cancel(id) {
            return clearTimeout(id);
          } };
      }
    }, { "bezier-easing": 8 }], 8: [function (require, module, exports) {
      var NEWTON_ITERATIONS = 4;var NEWTON_MIN_SLOPE = .001;var SUBDIVISION_PRECISION = 1e-7;var SUBDIVISION_MAX_ITERATIONS = 10;var kSplineTableSize = 11;var kSampleStepSize = 1 / (kSplineTableSize - 1);var float32ArraySupported = typeof Float32Array === "function";function A(aA1, aA2) {
        return 1 - 3 * aA2 + 3 * aA1;
      }function B(aA1, aA2) {
        return 3 * aA2 - 6 * aA1;
      }function C(aA1) {
        return 3 * aA1;
      }function calcBezier(aT, aA1, aA2) {
        return ((A(aA1, aA2) * aT + B(aA1, aA2)) * aT + C(aA1)) * aT;
      }function getSlope(aT, aA1, aA2) {
        return 3 * A(aA1, aA2) * aT * aT + 2 * B(aA1, aA2) * aT + C(aA1);
      }function binarySubdivide(aX, aA, aB, mX1, mX2) {
        var currentX,
            currentT,
            i = 0;do {
          currentT = aA + (aB - aA) / 2;currentX = calcBezier(currentT, mX1, mX2) - aX;if (currentX > 0) {
            aB = currentT;
          } else {
            aA = currentT;
          }
        } while (Math.abs(currentX) > SUBDIVISION_PRECISION && ++i < SUBDIVISION_MAX_ITERATIONS);return currentT;
      }function newtonRaphsonIterate(aX, aGuessT, mX1, mX2) {
        for (var i = 0; i < NEWTON_ITERATIONS; ++i) {
          var currentSlope = getSlope(aGuessT, mX1, mX2);if (currentSlope === 0) {
            return aGuessT;
          }var currentX = calcBezier(aGuessT, mX1, mX2) - aX;aGuessT -= currentX / currentSlope;
        }return aGuessT;
      }module.exports = function bezier(mX1, mY1, mX2, mY2) {
        if (!(0 <= mX1 && mX1 <= 1 && 0 <= mX2 && mX2 <= 1)) {
          throw new Error("bezier x values must be in [0, 1] range");
        }var sampleValues = float32ArraySupported ? new Float32Array(kSplineTableSize) : new Array(kSplineTableSize);if (mX1 !== mY1 || mX2 !== mY2) {
          for (var i = 0; i < kSplineTableSize; ++i) {
            sampleValues[i] = calcBezier(i * kSampleStepSize, mX1, mX2);
          }
        }function getTForX(aX) {
          var intervalStart = 0;var currentSample = 1;var lastSample = kSplineTableSize - 1;for (; currentSample !== lastSample && sampleValues[currentSample] <= aX; ++currentSample) {
            intervalStart += kSampleStepSize;
          }--currentSample;var dist = (aX - sampleValues[currentSample]) / (sampleValues[currentSample + 1] - sampleValues[currentSample]);var guessForT = intervalStart + dist * kSampleStepSize;var initialSlope = getSlope(guessForT, mX1, mX2);if (initialSlope >= NEWTON_MIN_SLOPE) {
            return newtonRaphsonIterate(aX, guessForT, mX1, mX2);
          } else if (initialSlope === 0) {
            return guessForT;
          } else {
            return binarySubdivide(aX, intervalStart, intervalStart + kSampleStepSize, mX1, mX2);
          }
        }return function BezierEasing(x) {
          if (mX1 === mY1 && mX2 === mY2) {
            return x;
          }if (x === 0) {
            return 0;
          }if (x === 1) {
            return 1;
          }return calcBezier(getTForX(x), mY1, mY2);
        };
      };
    }, {}], 9: [function (require, module, exports) {
      module.exports = addWheelListener;module.exports.addWheelListener = addWheelListener;module.exports.removeWheelListener = removeWheelListener;var prefix = "",
          _addEventListener,
          _removeEventListener,
          onwheel,
          support;detectEventModel(typeof window !== "undefined" && window, typeof document !== "undefined" && document);function addWheelListener(elem, callback, useCapture) {
        _addWheelListener(elem, support, callback, useCapture);if (support == "DOMMouseScroll") {
          _addWheelListener(elem, "MozMousePixelScroll", callback, useCapture);
        }
      }function removeWheelListener(elem, callback, useCapture) {
        _removeWheelListener(elem, support, callback, useCapture);if (support == "DOMMouseScroll") {
          _removeWheelListener(elem, "MozMousePixelScroll", callback, useCapture);
        }
      }function _addWheelListener(elem, eventName, callback, useCapture) {
        elem[_addEventListener](prefix + eventName, support == "wheel" ? callback : function (originalEvent) {
          !originalEvent && (originalEvent = window.event);var event = { originalEvent: originalEvent, target: originalEvent.target || originalEvent.srcElement, type: "wheel", deltaMode: originalEvent.type == "MozMousePixelScroll" ? 0 : 1, deltaX: 0, delatZ: 0, clientX: originalEvent.clientX, clientY: originalEvent.clientY, preventDefault: function preventDefault() {
              originalEvent.preventDefault ? originalEvent.preventDefault() : originalEvent.returnValue = false;
            }, stopPropagation: function stopPropagation() {
              if (originalEvent.stopPropagation) originalEvent.stopPropagation();
            }, stopImmediatePropagation: function stopImmediatePropagation() {
              if (originalEvent.stopImmediatePropagation) originalEvent.stopImmediatePropagation();
            } };if (support == "mousewheel") {
            event.deltaY = -1 / 40 * originalEvent.wheelDelta;originalEvent.wheelDeltaX && (event.deltaX = -1 / 40 * originalEvent.wheelDeltaX);
          } else {
            event.deltaY = originalEvent.detail;
          }return callback(event);
        }, useCapture || false);
      }function _removeWheelListener(elem, eventName, callback, useCapture) {
        elem[_removeEventListener](prefix + eventName, callback, useCapture || false);
      }function detectEventModel(window, document) {
        if (window && window.addEventListener) {
          _addEventListener = "addEventListener";_removeEventListener = "removeEventListener";
        } else {
          _addEventListener = "attachEvent";_removeEventListener = "detachEvent";prefix = "on";
        }if (document) {
          support = "onwheel" in document.createElement("div") ? "wheel" : document.onmousewheel !== undefined ? "mousewheel" : "DOMMouseScroll";
        } else {
          support = "wheel";
        }
      }
    }, {}] }, {}, [1])(1);
});

/***/ }),
/* 5 */
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

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, ".mindmap-svg {\n  height: 100%;\n  width: 100%; }\n  .mindmap-svg:focus {\n    outline: none; }\n\n.mindmap-node {\n  text-align: center; }\n  .mindmap-node > p {\n    background: #f5f5f5;\n    border-radius: 10px;\n    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);\n    display: inline-block;\n    font-family: 'Raleway';\n    font-size: 22px;\n    margin: 0 auto;\n    padding: 15px; }\n\n.mindmap-subnode-text p,\n.mindmap-subnode-text a {\n  color: #f5f5f5;\n  font-family: 'Raleway';\n  font-size: 16px;\n  padding: 0 5px; }\n\n.mindmap-subnode-connection {\n  fill: transparent;\n  stroke-dasharray: 10px 4px;\n  stroke-linecap: round;\n  stroke-width: 3px; }\n\n.mindmap-connection {\n  fill: transparent;\n  stroke: #9e9e9e;\n  stroke-dasharray: 10px 4px;\n  stroke-width: 3px; }\n\n.mindmap-emoji {\n  height: 24px;\n  vertical-align: bottom;\n  width: 24px; }\n\n.reddit-emoji {\n  border-radius: 50%; }\n", ""]);

// exports


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var stylesInDom = {},
	memoize = function(fn) {
		var memo;
		return function () {
			if (typeof memo === "undefined") memo = fn.apply(this, arguments);
			return memo;
		};
	},
	isOldIE = memoize(function() {
		// Test for IE <= 9 as proposed by Browserhacks
		// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
		// Tests for existence of standard globals is to allow style-loader 
		// to operate correctly into non-standard environments
		// @see https://github.com/webpack-contrib/style-loader/issues/177
		return window && document && document.all && !window.atob;
	}),
	getElement = (function(fn) {
		var memo = {};
		return function(selector) {
			if (typeof memo[selector] === "undefined") {
				memo[selector] = fn.call(this, selector);
			}
			return memo[selector]
		};
	})(function (styleTarget) {
		return document.querySelector(styleTarget)
	}),
	singletonElement = null,
	singletonCounter = 0,
	styleElementsInsertedAtTop = [],
	fixUrls = __webpack_require__(5);

module.exports = function(list, options) {
	if(typeof DEBUG !== "undefined" && DEBUG) {
		if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};
	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (typeof options.singleton === "undefined") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (typeof options.insertInto === "undefined") options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

	var styles = listToStyles(list, options);
	addStylesToDom(styles, options);

	return function update(newList) {
		var mayRemove = [];
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			domStyle.refs--;
			mayRemove.push(domStyle);
		}
		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}
		for(var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];
			if(domStyle.refs === 0) {
				for(var j = 0; j < domStyle.parts.length; j++)
					domStyle.parts[j]();
				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom(styles, options) {
	for(var i = 0; i < styles.length; i++) {
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

function listToStyles(list, options) {
	var styles = [];
	var newStyles = {};
	for(var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};
		if(!newStyles[id])
			styles.push(newStyles[id] = {id: id, parts: [part]});
		else
			newStyles[id].parts.push(part);
	}
	return styles;
}

function insertStyleElement(options, styleElement) {
	var styleTarget = getElement(options.insertInto)
	if (!styleTarget) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}
	var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
	if (options.insertAt === "top") {
		if(!lastStyleElementInsertedAtTop) {
			styleTarget.insertBefore(styleElement, styleTarget.firstChild);
		} else if(lastStyleElementInsertedAtTop.nextSibling) {
			styleTarget.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			styleTarget.appendChild(styleElement);
		}
		styleElementsInsertedAtTop.push(styleElement);
	} else if (options.insertAt === "bottom") {
		styleTarget.appendChild(styleElement);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement(styleElement) {
	styleElement.parentNode.removeChild(styleElement);
	var idx = styleElementsInsertedAtTop.indexOf(styleElement);
	if(idx >= 0) {
		styleElementsInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement(options) {
	var styleElement = document.createElement("style");
	options.attrs.type = "text/css";

	attachTagAttrs(styleElement, options.attrs);
	insertStyleElement(options, styleElement);
	return styleElement;
}

function createLinkElement(options) {
	var linkElement = document.createElement("link");
	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	attachTagAttrs(linkElement, options.attrs);
	insertStyleElement(options, linkElement);
	return linkElement;
}

function attachTagAttrs(element, attrs) {
	Object.keys(attrs).forEach(function (key) {
		element.setAttribute(key, attrs[key]);
	});
}

function addStyle(obj, options) {
	var styleElement, update, remove, transformResult;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    transformResult = options.transform(obj.css);
	    
	    if (transformResult) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = transformResult;
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
		styleElement = singletonElement || (singletonElement = createStyleElement(options));
		update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
		remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
	} else if(obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function") {
		styleElement = createLinkElement(options);
		update = updateLink.bind(null, styleElement, options);
		remove = function() {
			removeStyleElement(styleElement);
			if(styleElement.href)
				URL.revokeObjectURL(styleElement.href);
		};
	} else {
		styleElement = createStyleElement(options);
		update = applyToTag.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
		};
	}

	update(obj);

	return function updateStyle(newObj) {
		if(newObj) {
			if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
				return;
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

function applyToSingletonTag(styleElement, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (styleElement.styleSheet) {
		styleElement.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = styleElement.childNodes;
		if (childNodes[index]) styleElement.removeChild(childNodes[index]);
		if (childNodes.length) {
			styleElement.insertBefore(cssNode, childNodes[index]);
		} else {
			styleElement.appendChild(cssNode);
		}
	}
}

function applyToTag(styleElement, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		styleElement.setAttribute("media", media)
	}

	if(styleElement.styleSheet) {
		styleElement.styleSheet.cssText = css;
	} else {
		while(styleElement.firstChild) {
			styleElement.removeChild(styleElement.firstChild);
		}
		styleElement.appendChild(document.createTextNode(css));
	}
}

function updateLink(linkElement, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/* If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
	and there is no publicPath defined then lets turn convertToAbsoluteUrls
	on by default.  Otherwise default to the convertToAbsoluteUrls option
	directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls){
		css = fixUrls(css);
	}

	if(sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = linkElement.href;

	linkElement.href = URL.createObjectURL(blob);

	if(oldSrc)
		URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(6);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(7)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/postcss-loader/lib/index.js!../node_modules/sass-loader/lib/loader.js!./MindMap.sass", function() {
			var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/postcss-loader/lib/index.js!../node_modules/sass-loader/lib/loader.js!./MindMap.sass");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_9__;

/***/ })
/******/ ]);
});