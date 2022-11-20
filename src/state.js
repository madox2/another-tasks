import { createGlobalState } from 'react-hooks-global-state'

import { StorageKeys, getStorageItem } from './utils/storage'

const initialState = {
  dragType: null,
  showCompleted: false,
  listOrder: getStorageItem(StorageKeys.LIST_ORDER),
}

const { useGlobalState } = createGlobalState(initialState)

export const DragType = {
  TASK: 'TASK',
  LIST: 'LIST',
}

export { useGlobalState }
