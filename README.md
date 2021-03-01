# TamperTwine

TamperTwine is a simple Tampermonkey plugin which polls the Twine sessionStorage state value to look for changes. It will report any change to the state under the TwineChange event.

This can be used for simple debugging, or as a dependency for other TamperMonkey scripts designed to add functionality to other people's stories.

------
## Usage

To use TamperTwine in your own Tampermonkey scripts, simply:

```js
// @require      https://raw.githubusercontent.com/Wubwo/TamperTwine/main/TamperTwine.js
````

To consume the event,

```js
window.addEventListener('TwineChange', ( { detail } ) => console.log(detail))
```

The detail key is passed the following:

```js
"detail": {
  "index": 0,
  "state": {}, // The new twine state at the current index, decoded.
  "oldState": {}, // The old twine state at the previous index, decoded.
  "diff": [] // A log of the updates/deletes/additions between the two states.
}
```
---
## Considerations
### Back button
This code is "back button agnostic." It treats reverting the state as a regular state update. For example, if a player's hunger level goes from `10 -> 11 -> 12`, but the player clicks the back button at 11 and then the forward button, we will track: `10 -> 11 -> 10 -> 11 -> 12`.

To account for this, the `index` key is passed so you can track the direction of the changes if you wish to. The index goes up as the player continues, and goes down when they hit the back button. Bear in mind that the index will not increment past the maximum history length, which is 30 by default (so index 29) but depends on the game's settings.

---
## How does it work?
Twine applications by default seem to expose the the [LZString Object](https://www.npmjs.com/package/lz-string), which is conveniently used to:
* Encode the save file (which is just a static copy of the state) into base64 when saving to a local file.
* Encode the state into UTF16 and save it in the sessionStorage object. (Sidenote, it may be possible for them to save in localStorage, in which case this script will need editing [let me know](https://github.com/Wubwo/TamperTwine/issues) if you experience that).

Unfortunately we cannot listen for sessionStorage changes with the window 'storage' event (only localStorage changes), so this code polls the storage every 500ms to look for changes. Upon finding a change, it decodes the state using LZString and then fires a window event to inform other Tampermonkey scripts that the game's state has changed. Twine returns the entire new game state as a delta in an array every time the game changes, so we can track any change that might happen and make it available for consumption.
