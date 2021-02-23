// ==UserScript==
// @name         TamperTwine
// @namespace    https://github.com/Wubwo/
// @author       Wubwo
// @version      1
// @description  Poll Twine documents to listen for changes, to debug or add aditional functionality with other scripts.
// ==/UserScript==

// https://www.npmjs.com/package/recursive-diff
!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.recursiveDiff=t():e.recursiveDiff=t()}("undefined"!=typeof self?self:this,(function(){return function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){const{types:r,iterableTypes:o,errors:i}=n(1),l=n(2),f={[r.NUMBER]:l.isNumber,[r.BOOLEAN]:l.isBoolean,[r.STRING]:l.isString,[r.DATE]:l.isDate,[r.UNDEFINED]:l.isUndefined,[r.NULL]:l.isNull,[r.ARRAY]:l.isArray,[r.MAP]:l.isMap,[r.SET]:l.isSet,[r.ITERABLE_OBJECT]:l.isIterableObject},a={[r.DATE]:l.areDatesEqual};function u(e){const t=Object.keys(f);let n=r.DEFAULT;for(let r=0;r<t.length;r+=1)if(f[t[r]](e)){n=t[r];break}return n}function s(e,t,n,o){let i;return n===r.UNDEFINED&&o!==r.UNDEFINED?i="add":n!==r.UNDEFINED&&o===r.UNDEFINED?i="delete":!function(e,t,n,r){return n===r&&(a[n]?a[n](e,t):e===t)}(e,t,n,o)?i="update":l.noop(),i}function c(e,t,n,r,o){const i={op:n,path:r};return"add"!==n&&"update"!==n||(i.val=t),o&&"add"!==n&&(i.oldVal=e),i}function p(e,t,n,i,l){const f=u(e),a=u(t),d=i||[],E=l||[];if(function(e,t){return e===t&&o.indexOf(e)>=0}(f,a)){const o=function(e,t,n){if(n===r.ARRAY){const n=e.length>t.length?new Array(e.length):new Array(t.length);return n.fill(0),new Set(n.map((e,t)=>t))}return new Set(Object.keys(e).concat(Object.keys(t)))}(e,t,f).values();let{value:i,done:l}=o.next();for(;!l;){Object.prototype.hasOwnProperty.call(e,i)?Object.prototype.hasOwnProperty.call(t,i)?p(e[i],t[i],n,d.concat(i),E):E.push(c(e[i],t[i],"delete",d.concat(i),n)):E.push(c(e[i],t[i],"add",d.concat(i),n));const r=o.next();i=r.value,l=r.done}}else{const r=s(e,t,f,a);null!=r&&E.push(c(e,t,r,i,n))}return E}const d={add:l.setValueByPath,update:l.setValueByPath,delete:l.deleteValueByPath};e.exports={getDiff:(e,t,n=!1)=>p(e,t,n),applyDiff:(e,t,n)=>function(e,t,n){if(!(t instanceof Array))throw new Error(i.INVALID_DIFF_FORMAT);let r=e;return t.forEach(e=>{const{op:t,val:o,path:l}=e;if(!d[t])throw new Error(i.INVALID_DIFF_OP);r=d[t](r,l,o,n)}),r}(e,t,n)}},function(e,t){const n={NUMBER:"NUMBER",BOOLEAN:"BOOLEAN",STRING:"STRING",NULL:"NULL",UNDEFINED:"UNDEFINED",DATE:"DATE",ARRAY:"ARRAY",MAP:"MAP",SET:"SET",ITERABLE_OBJECT:"ITERABLE_OBJECT",DEFAULT:"OBJECT"};e.exports={types:n,iterableTypes:[n.ITERABLE_OBJECT,n.MAP,n.ARRAY,n.SET],errors:{EMPTY_DIFF:"No diff object is provided, Nothing to apply",INVALID_DIFF_FORMAT:"Invalid diff format",INVALID_DIFF_OP:"Unsupported operation provided into diff object"}}},function(e,t){const n=e=>t=>t instanceof e,r=n(Date),o=n(Array),i=n(Map),l=n(Set),f=e=>"[object Object]"===Object.prototype.toString.call(e);e.exports={isNumber:e=>"number"==typeof e,isBoolean:e=>"boolean"==typeof e,isString:e=>"string"==typeof e,isDate:r,isUndefined:e=>void 0===e,isNull:e=>null===e,isArray:o,isMap:i,isSet:l,isIterableObject:f,noop:()=>{},areDatesEqual:(e,t)=>e.getTime()===t.getTime(),setValueByPath:function(e,t=[],n,r){if(!o(t))throw new Error(`Diff path: "${t}" is not valid`);const{length:i}=t;if(0===i)return n;let l=e;for(let o=0;o<i;o+=1){const f=t[o];if(!l)throw new Error(`Invalid path: "${t}" for object: ${JSON.stringify(e,null,2)}`);if(null==f)throw new Error(`Invalid path: "${t}" for object: ${JSON.stringify(e,null,2)}`);o!==i-1?(l=l[f],r&&r(l)):l[f]=n}return e},deleteValueByPath:function(e,t){const n=t||[];if(0===n.length)return;let r=e;const{length:o}=n;for(let i=0;i<o;i+=1)if(i!==o-1){if(!r[n[i]])throw new Error(`Invalid path: "${t}" for object: ${JSON.stringify(e,null,2)}`);r=r[n[i]]}else if(f(r))delete r[n[i]];else{const e=parseInt(n[i],10);for(;r.length>e;)r.pop()}return e}}}])}));

// To store deltas as the twine document changes.
const setKey = (k, v) => tempData[k] = v
const tempData = {
  lastStorageIndex: null,
  lastStorageData: null,
  storageName: null,
}

const twineCheck = () => {
  const storageKey = Object.keys(sessionStorage).find(key => key.indexOf('.state') > -1)
  // Twine produces an "LZString" function as part of its save encryption. If that's not available, or a .state save isn't,
  // then this probably isn't a twine app and isn't going to work anyway.
  if (!storageKey || typeof LZString !== 'object') return null
  return storageKey
}

const end = async () => {
  await new Promise(r => setTimeout(r, 500));
  return main()
}

const main = async () => {
  // Decode the save/state and parse as JSON.
  const state = JSON.parse(LZString.decompressFromUTF16(sessionStorage.getItem(tempData.storageName)))
  if(!state) return console.log('An unexpected error occured with TamperTwine data processing.')
  if(state.index === tempData.lastStorageIndex) { // No change since last poll.
    return end()
  } else {
    // Use recursive diff to only report the differences between state changes.
    const changes = recursiveDiff.getDiff(tempData.lastStorageData, state.delta[state.index])
    const oldState = tempData.lastStorageData
    setKey('lastStorageIndex', state.index)
    setKey('lastStorageData', state.delta[state.index])
    // Consumable from other scripts with window.addEventListener('TwineChange', ({ detail }) => { console.log(detail) })
    window.dispatchEvent(new CustomEvent('TwineChange', { detail: { index: state.index, changes, oldState } }));
  }
  return end()
}

(() => {
  setKey('storageName', twineCheck())
  if(!tempData.storageName) { console.log('Twine has not set a sessionStorage variable, this so this page is not detected as a twine app.'); return }
  main()
})();
