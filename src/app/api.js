import { v4 } from 'uuid'

import { range } from 'lodash-es'

const dummyList = range(1, 10).map(listIdx => ({
  id: v4(),
  title: `List ${listIdx}`,
  tasks: range(1, 20).map((taskIdx, i) => ({
    id: v4(),
    title: `Task ${taskIdx * (i + 1)}`,
    notes: 'some notes',
    due: null,
    status: null,
  })),
}))

export function useTaskLists() {
  const data = dummyList.map(l => ({ ...l, tasks: null }))
  return [data, { loading: false, error: false }]
}

export function useTaskList(id) {
  //const data = dummyList.find(l => l.id === id)
  const data = dummyList[0].tasks
  return [data, { loading: false, error: false }]
}
