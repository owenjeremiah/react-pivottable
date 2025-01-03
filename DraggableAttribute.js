"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DraggableAttribute = DraggableAttribute;
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactDraggable = _interopRequireDefault(require("react-draggable"));
var _s = $RefreshSig$();
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
/* eslint-disable react/prop-types */
function DraggableAttribute(_ref) {
  _s();
  var attrValues = _ref.attrValues,
    menuLimit = _ref.menuLimit,
    name = _ref.name,
    sorter = _ref.sorter,
    zIndex = _ref.zIndex,
    addValuesToFilter = _ref.addValuesToFilter,
    moveFilterBoxToTop = _ref.moveFilterBoxToTop,
    removeValuesFromFilter = _ref.removeValuesFromFilter,
    setValuesInFilter = _ref.setValuesInFilter,
    _ref$valueFilter = _ref.valueFilter,
    valueFilter = _ref$valueFilter === void 0 ? {} : _ref$valueFilter;
  var _useState = (0, _react.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    open = _useState2[0],
    setOpen = _useState2[1];
  var _useState3 = (0, _react.useState)(""),
    _useState4 = _slicedToArray(_useState3, 2),
    filterText = _useState4[0],
    setFilterText = _useState4[1];
  function toggleValue(value) {
    if (value in valueFilter) {
      removeValuesFromFilter(name, [value]);
    } else {
      addValuesToFilter(name, [value]);
    }
  }
  function matchesFilter(x) {
    return x.toLowerCase().trim().includes(filterText.toLowerCase().trim());
  }
  function selectOnly(e, value) {
    e.stopPropagation();
    setValuesInFilter(name, Object.keys(attrValues).filter(function (y) {
      return y !== value;
    }));
  }
  function getFilterBox() {
    var showMenu = Object.keys(attrValues).length < menuLimit;
    var values = Object.keys(attrValues);
    var shown = values.filter(matchesFilter).sort(sorter);
    return /*#__PURE__*/_react["default"].createElement(_reactDraggable["default"], {
      handle: ".pvtDragHandle"
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "pvtFilterBox",
      style: {
        display: "block",
        cursor: "initial",
        zIndex: zIndex
      },
      onClick: function onClick() {
        return moveFilterBoxToTop(name);
      }
    }, /*#__PURE__*/_react["default"].createElement("a", {
      onClick: function onClick() {
        return setOpen(false);
      },
      className: "pvtCloseX"
    }, "\xD7"), /*#__PURE__*/_react["default"].createElement("span", {
      className: "pvtDragHandle"
    }, "\u2630"), /*#__PURE__*/_react["default"].createElement("h4", null, name), showMenu || /*#__PURE__*/_react["default"].createElement("p", null, "(too many values to show)"), showMenu && /*#__PURE__*/_react["default"].createElement("p", null, /*#__PURE__*/_react["default"].createElement("input", {
      type: "text",
      placeholder: "Filter values",
      className: "pvtSearch",
      value: filterText,
      onChange: function onChange(e) {
        return setFilterText(e.target.value);
      }
    }), /*#__PURE__*/_react["default"].createElement("br", null), /*#__PURE__*/_react["default"].createElement("a", {
      role: "button",
      className: "pvtButton",
      onClick: function onClick() {
        return removeValuesFromFilter(name, Object.keys(attrValues).filter(matchesFilter));
      }
    }, "Select ", values.length === shown.length ? "All" : shown.length), "\xA0", /*#__PURE__*/_react["default"].createElement("a", {
      role: "button",
      className: "pvtButton",
      onClick: function onClick() {
        return addValuesToFilter(name, Object.keys(attrValues).filter(matchesFilter));
      }
    }, "Deselect ", values.length === shown.length ? "All" : shown.length)), showMenu && /*#__PURE__*/_react["default"].createElement("div", {
      className: "pvtCheckContainer"
    }, shown.map(function (x) {
      return /*#__PURE__*/_react["default"].createElement("p", {
        key: x,
        onClick: function onClick() {
          return toggleValue(x);
        },
        className: x in valueFilter ? "" : "selected"
      }, /*#__PURE__*/_react["default"].createElement("a", {
        className: "pvtOnly",
        onClick: function onClick(e) {
          return selectOnly(e, x);
        }
      }, "only"), /*#__PURE__*/_react["default"].createElement("a", {
        className: "pvtOnlySpacer"
      }, "\xA0"), x === "" ? /*#__PURE__*/_react["default"].createElement("em", null, "null") : x);
    }))));
  }
  function toggleFilterBox() {
    setOpen(!open);
    moveFilterBoxToTop(name);
  }
  var filtered = Object.keys(valueFilter).length !== 0 ? "pvtFilteredAttribute" : "";
  return /*#__PURE__*/_react["default"].createElement("li", {
    "data-id": name
  }, /*#__PURE__*/_react["default"].createElement("span", {
    className: "pvtAttr " + filtered
  }, name, /*#__PURE__*/_react["default"].createElement("span", {
    className: "pvtTriangle",
    onClick: toggleFilterBox
  }, "\xA0\u25BE")), open ? getFilterBox() : null);
}
_s(DraggableAttribute, "famVn/3e71Dp78mczf6TJcicOn8=");
_c = DraggableAttribute;
var _default = exports["default"] = DraggableAttribute;
var _c;
$RefreshReg$(_c, "DraggableAttribute");
//# sourceMappingURL=DraggableAttribute.js.map