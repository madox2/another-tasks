import { throttle } from 'lodash'
import { useEffect, useState } from 'react'

import { TASK_LIST } from './taskListsQueries'

const updateTaskFn = (updateTask, { title, notes, due, listId, id, status }) =>
  updateTask({
    variables: { title, notes, due, listId, id, status },
    optimisticResponse: {
      __typename: 'Mutation',
      updateTask: {
        id: id,
        __typename: 'Task',
        title,
        notes,
        due,
        status,
      },
    },
  })

export function useUpdateTaskEffect(updateTask, task) {
  const { title, notes, due, listId, id, status } = task
  const [shouldUpdate, setShouldUpdate] = useState(false)
  const [throttledUpdate, setThrottledUpdate] = useState({})
  useEffect(() => {
    // set only once
    const throttled = throttle(updateTaskFn, 500, { leading: false })
    setThrottledUpdate({ call: throttled })
  }, [])
  useEffect(() => {
    if (!shouldUpdate) {
      // skip first update
      setShouldUpdate(true)
      return
    }
    throttledUpdate.call(updateTask, { title, notes, due, listId, id, status })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, notes, due, status])
}

export const mutateMoveToList = (moveToList, { listId, id, targetListId }) =>
  moveToList({
    variables: { listId, id, targetListId },
    optimisticResponse: {
      __typename: 'Mutation',
      moveToList: true,
    },
    update: (proxy, { data: { moveTask } }) => {
      const data = proxy.readQuery({
        query: TASK_LIST,
        variables: { id: listId },
      })
      data.taskList.tasks = data.taskList.tasks.filter(t => t.id !== id)
      proxy.writeQuery({
        query: TASK_LIST,
        variables: { id: listId },
        data,
      })
    },
    awaitRefetchQueries: true,
    refetchQueries: [
      {
        query: TASK_LIST,
        variables: { id: targetListId },
      },
      {
        query: TASK_LIST,
        variables: { id: listId },
      },
    ],
  })
