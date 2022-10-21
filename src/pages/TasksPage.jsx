import { Add, Visibility, VisibilityOff } from '@mui/icons-material'
import { get } from 'lodash-es'
import { Box, Button } from '@mui/material'
import { useDetectClickOutside } from 'react-detect-click-outside'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

import { TaskDetailForm } from './components/TaskDetailForm'
import { TaskList } from './components/TaskList'
import { Toolbox } from './components/Toolbox'
import { useTaskList } from '../app/api/tasks'
import { useThemeUtils } from '../utils/themeUtils'
import { useForm, FormProvider } from 'react-hook-form'

const makeDefaultValues = tasks =>
  tasks?.reduce((acc, task) => ({
    ...acc,
    [task.id]: {
      detail: {
        title: task.title,
      },
      list: {
        title: task.title,
      },
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
    const subscription = form.watch((value, { name, type }) => {
      const subforms = ['list', 'detail']
      const newValue = get(value, name)
      // sync title fields
      subforms.forEach(subform => {
        if (get(value, `${selectedTask.id}.${subform}.title`) !== newValue) {
          form.setValue(`${selectedTask.id}.${subform}.title`, newValue)
        }
      })
    })
    return () => subscription.unsubscribe()
  }, [form, selectedTask])

  useEffect(() => {
    form.reset(makeDefaultValues(list?.tasks))
  }, [list?.tasks, form])

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
            <TaskDetailForm task={selectedTask} />
          </Box>
        )}
      </Box>
    </FormProvider>
  )
}
