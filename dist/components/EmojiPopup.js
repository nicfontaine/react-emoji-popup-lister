"use strict";

require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.weak-map.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/web.dom-collections.iterator.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.string.search.js");
require("core-js/modules/es.string.replace.js");
require("core-js/modules/esnext.string.replace-all.js");
require("./../style/emoji-popup.css");
var _react = _interopRequireWildcard(require("react"));
var _gemoji = require("gemoji");
var _fuzzySearch = _interopRequireDefault(require("fuzzy-search"));
var _EmojiInput = _interopRequireDefault(require("./EmojiInput"));
var _EmojiList = _interopRequireDefault(require("./EmojiList"));
var _jsxRuntime = require("react/jsx-runtime");
const _excluded = ["input", "inputText", "setInputText", "theme", "listMax", "maxWidth", "maxHeight", "placeholder", "ariaLabel"];
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
const themeDefault = "auto";
const EmojiPopup = _ref => {
  let {
      input,
      inputText: userPropInputText,
      setInputText: setUserPropInputText,
      theme = themeDefault,
      listMax = 6,
      maxWidth = "400px",
      maxHeight = "250px",
      placeholder,
      ariaLabel
    } = _ref,
    props = _objectWithoutProperties(_ref, _excluded);
  const [themeMode, setThemeMode] = (0, _react.useState)(theme);
  const [active, setActive] = (0, _react.useState)(false);
  const [inputText, setInputText] = (0, _react.useState)("");
  const [emoji, setEmoji] = (0, _react.useState)({
    list: [],
    search: "",
    select: ""
  });
  const [mouseNav, setMouseNav] = (0, _react.useState)(false);
  const wrapperRef = (0, _react.useRef)(null);
  const emojiContainerRef = (0, _react.useRef)(null);
  // TODO: Make sure this doesn't have any race conditions
  const [selStart, setSelStart] = (0, _react.useState)(-1);
  const [elIndex, setElIndex] = (0, _react.useState)(0);

  // Reset index, and add display transition class
  (0, _react.useEffect)(() => {
    if (active) {
      emojiContainerRef.current.classList.add("active");
    } else {
      setElIndex(0);
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

  // Sync user prop state with internal state
  (0, _react.useEffect)(() => {
    setUserPropInputText === null || setUserPropInputText === void 0 ? void 0 : setUserPropInputText(inputText);
    const inp = wrapperRef.current.children[0];
    inp.selectionStart = selStart;
    inp.selectionEnd = selStart;
  }, [inputText]);

  // Display fuzzy-matched emojis
  (0, _react.useEffect)(() => {
    list.update(emoji.search);
  }, [emoji.search]);

  // Replace emoji string match with emoji, and reset states
  (0, _react.useEffect)(() => {
    if (emoji.select) {
      // console.log([...emoji.select]);
      // Calculate selection start, to fix going to the end of input
      const inp = wrapperRef.current.children[0];
      const delta = inp.selectionStart - inputText.indexOf(emoji.search);
      setSelStart(inp.selectionStart - delta + emoji.select.length);
      setInputText(inputText.replace("".concat(emoji.search), emoji.select));
      setActive(false);
      setEmoji(_objectSpread(_objectSpread({}, emoji), {}, {
        string: "",
        select: ""
      }));
    }
  }, [emoji.select]);

  // List display updates helpers
  (0, _react.useEffect)(() => {
    list.update();
  }, [elIndex]);
  const list = {
    index(i) {
      setElIndex(i);
    },
    next() {
      list.index((elIndex + 1) % list.checkMax());
    },
    prev() {
      list.index(elIndex - 1 < 0 ? list.checkMax() - 1 : elIndex - 1);
    },
    select(override) {
      if (override) {
        setEmoji(_objectSpread(_objectSpread({}, emoji), {}, {
          select: override
        }));
      } else if (emoji.list.length && emoji.list[elIndex]) {
        setEmoji(_objectSpread(_objectSpread({}, emoji), {}, {
          select: emoji.list[elIndex].emoji
        }));
      }
    },
    checkMax: () => listMax < emoji.list.length ? listMax : emoji.list.length,
    update(str) {
      let list = emoji.list.slice();
      if (str && str.length) {
        str = str.replaceAll(":", "");
        const search = fuzzysearch.search(str).slice(0, listMax);
        list = search.length ? search : [];
      }
      if (elIndex >= list.length) setElIndex(0);
      list = list.map((s, i) => {
        s.active = i === elIndex ? true : false;
        return s;
      });
      setEmoji(_objectSpread(_objectSpread({}, emoji), {}, {
        list
      }));
    }
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_jsxRuntime.Fragment, {
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      ref: wrapperRef,
      className: "emoji-popup-lister-wrapper",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_EmojiInput.default, _objectSpread({
        input: input,
        inputText: inputText,
        setInputText: setInputText,
        active: active,
        setActive: setActive,
        list: list,
        emoji: emoji,
        setEmoji: setEmoji,
        selStart: selStart,
        setSelStart: setSelStart,
        setMouseNav: setMouseNav,
        placeholder: placeholder,
        ariaLabel: ariaLabel
      }, props)), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: "emoji-popup-lister-container",
        "aria-label": active ? "Emoji lister popup" : "",
        ref: emojiContainerRef,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_EmojiList.default, {
          active: active,
          list: list,
          setElIndex: setElIndex,
          mouseNav: mouseNav,
          setMouseNav: setMouseNav,
          emoji: emoji,
          maxWidth: maxWidth,
          maxHeight: maxHeight
        })
      }), props.children ? _objectSpread({}, props.children) : null]
    })
  });
};
var _default = EmojiPopup;
exports.default = _default;