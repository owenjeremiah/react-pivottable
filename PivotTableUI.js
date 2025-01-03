"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PivotTableUI = PivotTableUI;
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactSortablejs = require("react-sortablejs");
var _DraggableAttribute = require("./DraggableAttribute");
var _Dropdown = require("./Dropdown");
var _Utilities = require("./Utilities");
var _PivotTable = _interopRequireDefault(require("./PivotTable"));
var _TableRenderers = _interopRequireDefault(require("./TableRenderers"));
var _s = $RefreshSig$();
var _excluded = ["onChange", "hiddenAttributes", "hiddenFromAggregators", "hiddenFromDragDrop", "unusedOrientationCutoff", "menuLimit", "data"]; // import Draggable from "react-draggable";
// import PropTypes from "prop-types";
// import update from "immutability-helper";
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var s = Object.getOwnPropertySymbols(e); for (r = 0; r < s.length; r++) o = s[r], t.includes(o) || {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (e.includes(n)) continue; t[n] = r[n]; } return t; }
/* eslint-disable react/prop-types */
// eslint can't see inherited propTypes!

// export const PivotTableUI = React.memo(function PivotTableUI({
function PivotTableUI(_ref) {
  _s();
  var onChange = _ref.onChange,
    _ref$hiddenAttributes = _ref.hiddenAttributes,
    hiddenAttributes = _ref$hiddenAttributes === void 0 ? [] : _ref$hiddenAttributes,
    _ref$hiddenFromAggreg = _ref.hiddenFromAggregators,
    hiddenFromAggregators = _ref$hiddenFromAggreg === void 0 ? [] : _ref$hiddenFromAggreg,
    _ref$hiddenFromDragDr = _ref.hiddenFromDragDrop,
    hiddenFromDragDrop = _ref$hiddenFromDragDr === void 0 ? [] : _ref$hiddenFromDragDr,
    _ref$unusedOrientatio = _ref.unusedOrientationCutoff,
    unusedOrientationCutoff = _ref$unusedOrientatio === void 0 ? 85 : _ref$unusedOrientatio,
    _ref$menuLimit = _ref.menuLimit,
    menuLimit = _ref$menuLimit === void 0 ? 500 : _ref$menuLimit,
    data = _ref.data,
    pivotState = _objectWithoutProperties(_ref, _excluded);
  var _useState = (0, _react.useState)({}),
    _useState2 = _slicedToArray(_useState, 2),
    attrValues = _useState2[0],
    setAttrValues = _useState2[1];
  var _useState3 = (0, _react.useState)([]),
    _useState4 = _slicedToArray(_useState3, 2),
    localData = _useState4[0],
    setLocalData = _useState4[1];
  var _useState5 = (0, _react.useState)([]),
    _useState6 = _slicedToArray(_useState5, 2),
    materializedInput = _useState6[0],
    setMaterializedInput = _useState6[1];
  var _useState7 = (0, _react.useState)(1000),
    _useState8 = _slicedToArray(_useState7, 2),
    maxZIndex = _useState8[0],
    setMaxZIndex = _useState8[1];
  var _useState9 = (0, _react.useState)(false),
    _useState10 = _slicedToArray(_useState9, 2),
    openDropdown = _useState10[0],
    setOpenDropdown = _useState10[1];
  var _useState11 = (0, _react.useState)([]),
    _useState12 = _slicedToArray(_useState11, 2),
    unusedOrder = _useState12[0],
    setUnusedOrder = _useState12[1];
  var _useState13 = (0, _react.useState)({}),
    _useState14 = _slicedToArray(_useState13, 2),
    zIndices = _useState14[0],
    setZIndices = _useState14[1];

  // Default props
  pivotState = _objectSpread({
    // Default PivotData props
    aggregators: _Utilities.aggregators,
    cols: [],
    rows: [],
    vals: [],
    aggregatorName: "Count",
    sorters: {},
    valueFilter: {},
    rowOrder: "key_a_to_z",
    colOrder: "key_a_to_z",
    derivedAttributes: {},
    // Default PivotTable props
    rendererName: "Table",
    renderers: _TableRenderers["default"]
  }, pivotState);
  (0, _react.useEffect)(function () {
    materializeInput(data);
  }, [data]);
  function materializeInput(nextData) {
    if (localData === nextData) {
      return;
    }
    var attrValues = {};
    var materializedInput = [];
    var recordsProcessed = 0;
    _Utilities.PivotData.forEachRecord(nextData, pivotState.derivedAttributes, function (record) {
      materializedInput.push(record);
      for (var _i = 0, _Object$keys = Object.keys(record); _i < _Object$keys.length; _i++) {
        var attr = _Object$keys[_i];
        if (!(attr in attrValues)) {
          attrValues[attr] = {};
          if (recordsProcessed > 0) {
            attrValues[attr]["null"] = recordsProcessed;
          }
        }
      }
      for (var _attr in attrValues) {
        var value = _attr in record ? record[_attr] : "null";
        if (!(value in attrValues[_attr])) {
          attrValues[_attr][value] = 0;
        }
        attrValues[_attr][value]++;
      }
      recordsProcessed++;
    });
    console.log("attrValues", attrValues);
    console.log("materializedInput", materializedInput);

    // Update states
    setLocalData(nextData);
    setAttrValues(attrValues);
    setMaterializedInput(materializedInput);
  }

  // function sendPropUpdate(command) {
  //   onChange(update(this.props, command));
  // }

  function propUpdater(key) {
    // return (value) => this.sendPropUpdate({[key]: {$set: value}});
    return function (value) {
      return onChange(_objectSpread(_objectSpread({}, pivotState), {}, _defineProperty({}, key, value)));
    };
  }
  function setValuesInFilter(attribute, values) {
    var _pivotState = pivotState,
      valueFilter = _pivotState.valueFilter;
    valueFilter[attribute] = values.reduce(function (r, v) {
      r[v] = true;
      return r;
    }, {});
    onChange(_objectSpread(_objectSpread({}, pivotState), {}, {
      valueFilter: valueFilter
    }));
    // this.sendPropUpdate({
    //   valueFilter: {
    //     [attribute]: {
    //       $set: values.reduce((r, v) => {
    //         r[v] = true;
    //         return r;
    //       }, {}),
    //     },
    //   },
    // });
  }
  function addValuesToFilter(attribute, values) {
    var _pivotState2 = pivotState,
      valueFilter = _pivotState2.valueFilter;
    if (attribute in pivotState.valueFilter) {
      valueFilter[attribute] = values.reduce(function (r, v) {
        r[v] = true;
        return r;
      }, valueFilter[attribute]);
      onChange(_objectSpread(_objectSpread({}, pivotState), {}, {
        valueFilter: valueFilter
      }));
      // this.sendPropUpdate({
      //   valueFilter: {
      //     [attribute]: values.reduce((r, v) => {
      //       r[v] = {$set: true};
      //       return r;
      //     }, {}),
      //   },
      // });
    } else {
      setValuesInFilter(attribute, values);
    }
  }
  function removeValuesFromFilter(attribute, values) {
    var _pivotState3 = pivotState,
      valueFilter = _pivotState3.valueFilter;
    var _iterator = _createForOfIteratorHelper(values),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var v = _step.value;
        delete valueFilter[attribute][v];
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    onChange(_objectSpread(_objectSpread({}, pivotState), {}, {
      valueFilter: valueFilter
    }));
    // this.sendPropUpdate({
    //   valueFilter: {[attribute]: {$unset: values}},
    // });
  }
  function moveFilterBoxToTop(attribute) {
    var zIndex = maxZIndex + 1;
    setMaxZIndex(zIndex);
    setZIndices(_defineProperty({}, attribute, zIndex));
    // this.setState(
    //   update(this.state, {
    //     maxZIndex: {$set: this.state.maxZIndex + 1},
    //     zIndices: {[attribute]: {$set: this.state.maxZIndex + 1}},
    //   })
    // );
  }
  function isOpen(dropdown) {
    // return this.state.openDropdown === dropdown;
    return openDropdown === dropdown;
  }
  function makeDnDCell(items, list, setList, classes) {
    return /*#__PURE__*/_react["default"].createElement(_reactSortablejs.ReactSortable, {
      list: list,
      setList: setList
      // Sortable
      ,
      group: "shared",
      ghostClass: "pvtPlaceholder",
      filter: ".pvtFilterBox",
      preventOnFilter: false,
      tag: "td",
      className: classes
    }, items === null || items === void 0 ? void 0 : items.map(function (x) {
      var _pivotState4, _pivotState5;
      return /*#__PURE__*/_react["default"].createElement(_DraggableAttribute.DraggableAttribute, {
        name: x,
        key: x,
        attrValues: attrValues[x],
        valueFilter: ((_pivotState4 = pivotState) === null || _pivotState4 === void 0 ? void 0 : _pivotState4.valueFilter[x]) || {},
        sorter: (0, _Utilities.getSort)((_pivotState5 = pivotState) === null || _pivotState5 === void 0 ? void 0 : _pivotState5.sorters, x),
        menuLimit: menuLimit,
        setValuesInFilter: setValuesInFilter,
        addValuesToFilter: addValuesToFilter,
        moveFilterBoxToTop: moveFilterBoxToTop,
        removeValuesFromFilter: removeValuesFromFilter,
        zIndex: zIndices[x] || maxZIndex
      });
    }));
  }
  var numValsAllowed = pivotState.aggregators[pivotState.aggregatorName]([])().numInputs || 0;
  var aggregatorCellOutlet = pivotState.aggregators[pivotState.aggregatorName]([])().outlet;
  var _pivotState6 = pivotState,
    rendererName = _pivotState6.rendererName,
    renderers = _pivotState6.renderers;
  if (!(rendererName in renderers)) rendererName = Object.keys(renderers)[0];
  var RendererCell = function RendererCell() {
    return /*#__PURE__*/_react["default"].createElement("td", {
      className: "pvtRenderers"
    }, /*#__PURE__*/_react["default"].createElement(_Dropdown.Dropdown, {
      current: rendererName,
      values: Object.keys(renderers),
      open: isOpen("renderer"),
      zIndex: isOpen("renderer") ? maxZIndex + 1 : 1,
      toggle: function toggle() {
        return setOpenDropdown(isOpen("renderer") ? false : "renderer");
      },
      setValue: propUpdater("rendererName")
    }));
  };
  var sortIcons = {
    key_a_to_z: {
      rowSymbol: "↕",
      colSymbol: "↔",
      next: "value_a_to_z"
    },
    value_a_to_z: {
      rowSymbol: "↓",
      colSymbol: "→",
      next: "value_z_to_a"
    },
    value_z_to_a: {
      rowSymbol: "↑",
      colSymbol: "←",
      next: "key_a_to_z"
    }
  };
  var AggregatorCell = function AggregatorCell() {
    return /*#__PURE__*/_react["default"].createElement("td", {
      className: "pvtVals"
    }, /*#__PURE__*/_react["default"].createElement(_Dropdown.Dropdown, {
      current: pivotState.aggregatorName,
      values: Object.keys(pivotState.aggregators),
      open: isOpen("aggregators"),
      zIndex: isOpen("aggregators") ? maxZIndex + 1 : 1,
      toggle: function toggle() {
        return setOpenDropdown(isOpen("aggregators") ? false : "aggregators");
      },
      setValue: propUpdater("aggregatorName")
    }), /*#__PURE__*/_react["default"].createElement("a", {
      role: "button",
      className: "pvtRowOrder",
      onClick: function onClick() {
        return propUpdater("rowOrder")(sortIcons[pivotState.rowOrder].next);
      }
    }, sortIcons[pivotState.rowOrder].rowSymbol), /*#__PURE__*/_react["default"].createElement("a", {
      role: "button",
      className: "pvtColOrder",
      onClick: function onClick() {
        return propUpdater("colOrder")(sortIcons[pivotState.colOrder].next);
      }
    }, sortIcons[pivotState.colOrder].colSymbol), numValsAllowed > 0 && /*#__PURE__*/_react["default"].createElement("br", null), new Array(numValsAllowed).fill().map(function (n, i) {
      return [/*#__PURE__*/_react["default"].createElement(_Dropdown.Dropdown, {
        key: i,
        current: pivotState.vals[i],
        values: Object.keys(attrValues).filter(function (e) {
          return !hiddenAttributes.includes(e) && !hiddenFromAggregators.includes(e);
        }),
        open: isOpen("val".concat(i)),
        zIndex: isOpen("val".concat(i)) ? maxZIndex + 1 : 1,
        toggle: function toggle() {
          return setOpenDropdown(isOpen("val".concat(i)) ? false : "val".concat(i));
        },
        setValue: function setValue(value) {
          var vals = pivotState.vals;
          vals.splice(i, 1, value);
          onChange(_objectSpread(_objectSpread({}, pivotState), {}, {
            vals: vals
          }));
        }
      }), i + 1 !== numValsAllowed ? /*#__PURE__*/_react["default"].createElement("br", {
        key: "br".concat(i)
      }) : null];
    }), aggregatorCellOutlet && aggregatorCellOutlet(data));
  };
  var unusedAttrs = Object.keys(attrValues).filter(function (e) {
    return !pivotState.rows.includes(e) && !pivotState.cols.includes(e) && !hiddenAttributes.includes(e) && !hiddenFromDragDrop.includes(e);
  }).sort((0, _Utilities.sortAs)(unusedOrder));
  var unusedLength = unusedAttrs.reduce(function (r, e) {
    return r + e.length;
  }, 0);
  var horizUnused = unusedLength < unusedOrientationCutoff;
  var UnusedAttrsCell = function UnusedAttrsCell() {
    return makeDnDCell(unusedAttrs, unusedOrder, setUnusedOrder, "pvtAxisContainer pvtUnused ".concat(horizUnused ? "pvtHorizList" : "pvtVertList"));
  };
  var colAttrs = pivotState.cols.filter(function (e) {
    return !hiddenAttributes.includes(e) && !hiddenFromDragDrop.includes(e);
  });
  var ColAttrsCell = function ColAttrsCell() {
    return makeDnDCell(colAttrs, pivotState.cols, propUpdater("cols"), "pvtAxisContainer pvtHorizList pvtCols");
  };
  var rowAttrs = pivotState.rows.filter(function (e) {
    return !hiddenAttributes.includes(e) && !hiddenFromDragDrop.includes(e);
  });
  var RowAttrsCell = function RowAttrsCell() {
    return makeDnDCell(rowAttrs, pivotState.rows, propUpdater("rows"), "pvtAxisContainer pvtVertList pvtRows");
  };
  var OutputCell = function OutputCell() {
    return /*#__PURE__*/_react["default"].createElement("td", {
      className: "pvtOutput"
    }, /*#__PURE__*/_react["default"].createElement(_PivotTable["default"], _extends({
      data: materializedInput,
      derivedAttributes: pivotState.derivedAttributes
    }, pivotState)));
  };
  return horizUnused ? /*#__PURE__*/_react["default"].createElement("table", {
    className: "pvtUi"
  }, /*#__PURE__*/_react["default"].createElement("tbody", {
    onClick: function onClick() {
      return setOpenDropdown(false);
    }
  }, /*#__PURE__*/_react["default"].createElement("tr", null, /*#__PURE__*/_react["default"].createElement(RendererCell, null), /*#__PURE__*/_react["default"].createElement(UnusedAttrsCell, null)), /*#__PURE__*/_react["default"].createElement("tr", null, /*#__PURE__*/_react["default"].createElement(AggregatorCell, null), /*#__PURE__*/_react["default"].createElement(ColAttrsCell, null)), /*#__PURE__*/_react["default"].createElement("tr", null, /*#__PURE__*/_react["default"].createElement(RowAttrsCell, null), /*#__PURE__*/_react["default"].createElement(OutputCell, null)))) : /*#__PURE__*/_react["default"].createElement("table", {
    className: "pvtUi"
  }, /*#__PURE__*/_react["default"].createElement("tbody", {
    onClick: function onClick() {
      return setOpenDropdown(false);
    }
  }, /*#__PURE__*/_react["default"].createElement("tr", null, /*#__PURE__*/_react["default"].createElement(RendererCell, null), /*#__PURE__*/_react["default"].createElement(AggregatorCell, null), /*#__PURE__*/_react["default"].createElement(ColAttrsCell, null)), /*#__PURE__*/_react["default"].createElement("tr", null, /*#__PURE__*/_react["default"].createElement(UnusedAttrsCell, null), /*#__PURE__*/_react["default"].createElement(RowAttrsCell, null), /*#__PURE__*/_react["default"].createElement(OutputCell, null))));
}
// });
_s(PivotTableUI, "yBvIyFJLT7DXDdiKNTKIdAqfUgE=");
_c = PivotTableUI;
var _default = exports["default"] = PivotTableUI;
var _c;
$RefreshReg$(_c, "PivotTableUI");
//# sourceMappingURL=PivotTableUI.js.map