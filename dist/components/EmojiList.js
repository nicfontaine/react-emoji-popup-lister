"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.string.search.js");
var _react = require("react");
var _EmojiPopupHowTo = _interopRequireDefault(require("./EmojiPopupHowTo"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const EmojiList = function EmojiList(_ref) {
  let {
    active,
    list,
    setElIndex,
    mouseNav,
    setMouseNav,
    emoji,
    maxWidth,
    maxHeight,
    footer
  } = _ref;
  const emojiListerRef = (0, _react.useRef)(null);
  const activeItem = (0, _react.useRef)(null);

  // Keep emoji row item selection in view
  // Disable functionality if user is navigating with mouse
  (0, _react.useEffect)(() => {
    if (!mouseNav && emojiListerRef !== null && emojiListerRef !== void 0 && emojiListerRef.current) {
      if (activeItem !== null && activeItem !== void 0 && activeItem.current) {
        activeItem.current.scrollIntoView({
          behavior: "auto",
          block: "center"
        });
      }
    }
  }, [emoji.list]);

  // List item events
  const handleItemClick = function handleItemClick(e, _emoji) {
    list.select(_emoji);
    // TODO: Focus back to input
  };

  const handleItemMouseEnter = function handleItemMouseEnter(e, i) {
    setMouseNav(true);
    setElIndex(i);
    list.update();
  };
  const handleItemMouseLeave = function handleItemMouseLeave(e) {
    setMouseNav(false);
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      ref: emojiListerRef,
      className: "lister",
      style: {
        maxHeight: maxHeight,
        maxWidth: maxWidth
      },
      children: active ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_jsxRuntime.Fragment, {
        children: emoji.list.length ? emoji.list.map((emoji, i) => {
          return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
            "aria-label": "Emoji list item: ".concat(emoji.description),
            className: "item ".concat(emoji.active ? "active" : ""),
            ref: emoji.active ? activeItem : null,
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
          className: "itemNull",
          children: emoji.search.length ? "No matches found" : "type for emoji search..."
        })
      }) : null
    }), footer ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_EmojiPopupHowTo.default, {
      number: emoji.list.length
    }) : null, /*#__PURE__*/(0, _jsxRuntime.jsx)("style", {
      children: "\n\t\t\t\t.lister {\n\t\t\t\t\tdisplay: flex;\n\t\t\t\t\tflex-direction: column;\n\t\t\t\t\toverflow-y: scroll;\n\t\t\t\t\tmin-width: 200px;\n\t\t\t\t\tmin-height: 60px;\n\t\t\t\t}\n\t\t\t\t.item {\n\t\t\t\t\tcursor: pointer;\n\t\t\t\t\tposition: relative;\n\t\t\t\t}\n\t\t\t\t.item,\n\t\t\t\t.itemNull {\n\t\t\t\t\tpadding: 0.35rem 0.5rem 0.35rem 0.65rem;\n\t\t\t\t\tdisplay: flex;\n\t\t\t\t\tfont-size: 0.9rem;\n\t\t\t\t}\n\t\t\t\t.itemNull {\n\t\t\t\t\ttext-align: center;\n\t\t\t\t\tjustify-content: center;\n\t\t\t\t\tpadding-top: 0.6rem;\n\t\t\t\t}\n\t\t\t\t.themedark .item {\n\t\t\t\t\tborder-bottom: 1px solid rgba(38, 38, 38, 0.9);\n\t\t\t\t}\n\t\t\t\t.themelight .item {\n\t\t\t\t\tborder-bottom: 1px solid rgba(0, 0, 0, 0.13);\n\t\t\t\t}\n\t\t\t\t.item.active {\n\t\t\t\t\tborder-bottom: 1px solid transparent;\n\t\t\t\t\tz-index: 5;\n\t\t\t\t}\n\t\t\t\t.themedark .item.active {\n\t\t\t\t\tbackground: rgb(40, 40, 40);\n\t\t\t\t\tborder-bottom: 1px solid rgb(43, 43, 43);\n\t\t\t\t}\n\t\t\t\t.themelight .item.active {\n\t\t\t\t\tbackground: rgba(0,0,0,0.07);\n\t\t\t\t\tborder-bottom: 1px solid rgba(0, 0, 0, 0.14);\n\t\t\t\t\tbox-shadow: 0 -1px 5px rgba(0, 0, 0, 0.15);\n\t\t\t\t\t/* background: #fff; */\n\t\t\t\t}\n\t\t\t\t.themelight .item.active .emoji {\n\t\t\t\t\ttext-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);\n\t\t\t\t}\n\t\t\t\t.item.active:before {\n\t\t\t\t\tcontent: \"\";\n\t\t\t\t\tposition: absolute;\n\t\t\t\t\tleft: 0;\n\t\t\t\t\ttop: -1px;\n\t\t\t\t\tbottom: -1px;\n\t\t\t\t\twidth: 4px;\n\t\t\t\t}\n\t\t\t\t.themedark .item.active:before {\n\t\t\t\t\tbackground: rgb(88, 53, 227);\n\t\t\t\t}\n\t\t\t\t.themelight .item.active:before {\n\t\t\t\t\tbackground: rgb(33, 166, 157);\n\t\t\t\t}\n\t\t\t\t.item:last-child {\n\t\t\t\t\t/* border-bottom: none; */\n\t\t\t\t}\n\t\t\t\t.item .inner {\n\t\t\t\t\tdisplay: flex;\n\t\t\t\t\tmin-width: 0;\n\t\t\t\t\ttext-overflow: ellipsis;\n\t\t\t\t\toverflow-x: hidden;\n\t\t\t\t}\n\t\t\t\t.item .emoji {\n\t\t\t\t\tmargin-right: 0.5rem;\n\t\t\t\t\tmargin-left: 0.2rem;\n\t\t\t\t\tfont-size: 1rem;\n\t\t\t\t\t/* width: 1.8rem; */\n\t\t\t\t\tdisplay: flex;\n\t\t\t\t\tflex-basis: fit-content;\n\t\t\t\t}\n\t\t\t\t.item .code,\n\t\t\t\t.item .emoji {\n\t\t\t\t\talign-self: center;\n\t\t\t\t}\n\t\t\t\t.item .code {\n\t\t\t\t\tfont-size: 0.86rem;\n\t\t\t\t\tmin-width: 0;\n\t\t\t\t\ttext-overflow: ellipsis;\n\t\t\t\t\toverflow-x: hidden;\n\t\t\t\t}\n\t\t\t"
    })]
  });
};
var _default = EmojiList;
exports.default = _default;