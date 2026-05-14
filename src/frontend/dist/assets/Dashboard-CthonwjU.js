import { c as createLucideIcon, j as jsxRuntimeExports, e as cn, R as React, f as clsx, r as reactExports, b as useNavigate, g as useGetDashboardData, h as CognitiveLoadBadge, i as ClipboardList, C as ChartColumn, a as Brain } from "./index-B3pXppQ4.js";
import { S as Skeleton } from "./skeleton-zswagPjP.js";
import { F as Flame } from "./flame-DSrAzbPw.js";
import { T as Target } from "./target-CPIi5IED.js";
import { T as TrendingUp } from "./trending-up-b_M_tq5k.js";
import { f as filterProps, L as Layer, m as max, i as isNumber, C as Curve, A as Animate, a as interpolateNumber, b as isNil, c as isNan, d as isEqual, h as hasClipDot, e as LabelList, u as uniqueId, g as isFunction, G as Global, j as getValueByDataKey, k as getCateCoordinateOfLine, D as Dot, l as generateCategoricalChart, X as XAxis, Y as YAxis, n as formatAxisMap, R as ResponsiveContainer, o as CartesianGrid, T as Tooltip, B as BarChart, p as Bar } from "./BarChart-BWdEwPaI.js";
import { A as ArrowRight } from "./arrow-right-Cy8E_keR.js";
import { L as Lightbulb } from "./lightbulb-DFb5Ms0T.js";
import { L as Layers } from "./layers-FjN3uewx.js";
import { R as RefreshCw } from "./refresh-cw-BxEehOnR.js";
import { Z as Zap } from "./zap-QkJmfqCX.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z",
      key: "169xi5"
    }
  ],
  ["path", { d: "M15 5.764v15", key: "1pn4in" }],
  ["path", { d: "M9 3.236v15", key: "1uimfh" }]
];
const Map = createLucideIcon("map", __iconNode);
const loadColors = {
  Low: "bg-[oklch(0.72_0.18_145)]",
  Moderate: "bg-[oklch(0.75_0.16_85)]",
  High: "bg-[oklch(0.65_0.22_25)]"
};
function ProgressCard({
  subject,
  progress,
  completedTopics,
  totalTopics,
  cognitiveCategory,
  className,
  onClick
}) {
  const pct = Math.min(100, Math.max(0, progress));
  const barColor = cognitiveCategory ? loadColors[cognitiveCategory] : "bg-primary";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      role: onClick ? "button" : void 0,
      tabIndex: onClick ? 0 : void 0,
      onKeyDown: onClick ? (e) => e.key === "Enter" && onClick() : void 0,
      onClick,
      className: cn(
        "glass-card p-4 flex flex-col gap-3 transition-smooth",
        onClick && "cursor-pointer hover:border-primary/40 hover:shadow-lg",
        className
      ),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-display font-semibold text-foreground text-sm truncate", children: subject }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-mono text-muted-foreground", children: [
            pct.toFixed(0),
            "%"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 rounded-full bg-muted overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: cn(
              "h-full rounded-full transition-all duration-700",
              barColor
            ),
            style: { width: `${pct}%` }
          }
        ) }),
        (completedTopics !== void 0 || cognitiveCategory) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-xs text-muted-foreground", children: [
          completedTopics !== void 0 && totalTopics !== void 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            completedTopics,
            "/",
            totalTopics,
            " topics"
          ] }),
          cognitiveCategory && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: cn(
                "px-2 py-0.5 rounded-full text-[10px] font-medium",
                cognitiveCategory === "Low" && "cognitive-low cognitive-low-bg",
                cognitiveCategory === "Moderate" && "cognitive-moderate cognitive-moderate-bg",
                cognitiveCategory === "High" && "cognitive-high cognitive-high-bg"
              ),
              children: cognitiveCategory
            }
          )
        ] })
      ]
    }
  );
}
function StatCard({
  icon: Icon,
  label,
  value,
  trend,
  iconColor = "text-primary",
  className,
  animate = true
}) {
  const trendPositive = trend && trend.value >= 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: cn(
        "glass-card p-4 flex flex-col gap-2",
        animate && "animate-fade-in",
        className
      ),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-medium uppercase tracking-wide", children: label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn("p-2 rounded-lg bg-primary/10", iconColor), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { size: 16 }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end justify-between gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl font-display font-bold text-foreground", children: value }),
          trend && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "span",
            {
              className: cn(
                "text-xs font-medium flex items-center gap-0.5 mb-0.5",
                trendPositive ? "text-[oklch(0.72_0.18_145)]" : "text-[oklch(0.65_0.22_25)]"
              ),
              children: [
                trendPositive ? "↑" : "↓",
                " ",
                Math.abs(trend.value),
                "% ",
                trend.label
              ]
            }
          )
        ] })
      ]
    }
  );
}
var _excluded = ["layout", "type", "stroke", "connectNulls", "isRange", "ref"], _excluded2 = ["key"];
var _Area;
function _typeof(o) {
  "@babel/helpers - typeof";
  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof(o);
}
function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  for (var key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      if (excluded.indexOf(key) >= 0) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t), true).forEach(function(r2) {
      _defineProperty(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", { writable: false });
  return Constructor;
}
function _callSuper(t, o, e) {
  return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e));
}
function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }
  return _assertThisInitialized(self);
}
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _isNativeReflectConstruct() {
  try {
    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch (t2) {
  }
  return (_isNativeReflectConstruct = function _isNativeReflectConstruct2() {
    return !!t;
  })();
}
function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf2(o2) {
    return o2.__proto__ || Object.getPrototypeOf(o2);
  };
  return _getPrototypeOf(o);
}
function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
  Object.defineProperty(subClass, "prototype", { writable: false });
  if (superClass) _setPrototypeOf(subClass, superClass);
}
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf2(o2, p2) {
    o2.__proto__ = p2;
    return o2;
  };
  return _setPrototypeOf(o, p);
}
function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == _typeof(i) ? i : i + "";
}
function _toPrimitive(t, r) {
  if ("object" != _typeof(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != _typeof(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(t);
}
var Area = /* @__PURE__ */ function(_PureComponent) {
  function Area2() {
    var _this;
    _classCallCheck(this, Area2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _callSuper(this, Area2, [].concat(args));
    _defineProperty(_this, "state", {
      isAnimationFinished: true
    });
    _defineProperty(_this, "id", uniqueId("recharts-area-"));
    _defineProperty(_this, "handleAnimationEnd", function() {
      var onAnimationEnd = _this.props.onAnimationEnd;
      _this.setState({
        isAnimationFinished: true
      });
      if (isFunction(onAnimationEnd)) {
        onAnimationEnd();
      }
    });
    _defineProperty(_this, "handleAnimationStart", function() {
      var onAnimationStart = _this.props.onAnimationStart;
      _this.setState({
        isAnimationFinished: false
      });
      if (isFunction(onAnimationStart)) {
        onAnimationStart();
      }
    });
    return _this;
  }
  _inherits(Area2, _PureComponent);
  return _createClass(Area2, [{
    key: "renderDots",
    value: function renderDots(needClip, clipDot, clipPathId) {
      var isAnimationActive = this.props.isAnimationActive;
      var isAnimationFinished = this.state.isAnimationFinished;
      if (isAnimationActive && !isAnimationFinished) {
        return null;
      }
      var _this$props = this.props, dot = _this$props.dot, points = _this$props.points, dataKey = _this$props.dataKey;
      var areaProps = filterProps(this.props, false);
      var customDotProps = filterProps(dot, true);
      var dots = points.map(function(entry, i) {
        var dotProps = _objectSpread(_objectSpread(_objectSpread({
          key: "dot-".concat(i),
          r: 3
        }, areaProps), customDotProps), {}, {
          index: i,
          cx: entry.x,
          cy: entry.y,
          dataKey,
          value: entry.value,
          payload: entry.payload,
          points
        });
        return Area2.renderDotItem(dot, dotProps);
      });
      var dotsProps = {
        clipPath: needClip ? "url(#clipPath-".concat(clipDot ? "" : "dots-").concat(clipPathId, ")") : null
      };
      return /* @__PURE__ */ React.createElement(Layer, _extends({
        className: "recharts-area-dots"
      }, dotsProps), dots);
    }
  }, {
    key: "renderHorizontalRect",
    value: function renderHorizontalRect(alpha) {
      var _this$props2 = this.props, baseLine = _this$props2.baseLine, points = _this$props2.points, strokeWidth = _this$props2.strokeWidth;
      var startX = points[0].x;
      var endX = points[points.length - 1].x;
      var width = alpha * Math.abs(startX - endX);
      var maxY = max(points.map(function(entry) {
        return entry.y || 0;
      }));
      if (isNumber(baseLine) && typeof baseLine === "number") {
        maxY = Math.max(baseLine, maxY);
      } else if (baseLine && Array.isArray(baseLine) && baseLine.length) {
        maxY = Math.max(max(baseLine.map(function(entry) {
          return entry.y || 0;
        })), maxY);
      }
      if (isNumber(maxY)) {
        return /* @__PURE__ */ React.createElement("rect", {
          x: startX < endX ? startX : startX - width,
          y: 0,
          width,
          height: Math.floor(maxY + (strokeWidth ? parseInt("".concat(strokeWidth), 10) : 1))
        });
      }
      return null;
    }
  }, {
    key: "renderVerticalRect",
    value: function renderVerticalRect(alpha) {
      var _this$props3 = this.props, baseLine = _this$props3.baseLine, points = _this$props3.points, strokeWidth = _this$props3.strokeWidth;
      var startY = points[0].y;
      var endY = points[points.length - 1].y;
      var height = alpha * Math.abs(startY - endY);
      var maxX = max(points.map(function(entry) {
        return entry.x || 0;
      }));
      if (isNumber(baseLine) && typeof baseLine === "number") {
        maxX = Math.max(baseLine, maxX);
      } else if (baseLine && Array.isArray(baseLine) && baseLine.length) {
        maxX = Math.max(max(baseLine.map(function(entry) {
          return entry.x || 0;
        })), maxX);
      }
      if (isNumber(maxX)) {
        return /* @__PURE__ */ React.createElement("rect", {
          x: 0,
          y: startY < endY ? startY : startY - height,
          width: maxX + (strokeWidth ? parseInt("".concat(strokeWidth), 10) : 1),
          height: Math.floor(height)
        });
      }
      return null;
    }
  }, {
    key: "renderClipRect",
    value: function renderClipRect(alpha) {
      var layout = this.props.layout;
      if (layout === "vertical") {
        return this.renderVerticalRect(alpha);
      }
      return this.renderHorizontalRect(alpha);
    }
  }, {
    key: "renderAreaStatically",
    value: function renderAreaStatically(points, baseLine, needClip, clipPathId) {
      var _this$props4 = this.props, layout = _this$props4.layout, type = _this$props4.type, stroke = _this$props4.stroke, connectNulls = _this$props4.connectNulls, isRange = _this$props4.isRange;
      _this$props4.ref;
      var others = _objectWithoutProperties(_this$props4, _excluded);
      return /* @__PURE__ */ React.createElement(Layer, {
        clipPath: needClip ? "url(#clipPath-".concat(clipPathId, ")") : null
      }, /* @__PURE__ */ React.createElement(Curve, _extends({}, filterProps(others, true), {
        points,
        connectNulls,
        type,
        baseLine,
        layout,
        stroke: "none",
        className: "recharts-area-area"
      })), stroke !== "none" && /* @__PURE__ */ React.createElement(Curve, _extends({}, filterProps(this.props, false), {
        className: "recharts-area-curve",
        layout,
        type,
        connectNulls,
        fill: "none",
        points
      })), stroke !== "none" && isRange && /* @__PURE__ */ React.createElement(Curve, _extends({}, filterProps(this.props, false), {
        className: "recharts-area-curve",
        layout,
        type,
        connectNulls,
        fill: "none",
        points: baseLine
      })));
    }
  }, {
    key: "renderAreaWithAnimation",
    value: function renderAreaWithAnimation(needClip, clipPathId) {
      var _this2 = this;
      var _this$props5 = this.props, points = _this$props5.points, baseLine = _this$props5.baseLine, isAnimationActive = _this$props5.isAnimationActive, animationBegin = _this$props5.animationBegin, animationDuration = _this$props5.animationDuration, animationEasing = _this$props5.animationEasing, animationId = _this$props5.animationId;
      var _this$state = this.state, prevPoints = _this$state.prevPoints, prevBaseLine = _this$state.prevBaseLine;
      return /* @__PURE__ */ React.createElement(Animate, {
        begin: animationBegin,
        duration: animationDuration,
        isActive: isAnimationActive,
        easing: animationEasing,
        from: {
          t: 0
        },
        to: {
          t: 1
        },
        key: "area-".concat(animationId),
        onAnimationEnd: this.handleAnimationEnd,
        onAnimationStart: this.handleAnimationStart
      }, function(_ref) {
        var t = _ref.t;
        if (prevPoints) {
          var prevPointsDiffFactor = prevPoints.length / points.length;
          var stepPoints = points.map(function(entry, index) {
            var prevPointIndex = Math.floor(index * prevPointsDiffFactor);
            if (prevPoints[prevPointIndex]) {
              var prev = prevPoints[prevPointIndex];
              var interpolatorX = interpolateNumber(prev.x, entry.x);
              var interpolatorY = interpolateNumber(prev.y, entry.y);
              return _objectSpread(_objectSpread({}, entry), {}, {
                x: interpolatorX(t),
                y: interpolatorY(t)
              });
            }
            return entry;
          });
          var stepBaseLine;
          if (isNumber(baseLine) && typeof baseLine === "number") {
            var interpolator = interpolateNumber(prevBaseLine, baseLine);
            stepBaseLine = interpolator(t);
          } else if (isNil(baseLine) || isNan(baseLine)) {
            var _interpolator = interpolateNumber(prevBaseLine, 0);
            stepBaseLine = _interpolator(t);
          } else {
            stepBaseLine = baseLine.map(function(entry, index) {
              var prevPointIndex = Math.floor(index * prevPointsDiffFactor);
              if (prevBaseLine[prevPointIndex]) {
                var prev = prevBaseLine[prevPointIndex];
                var interpolatorX = interpolateNumber(prev.x, entry.x);
                var interpolatorY = interpolateNumber(prev.y, entry.y);
                return _objectSpread(_objectSpread({}, entry), {}, {
                  x: interpolatorX(t),
                  y: interpolatorY(t)
                });
              }
              return entry;
            });
          }
          return _this2.renderAreaStatically(stepPoints, stepBaseLine, needClip, clipPathId);
        }
        return /* @__PURE__ */ React.createElement(Layer, null, /* @__PURE__ */ React.createElement("defs", null, /* @__PURE__ */ React.createElement("clipPath", {
          id: "animationClipPath-".concat(clipPathId)
        }, _this2.renderClipRect(t))), /* @__PURE__ */ React.createElement(Layer, {
          clipPath: "url(#animationClipPath-".concat(clipPathId, ")")
        }, _this2.renderAreaStatically(points, baseLine, needClip, clipPathId)));
      });
    }
  }, {
    key: "renderArea",
    value: function renderArea(needClip, clipPathId) {
      var _this$props6 = this.props, points = _this$props6.points, baseLine = _this$props6.baseLine, isAnimationActive = _this$props6.isAnimationActive;
      var _this$state2 = this.state, prevPoints = _this$state2.prevPoints, prevBaseLine = _this$state2.prevBaseLine, totalLength = _this$state2.totalLength;
      if (isAnimationActive && points && points.length && (!prevPoints && totalLength > 0 || !isEqual(prevPoints, points) || !isEqual(prevBaseLine, baseLine))) {
        return this.renderAreaWithAnimation(needClip, clipPathId);
      }
      return this.renderAreaStatically(points, baseLine, needClip, clipPathId);
    }
  }, {
    key: "render",
    value: function render() {
      var _filterProps;
      var _this$props7 = this.props, hide = _this$props7.hide, dot = _this$props7.dot, points = _this$props7.points, className = _this$props7.className, top = _this$props7.top, left = _this$props7.left, xAxis = _this$props7.xAxis, yAxis = _this$props7.yAxis, width = _this$props7.width, height = _this$props7.height, isAnimationActive = _this$props7.isAnimationActive, id = _this$props7.id;
      if (hide || !points || !points.length) {
        return null;
      }
      var isAnimationFinished = this.state.isAnimationFinished;
      var hasSinglePoint = points.length === 1;
      var layerClass = clsx("recharts-area", className);
      var needClipX = xAxis && xAxis.allowDataOverflow;
      var needClipY = yAxis && yAxis.allowDataOverflow;
      var needClip = needClipX || needClipY;
      var clipPathId = isNil(id) ? this.id : id;
      var _ref2 = (_filterProps = filterProps(dot, false)) !== null && _filterProps !== void 0 ? _filterProps : {
        r: 3,
        strokeWidth: 2
      }, _ref2$r = _ref2.r, r = _ref2$r === void 0 ? 3 : _ref2$r, _ref2$strokeWidth = _ref2.strokeWidth, strokeWidth = _ref2$strokeWidth === void 0 ? 2 : _ref2$strokeWidth;
      var _ref3 = hasClipDot(dot) ? dot : {}, _ref3$clipDot = _ref3.clipDot, clipDot = _ref3$clipDot === void 0 ? true : _ref3$clipDot;
      var dotSize = r * 2 + strokeWidth;
      return /* @__PURE__ */ React.createElement(Layer, {
        className: layerClass
      }, needClipX || needClipY ? /* @__PURE__ */ React.createElement("defs", null, /* @__PURE__ */ React.createElement("clipPath", {
        id: "clipPath-".concat(clipPathId)
      }, /* @__PURE__ */ React.createElement("rect", {
        x: needClipX ? left : left - width / 2,
        y: needClipY ? top : top - height / 2,
        width: needClipX ? width : width * 2,
        height: needClipY ? height : height * 2
      })), !clipDot && /* @__PURE__ */ React.createElement("clipPath", {
        id: "clipPath-dots-".concat(clipPathId)
      }, /* @__PURE__ */ React.createElement("rect", {
        x: left - dotSize / 2,
        y: top - dotSize / 2,
        width: width + dotSize,
        height: height + dotSize
      }))) : null, !hasSinglePoint ? this.renderArea(needClip, clipPathId) : null, (dot || hasSinglePoint) && this.renderDots(needClip, clipDot, clipPathId), (!isAnimationActive || isAnimationFinished) && LabelList.renderCallByParent(this.props, points));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, prevState) {
      if (nextProps.animationId !== prevState.prevAnimationId) {
        return {
          prevAnimationId: nextProps.animationId,
          curPoints: nextProps.points,
          curBaseLine: nextProps.baseLine,
          prevPoints: prevState.curPoints,
          prevBaseLine: prevState.curBaseLine
        };
      }
      if (nextProps.points !== prevState.curPoints || nextProps.baseLine !== prevState.curBaseLine) {
        return {
          curPoints: nextProps.points,
          curBaseLine: nextProps.baseLine
        };
      }
      return null;
    }
  }]);
}(reactExports.PureComponent);
_Area = Area;
_defineProperty(Area, "displayName", "Area");
_defineProperty(Area, "defaultProps", {
  stroke: "#3182bd",
  fill: "#3182bd",
  fillOpacity: 0.6,
  xAxisId: 0,
  yAxisId: 0,
  legendType: "line",
  connectNulls: false,
  // points of area
  points: [],
  dot: false,
  activeDot: true,
  hide: false,
  isAnimationActive: !Global.isSsr,
  animationBegin: 0,
  animationDuration: 1500,
  animationEasing: "ease"
});
_defineProperty(Area, "getBaseValue", function(props, item, xAxis, yAxis) {
  var layout = props.layout, chartBaseValue = props.baseValue;
  var itemBaseValue = item.props.baseValue;
  var baseValue = itemBaseValue !== null && itemBaseValue !== void 0 ? itemBaseValue : chartBaseValue;
  if (isNumber(baseValue) && typeof baseValue === "number") {
    return baseValue;
  }
  var numericAxis = layout === "horizontal" ? yAxis : xAxis;
  var domain = numericAxis.scale.domain();
  if (numericAxis.type === "number") {
    var domainMax = Math.max(domain[0], domain[1]);
    var domainMin = Math.min(domain[0], domain[1]);
    if (baseValue === "dataMin") {
      return domainMin;
    }
    if (baseValue === "dataMax") {
      return domainMax;
    }
    return domainMax < 0 ? domainMax : Math.max(Math.min(domain[0], domain[1]), 0);
  }
  if (baseValue === "dataMin") {
    return domain[0];
  }
  if (baseValue === "dataMax") {
    return domain[1];
  }
  return domain[0];
});
_defineProperty(Area, "getComposedData", function(_ref4) {
  var props = _ref4.props, item = _ref4.item, xAxis = _ref4.xAxis, yAxis = _ref4.yAxis, xAxisTicks = _ref4.xAxisTicks, yAxisTicks = _ref4.yAxisTicks, bandSize = _ref4.bandSize, dataKey = _ref4.dataKey, stackedData = _ref4.stackedData, dataStartIndex = _ref4.dataStartIndex, displayedData = _ref4.displayedData, offset = _ref4.offset;
  var layout = props.layout;
  var hasStack = stackedData && stackedData.length;
  var baseValue = _Area.getBaseValue(props, item, xAxis, yAxis);
  var isHorizontalLayout = layout === "horizontal";
  var isRange = false;
  var points = displayedData.map(function(entry, index) {
    var value;
    if (hasStack) {
      value = stackedData[dataStartIndex + index];
    } else {
      value = getValueByDataKey(entry, dataKey);
      if (!Array.isArray(value)) {
        value = [baseValue, value];
      } else {
        isRange = true;
      }
    }
    var isBreakPoint = value[1] == null || hasStack && getValueByDataKey(entry, dataKey) == null;
    if (isHorizontalLayout) {
      return {
        x: getCateCoordinateOfLine({
          axis: xAxis,
          ticks: xAxisTicks,
          bandSize,
          entry,
          index
        }),
        y: isBreakPoint ? null : yAxis.scale(value[1]),
        value,
        payload: entry
      };
    }
    return {
      x: isBreakPoint ? null : xAxis.scale(value[1]),
      y: getCateCoordinateOfLine({
        axis: yAxis,
        ticks: yAxisTicks,
        bandSize,
        entry,
        index
      }),
      value,
      payload: entry
    };
  });
  var baseLine;
  if (hasStack || isRange) {
    baseLine = points.map(function(entry) {
      var x = Array.isArray(entry.value) ? entry.value[0] : null;
      if (isHorizontalLayout) {
        return {
          x: entry.x,
          y: x != null && entry.y != null ? yAxis.scale(x) : null
        };
      }
      return {
        x: x != null ? xAxis.scale(x) : null,
        y: entry.y
      };
    });
  } else {
    baseLine = isHorizontalLayout ? yAxis.scale(baseValue) : xAxis.scale(baseValue);
  }
  return _objectSpread({
    points,
    baseLine,
    layout,
    isRange
  }, offset);
});
_defineProperty(Area, "renderDotItem", function(option, props) {
  var dotItem;
  if (/* @__PURE__ */ React.isValidElement(option)) {
    dotItem = /* @__PURE__ */ React.cloneElement(option, props);
  } else if (isFunction(option)) {
    dotItem = option(props);
  } else {
    var className = clsx("recharts-area-dot", typeof option !== "boolean" ? option.className : "");
    var key = props.key, rest = _objectWithoutProperties(props, _excluded2);
    dotItem = /* @__PURE__ */ React.createElement(Dot, _extends({}, rest, {
      key,
      className
    }));
  }
  return dotItem;
});
var AreaChart = generateCategoricalChart({
  chartName: "AreaChart",
  GraphicalChild: Area,
  axisComponents: [{
    axisType: "xAxis",
    AxisComp: XAxis
  }, {
    axisType: "yAxis",
    AxisComp: YAxis
  }],
  formatAxisMap
});
function greeting() {
  const h = (/* @__PURE__ */ new Date()).getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}
function formatDate() {
  return (/* @__PURE__ */ new Date()).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}
const SUBJECTS = [
  "Aptitude",
  "DBMS",
  "OOPS",
  "System Design",
  "Technical MCQs"
];
const DAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const REC_ICONS = {
  "Weak Topic": Zap,
  Revision: RefreshCw,
  "Next Topic": ArrowRight,
  "Learning Path": Map
};
const LOAD_AREA_COLOR = {
  Low: "oklch(0.72 0.18 145)",
  Moderate: "oklch(0.75 0.16 85)",
  High: "oklch(0.65 0.22 25)"
};
const COGNITIVE_MESSAGES = {
  High: "Take a break — your cognitive load is high. Try easier exercises.",
  Moderate: "Good progress! Continue with balanced exercises.",
  Low: "You're in the zone! Challenge yourself with harder content."
};
function DashboardSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-28 w-full rounded-xl" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-3", children: [0, 1, 2, 3].map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-24 rounded-xl" }, n)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-56 rounded-xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-56 rounded-xl" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 gap-3", children: [0, 1, 2, 3, 4].map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-28 rounded-xl" }, n)) })
  ] });
}
function EmptyState({ onStart }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": "dashboard.empty_state",
      className: "flex flex-col items-center justify-center gap-6 py-24 text-center animate-fade-in",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-2xl bg-primary/15 border border-primary/30 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Brain, { size: 36, className: "text-primary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold text-foreground", children: "Welcome to CogLearn!" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-2 max-w-sm", children: "Start your first quiz to generate your cognitive load profile and personalised learning path." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: onStart,
            "data-ocid": "dashboard.start_first_quiz_button",
            className: "px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold font-display hover:bg-primary/90 transition-smooth shadow-lg",
            children: "Start Your First Quiz"
          }
        )
      ]
    }
  );
}
function RecommendationCard({ rec, index, onStart }) {
  const IconComp = REC_ICONS[rec.recType] ?? Lightbulb;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": `dashboard.recommendation.item.${index + 1}`,
      className: "glass-card p-4 flex items-start gap-3 animate-slide-up",
      style: { animationDelay: `${index * 0.08}s` },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-shrink-0 w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(IconComp, { size: 16, className: "text-primary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-medium uppercase tracking-wider text-muted-foreground", children: rec.recType }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-display font-semibold text-foreground truncate", children: rec.targetSubject })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5 line-clamp-2", children: rec.reason })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: onStart,
            "data-ocid": `dashboard.recommendation.start_button.${index + 1}`,
            className: "flex-shrink-0 text-xs font-medium text-primary hover:text-primary/80 transition-smooth flex items-center gap-1",
            children: [
              "Start ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 12 })
            ]
          }
        )
      ]
    }
  );
}
function QuizRow({ session, index }) {
  const date = new Date(Number(session.endTime) / 1e6);
  const dateStr = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric"
  });
  const acc = (session.accuracy * 100).toFixed(0);
  const score = Number(session.score);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": `dashboard.quiz_history.item.${index + 1}`,
      className: "flex items-center gap-3 py-3 border-b border-border/50 last:border-0 animate-fade-in",
      style: { animationDelay: `${index * 0.06}s` },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-display font-semibold text-foreground truncate", children: session.subject }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
            session.difficulty,
            " · ",
            dateStr
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right flex-shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-bold font-display text-foreground", children: [
            score,
            " pts"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "p",
            {
              className: cn(
                "text-xs font-medium",
                Number(acc) >= 75 ? "text-[oklch(0.72_0.18_145)]" : Number(acc) >= 50 ? "text-[oklch(0.75_0.16_85)]" : "text-[oklch(0.65_0.22_25)]"
              ),
              children: [
                acc,
                "% acc"
              ]
            }
          )
        ] })
      ]
    }
  );
}
function CustomTooltip({ active, payload, label }) {
  if (!active || !(payload == null ? void 0 : payload.length)) return null;
  const val = payload[0].value;
  const cat = val >= 70 ? "High" : val >= 40 ? "Moderate" : "Low";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card px-3 py-2 text-xs", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-bold text-foreground", children: [
      val.toFixed(0),
      " score"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CognitiveLoadBadge, { category: cat, size: "sm" })
  ] });
}
function BarTooltip({ active, payload, label }) {
  if (!active || !(payload == null ? void 0 : payload.length)) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card px-3 py-2 text-xs", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-bold text-foreground", children: [
      payload[0].value,
      " session",
      payload[0].value !== 1 ? "s" : ""
    ] })
  ] });
}
function Dashboard() {
  var _a, _b, _c, _d, _e, _f;
  const navigate = useNavigate();
  const { data, isLoading } = useGetDashboardData();
  const dashData = data;
  const trendData = reactExports.useMemo(() => {
    var _a2;
    if (!dashData) return [];
    const base = ((_a2 = dashData.currentCognitiveLoad) == null ? void 0 : _a2.loadScore) ?? 35;
    return DAY_LABELS.map((day, i) => ({
      day,
      score: Math.max(
        5,
        Math.min(100, base + Math.sin(i * 1.3 + base * 0.04) * 18)
      )
    }));
  }, [dashData]);
  const weeklyData = reactExports.useMemo(() => {
    const sessions = (dashData == null ? void 0 : dashData.weeklyStudySessions) ?? [];
    return DAY_LABELS.map((day, i) => ({
      day,
      sessions: Number(sessions[i] ?? 0)
    }));
  }, [dashData]);
  const progressMap = reactExports.useMemo(() => {
    const map = {};
    for (const lp of (dashData == null ? void 0 : dashData.learningProgressAll) ?? []) {
      map[lp.subject] = lp;
    }
    return map;
  }, [dashData]);
  const totalQuizzes = reactExports.useMemo(() => {
    var _a2;
    return ((_a2 = dashData == null ? void 0 : dashData.recentQuizSessions) == null ? void 0 : _a2.length) ?? 0;
  }, [dashData]);
  const avgAccuracy = reactExports.useMemo(() => {
    const sessions = (dashData == null ? void 0 : dashData.recentQuizSessions) ?? [];
    if (!sessions.length) return 0;
    const sum = sessions.reduce((acc, s) => acc + s.accuracy, 0);
    return sum / sessions.length * 100;
  }, [dashData]);
  const overallProgress = reactExports.useMemo(() => {
    const all = (dashData == null ? void 0 : dashData.learningProgressAll) ?? [];
    if (!all.length) return 0;
    const sum = all.reduce((acc, lp) => acc + lp.progressPercentage, 0);
    return sum / all.length;
  }, [dashData]);
  const loadCategory = ((_a = dashData == null ? void 0 : dashData.currentCognitiveLoad) == null ? void 0 : _a.category) ?? "Low";
  const loadScore = ((_b = dashData == null ? void 0 : dashData.currentCognitiveLoad) == null ? void 0 : _b.loadScore) ?? 0;
  const areaColor = LOAD_AREA_COLOR[loadCategory];
  const userName = ((_c = dashData == null ? void 0 : dashData.profile) == null ? void 0 : _c.name) ?? "Learner";
  const streak = Number((dashData == null ? void 0 : dashData.streakDays) ?? 0);
  const isNewUser = !isLoading && (!dashData || !((_d = dashData.profile) == null ? void 0 : _d.name));
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "data-ocid": "dashboard.loading_state", children: /* @__PURE__ */ jsxRuntimeExports.jsx(DashboardSkeleton, {}) });
  }
  if (isNewUser) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyState, { onStart: () => navigate({ to: "/quiz" }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 pb-8 animate-fade-in", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        "data-ocid": "dashboard.welcome_section",
        className: "glass-card p-5 md:p-7 flex flex-col md:flex-row md:items-center md:justify-between gap-4 border border-primary/20",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground font-medium", children: formatDate() }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-2xl md:text-3xl font-bold text-foreground", children: [
              greeting(),
              ", ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: userName }),
              "!"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: COGNITIVE_MESSAGES[loadCategory] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              CognitiveLoadBadge,
              {
                category: loadCategory,
                score: loadScore,
                size: "lg"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 bg-primary/10 border border-primary/20 rounded-full px-3 py-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { size: 15, className: "text-orange-400" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-display font-bold text-foreground", children: [
                streak,
                " day",
                streak !== 1 ? "s" : ""
              ] })
            ] })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        "data-ocid": "dashboard.stats_section",
        className: "grid grid-cols-2 md:grid-cols-4 gap-3",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatCard,
            {
              icon: Flame,
              label: "Daily Streak",
              value: `${streak}d`,
              iconColor: "text-orange-400",
              className: "animate-slide-up"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatCard,
            {
              icon: ClipboardList,
              label: "Total Quizzes",
              value: totalQuizzes,
              iconColor: "text-primary",
              className: "animate-slide-up [animation-delay:0.05s]"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatCard,
            {
              icon: Target,
              label: "Avg Accuracy",
              value: `${avgAccuracy.toFixed(0)}%`,
              iconColor: "text-[oklch(0.72_0.18_145)]",
              className: "animate-slide-up [animation-delay:0.1s]"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatCard,
            {
              icon: TrendingUp,
              label: "Study Progress",
              value: `${overallProgress.toFixed(0)}%`,
              iconColor: "text-[oklch(0.75_0.16_85)]",
              className: "animate-slide-up [animation-delay:0.15s]"
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "grid grid-cols-1 lg:grid-cols-2 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "dashboard.cognitive_chart", className: "glass-card p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground text-sm", children: "Cognitive Load Trend" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "7-day history" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CognitiveLoadBadge, { category: loadCategory, size: "sm" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 180, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          AreaChart,
          {
            data: trendData,
            margin: { top: 4, right: 4, bottom: 0, left: -20 },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "loadGradient", x1: "0", y1: "0", x2: "0", y2: "1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "5%", stopColor: areaColor, stopOpacity: 0.35 }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "95%", stopColor: areaColor, stopOpacity: 0.02 })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                CartesianGrid,
                {
                  strokeDasharray: "3 3",
                  stroke: "oklch(0.85 0.02 260 / 0.3)"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                XAxis,
                {
                  dataKey: "day",
                  tick: { fontSize: 11, fill: "oklch(0.45 0.04 260)" },
                  axisLine: false,
                  tickLine: false
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                YAxis,
                {
                  domain: [0, 100],
                  tick: { fontSize: 11, fill: "oklch(0.45 0.04 260)" },
                  axisLine: false,
                  tickLine: false
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { content: /* @__PURE__ */ jsxRuntimeExports.jsx(CustomTooltip, {}) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Area,
                {
                  type: "monotone",
                  dataKey: "score",
                  stroke: areaColor,
                  strokeWidth: 2,
                  fill: "url(#loadGradient)",
                  dot: { r: 3, fill: areaColor, strokeWidth: 0 },
                  activeDot: { r: 5, fill: areaColor }
                }
              )
            ]
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "dashboard.weekly_chart", className: "glass-card p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground text-sm", children: "Weekly Study Sessions" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Sessions completed per day" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChartColumn, { size: 16, className: "text-muted-foreground" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 180, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          BarChart,
          {
            data: weeklyData,
            margin: { top: 4, right: 4, bottom: 0, left: -20 },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                CartesianGrid,
                {
                  strokeDasharray: "3 3",
                  stroke: "oklch(0.85 0.02 260 / 0.3)",
                  vertical: false
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                XAxis,
                {
                  dataKey: "day",
                  tick: { fontSize: 11, fill: "oklch(0.45 0.04 260)" },
                  axisLine: false,
                  tickLine: false
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                YAxis,
                {
                  allowDecimals: false,
                  tick: { fontSize: 11, fill: "oklch(0.45 0.04 260)" },
                  axisLine: false,
                  tickLine: false
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { content: /* @__PURE__ */ jsxRuntimeExports.jsx(BarTooltip, {}) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Bar,
                {
                  dataKey: "sessions",
                  fill: "oklch(0.52 0.21 262 / 0.75)",
                  radius: [4, 4, 0, 0]
                }
              )
            ]
          }
        ) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "dashboard.subjects_section", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-foreground text-base", children: "Subject Progress" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => navigate({ to: "/modules" }),
            "data-ocid": "dashboard.view_modules_button",
            className: "text-xs text-primary font-medium flex items-center gap-1 hover:text-primary/80 transition-smooth",
            children: [
              "View all ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 13 })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3", children: SUBJECTS.map((subj, i) => {
        var _a2;
        const lp = progressMap[subj];
        const pct = (lp == null ? void 0 : lp.progressPercentage) ?? 0;
        const completed = ((_a2 = lp == null ? void 0 : lp.completedTopics) == null ? void 0 : _a2.length) ?? 0;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": `dashboard.subject.item.${i + 1}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            ProgressCard,
            {
              subject: subj,
              progress: pct,
              completedTopics: completed,
              totalTopics: 10,
              cognitiveCategory: loadCategory,
              onClick: () => navigate({
                to: "/quiz",
                search: { subject: subj }
              }),
              className: "animate-slide-up"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => navigate({
                to: "/quiz",
                search: { subject: subj }
              }),
              "data-ocid": `dashboard.subject.start_quiz_button.${i + 1}`,
              className: "mt-2 w-full text-xs font-medium text-center py-1.5 rounded-lg border border-primary/30 text-primary hover:bg-primary/10 transition-smooth",
              children: "Start Quiz"
            }
          )
        ] }, subj);
      }) })
    ] }),
    (((_e = dashData == null ? void 0 : dashData.recommendations) == null ? void 0 : _e.length) ?? 0) > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "dashboard.recommendations_section", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-foreground text-base", children: "Personalised Recommendations" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Lightbulb, { size: 16, className: "text-[oklch(0.75_0.16_85)]" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-3", children: dashData.recommendations.slice(0, 6).map((rec, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        RecommendationCard,
        {
          rec,
          index: i,
          onStart: () => navigate({ to: "/modules" })
        },
        rec.recId
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "dashboard.quiz_history_section", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-foreground text-base", children: "Recent Quiz History" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => navigate({ to: "/quiz" }),
            "data-ocid": "dashboard.view_all_quizzes_button",
            className: "text-xs text-primary font-medium flex items-center gap-1 hover:text-primary/80 transition-smooth",
            children: [
              "View all ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 13 })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "glass-card px-4 py-2", children: (((_f = dashData == null ? void 0 : dashData.recentQuizSessions) == null ? void 0 : _f.length) ?? 0) === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        "p",
        {
          "data-ocid": "dashboard.quiz_history.empty_state",
          className: "text-sm text-muted-foreground text-center py-8",
          children: "No quizzes completed yet. Start your first quiz!"
        }
      ) : dashData.recentQuizSessions.slice(0, 5).map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(QuizRow, { session: s, index: i }, s.sessionId)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "dashboard.quick_actions_section", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-foreground text-base mb-3", children: "Quick Actions" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => navigate({ to: "/quiz" }),
            "data-ocid": "dashboard.start_quiz_button",
            className: "glass-card p-5 flex items-center gap-3 text-left group hover:border-primary/40 hover:shadow-lg transition-smooth",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-primary/15 border border-primary/25 flex items-center justify-center group-hover:bg-primary/25 transition-smooth", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ClipboardList, { size: 18, className: "text-primary" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-foreground text-sm", children: "Start Quiz" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Test your knowledge" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                ArrowRight,
                {
                  size: 16,
                  className: "text-muted-foreground ml-auto flex-shrink-0 group-hover:text-primary transition-smooth"
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => navigate({ to: "/analytics" }),
            "data-ocid": "dashboard.view_analytics_button",
            className: "glass-card p-5 flex items-center gap-3 text-left group hover:border-primary/40 hover:shadow-lg transition-smooth",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-[oklch(0.72_0.18_145/0.15)] border border-[oklch(0.72_0.18_145/0.3)] flex items-center justify-center group-hover:bg-[oklch(0.72_0.18_145/0.25)] transition-smooth", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChartColumn, { size: 18, className: "text-[oklch(0.72_0.18_145)]" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-foreground text-sm", children: "View Analytics" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Track your performance" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                ArrowRight,
                {
                  size: 16,
                  className: "text-muted-foreground ml-auto flex-shrink-0 group-hover:text-[oklch(0.72_0.18_145)] transition-smooth"
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => navigate({ to: "/modules" }),
            "data-ocid": "dashboard.continue_learning_button",
            className: "glass-card p-5 flex items-center gap-3 text-left group hover:border-primary/40 hover:shadow-lg transition-smooth",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-[oklch(0.65_0.18_200/0.15)] border border-[oklch(0.65_0.18_200/0.3)] flex items-center justify-center group-hover:bg-[oklch(0.65_0.18_200/0.25)] transition-smooth", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Layers, { size: 18, className: "text-[oklch(0.65_0.18_200)]" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-foreground text-sm", children: "Continue Learning" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Pick up where you left off" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                ArrowRight,
                {
                  size: 16,
                  className: "text-muted-foreground ml-auto flex-shrink-0 group-hover:text-[oklch(0.65_0.18_200)] transition-smooth"
                }
              )
            ]
          }
        )
      ] })
    ] })
  ] });
}
export {
  Dashboard as default
};
