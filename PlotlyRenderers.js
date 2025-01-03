"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = createPlotlyRenderers;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _Utilities = require("./Utilities");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
/* eslint-disable react/prop-types */
// eslint can't see inherited propTypes!

function makeRenderer(PlotlyComponent) {
  var traceOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var layoutOptions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var transpose = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  var Renderer = /*#__PURE__*/function (_React$PureComponent) {
    function Renderer() {
      _classCallCheck(this, Renderer);
      return _callSuper(this, Renderer, arguments);
    }
    _inherits(Renderer, _React$PureComponent);
    return _createClass(Renderer, [{
      key: "render",
      value: function render() {
        var pivotData = new _Utilities.PivotData(this.props);
        var rowKeys = pivotData.getRowKeys();
        var colKeys = pivotData.getColKeys();
        var traceKeys = transpose ? colKeys : rowKeys;
        if (traceKeys.length === 0) {
          traceKeys.push([]);
        }
        var datumKeys = transpose ? rowKeys : colKeys;
        if (datumKeys.length === 0) {
          datumKeys.push([]);
        }
        var fullAggName = this.props.aggregatorName;
        var numInputs = this.props.aggregators[fullAggName]([])().numInputs || 0;
        if (numInputs !== 0) {
          fullAggName += " of ".concat(this.props.vals.slice(0, numInputs).join(', '));
        }
        var data = traceKeys.map(function (traceKey) {
          var values = [];
          var labels = [];
          var _iterator = _createForOfIteratorHelper(datumKeys),
            _step;
          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var datumKey = _step.value;
              var val = parseFloat(pivotData.getAggregator(transpose ? datumKey : traceKey, transpose ? traceKey : datumKey).value());
              values.push(isFinite(val) ? val : null);
              labels.push(datumKey.join('-') || ' ');
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
          var trace = {
            name: traceKey.join('-') || fullAggName
          };
          if (traceOptions.type === 'pie') {
            trace.values = values;
            trace.labels = labels.length > 1 ? labels : [fullAggName];
          } else {
            trace.x = transpose ? values : labels;
            trace.y = transpose ? labels : values;
          }
          return Object.assign(trace, traceOptions);
        });
        var titleText = fullAggName;
        var hAxisTitle = transpose ? this.props.rows.join('-') : this.props.cols.join('-');
        var groupByTitle = transpose ? this.props.cols.join('-') : this.props.rows.join('-');
        if (hAxisTitle !== '') {
          titleText += " vs ".concat(hAxisTitle);
        }
        if (groupByTitle !== '') {
          titleText += " by ".concat(groupByTitle);
        }
        var layout = {
          title: titleText,
          hovermode: 'closest',
          /* eslint-disable no-magic-numbers */
          width: window.innerWidth / 1.5,
          height: window.innerHeight / 1.4 - 50
          /* eslint-enable no-magic-numbers */
        };
        if (traceOptions.type === 'pie') {
          var columns = Math.ceil(Math.sqrt(data.length));
          var rows = Math.ceil(data.length / columns);
          layout.grid = {
            columns: columns,
            rows: rows
          };
          data.forEach(function (d, i) {
            d.domain = {
              row: Math.floor(i / columns),
              column: i - columns * Math.floor(i / columns)
            };
            if (data.length > 1) {
              d.title = d.name;
            }
          });
          if (data[0].labels.length === 1) {
            layout.showlegend = false;
          }
        } else {
          layout.xaxis = {
            title: transpose ? fullAggName : null,
            automargin: true
          };
          layout.yaxis = {
            title: transpose ? null : fullAggName,
            automargin: true
          };
        }
        return /*#__PURE__*/_react["default"].createElement(PlotlyComponent, {
          data: data,
          layout: Object.assign(layout, layoutOptions, this.props.plotlyOptions),
          config: this.props.plotlyConfig,
          onUpdate: this.props.onRendererUpdate
        });
      }
    }]);
  }(_react["default"].PureComponent);
  Renderer.defaultProps = Object.assign({}, _Utilities.PivotData.defaultProps, {
    plotlyOptions: {},
    plotlyConfig: {}
  });
  Renderer.propTypes = Object.assign({}, _Utilities.PivotData.propTypes, {
    plotlyOptions: _propTypes["default"].object,
    plotlyConfig: _propTypes["default"].object,
    onRendererUpdate: _propTypes["default"].func
  });
  return Renderer;
}
function makeScatterRenderer(PlotlyComponent) {
  var Renderer = /*#__PURE__*/function (_React$PureComponent2) {
    function Renderer() {
      _classCallCheck(this, Renderer);
      return _callSuper(this, Renderer, arguments);
    }
    _inherits(Renderer, _React$PureComponent2);
    return _createClass(Renderer, [{
      key: "render",
      value: function render() {
        var pivotData = new _Utilities.PivotData(this.props);
        var rowKeys = pivotData.getRowKeys();
        var colKeys = pivotData.getColKeys();
        if (rowKeys.length === 0) {
          rowKeys.push([]);
        }
        if (colKeys.length === 0) {
          colKeys.push([]);
        }
        var data = {
          x: [],
          y: [],
          text: [],
          type: 'scatter',
          mode: 'markers'
        };
        rowKeys.map(function (rowKey) {
          colKeys.map(function (colKey) {
            var v = pivotData.getAggregator(rowKey, colKey).value();
            if (v !== null) {
              data.x.push(colKey.join('-'));
              data.y.push(rowKey.join('-'));
              data.text.push(v);
            }
          });
        });
        var layout = {
          title: this.props.rows.join('-') + ' vs ' + this.props.cols.join('-'),
          hovermode: 'closest',
          /* eslint-disable no-magic-numbers */
          xaxis: {
            title: this.props.cols.join('-'),
            automargin: true
          },
          yaxis: {
            title: this.props.rows.join('-'),
            automargin: true
          },
          width: window.innerWidth / 1.5,
          height: window.innerHeight / 1.4 - 50
          /* eslint-enable no-magic-numbers */
        };
        return /*#__PURE__*/_react["default"].createElement(PlotlyComponent, {
          data: [data],
          layout: Object.assign(layout, this.props.plotlyOptions),
          config: this.props.plotlyConfig,
          onUpdate: this.props.onRendererUpdate
        });
      }
    }]);
  }(_react["default"].PureComponent);
  Renderer.defaultProps = Object.assign({}, _Utilities.PivotData.defaultProps, {
    plotlyOptions: {},
    plotlyConfig: {}
  });
  Renderer.propTypes = Object.assign({}, _Utilities.PivotData.propTypes, {
    plotlyOptions: _propTypes["default"].object,
    plotlyConfig: _propTypes["default"].object,
    onRendererUpdate: _propTypes["default"].func
  });
  return Renderer;
}
function createPlotlyRenderers(PlotlyComponent) {
  return {
    'Grouped Column Chart': makeRenderer(PlotlyComponent, {
      type: 'bar'
    }, {
      barmode: 'group'
    }),
    'Stacked Column Chart': makeRenderer(PlotlyComponent, {
      type: 'bar'
    }, {
      barmode: 'relative'
    }),
    'Grouped Bar Chart': makeRenderer(PlotlyComponent, {
      type: 'bar',
      orientation: 'h'
    }, {
      barmode: 'group'
    }, true),
    'Stacked Bar Chart': makeRenderer(PlotlyComponent, {
      type: 'bar',
      orientation: 'h'
    }, {
      barmode: 'relative'
    }, true),
    'Line Chart': makeRenderer(PlotlyComponent),
    'Dot Chart': makeRenderer(PlotlyComponent, {
      mode: 'markers'
    }, {}, true),
    'Area Chart': makeRenderer(PlotlyComponent, {
      stackgroup: 1
    }),
    'Scatter Chart': makeScatterRenderer(PlotlyComponent),
    'Multiple Pie Chart': makeRenderer(PlotlyComponent, {
      type: 'pie',
      scalegroup: 1,
      hoverinfo: 'label+value',
      textinfo: 'none'
    }, {}, true)
  };
}
//# sourceMappingURL=PlotlyRenderers.js.map