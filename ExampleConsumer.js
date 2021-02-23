// ==UserScript==
// @name         TamperTwine Example Consumer
// @namespace    https://github.com/Wubwo/
// @author       Wubwo
// @version      1
// @match        https://example.website.com/twineStory.html
// ==/UserScript==

// @match determines where to run this tampermonkey script. if your twine story is a local file, use:
// @match file:///exact-path-to-file/twineStory.html

(() => {
  window.addEventListener('TwineChange', ( { detail } ) => console.log(detail))
})();