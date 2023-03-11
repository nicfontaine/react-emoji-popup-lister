"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.string.search.js");
var _react = require("react");
var _EmojiPopupModule = _interopRequireDefault(require("./../styles/EmojiPopup.module.css"));
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
      className: _EmojiPopupModule.default.lister,
      style: {
        maxHeight: maxHeight,
        maxWidth: maxWidth
      },
      children: active ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_jsxRuntime.Fragment, {
        children: emoji.list.length ? emoji.list.map((emoji, i) => {
          return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
            "aria-label": "Emoji list item: ".concat(emoji.description),
            className: "".concat(_EmojiPopupModule.default.item, " ").concat(emoji.active ? _EmojiPopupModule.default.active : ""),
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
              className: _EmojiPopupModule.default.inner,
              children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
                className: _EmojiPopupModule.default.emoji,
                children: emoji.emoji
              }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("code", {
                className: _EmojiPopupModule.default.code,
                children: [":", emoji.names.join(",")]
              })]
            })
          }, emoji.emoji);
        }) : /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          className: _EmojiPopupModule.default.itemNull,
          children: emoji.search.length ? "No matches found" : "type for emoji search..."
        })
      }) : null
    }), footer ? /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: _EmojiPopupModule.default.howto,
      "aria-label": "Emoji popup search total, and how-to",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: _EmojiPopupModule.default.left,
        children: ["Total: ", /*#__PURE__*/(0, _jsxRuntime.jsx)("strong", {
          children: emoji.list.length
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: _EmojiPopupModule.default.middle,
        children: "\uD83D\uDD3C \uD83D\uDD3D"
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: _EmojiPopupModule.default.right,
        children: "\u23CE"
      })]
    }) : null]
  });
};
var _default = EmojiList;
exports.default = _default;