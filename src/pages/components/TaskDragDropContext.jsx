import { DragDropContext } from 'react-beautiful-dnd'
import { useParams } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'

import { DragType, useGlobalState } from '../../state'
import { orderLists } from '../hooks/useSortedLists'
import { useMoveTaskMutation, useMoveToListMutation } from '../../app/api/tasks'

const reorder = (items, startIndex, endIndex) => {
  const result = [...items]
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)
  return result
}

export function TaskDragDropContext({ children }) {
  const { listId } = useParams()
  const [showCompleted] = useGlobalState('showCompleted')
  const [dragType, setDragType] = useGlobalState('dragType')
  const moveTaskMutation = useMoveTaskMutation()
  const moveToListMutation = useMoveToListMutation()
  const queryClient = useQueryClient()
  const [listOrder, setListOrder] = useGlobalState('listOrder')

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

  function handleReorderList({ sourceIndex, destinationIndex }) {
    const lists = queryClient.getQueryData(['lists'])
    const ordered = orderLists(lists, listOrder)

    const reordered = reorder(ordered, sourceIndex, destinationIndex)

    setListOrder(reordered.map(l => l.id))
  }

  async function handleDropToList({
    sourceListId,
    sourceTaskId,
    destinationListId,
  }) {
    const { tasks } = queryClient.getQueryData(['lists', listId])
    const sourceTask = tasks.find(t => t.id === sourceTaskId)

    queryClient.setQueryData(['lists', sourceListId], list => ({
      ...list,
      tasks: list.tasks.filter(t => t.id !== sourceTaskId),
    }))
    queryClient.setQueryData(
      ['lists', destinationListId],
      list => list && { ...list, tasks: [sourceTask, ...list.tasks] }
    )

    await moveToListMutation.mutateAsync({
      listId: sourceListId,
      id: sourceTaskId,
      targetListId: destinationListId,
    })

    // invalidate as dropped task gets new id
    await queryClient.refetchQueries({ queryKey: ['lists', destinationListId] })
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
          if (result.destination.droppableId === 'droppable-task') {
            handleReorderTask({
              visibleSourceIndex: result.source.index,
              visibleDestinationIndex: result.destination.index,
            })
          }
          if (
            result.destination.droppableId.startsWith('droppable-tasklist-')
          ) {
            const destinationListId = result.destination.droppableId.substring(
              'droppable-tasklist-'.length
            )
            const sourceTaskId = result.draggableId.substring(
              'droppable-task-'.length
            )
            const sourceListId = listId
            handleDropToList({ sourceTaskId, sourceListId, destinationListId })
          }
        }
        if (dragType === DragType.LIST) {
          handleReorderList({
            sourceIndex: result.source.index,
            destinationIndex: result.destination.index,
          })
        }
        setDragType(null)
      }}
    >
      {children}
    </DragDropContext>
  )
}
