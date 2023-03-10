"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/es.symbol.description.js");
var _react = require("react");
var _jsxRuntime = require("react/jsx-runtime");
const _excluded = ["active", "list", "elIndex", "mouseNav", "setMouseNav", "emojiList", "emojiSearchString"];
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
const EmojiList = function EmojiList(_ref) {
  let {
      active,
      list,
      elIndex,
      mouseNav,
      setMouseNav,
      emojiList,
      emojiSearchString
    } = _ref,
    props = _objectWithoutProperties(_ref, _excluded);
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
  }, [emojiList]);

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
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      ref: emojiListerRef,
      className: "emoji-popup-lister",
      style: {
        maxHeight: props.maxHeight,
        maxWidth: props.maxWidth
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
  });
};
var _default = EmojiList;
exports.default = _default;