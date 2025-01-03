"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sortAs = exports.numberFormat = exports.naturalSort = exports.locales = exports.getSort = exports.derivers = exports.aggregators = exports.aggregatorTemplates = exports.PivotData = void 0;
var _propTypes = _interopRequireDefault(require("prop-types"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
/*
 * decaffeinate suggestions:
 * DS101: Remove unnecessary use of Array.from
 * DS102: Remove unnecessary code created because of implicit returns
 * DS104: Avoid inline assignments
 * DS201: Simplify complex destructure assignments
 * DS203: Remove `|| {}` from converted for-own loops
 * DS205: Consider reworking code to avoid use of IIFEs
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */

var addSeparators = function addSeparators(nStr, thousandsSep, decimalSep) {
  var x = String(nStr).split(".");
  var x1 = x[0];
  var x2 = x.length > 1 ? decimalSep + x[1] : "";
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, "$1".concat(thousandsSep, "$2"));
  }
  return x1 + x2;
};
var numberFormat = exports.numberFormat = function numberFormat(opts_in) {
  var defaults = {
    digitsAfterDecimal: 2,
    scaler: 1,
    thousandsSep: ",",
    decimalSep: ".",
    prefix: "",
    suffix: ""
  };
  var opts = Object.assign({}, defaults, opts_in);
  return function (x) {
    if (isNaN(x) || !isFinite(x)) {
      return "";
    }
    var result = addSeparators((opts.scaler * x).toFixed(opts.digitsAfterDecimal), opts.thousandsSep, opts.decimalSep);
    return "".concat(opts.prefix).concat(result).concat(opts.suffix);
  };
};
var rx = /(\d+)|(\D+)/g;
var rd = /\d/;
var rz = /^0/;
var naturalSort = exports.naturalSort = function naturalSort(as, bs) {
  // nulls first
  if (bs !== null && as === null) {
    return -1;
  }
  if (as !== null && bs === null) {
    return 1;
  }

  // then raw NaNs
  if (typeof as === "number" && isNaN(as)) {
    return -1;
  }
  if (typeof bs === "number" && isNaN(bs)) {
    return 1;
  }

  // numbers and numbery strings group together
  var nas = Number(as);
  var nbs = Number(bs);
  if (nas < nbs) {
    return -1;
  }
  if (nas > nbs) {
    return 1;
  }

  // within that, true numbers before numbery strings
  if (typeof as === "number" && typeof bs !== "number") {
    return -1;
  }
  if (typeof bs === "number" && typeof as !== "number") {
    return 1;
  }
  if (typeof as === "number" && typeof bs === "number") {
    return 0;
  }

  // 'Infinity' is a textual number, so less than 'A'
  if (isNaN(nbs) && !isNaN(nas)) {
    return -1;
  }
  if (isNaN(nas) && !isNaN(nbs)) {
    return 1;
  }

  // finally, "smart" string sorting per http://stackoverflow.com/a/4373421/112871
  var a = String(as);
  var b = String(bs);
  if (a === b) {
    return 0;
  }
  if (!rd.test(a) || !rd.test(b)) {
    return a > b ? 1 : -1;
  }

  // special treatment for strings containing digits
  a = a.match(rx);
  b = b.match(rx);
  while (a.length && b.length) {
    var a1 = a.shift();
    var b1 = b.shift();
    if (a1 !== b1) {
      if (rd.test(a1) && rd.test(b1)) {
        return a1.replace(rz, ".0") - b1.replace(rz, ".0");
      }
      return a1 > b1 ? 1 : -1;
    }
  }
  return a.length - b.length;
};
var sortAs = exports.sortAs = function sortAs(order) {
  var mapping = {};

  // sort lowercased keys similarly
  var l_mapping = {};
  for (var i in order) {
    var x = order[i];
    mapping[x] = i;
    if (typeof x === "string") {
      l_mapping[x.toLowerCase()] = i;
    }
  }
  return function (a, b) {
    if (a in mapping && b in mapping) {
      return mapping[a] - mapping[b];
    } else if (a in mapping) {
      return -1;
    } else if (b in mapping) {
      return 1;
    } else if (a in l_mapping && b in l_mapping) {
      return l_mapping[a] - l_mapping[b];
    } else if (a in l_mapping) {
      return -1;
    } else if (b in l_mapping) {
      return 1;
    }
    return naturalSort(a, b);
  };
};
var getSort = exports.getSort = function getSort(sorters, attr) {
  if (sorters) {
    if (typeof sorters === "function") {
      var sort = sorters(attr);
      if (typeof sort === "function") {
        return sort;
      }
    } else if (attr in sorters) {
      return sorters[attr];
    }
  }
  return naturalSort;
};

