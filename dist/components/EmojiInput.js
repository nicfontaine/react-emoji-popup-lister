"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _emojiSubstring = _interopRequireDefault(require("../util/emoji-substring"));
var _jsxRuntime = require("react/jsx-runtime");
const _excluded = ["input", "inputText", "setInputText", "active", "setActive", "list", "setEmojiSearchString", "emojiList", "selStart", "setSelStart", "setMouseNav"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
const EmojiInput = function EmojiInput(_ref) {
  let {
      input,
      inputText,
      setInputText,
      active,
      setActive,
      list,
      setEmojiSearchString,
      emojiList,
      selStart,
      setSelStart,
      setMouseNav
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
      list.index(emojiList.length - 1);
    } else if (e.key === "Escape") {
      setEmojiSearchString("");
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
      setEmojiSearchString("");
      setActive(false);
      return;
    }
    // Possible state change cases
    if (e.key === ":") {
      _active = true;
    } else if (e.key === " ") {
      _active = false;
    } else if (e.key === "Backspace" && inputText[start] === ":") {
      _active = false;
    }
    const str = (0, _emojiSubstring.default)(inputText, start);
    _active = str.length ? true : false;
    setEmojiSearchString(str);
    setActive(_active);
  };

  // Controlled input change
  const handleChange = function handleChange(e) {
    var _props$onChange;
    // User-passed event
    (_props$onChange = props.onChange) === null || _props$onChange === void 0 ? void 0 : _props$onChange.call(props, e);
    // selStart = e.target.selectionStart;
    setSelStart(e.target.selectionStart);
    setInputText(e.target.value);
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
      value: inputText,
      onClick: handleClick,
      onChange: handleChange,
      onKeyUp: handleKeyUp,
      onKeyDown: handleKeyDown,
      onFocus: handleFocus,
      onBlur: handleBlur,
      "aria-label": "Generic input with emoji support",
      className: "emoji-popup-lister-input"
    }) : /*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
      value: inputText,
      onClick: handleClick,
      onChange: handleChange,
      onKeyUp: handleKeyUp,
      onKeyDown: handleKeyDown,
      placeholder: props.placeholder,
      "aria-label": props.ariaLabel || "Generic input with emoji support",
      onFocus: handleFocus,
      onBlur: handleBlur,
      className: "emoji-popup-lister-input"
    })
  });
};
var _default = EmojiInput;
exports.default = _default;