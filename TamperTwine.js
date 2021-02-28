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
  await new Promise(r => setTimeout(r, 250));
  return main()
}

const main = async () => {
  // Decode the save/state and parse as JSON.
  const state = JSON.parse(LZString.decompressFromUTF16(sessionStorage.getItem(tempData.storageName)))
  if(!state) return console.log('An unexpected error occured with TamperTwine data processing.')
  if(state.index === tempData.lastStorageIndex) { // No change since last poll.
    return end()
  } else {
    const oldState = tempData.lastStorageData
    setKey('lastStorageIndex', state.index)
    setKey('lastStorageData', state.delta[state.index])
    // Consumable from other scripts with window.addEventListener('TwineChange', ({ detail }) => { console.log(detail) })
    window.dispatchEvent(new CustomEvent('TwineChange', { detail: { index: state.index, state, oldState } }));
  }
  return end()
}

(() => {
  setKey('storageName', twineCheck())
  if(!tempData.storageName) { console.log('Twine has not set a sessionStorage variable, this so this page is not detected as a twine app.'); return }
  main()
})();
