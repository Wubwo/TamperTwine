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

```json
"detail": {
  "index": 0,
  "changes": [], // An array of changed keys between old state and new.
  "state": {}, // The full current twine state, decoded.
}
```
---
## Considerations
### Back button
This code is "back button agnostic." It treats reverting the state as a regular state update. For example, if a player's hunger level goes from `10 -> 11 -> 12`, but the player clicks the back button at 11 and then the forward button, we will track: `10 -> 11 -> 10 -> 11 -> 12`.

To account for this, the `index` key is passed so you can track the direction of the changes if you wish to. The index goes up as the player continues, and goes down when they hit the back button.