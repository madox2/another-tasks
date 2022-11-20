export const StorageKeys = {
  LIST_ORDER: 'LIST_ORDER',
}

export function setStorageItem(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

export function getStorageItem(key) {
  return JSON.parse(localStorage.getItem(key))
}
