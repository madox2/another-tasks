import { Box, List } from '@mui/material'
import { useDetectClickOutside } from 'react-detect-click-outside'
import { useState } from 'react'

import { DragType } from '../state'
import {
  DraggableProvider,
  DroppableProvider,
  useDroppable,
} from './components/DNDContext'
import { TaskItem } from './components/TaskItem'
import { useTaskList } from '../app/api'

function TaskItemList({ children }) {
  const [provided] = useDroppable()
  return (
    <List ref={provided.innerRef} {...provided.droppableProps}>
      {children}
      {provided.placeholder}
    </List>
  )
}

export function TasksPage() {
  const [tasks] = useTaskList('TODO')
  const [detailedTask, setDetailedTask] = useState(false)
  const [focusedTask, setFocusedTask] = useState(false)
  const taskDetailRef = useDetectClickOutside({
    onTriggered: () => !focusedTask && setDetailedTask(null),
  })
  return (
    <Box display="flex" flexDirection="row">
      <Box flex={1}>
        <DroppableProvider droppableId={`droppable-task`} type={DragType.TASK}>
          <TaskItemList>
            {tasks?.map((task, index) => (
              <DraggableProvider
                draggableId={`draggable-task-${task.id}`}
                index={index}
                key={task.id}
              >
                <TaskItem
                  task={task}
                  onFocus={() => {
                    setDetailedTask(task)
                    setFocusedTask(task)
                  }}
                  onBlur={() => {
                    setFocusedTask(null)
                  }}
                  highlighted={task.id === detailedTask?.id}
                />
              </DraggableProvider>
            ))}
          </TaskItemList>
        </DroppableProvider>
      </Box>
      {detailedTask && (
        <Box borderLeft={1} borderColor="grey.300" flex={1} ref={taskDetailRef}>
          {detailedTask.title}
        </Box>
      )}
    </Box>
  )
}
