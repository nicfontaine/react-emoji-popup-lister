"use strict";

require("core-js/modules/es.symbol.description.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _emojiSubstring = _interopRequireDefault(require("../util/emoji-substring"));
var _jsxRuntime = require("react/jsx-runtime");
const _excluded = ["input", "value", "setValue", "active", "setActive", "list", "emoji", "setEmoji", "selStart", "setSelStart", "setMouseNav", "placeholder", "ariaLabel", "strict"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
const EmojiInput = function EmojiInput(_ref) {
  let {
      input,
      value,
      setValue,
      active,
      setActive,
      list,
      emoji,
      setEmoji,
      selStart,
      setSelStart,
      setMouseNav,
      placeholder,
      ariaLabel,
      strict
    } = _ref,
    props = _objectWithoutProperties(_ref, _excluded);
  const InputField = input;

  // Main input event interactivity on Keydown
  const handleKeyDown = function handleKeyDown(e) {
    var _props$onKeyDown;
    // User-passed event
    (_props$onKeyDown = props.onKeyDown) === null || _props$onKeyDown === void 0 ? void 0 : _props$onKeyDown.call(props, e);
    setMouseNav(false);
    if (!active) return;
    const prevent = ["Enter", "ArrowDown", "ArrowUp", "Tab", "Home", "End"];
    if (prevent.indexOf(e.key) > -1) e.preventDefault();
    if (e.key === "ArrowUp") {
      list.prev();
    } else if (e.key === "ArrowDown") {
      list.next();
    } else if (e.key === "Enter" || e.key === "Tab") {
      list.select();
    } else if (e.key === "Home") {
      list.index(0);
    } else if (e.key === "End") {
      list.index(emoji.list.length - 1);
    } else if (e.key === "Escape") {
      setEmoji(_objectSpread(_objectSpread({}, emoji), {}, {
        search: ""
      }));
      setActive(false);
    }
  };

  // Determine emoji search and visibility on Keyup
  const handleKeyUp = function handleKeyUp(e) {
    var _props$onKeyUp;
    // User-passed event
    (_props$onKeyUp = props.onKeyUp) === null || _props$onKeyUp === void 0 ? void 0 : _props$onKeyUp.call(props, e);
    setMouseNav(false);
    const start = e.target.selectionStart - 1;
    var _active = active;
    if (e.key === "Escape") {
      setEmoji(_objectSpread(_objectSpread({}, emoji), {}, {
        search: ""
      }));
      setActive(false);
      return;
    }
    // Possible state change cases
    if (e.key === ":") {
      _active = true;
    } else if (e.key === " ") {
      _active = false;
    } else if (e.key === "Backspace" && value[start] === ":") {
      _active = false;
    }
    const str = (0, _emojiSubstring.default)(value, start, strict);
    _active = str.length ? true : false;
    setEmoji(_objectSpread(_objectSpread({}, emoji), {}, {
      search: str
    }));
    setActive(_active);
  };

  // Controlled input change
  const handleChange = function handleChange(e) {
    var _props$onChange;
    // User-passed event
    (_props$onChange = props.onChange) === null || _props$onChange === void 0 ? void 0 : _props$onChange.call(props, e);
    // selStart = e.target.selectionStart;
    setSelStart(e.target.selectionStart);
    setValue(e.target.value);
  };

  // User-passed event only
  const handleClick = function handleClick(e) {
    var _props$onClick;
    (_props$onClick = props.onClick) === null || _props$onClick === void 0 ? void 0 : _props$onClick.call(props, e);
  };
  const handleFocus = function handleFocus(e) {
    var _props$onFocus;
    (_props$onFocus = props.onFocus) === null || _props$onFocus === void 0 ? void 0 : _props$onFocus.call(props, e);
  };
  const handleBlur = function handleBlur(e) {
    var _props$onBlur;
    (_props$onBlur = props.onBlur) === null || _props$onBlur === void 0 ? void 0 : _props$onBlur.call(props, e);
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_jsxRuntime.Fragment, {
    children: input ? /*#__PURE__*/(0, _jsxRuntime.jsx)(InputField, {
      value: value,
      onClick: handleClick,
      onChange: handleChange,
      onKeyUp: handleKeyUp,
      onKeyDown: handleKeyDown,
      onFocus: handleFocus,
      onBlur: handleBlur,
      placeholder: placeholder || "",
      "aria-label": ariaLabel || "Generic input with emoji support",
      className: "input"
    }) : /*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
      value: value,
      onClick: handleClick,
      onChange: handleChange,
      onKeyUp: handleKeyUp,
      onKeyDown: handleKeyDown,
      placeholder: placeholder || "",
      "aria-label": ariaLabel || "Generic input with emoji support",
      onFocus: handleFocus,
      onBlur: handleBlur,
      className: "input"
    })
  });
};
var _default = EmojiInput;
exports.default = _default;