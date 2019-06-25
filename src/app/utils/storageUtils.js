export const LAST_LIST_STORAGE_KEY = 'AT-lastList'

export function saveToLocalStorage(key, value) {
  try {
    window.localStorage.setItem(key, value)
  } catch (ignore) {}
}

export function loadFromLocalStorage(key) {
  try {
    return window.localStorage.getItem(key)
  } catch (ignore) {}
}
