import { DragDropContext } from 'react-beautiful-dnd'
import { Mutation, compose } from 'react-apollo'
import { gql } from 'apollo-boost'
import React from 'react'

import {
  TASK_LIST,
  mutateMoveToList,
  withMoveToListMutation,
} from './mutations'

export const withMoveTaskMutation = Component => props => (
  <Mutation
    mutation={gql`
      mutation MoveTask($id: String!, $previousId: String, $listId: String!) {
        moveTask(id: $id, previousId: $previousId, listId: $listId)
      }
    `}
  >
    {(moveTask, { data }) => <Component {...props} moveTask={moveTask} />}
  </Mutation>
)

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
      const shouldMoveTask = result.destination.droppableId === 'droppable'
      if (shouldMoveTask) {
        const tasks = reorder(
          [...data.taskList.tasks],
          result.source.index,
          result.destination.index
        )
        const id = result.draggableId
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
        const id = result.draggableId
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
