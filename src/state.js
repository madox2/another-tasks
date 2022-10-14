import { createGlobalState } from 'react-hooks-global-state'

const initialState = { dragType: null }

const { useGlobalState } = createGlobalState(initialState)

export const DragType = {
  TASK: 'TASK',
  LIST: 'LIST',
}

export { useGlobalState }
