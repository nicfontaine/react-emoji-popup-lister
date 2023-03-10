"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.string.search.js");
var _react = require("react");
var _jsxRuntime = require("react/jsx-runtime");
const EmojiList = function EmojiList(_ref) {
  let {
    active,
    list,
    setElIndex,
    mouseNav,
    setMouseNav,
    emoji,
    maxWidth,
    maxHeight
  } = _ref;
  const emojiListerRef = (0, _react.useRef)(null);

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
      className: "emoji-popup-lister",
      style: {
        maxHeight: maxHeight,
        maxWidth: maxWidth
      },
      children: active ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_jsxRuntime.Fragment, {
        children: emoji.list.length ? emoji.list.map((emoji, i) => {
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
          children: emoji.search.length ? "No matches found" : "type for emoji search..."
        })
      }) : null
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: "emoji-popup-lister-how-to",
      "aria-label": "Emoji popup search total, and how-to",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: "left",
        children: ["Total: ", /*#__PURE__*/(0, _jsxRuntime.jsx)("strong", {
          children: emoji.list.length
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: "middle",
        children: "\uD83D\uDD3C \uD83D\uDD3D"
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: "right",
        children: "\u23CE"
      })]
    })]
  });
};
var _default = EmojiList;
exports.default = _default;