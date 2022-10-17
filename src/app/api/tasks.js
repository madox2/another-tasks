import { v4 } from 'uuid'

import { range } from 'lodash-es'

const dummyTasksRange = range(1, 20)

const dummyList = range(1, 20).map((listIdx, i) => ({
  id: v4(),
  title: `List ${listIdx}`,
  tasks: dummyTasksRange.map(taskIdx => ({
    id: v4(),
    title: `Task ${dummyTasksRange.length * i + taskIdx}`,
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
  const data = dummyList.find(l => l.id === id)
  return [data, { loading: false, error: false }]
}
