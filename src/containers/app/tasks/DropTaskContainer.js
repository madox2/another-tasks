import { DragDropContext } from 'react-beautiful-dnd'
import { Mutation } from 'react-apollo'
import { gql } from 'apollo-boost'
import React from 'react'

const MOVE_TASK = gql`
  mutation MoveTask($id: String!, $previousId: String, $listId: String!) {
    moveTask(id: $id, previousId: $previousId, listId: $listId) {
      id
      tasks {
        id
      }
    }
  }
`

export const withMoveTaskMutation = Component => props => (
  <Mutation mutation={MOVE_TASK}>
    {(moveTask, { data }) => <Component {...props} moveTask={moveTask} />}
  </Mutation>
)

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)
  return result
}

const DropTaskContainer = ({ data, moveTask, listId, ...other }) => (
  <DragDropContext
    onDragEnd={result => {
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
            moveTask: {
              id: listId,
              __typename: 'TaskList',
              ...data,
              tasks,
            },
          },
        })
      } else {
        // move to list
      }
    }}
    {...other}
  />
)

export default withMoveTaskMutation(DropTaskContainer)
