"use strict";

require("core-js/modules/es.weak-map.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/web.dom-collections.iterator.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.string.replace.js");
require("core-js/modules/esnext.string.replace-all.js");
require("core-js/modules/es.string.search.js");
require("core-js/modules/es.symbol.description.js");
require("./../style/emoji-popup.css");
var _react = _interopRequireWildcard(require("react"));
var _gemoji = require("gemoji");
var _fuzzySearch = _interopRequireDefault(require("fuzzy-search"));
var _emojiSubstring = _interopRequireDefault(require("../util/emoji-substring"));
var _jsxRuntime = require("react/jsx-runtime");
const _excluded = ["input", "inputText", "setInputText", "listMax", "maxWidth", "maxHeight", "placeholder", "theme"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
const fuzzysearch = new _fuzzySearch.default(_gemoji.gemoji, ["names"], {
  sort: true
});
const themeDefault = "dark";
var elIndex = 0;
var selStart;
const EmojiPopup = _ref => {
  let {
      input,
      inputText: userPropInputText,
      setInputText: setUserPropInputText,
      listMax = 6,
      maxWidth = "400px",
      maxHeight = "250px",
      placeholder,
      theme = themeDefault
    } = _ref,
    props = _objectWithoutProperties(_ref, _excluded);
  const InputField = input;
  const [themeMode, setThemeMode] = (0, _react.useState)(theme);
  const [active, setActive] = (0, _react.useState)(false);
  const [inputText, setInputText] = (0, _react.useState)("");
  const [emojiList, setEmojiList] = (0, _react.useState)([]);
  const [emojiSearchString, setEmojiSearchString] = (0, _react.useState)("");
  const [emojiSelect, setEmojiSelect] = (0, _react.useState)("");
  const [mouseNav, setMouseNav] = (0, _react.useState)(false);
  const wrapperRef = (0, _react.useRef)(null);
  const emojiContainerRef = (0, _react.useRef)(null);
  const emojiListerRef = (0, _react.useRef)(null);

  // Reset index, and add display transition class
  (0, _react.useEffect)(() => {
    if (active) {
      emojiContainerRef.current.classList.add("active");
    } else {
      elIndex = 0;
      emojiContainerRef.current.classList.remove("active");
    }
  }, [active]);

  // Theme change styling
  (0, _react.useEffect)(() => {
    wrapperRef.current.classList.remove("theme-light");
    wrapperRef.current.classList.remove("theme-dark");
    if (themeMode === "dark" || themeMode === "light") {
      wrapperRef.current.classList.add("theme-".concat(themeMode));
    }
  }, [themeMode]);

  // Theme change events and state
  (0, _react.useEffect)(() => {
    if (theme === "auto") {
      window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", e => setThemeMode(e.matches ? "dark" : "light"));
      setThemeMode(window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    } else {
      setThemeMode(theme);
      window.matchMedia("(prefers-color-scheme: dark)").removeEventListener("change", () => {});
    }
  }, [theme]);

  // Keep emoji row item selection in view
  // Disable functionality if user is navigating with mouse
  (0, _react.useEffect)(() => {
    if (!mouseNav && emojiListerRef !== null && emojiListerRef !== void 0 && emojiListerRef.current) {
      const liActive = emojiListerRef.current.getElementsByClassName("active")[0];
      if (liActive) {
        liActive.scrollIntoView({
          behavior: "auto",
          block: "center"
        });
      }
    }
  }, [emojiList]);

  // Sync user prop state with internal state
  (0, _react.useEffect)(() => {
    setUserPropInputText === null || setUserPropInputText === void 0 ? void 0 : setUserPropInputText(inputText);
    const inp = wrapperRef.current.children[0];
    inp.selectionStart = selStart;
    inp.selectionEnd = selStart;
  }, [inputText]);

  // Display fuzzy-matched emojis
  (0, _react.useEffect)(() => {
    list.update(emojiSearchString);
  }, [emojiSearchString]);

  // Replace emoji string match with emoji, and reset states
  (0, _react.useEffect)(() => {
    if (emojiSelect) {
      const inp = wrapperRef.current.children[0];
      // Calculate selection start, to fix going to the end of input
      const delta = inp.selectionStart - inputText.indexOf(emojiSearchString);
      selStart = inp.selectionStart - delta + emojiSelect.length;
      setInputText(inputText.replace("".concat(emojiSearchString), emojiSelect));
      // console.log([...emojiSelect]);
      setActive(false);
      setEmojiSearchString("");
      setEmojiSelect("");
    }
  }, [emojiSelect]);

  // List display updates helpers
  const list = {
    next() {
      elIndex = (elIndex + 1) % list.checkMax();
      list.update();
    },
    prev() {
      elIndex = elIndex - 1 < 0 ? list.checkMax() - 1 : elIndex - 1;
      list.update();
    },
    index(i) {
      elIndex = i;
      list.update();
    },
    select(override) {
      if (override) {
        setEmojiSelect(override);
      } else if (emojiList.length && emojiList[elIndex]) {
        setEmojiSelect(emojiList[elIndex].emoji);
      }
    },
    checkMax: () => listMax < emojiList.length ? listMax : emojiList.length,
    update(str) {
      let list = emojiList.slice();
      if (str && str.length) {
        str = str.replaceAll(":", "");
        const search = fuzzysearch.search(str).slice(0, listMax);
        list = search.length ? search : [];
      }
      if (elIndex >= list.length) elIndex = 0;
      list = list.map((s, i) => {
        s.active = i === elIndex ? true : false;
        return s;
      });
      setEmojiList(list);
    }
  };

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
    selStart = e.target.selectionStart;
    setInputText(e.target.value);
  };

  // List item events
  const handleItemClick = function handleItemClick(e, emoji) {
    list.select(emoji);
    // TODO: Focus back to input
  };

  const handleItemMouseEnter = function handleItemMouseEnter(e, i) {
    setMouseNav(true);
    elIndex = i;
    list.update();
  };
  const handleItemMouseLeave = function handleItemMouseLeave(e) {
    setMouseNav(false);
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
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      ref: wrapperRef,
      className: "emoji-popup-lister-wrapper",
      children: [input ? /*#__PURE__*/(0, _jsxRuntime.jsx)(InputField, {
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
        placeholder: placeholder,
        "aria-label": props.ariaLabel || "Generic input with emoji support",
        onFocus: handleFocus,
        onBlur: handleBlur,
        className: "emoji-popup-lister-input"
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: "emoji-popup-lister-container",
        "aria-label": active ? "Emoji lister popup" : "",
        ref: emojiContainerRef,
        children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
            ref: emojiListerRef,
            className: "emoji-popup-lister",
            style: {
              maxHeight: maxHeight,
              maxWidth: maxWidth
            },
            children: active ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_jsxRuntime.Fragment, {
              children: emojiList.length ? emojiList.map((emoji, i) => {
                return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
                  "aria-label": "Emoji list item: ".concat(emoji.description),
                  className: "emoji-popup-lister-item ".concat(emoji.active ? "active" : ""),
                  onClick: e => {
                    handleItemClick(e, emoji.emoji);
                  },
                  onMouseEnter: e => {
                    handleItemMouseEnter(e, i);
                  },
                  onMouseLeave: () => {
                    handleItemMouseLeave();
                  },
                  children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
                    className: "inner",
                    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
                      className: "emoji",
                      children: emoji.emoji
                    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("code", {
                      className: "code",
                      children: [":", emoji.names.join(",")]
                    })]
                  })
                }, emoji.emoji);
              }) : /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
                className: "emoji-popup-lister-item-null",
                children: emojiSearchString.length ? "No matches found" : "type for emoji search..."
              })
            }) : null
          }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
            className: "emoji-popup-lister-how-to",
            "aria-label": "Emoji popup search total, and how-to",
            children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
              className: "left",
              children: ["Total: ", /*#__PURE__*/(0, _jsxRuntime.jsx)("strong", {
                children: emojiList.length
              })]
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
              className: "middle",
              children: "\uD83D\uDD3C \uD83D\uDD3D"
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
              className: "right",
              children: "\u23CE"
            })]
          })]
        })
      }), props.children ? _objectSpread({}, props.children) : null]
    })
  });
};
var _default = EmojiPopup;
exports.default = _default;