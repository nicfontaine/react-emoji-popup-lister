"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _jsxRuntime = require("react/jsx-runtime");
const EmojiPopupHowTo = _ref => {
  let {
    number
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: "howto",
      "aria-label": "Emoji popup search total, and how-to",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: "left",
        children: ["Total: ", /*#__PURE__*/(0, _jsxRuntime.jsx)("strong", {
          children: number
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: "middle",
        children: "\uD83D\uDD3C \uD83D\uDD3D"
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: "right",
        children: "\u23CE"
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("style", {
      children: "\n\t\t\t\t.howto {\n\t\t\t\t\tpadding: 0.6rem 0.5rem;\n\t\t\t\t\tfont-size: 0.75rem;\n\t\t\t\t\tdisplay: flex;\n\t\t\t\t\tflex-wrap: wrap;\n\t\t\t\t\t/* justify-content: space-between; */\n\t\t\t\t\tbox-shadow: 0 -2px 10px rgba(0, 0, 0, 0.2);\n\t\t\t\t\tz-index: 10;\n\t\t\t\t\tposition: relative;\n\t\t\t\t\t/* background: rgba(255,255,255,0.18); */\n\t\t\t\t}\n\t\t\t\t.themedark .howto {\n\t\t\t\t\tbackground: rgba(28,28,28,1);\n\t\t\t\t\tcolor: rgba(255,255,255,0.7);\n\t\t\t\t}\n\t\t\t\t.themelight .howto {\n\t\t\t\t\t/* background: rgba(210,210,210,1); */\n\t\t\t\t\tcolor: rgba(0, 0, 0, 0.7);\n\t\t\t\t}\n\t\t\t\t.howto .left {\n\t\t\t\t\tmargin-right: 0.5rem;\n\t\t\t\t}\n\t\t\t\t.howto .middle {\n\t\t\t\t\tmargin-left: auto;\n\t\t\t\t}\n\t\t\t\t.howto .right {\n\t\t\t\t\tmargin-left: 0.5rem;\n\t\t\t\t\tfont-style: italic;\n\t\t\t\t}\n\t\t\t\t.howto code {\n\t\t\t\t\tpadding: 0.1rem 0.3rem;\n\t\t\t\t\tborder-radius: 4px;\n\t\t\t\t\tline-height: 1.2;\n\t\t\t\t}\n\t\t\t\t.themedark .howto code {\n\t\t\t\t\tcolor: rgba(255,255,255,0.9);\n\t\t\t\t\tbackground: rgba(255, 255, 255, 0.2);\n\t\t\t\t}\n\t\t\t\t.themelight .howto code {\n\t\t\t\t\tcolor: rgba(0, 0, 0, 0.9);\n\t\t\t\t\tbackground: rgba(0, 0, 0, 0.2);\n\t\t\t\t}\n\t\t\t"
    })]
  });
};
var _default = EmojiPopupHowTo;
exports.default = _default;