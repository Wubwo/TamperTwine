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

function processTwineChange({ detail: { changes, state } }) {
  const added = state.filter(({ op }) => op === 'add')
  const deleted = state.filter(({ op }) => op === 'delete')
  const updated = state.filter(({ op }) => op === 'update')
  // The "path" key specifies the path in the state object.
  // Eg. ['variables', 'player', 'timebased', 'hunger'] is state.delta[state.index].variables.player.timebased.hunger
  console.log({added, deleted, updated}) // This prints the changed keys between old state and new.
  console.log(state) // This prints the current ENTIRE state object.
}

(() => {
  window.addEventListener('TwineChange', processTwineChange)
})();