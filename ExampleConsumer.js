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

function processTwineChange({ detail: { index, changes, oldState } }) {
  const added = changes.filter(({ op }) => op === 'add')
  const deleted = changes.filter(({ op }) => op === 'delete')
  const updated = changes.filter(({ op }) => op === 'update')
  // The "path" key specifies the path in the state object.
  // Eg. ['variables', 'player', 'timebased', 'hunger'] is state.delta[state.index].variables.player.timebased.hunger
  console.log(index) // This prints the current page in "history", it will go down if they bresh the back button.
  console.log({added, deleted, updated}) // This prints the changed keys between old state and new.
  console.log(oldState) // This prints the full Twine state (at the last index) from before the above changes are made, for comparisons if needed.
}

(() => {
  window.addEventListener('TwineChange', processTwineChange)
})();