// aggregator templates default to US number formatting but this is overrideable
var usFmt = numberFormat();
var usFmtInt = numberFormat({
  digitsAfterDecimal: 0
});
var usFmtPct = numberFormat({
  digitsAfterDecimal: 1,
  scaler: 100,
  suffix: "%"
});
var aggregatorTemplates = exports.aggregatorTemplates = {
  count: function count() {
    var formatter = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : usFmtInt;
    return function () {
      return function () {
        return {
          count: 0,
          push: function push() {
            this.count++;
          },
          value: function value() {
            return this.count;
          },
          format: formatter
        };
      };
    };
  },
  uniques: function uniques(fn) {
    var formatter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : usFmtInt;
    return function (_ref) {
      var _ref2 = _slicedToArray(_ref, 1),
        attr = _ref2[0];
      return function () {
        return {
          uniq: [],
          push: function push(record) {
            if (!Array.from(this.uniq).includes(record[attr])) {
              this.uniq.push(record[attr]);
            }
          },
          value: function value() {
            return fn(this.uniq);
          },
          format: formatter,
          numInputs: typeof attr !== "undefined" ? 0 : 1
        };
      };
    };
  },
  sum: function sum() {
    var formatter = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : usFmt;
    return function (_ref3) {
      var _ref4 = _slicedToArray(_ref3, 1),
        attr = _ref4[0];
      return function () {
        return {
          sum: 0,
          push: function push(record) {
            if (!isNaN(parseFloat(record[attr]))) {
              this.sum += parseFloat(record[attr]);
            }
          },
          value: function value() {
            return this.sum;
          },
          format: formatter,
          numInputs: typeof attr !== "undefined" ? 0 : 1
        };
      };
    };
  },
  extremes: function extremes(mode) {
    var formatter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : usFmt;
    return function (_ref5) {
      var _ref6 = _slicedToArray(_ref5, 1),
        attr = _ref6[0];
      return function (data) {
        return {
          val: null,
          sorter: getSort(typeof data !== "undefined" ? data.sorters : null, attr),
          push: function push(record) {
            var x = record[attr];
            if (["min", "max"].includes(mode)) {
              x = parseFloat(x);
              if (!isNaN(x)) {
                this.val = Math[mode](x, this.val !== null ? this.val : x);
              }
            }
            if (mode === "first" && this.sorter(x, this.val !== null ? this.val : x) <= 0) {
              this.val = x;
            }
            if (mode === "last" && this.sorter(x, this.val !== null ? this.val : x) >= 0) {
              this.val = x;
            }
          },
          value: function value() {
            return this.val;
          },
          format: function format(x) {
            if (isNaN(x)) {
              return x;
            }
            return formatter(x);
          },
          numInputs: typeof attr !== "undefined" ? 0 : 1
        };
      };
    };
  },
  quantile: function quantile(q) {
    var formatter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : usFmt;
    return function (_ref7) {
      var _ref8 = _slicedToArray(_ref7, 1),
        attr = _ref8[0];
      return function () {
        return {
          vals: [],
          push: function push(record) {
            var x = parseFloat(record[attr]);
            if (!isNaN(x)) {
              this.vals.push(x);
            }
          },
          value: function value() {
            if (this.vals.length === 0) {
              return null;
            }
            this.vals.sort(function (a, b) {
              return a - b;
            });
            var i = (this.vals.length - 1) * q;
            return (this.vals[Math.floor(i)] + this.vals[Math.ceil(i)]) / 2.0;
          },
          format: formatter,
          numInputs: typeof attr !== "undefined" ? 0 : 1
        };
      };
    };
  },
  runningStat: function runningStat() {
    var mode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "mean";
    var ddof = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
    var formatter = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : usFmt;
    return function (_ref9) {
      var _ref10 = _slicedToArray(_ref9, 1),
        attr = _ref10[0];
      return function () {
        return {
          n: 0.0,
          m: 0.0,
          s: 0.0,
          push: function push(record) {
            var x = parseFloat(record[attr]);
            if (isNaN(x)) {
              return;
            }
            this.n += 1.0;
            if (this.n === 1.0) {
              this.m = x;
            }
            var m_new = this.m + (x - this.m) / this.n;
            this.s = this.s + (x - this.m) * (x - m_new);
            this.m = m_new;
          },
          value: function value() {
            if (mode === "mean") {
              if (this.n === 0) {
                return 0 / 0;
              }
              return this.m;
            }
            if (this.n <= ddof) {
              return 0;
            }
            switch (mode) {
              case "var":
                return this.s / (this.n - ddof);
              case "stdev":
                return Math.sqrt(this.s / (this.n - ddof));
              default:
                throw new Error("unknown mode for runningStat");
            }
          },
          format: formatter,
          numInputs: typeof attr !== "undefined" ? 0 : 1
        };
      };
    };
  },
  sumOverSum: function sumOverSum() {
    var formatter = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : usFmt;
    return function (_ref11) {
      var _ref12 = _slicedToArray(_ref11, 2),
        num = _ref12[0],
        denom = _ref12[1];
      return function () {
        return {
          sumNum: 0,
          sumDenom: 0,
          push: function push(record) {
            if (!isNaN(parseFloat(record[num]))) {
              this.sumNum += parseFloat(record[num]);
            }
            if (!isNaN(parseFloat(record[denom]))) {
              this.sumDenom += parseFloat(record[denom]);
            }
          },
          value: function value() {
            return this.sumNum / this.sumDenom;
          },
          format: formatter,
          numInputs: typeof num !== "undefined" && typeof denom !== "undefined" ? 0 : 2
        };
      };
    };
  },
  fractionOf: function fractionOf(wrapped) {
    var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "total";
    var formatter = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : usFmtPct;
    return function () {
      for (var _len = arguments.length, x = new Array(_len), _key = 0; _key < _len; _key++) {
        x[_key] = arguments[_key];
      }
      return function (data, rowKey, colKey) {
        return {
          selector: {
            total: [[], []],
            row: [rowKey, []],
            col: [[], colKey]
          }[type],
          inner: wrapped.apply(void 0, _toConsumableArray(Array.from(x || [])))(data, rowKey, colKey),
          push: function push(record) {
            this.inner.push(record);
          },
          format: formatter,
          value: function value() {
            return this.inner.value() / data.getAggregator.apply(data, _toConsumableArray(Array.from(this.selector || []))).inner.value();
          },
          numInputs: wrapped.apply(void 0, _toConsumableArray(Array.from(x || [])))().numInputs
        };
      };
    };
  }
};
aggregatorTemplates.countUnique = function (f) {
  return aggregatorTemplates.uniques(function (x) {
    return x.length;
  }, f);
};
aggregatorTemplates.listUnique = function (s) {
  return aggregatorTemplates.uniques(function (x) {
    return x.join(s);
  }, function (x) {
    return x;
  });
};
aggregatorTemplates.max = function (f) {
  return aggregatorTemplates.extremes("max", f);
};
aggregatorTemplates.min = function (f) {
  return aggregatorTemplates.extremes("min", f);
};
aggregatorTemplates.first = function (f) {
  return aggregatorTemplates.extremes("first", f);
};
aggregatorTemplates.last = function (f) {
  return aggregatorTemplates.extremes("last", f);
};
aggregatorTemplates.median = function (f) {
  return aggregatorTemplates.quantile(0.5, f);
};
aggregatorTemplates.average = function (f) {
  return aggregatorTemplates.runningStat("mean", 1, f);
};
aggregatorTemplates["var"] = function (ddof, f) {
  return aggregatorTemplates.runningStat("var", ddof, f);
};
aggregatorTemplates.stdev = function (ddof, f) {
  return aggregatorTemplates.runningStat("stdev", ddof, f);
};

