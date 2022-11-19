import { DragDropContext } from 'react-beautiful-dnd'
import { useParams } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'

import { DragType, useGlobalState } from '../../state'
import { useMoveTaskMutation } from '../../app/api/tasks'

const reorder = (tasks, startIndex, endIndex) => {
  const result = [...tasks]
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)
  return result
}

export function TaskDragDropContext({ children }) {
  const { listId } = useParams()
  const [showCompleted] = useGlobalState('showCompleted')
  const [dragType, setDragType] = useGlobalState('dragType')
  const moveTaskMutation = useMoveTaskMutation()
  const queryClient = useQueryClient()

  function handleReorderTask({ visibleSourceIndex, visibleDestinationIndex }) {
    const { tasks = [] } = queryClient.getQueryData(['lists', listId])

    const visibleTasks = tasks.filter(t => showCompleted || !t.completed)

    const sourceTask = visibleTasks[visibleSourceIndex]
    const destinationTask = visibleTasks[visibleDestinationIndex]

    const sourceIndex = tasks.findIndex(t => t.id === sourceTask.id)
    const destinationIndex = tasks.findIndex(t => t.id === destinationTask.id)

    const reordered = reorder(tasks, sourceIndex, destinationIndex)

    queryClient.setQueryData(['lists', listId], list => ({
      ...list,
      tasks: reordered,
    }))

    const prevIndex = reordered.findIndex(t => t.id === sourceTask.id) - 1
    const previousTask = reordered[prevIndex]

    moveTaskMutation.mutate({
      id: sourceTask.id,
      listId,
      previousId: previousTask?.id,
    })
  }

  return (
    <DragDropContext
      onBeforeDragStart={({ draggableId }) => {
        setDragType(
          draggableId.startsWith('draggable-task-')
            ? DragType.TASK
            : DragType.LIST
        )
      }}
      onDragEnd={result => {
        if (dragType === DragType.TASK) {
          handleReorderTask({
            visibleSourceIndex: result.source.index,
            visibleDestinationIndex: result.destination.index,
          })
        }

        setDragType(null)
      }}
    >
      {children}
    </DragDropContext>
  )
}
