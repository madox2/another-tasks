import { Add, Visibility, VisibilityOff } from '@mui/icons-material'
import { Box, Button } from '@mui/material'
import { useDetectClickOutside } from 'react-detect-click-outside'
import { useForm, FormProvider } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

import { TaskDetailForm } from './components/TaskDetailForm'
import { TaskList } from './components/TaskList'
import { TaskStatus } from '../app/constants'
import { Toolbox } from './components/Toolbox'
import { useTaskList } from '../app/api/tasks'
import { useThemeUtils } from '../utils/themeUtils'

const makeDefaultValues = tasks =>
  tasks?.reduce((acc, task) => ({
    ...acc,
    [task.id]: {
      title: task.title,
      completed: task.status === TaskStatus.completed,
      due: task.due && new Date(task.due),
      notes: task.notes,
    },
  }))

export function TasksPage() {
  const { listId } = useParams()
  const { data: list, isLoading } = useTaskList(listId)
  const [selectedTask, setSelectedTask] = useState(false)
  const [focusedTask, setFocusedTask] = useState(false)
  const [showCompleted, setShowCompleted] = useState(false)
  const { scrollContentHeight } = useThemeUtils()
  const taskDetailRef = useDetectClickOutside({
    onTriggered: () => !focusedTask && setSelectedTask(null),
  })
  const form = useForm({
    defaultValues: makeDefaultValues(list?.tasks),
  })

  useEffect(() => {
    form.reset(makeDefaultValues(list?.tasks))
  }, [list?.tasks, form])

  useEffect(() => {
    const subscription = form.watch((value, { name, type }) => {
      if (!name) {
        return
      }
      const [taskId] = name?.split('.') // changed task can be different to selected one, e.g. changing completed state
      console.log('change', taskId, value[taskId])
    })
    return () => subscription.unsubscribe()
  }, [form, selectedTask])

  if (!listId) {
    return 'No list selected'
  }
  if (isLoading) {
    return null
  }
  if (!list) {
    return 'List not found'
  }
  return (
    <FormProvider {...form}>
      <Box display="flex" flexDirection="row">
        <Box flex={1}>
          <Toolbox>
            <Button variant="outlined" startIcon={<Add />}>
              Task
            </Button>
            <Button
              variant="outlined"
              onClick={() => setShowCompleted(c => !c)}
              startIcon={showCompleted ? <Visibility /> : <VisibilityOff />}
            >
              Completed
            </Button>
          </Toolbox>
          <Box height={scrollContentHeight} overflow="scroll">
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
        </Box>
        {selectedTask && (
          <Box
            borderLeft={1}
            borderColor="grey.300"
            flex={1}
            ref={taskDetailRef}
            p={2}
          >
            <TaskDetailForm task={selectedTask} key={selectedTask.id} />
          </Box>
        )}
      </Box>
    </FormProvider>
  )
}
