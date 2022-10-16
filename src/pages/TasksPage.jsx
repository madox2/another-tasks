import { Box } from '@mui/material'
import { useDetectClickOutside } from 'react-detect-click-outside'
import { useState } from 'react'

import { TaskList } from './components/TaskList'
import { useTaskList } from '../app/api'
import { useParams } from 'react-router-dom'

export function TasksPage() {
  const { listId } = useParams()
  const [list] = useTaskList(listId)
  const [selectedTask, setSelectedTask] = useState(false)
  const [focusedTask, setFocusedTask] = useState(false)
  const taskDetailRef = useDetectClickOutside({
    onTriggered: () => !focusedTask && setSelectedTask(null),
  })
  if (!listId) {
    return 'No list selected'
  }
  if (!list) {
    return 'List not found'
  }
  return (
    <Box display="flex" flexDirection="row">
      <Box flex={1}>
        <TaskList
          tasks={list.tasks}
          onTaskFocus={task => {
            setSelectedTask(task)
            setFocusedTask(task)
          }}
          onTaskBlur={task => {
            setFocusedTask(null)
          }}
        />
      </Box>
      {selectedTask && (
        <Box borderLeft={1} borderColor="grey.300" flex={1} ref={taskDetailRef}>
          {selectedTask.title}
        </Box>
      )}
    </Box>
  )
}
