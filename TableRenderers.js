"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _Utilities = require("./Utilities");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
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
// helper function for setting row/col-span in pivotTableRenderer
var spanSize = function spanSize(arr, i, j) {
  var x;
  if (i !== 0) {
    var asc, end;
    var noDraw = true;
    for (x = 0, end = j, asc = end >= 0; asc ? x <= end : x >= end; asc ? x++ : x--) {
      if (arr[i - 1][x] !== arr[i][x]) {
        noDraw = false;
      }
    }
    if (noDraw) {
      return -1;
    }
  }
  var len = 0;
  while (i + len < arr.length) {
    var asc1 = void 0,
      end1 = void 0;
    var stop = false;
    for (x = 0, end1 = j, asc1 = end1 >= 0; asc1 ? x <= end1 : x >= end1; asc1 ? x++ : x--) {
      if (arr[i][x] !== arr[i + len][x]) {
        stop = true;
      }
    }
    if (stop) {
      break;
    }
    len++;
  }
  return len;
};
function redColorScaleGenerator(values) {
  var min = Math.min.apply(Math, values);
  var max = Math.max.apply(Math, values);
  return function (x) {
    // eslint-disable-next-line no-magic-numbers
    var nonRed = 255 - Math.round(255 * (x - min) / (max - min));
    return {
      backgroundColor: "rgb(255,".concat(nonRed, ",").concat(nonRed, ")")
    };
  };
}
function makeRenderer() {
  var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var TableRenderer = /*#__PURE__*/function (_React$PureComponent) {
    function TableRenderer() {
      _classCallCheck(this, TableRenderer);
      return _callSuper(this, TableRenderer, arguments);
    }
    _inherits(TableRenderer, _React$PureComponent);
    return _createClass(TableRenderer, [{
      key: "render",
      value: function render() {
        var _this = this;
        var pivotData = new _Utilities.PivotData(this.props);
        var colAttrs = pivotData.props.cols;
        var rowAttrs = pivotData.props.rows;
        var rowKeys = pivotData.getRowKeys();
        var colKeys = pivotData.getColKeys();
        var grandTotalAggregator = pivotData.getAggregator([], []);
        var valueCellColors = function valueCellColors() {};
        var rowTotalColors = function rowTotalColors() {};
        var colTotalColors = function colTotalColors() {};
        if (opts.heatmapMode) {
          var colorScaleGenerator = this.props.tableColorScaleGenerator;
          var rowTotalValues = colKeys.map(function (x) {
            return pivotData.getAggregator([], x).value();
          });
          rowTotalColors = colorScaleGenerator(rowTotalValues);
          var colTotalValues = rowKeys.map(function (x) {
            return pivotData.getAggregator(x, []).value();
          });
          colTotalColors = colorScaleGenerator(colTotalValues);
          if (opts.heatmapMode === 'full') {
            var allValues = [];
            rowKeys.map(function (r) {
              return colKeys.map(function (c) {
                return allValues.push(pivotData.getAggregator(r, c).value());
              });
            });
            var colorScale = colorScaleGenerator(allValues);
            valueCellColors = function valueCellColors(r, c, v) {
              return colorScale(v);
            };
          } else if (opts.heatmapMode === 'row') {
            var rowColorScales = {};
            rowKeys.map(function (r) {
              var rowValues = colKeys.map(function (x) {
                return pivotData.getAggregator(r, x).value();
              });
              rowColorScales[r] = colorScaleGenerator(rowValues);
            });
            valueCellColors = function valueCellColors(r, c, v) {
              return rowColorScales[r](v);
            };
          } else if (opts.heatmapMode === 'col') {
            var colColorScales = {};
            colKeys.map(function (c) {
              var colValues = rowKeys.map(function (x) {
                return pivotData.getAggregator(x, c).value();
              });
              colColorScales[c] = colorScaleGenerator(colValues);
            });
            valueCellColors = function valueCellColors(r, c, v) {
              return colColorScales[c](v);
            };
          }
        }
        var getClickHandler = this.props.tableOptions && this.props.tableOptions.clickCallback ? function (value, rowValues, colValues) {
          var filters = {};
          for (var _i = 0, _Object$keys = Object.keys(colAttrs || {}); _i < _Object$keys.length; _i++) {
            var i = _Object$keys[_i];
            var attr = colAttrs[i];
            if (colValues[i] !== null) {
              filters[attr] = colValues[i];
            }
          }
          for (var _i2 = 0, _Object$keys2 = Object.keys(rowAttrs || {}); _i2 < _Object$keys2.length; _i2++) {
            var _i3 = _Object$keys2[_i2];
            var _attr = rowAttrs[_i3];
            if (rowValues[_i3] !== null) {
              filters[_attr] = rowValues[_i3];
            }
          }
          return function (e) {
            return _this.props.tableOptions.clickCallback(e, value, filters, pivotData);
          };
        } : null;
        return /*#__PURE__*/_react["default"].createElement("table", {
          className: "pvtTable"
        }, /*#__PURE__*/_react["default"].createElement("thead", null, colAttrs.map(function (c, j) {
          return /*#__PURE__*/_react["default"].createElement("tr", {
            key: "colAttr".concat(j)
          }, j === 0 && rowAttrs.length !== 0 && /*#__PURE__*/_react["default"].createElement("th", {
            colSpan: rowAttrs.length,
            rowSpan: colAttrs.length
          }), /*#__PURE__*/_react["default"].createElement("th", {
            className: "pvtAxisLabel"
          }, c), colKeys.map(function (colKey, i) {
            var x = spanSize(colKeys, i, j);
            if (x === -1) {
              return null;
            }
            return /*#__PURE__*/_react["default"].createElement("th", {
              className: "pvtColLabel",
              key: "colKey".concat(i),
              colSpan: x,
              rowSpan: j === colAttrs.length - 1 && rowAttrs.length !== 0 ? 2 : 1
            }, colKey[j]);
          }), j === 0 && /*#__PURE__*/_react["default"].createElement("th", {
            className: "pvtTotalLabel",
            rowSpan: colAttrs.length + (rowAttrs.length === 0 ? 0 : 1)
          }, "Totals"));
        }), rowAttrs.length !== 0 && /*#__PURE__*/_react["default"].createElement("tr", null, rowAttrs.map(function (r, i) {
          return /*#__PURE__*/_react["default"].createElement("th", {
            className: "pvtAxisLabel",
            key: "rowAttr".concat(i)
          }, r);
        }), /*#__PURE__*/_react["default"].createElement("th", {
          className: "pvtTotalLabel"
        }, colAttrs.length === 0 ? 'Totals' : null))), /*#__PURE__*/_react["default"].createElement("tbody", null, rowKeys.map(function (rowKey, i) {
          var totalAggregator = pivotData.getAggregator(rowKey, []);
          return /*#__PURE__*/_react["default"].createElement("tr", {
            key: "rowKeyRow".concat(i)
          }, rowKey.map(function (txt, j) {
            var x = spanSize(rowKeys, i, j);
            if (x === -1) {
              return null;
            }
            return /*#__PURE__*/_react["default"].createElement("th", {
              key: "rowKeyLabel".concat(i, "-").concat(j),
              className: "pvtRowLabel",
              rowSpan: x,
              colSpan: j === rowAttrs.length - 1 && colAttrs.length !== 0 ? 2 : 1
            }, txt);
          }), colKeys.map(function (colKey, j) {
            var aggregator = pivotData.getAggregator(rowKey, colKey);
            return /*#__PURE__*/_react["default"].createElement("td", {
              className: "pvtVal",
              key: "pvtVal".concat(i, "-").concat(j),
              onClick: getClickHandler && getClickHandler(aggregator.value(), rowKey, colKey),
              style: valueCellColors(rowKey, colKey, aggregator.value())
            }, aggregator.format(aggregator.value()));
          }), /*#__PURE__*/_react["default"].createElement("td", {
            className: "pvtTotal",
            onClick: getClickHandler && getClickHandler(totalAggregator.value(), rowKey, [null]),
            style: colTotalColors(totalAggregator.value())
          }, totalAggregator.format(totalAggregator.value())));
        }), /*#__PURE__*/_react["default"].createElement("tr", null, /*#__PURE__*/_react["default"].createElement("th", {
          className: "pvtTotalLabel",
          colSpan: rowAttrs.length + (colAttrs.length === 0 ? 0 : 1)
        }, "Totals"), colKeys.map(function (colKey, i) {
          var totalAggregator = pivotData.getAggregator([], colKey);
          return /*#__PURE__*/_react["default"].createElement("td", {
            className: "pvtTotal",
            key: "total".concat(i),
            onClick: getClickHandler && getClickHandler(totalAggregator.value(), [null], colKey),
            style: rowTotalColors(totalAggregator.value())
          }, totalAggregator.format(totalAggregator.value()));
        }), /*#__PURE__*/_react["default"].createElement("td", {
          onClick: getClickHandler && getClickHandler(grandTotalAggregator.value(), [null], [null]),
          className: "pvtGrandTotal"
        }, grandTotalAggregator.format(grandTotalAggregator.value())))));
      }
    }]);
  }(_react["default"].PureComponent);
  TableRenderer.defaultProps = _Utilities.PivotData.defaultProps;
  TableRenderer.propTypes = _Utilities.PivotData.propTypes;
  TableRenderer.defaultProps.tableColorScaleGenerator = redColorScaleGenerator;
  TableRenderer.defaultProps.tableOptions = {};
  TableRenderer.propTypes.tableColorScaleGenerator = _propTypes["default"].func;
  TableRenderer.propTypes.tableOptions = _propTypes["default"].object;
  return TableRenderer;
}
var TSVExportRenderer = /*#__PURE__*/function (_React$PureComponent2) {
  function TSVExportRenderer() {
    _classCallCheck(this, TSVExportRenderer);
    return _callSuper(this, TSVExportRenderer, arguments);
  }
  _inherits(TSVExportRenderer, _React$PureComponent2);
  return _createClass(TSVExportRenderer, [{
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
      var headerRow = pivotData.props.rows.map(function (r) {
        return r;
      });
      if (colKeys.length === 1 && colKeys[0].length === 0) {
        headerRow.push(this.props.aggregatorName);
      } else {
        colKeys.map(function (c) {
          return headerRow.push(c.join('-'));
        });
      }
      var result = rowKeys.map(function (r) {
        var row = r.map(function (x) {
          return x;
        });
        colKeys.map(function (c) {
          var v = pivotData.getAggregator(r, c).value();
          row.push(v ? v : '');
        });
        return row;
      });
      result.unshift(headerRow);
      return /*#__PURE__*/_react["default"].createElement("textarea", {
        value: result.map(function (r) {
          return r.join('\t');
        }).join('\n'),
        style: {
          width: window.innerWidth / 2,
          height: window.innerHeight / 2
        },
        readOnly: true
      });
    }
  }]);
}(_react["default"].PureComponent);
TSVExportRenderer.defaultProps = _Utilities.PivotData.defaultProps;
TSVExportRenderer.propTypes = _Utilities.PivotData.propTypes;
var _default = exports["default"] = {
  Table: makeRenderer(),
  'Table Heatmap': makeRenderer({
    heatmapMode: 'full'
  }),
  'Table Col Heatmap': makeRenderer({
    heatmapMode: 'col'
  }),
  'Table Row Heatmap': makeRenderer({
    heatmapMode: 'row'
  }),
  'Exportable TSV': TSVExportRenderer
};
//# sourceMappingURL=TableRenderers.js.map