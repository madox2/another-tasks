import { Box, TextField } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { useDetectClickOutside } from 'react-detect-click-outside'
import { useParams } from 'react-router-dom'
import { useState } from 'react'

import { TaskList } from './components/TaskList'
import { useTaskList } from '../app/api/tasks'
import { useThemeUtils } from '../utils/themeUtils'

export function TasksPage() {
  const { listId } = useParams()
  const [list] = useTaskList(listId)
  const [selectedTask, setSelectedTask] = useState(false)
  const [focusedTask, setFocusedTask] = useState(false)
  const [dueDate, setDueDate] = useState(null)
  const { mainContentHeight } = useThemeUtils()
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
      <Box flex={1} height={mainContentHeight} overflow="scroll">
        <TaskList
          tasks={list.tasks}
          selectedTask={selectedTask}
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
        <Box
          borderLeft={1}
          borderColor="grey.300"
          flex={1}
          ref={taskDetailRef}
          p={2}
        >
          <TextField
            defaultValue={selectedTask.title}
            variant="standard"
            fullWidth
            margin="normal"
            placeholder="title"
          />
          <DatePicker
            label="Due date"
            value={dueDate}
            onChange={newDueDate => {
              setDueDate(newDueDate)
            }}
            renderInput={params => (
              <TextField variant="standard" margin="normal" {...params} />
            )}
            PaperProps={{
              onClick: e => {
                // stop propagation to prevent triggering click-outside
                e.stopPropagation()
              },
            }}
          />
          <TextField
            defaultValue={selectedTask.notes}
            variant="standard"
            multiline
            label="Notes"
            fullWidth
            margin="normal"
            rows={5}
          />
        </Box>
      )}
    </Box>
  )
}
