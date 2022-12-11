import { createGlobalState } from 'react-hooks-global-state'

import { StorageKeys, getStorageItem, setStorageItem } from './utils/storage'

const initialState = {
  dragType: null,
  showCompleted: !!getStorageItem(StorageKeys.SHOW_COMPLETED),
  listOrder: getStorageItem(StorageKeys.LIST_ORDER),
}

const { useGlobalState, subscribe } = createGlobalState(initialState)

subscribe('showCompleted', v => setStorageItem(StorageKeys.SHOW_COMPLETED, v))

export const DragType = {
  TASK: 'TASK',
  LIST: 'LIST',
}

export { useGlobalState }
