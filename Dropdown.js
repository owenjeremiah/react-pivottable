"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.Dropdown = void 0;
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
/* eslint-disable react/prop-types */
// eslint can't see inherited propTypes!

var Dropdown = exports.Dropdown = /*#__PURE__*/_react["default"].memo(function Dropdown(_ref) {
  var current = _ref.current,
    open = _ref.open,
    setValue = _ref.setValue,
    toggle = _ref.toggle,
    values = _ref.values,
    zIndex = _ref.zIndex;
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "pvtDropdown",
    style: {
      zIndex: zIndex
    }
  }, /*#__PURE__*/_react["default"].createElement("div", {
    onClick: function onClick(e) {
      e.stopPropagation();
      toggle();
    },
    className: "pvtDropdownValue pvtDropdownCurrent " + (open ? "pvtDropdownCurrentOpen" : ""),
    role: "button"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "pvtDropdownIcon"
  }, open ? "×" : "▾"), current || /*#__PURE__*/_react["default"].createElement("span", null, "\xA0")), open && /*#__PURE__*/_react["default"].createElement("div", {
    className: "pvtDropdownMenu"
  }, values.map(function (r) {
    return /*#__PURE__*/_react["default"].createElement("div", {
      key: r,
      role: "button",
      onClick: function onClick(e) {
        e.stopPropagation();
        if (current === r) {
          toggle();
        } else {
          setValue(r);
        }
      },
      className: "pvtDropdownValue " + (r === current ? "pvtDropdownActiveValue" : "")
    }, r);
  })));
});
var _default = exports["default"] = Dropdown;
//# sourceMappingURL=Dropdown.js.map