// default aggregators & renderers use US naming and number formatting
var aggregators = exports.aggregators = function (tpl) {
  return {
    Count: tpl.count(usFmtInt),
    "Count Unique Values": tpl.countUnique(usFmtInt),
    "List Unique Values": tpl.listUnique(", "),
    Sum: tpl.sum(usFmt),
    "Integer Sum": tpl.sum(usFmtInt),
    Average: tpl.average(usFmt),
    Median: tpl.median(usFmt),
    "Sample Variance": tpl["var"](1, usFmt),
    "Sample Standard Deviation": tpl.stdev(1, usFmt),
    Minimum: tpl.min(usFmt),
    Maximum: tpl.max(usFmt),
    First: tpl.first(usFmt),
    Last: tpl.last(usFmt),
    "Sum over Sum": tpl.sumOverSum(usFmt),
    "Sum as Fraction of Total": tpl.fractionOf(tpl.sum(), "total", usFmtPct),
    "Sum as Fraction of Rows": tpl.fractionOf(tpl.sum(), "row", usFmtPct),
    "Sum as Fraction of Columns": tpl.fractionOf(tpl.sum(), "col", usFmtPct),
    "Count as Fraction of Total": tpl.fractionOf(tpl.count(), "total", usFmtPct),
    "Count as Fraction of Rows": tpl.fractionOf(tpl.count(), "row", usFmtPct),
    "Count as Fraction of Columns": tpl.fractionOf(tpl.count(), "col", usFmtPct)
  };
}(aggregatorTemplates);
var locales = exports.locales = {
  en: {
    aggregators: aggregators,
    localeStrings: {
      renderError: "An error occurred rendering the PivotTable results.",
      computeError: "An error occurred computing the PivotTable results.",
      uiRenderError: "An error occurred rendering the PivotTable UI.",
      selectAll: "Select All",
      selectNone: "Select None",
      tooMany: "(too many to list)",
      filterResults: "Filter values",
      apply: "Apply",
      cancel: "Cancel",
      totals: "Totals",
      vs: "vs",
      by: "by"
    }
  }
};

