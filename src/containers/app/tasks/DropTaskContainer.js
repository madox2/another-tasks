import { DragDropContext } from 'react-beautiful-dnd'
import { compose } from 'react-apollo'
import React from 'react'

import { TASK_LIST } from '../../../queries/taskListsQueries'
import { isTaskOptimistic } from '../../../app/optimisticCache'
import { mutateMoveToList } from '../../../queries/taskHelpers'
import {
  withMoveTaskMutation,
  withMoveToListMutation,
} from '../../../queries/taskMutations'

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)
  return result
}

const DropTaskContainer = ({
  data,
  moveTask,
  moveToList,
  listId,
  ...other
}) => (
  <DragDropContext
    onDragEnd={result => {
      if (!result.destination) {
        // outside of container
        return
      }
      console.log('droppable result', result)
      const id = result.draggableId
      if (isTaskOptimistic(id)) {
        return
      }
      const shouldMoveTask = result.destination.droppableId === 'droppable'
      if (shouldMoveTask) {
        const tasks = reorder(
          [...data.taskList.tasks],
          result.source.index,
          result.destination.index
        )
        const prevIndex = tasks.findIndex(t => t.id === id) - 1
        const previousId = tasks[prevIndex] && tasks[prevIndex].id
        moveTask({
          variables: { listId, id, previousId },
          optimisticResponse: {
            __typename: 'Mutation',
            moveTask: true,
          },
          update: (proxy, { data: { moveTask } }) => {
            const data = proxy.readQuery({
              query: TASK_LIST,
              variables: { id: listId },
            })
            proxy.writeQuery({
              query: TASK_LIST,
              variables: { id: listId },
              data: {
                ...data,
                taskList: {
                  ...data.taskList,
                  tasks,
                },
              },
            })
          },
        })
      } else {
        // move to list
        const targetListId = result.destination.droppableId.split('-')[2]
        if (listId === targetListId) {
          return
        }
        mutateMoveToList(moveToList, { listId, id, targetListId })
      }
    }}
    {...other}
  />
)

export default compose(
  withMoveTaskMutation,
  withMoveToListMutation
)(DropTaskContainer)
