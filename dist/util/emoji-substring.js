"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/es.array.reverse.js");
// Space, \n, \r
const stopChars = [" ", String.fromCharCode(10), String.fromCharCode(13)];

/**
 * Find ":string", or ":string:" from input text, via selectionStart position
 * @param {string} text - Input text value
 * @param {number} caret - Input selectStart - 1, for current character
 * @param {boolean} strict - Determines how to match strings
 * @returns {string} - String with colons or empty string
 */
const emojiSubstring = function emojiSubstring(text, caret) {
  let strict = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  // Early reject check
  if (!text.length || text[caret] === " " || text.indexOf(":") < 0 || caret < 0) {
    return "";
  }

  // Store partial strings, and indices
  let rtxt = "";
  let ltxt = "";
  let li = caret;
  let ri = caret;

  // Increment from caret to end of word. Stop on: space, \n, \r, or end of value
  while (text[ri] && stopChars.indexOf(text[ri]) < 0) {
    rtxt += text[ri];
    if (text[ri] === ":" && text[ri + 1] === ":") {
      break;
    }
    ri++;
  }

  // Return if caret is on ":"
  if (rtxt.charAt(0) === ":" && rtxt.length > 1) {
    // If strict, check for characters after, and cases before ":"
    if (!strict) {
      return rtxt;
    } else if (!text[caret - 1] || stopChars.indexOf(text[caret - 1]) >= 0 || text[caret - 1] === ":") {
      return rtxt;
    }
  }

  // Decrement from caret to beginning
  while (text[li]) {
    // At space before, or beginning
    if (text[li] === " " || !text[li - 1]) {
      return "";
    }
    li--;
    if (text[li]) {
      ltxt += text[li];
    }

    // Stop at beginning, space, \n, \r, or another ":"
    // Allows " :abc", ":abc::abc:"
    // If strict, reject "https://abc"
    if (text[li] === ":") {
      if (!text[li - 1] || stopChars.indexOf(text[li - 1]) > -1 || text[li - 1] === ":" || !strict) {
        break;
      } else {
        return "";
      }
    }
  }
  ltxt = ltxt.split("").reverse().join("");
  const substring = "".concat(ltxt).concat(rtxt);
  return substring || "";
};
var _default = emojiSubstring;
exports.default = _default;