// dateFormat deriver l10n requires month and day names to be passed in directly
var mthNamesEn = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
var dayNamesEn = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
var zeroPad = function zeroPad(number) {
  return "0".concat(number).substr(-2, 2);
}; // eslint-disable-line no-magic-numbers

var derivers = exports.derivers = {
  bin: function bin(col, binWidth) {
    return function (record) {
      return record[col] - record[col] % binWidth;
    };
  },
  dateFormat: function dateFormat(col, formatString) {
    var utcOutput = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var mthNames = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : mthNamesEn;
    var dayNames = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : dayNamesEn;
    var utc = utcOutput ? "UTC" : "";
    return function (record) {
      var date = new Date(Date.parse(record[col]));
      if (isNaN(date)) {
        return "";
      }
      return formatString.replace(/%(.)/g, function (m, p) {
        switch (p) {
          case "y":
            return date["get".concat(utc, "FullYear")]();
          case "m":
            return zeroPad(date["get".concat(utc, "Month")]() + 1);
          case "n":
            return mthNames[date["get".concat(utc, "Month")]()];
          case "d":
            return zeroPad(date["get".concat(utc, "Date")]());
          case "w":
            return dayNames[date["get".concat(utc, "Day")]()];
          case "x":
            return date["get".concat(utc, "Day")]();
          case "H":
            return zeroPad(date["get".concat(utc, "Hours")]());
          case "M":
            return zeroPad(date["get".concat(utc, "Minutes")]());
          case "S":
            return zeroPad(date["get".concat(utc, "Seconds")]());
          default:
            return "%".concat(p);
        }
      });
    };
  }
};

