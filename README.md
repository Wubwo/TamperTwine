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
  "changes": [], // An array of changed keys between old state and new.
  "state": {}, // The full current twine state, decoded.
}
```
