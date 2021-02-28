// ==UserScript==
// @name         TamperTwine Example Consumer
// @namespace    https://github.com/Wubwo/
// @author       Wubwo
// @version      1
// @match        https://example.website.com/twineStory.html
// @require      https://raw.githubusercontent.com/Wubwo/TamperTwine/main/TamperTwine.js
// ==/UserScript==

// @match determines where to run this tampermonkey script. if your twine story is a local file, use:
// @match file:///exact-path-to-file/twineStory.html

function processTwineChange({ detail: { index, state, oldState } }) {
  console.log(index, state, oldState)
}

(() => {
  window.addEventListener('TwineChange', processTwineChange)
})();