/*
Data Model class
*/
var PivotData = exports.PivotData = /*#__PURE__*/function () {
  function PivotData() {
    var _this = this;
    var inputProps = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, PivotData);
    this.props = Object.assign({}, PivotData.defaultProps, inputProps);
    _propTypes["default"].checkPropTypes(PivotData.propTypes, this.props, "prop", "PivotData");
    this.aggregator = this.props.aggregators[this.props.aggregatorName](this.props.vals);
    this.tree = {};
    this.rowKeys = [];
    this.colKeys = [];
    this.rowTotals = {};
    this.colTotals = {};
    this.allTotal = this.aggregator(this, [], []);
    this.sorted = false;

    // iterate through input, accumulating data for cells
    PivotData.forEachRecord(this.props.data, this.props.derivedAttributes, function (record) {
      if (_this.filter(record)) {
        _this.processRecord(record);
      }
    });
  }
  return _createClass(PivotData, [{
    key: "filter",
    value: function filter(record) {
      for (var k in this.props.valueFilter) {
        if (record[k] in this.props.valueFilter[k]) {
          return false;
        }
      }
      return true;
    }
  }, {
    key: "forEachMatchingRecord",
    value: function forEachMatchingRecord(criteria, callback) {
      var _this2 = this;
      return PivotData.forEachRecord(this.props.data, this.props.derivedAttributes, function (record) {
        if (!_this2.filter(record)) {
          return;
        }
        for (var k in criteria) {
          var v = criteria[k];
          if (v !== (k in record ? record[k] : "null")) {
            return;
          }
        }
        callback(record);
      });
    }
  }, {
    key: "arrSort",
    value: function arrSort(attrs) {
      var _this3 = this;
      var a;
      var sortersArr = function () {
        var result = [];
        for (var _i = 0, _Array$from = Array.from(attrs); _i < _Array$from.length; _i++) {
          a = _Array$from[_i];
          result.push(getSort(_this3.props.sorters, a));
        }
        return result;
      }();
      return function (a, b) {
        for (var _i2 = 0, _Object$keys = Object.keys(sortersArr || {}); _i2 < _Object$keys.length; _i2++) {
          var i = _Object$keys[_i2];
          var sorter = sortersArr[i];
          var comparison = sorter(a[i], b[i]);
          if (comparison !== 0) {
            return comparison;
          }
        }
        return 0;
      };
    }
  }, {
    key: "sortKeys",
    value: function sortKeys() {
      var _this4 = this;
      if (!this.sorted) {
        this.sorted = true;
        var v = function v(r, c) {
          return _this4.getAggregator(r, c).value();
        };
        switch (this.props.rowOrder) {
          case "value_a_to_z":
            this.rowKeys.sort(function (a, b) {
              return naturalSort(v(a, []), v(b, []));
            });
            break;
          case "value_z_to_a":
            this.rowKeys.sort(function (a, b) {
              return -naturalSort(v(a, []), v(b, []));
            });
            break;
          default:
            this.rowKeys.sort(this.arrSort(this.props.rows));
        }
        switch (this.props.colOrder) {
          case "value_a_to_z":
            this.colKeys.sort(function (a, b) {
              return naturalSort(v([], a), v([], b));
            });
            break;
          case "value_z_to_a":
            this.colKeys.sort(function (a, b) {
              return -naturalSort(v([], a), v([], b));
            });
            break;
          default:
            this.colKeys.sort(this.arrSort(this.props.cols));
        }
      }
    }
  }, {
    key: "getColKeys",
    value: function getColKeys() {
      this.sortKeys();
      return this.colKeys;
    }
  }, {
    key: "getRowKeys",
    value: function getRowKeys() {
      this.sortKeys();
      return this.rowKeys;
    }
  }, {
    key: "processRecord",
    value: function processRecord(record) {
      // this code is called in a tight loop
      var colKey = [];
      var rowKey = [];
      for (var _i3 = 0, _Array$from2 = Array.from(this.props.cols); _i3 < _Array$from2.length; _i3++) {
        var x = _Array$from2[_i3];
        colKey.push(x in record ? record[x] : "null");
      }
      for (var _i4 = 0, _Array$from3 = Array.from(this.props.rows); _i4 < _Array$from3.length; _i4++) {
        var _x = _Array$from3[_i4];
        rowKey.push(_x in record ? record[_x] : "null");
      }
      var flatRowKey = rowKey.join(String.fromCharCode(0));
      var flatColKey = colKey.join(String.fromCharCode(0));
      this.allTotal.push(record);
      if (rowKey.length !== 0) {
        if (!this.rowTotals[flatRowKey]) {
          this.rowKeys.push(rowKey);
          this.rowTotals[flatRowKey] = this.aggregator(this, rowKey, []);
        }
        this.rowTotals[flatRowKey].push(record);
      }
      if (colKey.length !== 0) {
        if (!this.colTotals[flatColKey]) {
          this.colKeys.push(colKey);
          this.colTotals[flatColKey] = this.aggregator(this, [], colKey);
        }
        this.colTotals[flatColKey].push(record);
      }
      if (colKey.length !== 0 && rowKey.length !== 0) {
        if (!this.tree[flatRowKey]) {
          this.tree[flatRowKey] = {};
        }
        if (!this.tree[flatRowKey][flatColKey]) {
          this.tree[flatRowKey][flatColKey] = this.aggregator(this, rowKey, colKey);
        }
        this.tree[flatRowKey][flatColKey].push(record);
      }
    }
  }, {
    key: "getAggregator",
    value: function getAggregator(rowKey, colKey) {
      var agg;
      var flatRowKey = rowKey.join(String.fromCharCode(0));
      var flatColKey = colKey.join(String.fromCharCode(0));
      if (rowKey.length === 0 && colKey.length === 0) {
        agg = this.allTotal;
      } else if (rowKey.length === 0) {
        agg = this.colTotals[flatColKey];
      } else if (colKey.length === 0) {
        agg = this.rowTotals[flatRowKey];
      } else {
        agg = this.tree[flatRowKey][flatColKey];
      }
      return agg || {
        value: function value() {
          return null;
        },
        format: function format() {
          return "";
        }
      };
    }
  }]);
}(); // can handle arrays or jQuery selections of tables
PivotData.forEachRecord = function (input, derivedAttributes, f) {
  var addRecord, record;
  if (Object.getOwnPropertyNames(derivedAttributes).length === 0) {
    addRecord = f;
  } else {
    addRecord = function addRecord(record) {
      for (var k in derivedAttributes) {
        var derived = derivedAttributes[k](record);
        if (derived !== null) {
          record[k] = derived;
        }
      }
      return f(record);
    };
  }

  // if it's a function, have it call us back
  if (typeof input === "function") {
    return input(addRecord);
  } else if (Array.isArray(input)) {
    if (Array.isArray(input[0])) {
      // array of arrays
      return function () {
        var result = [];
        for (var _i5 = 0, _Object$keys2 = Object.keys(input || {}); _i5 < _Object$keys2.length; _i5++) {
          var i = _Object$keys2[_i5];
          var compactRecord = input[i];
          if (i > 0) {
            record = {};
            for (var _i6 = 0, _Object$keys3 = Object.keys(input[0] || {}); _i6 < _Object$keys3.length; _i6++) {
              var j = _Object$keys3[_i6];
              var k = input[0][j];
              record[k] = compactRecord[j];
            }
            result.push(addRecord(record));
          }
        }
        return result;
      }();
    }

    // array of objects
    return function () {
      var result1 = [];
      for (var _i7 = 0, _Array$from4 = Array.from(input); _i7 < _Array$from4.length; _i7++) {
        record = _Array$from4[_i7];
        result1.push(addRecord(record));
      }
      return result1;
    }();
  }
  throw new Error("unknown input format");
};
PivotData.defaultProps = {
  aggregators: aggregators,
  cols: [],
  rows: [],
  vals: [],
  aggregatorName: "Count",
  sorters: {},
  valueFilter: {},
  rowOrder: "key_a_to_z",
  colOrder: "key_a_to_z",
  derivedAttributes: {}
};
PivotData.propTypes = {
  data: _propTypes["default"].oneOfType([_propTypes["default"].array, _propTypes["default"].object, _propTypes["default"].func]).isRequired,
  aggregatorName: _propTypes["default"].string,
  cols: _propTypes["default"].arrayOf(_propTypes["default"].string),
  rows: _propTypes["default"].arrayOf(_propTypes["default"].string),
  vals: _propTypes["default"].arrayOf(_propTypes["default"].string),
  valueFilter: _propTypes["default"].objectOf(_propTypes["default"].objectOf(_propTypes["default"].bool)),
  sorters: _propTypes["default"].oneOfType([_propTypes["default"].func, _propTypes["default"].objectOf(_propTypes["default"].func)]),
  derivedAttributes: _propTypes["default"].objectOf(_propTypes["default"].func),
  rowOrder: _propTypes["default"].oneOf(["key_a_to_z", "value_a_to_z", "value_z_to_a"]),
  colOrder: _propTypes["default"].oneOf(["key_a_to_z", "value_a_to_z", "value_z_to_a"])
};
//# sourceMappingURL=Utilities.js.map