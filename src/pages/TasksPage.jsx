import { Box } from '@mui/material'
import { throttle } from 'lodash-es'
import { useDetectClickOutside } from 'react-detect-click-outside'
import { useForm, FormProvider } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'

import { TaskDetailForm } from './components/TaskDetailForm'
import { TaskList } from './components/TaskList'
import { TaskStatus } from '../app/constants'
import { TasksToolbox } from './components/TasksToolbox'
import { useGlobalState } from '../state'
import { useTaskList, useUpdateTaskMutation } from '../app/api/tasks'
import { useThemeUtils } from '../utils/themeUtils'

const makeThrottledUpdateTask = updateTaskMutation => {
  const updateTask = data => {
    updateTaskMutation.mutate({
      id: data.taskId,
      listId: data.listId,
      title: data.title,
      notes: data.notes,
      status: data.completed ? TaskStatus.completed : TaskStatus.needsAction,
      due: data.due?.toISOString(),
    })
  }
  let updateTaskThrottled
  let lastTaskId
  return data => {
    if (lastTaskId !== data.taskId) {
      // recrete throttled task to ensure last task is updated
      updateTaskThrottled = throttle(updateTask, 500, { leading: false })
      lastTaskId = data.taskId
    }
    updateTaskThrottled(data)
  }
}

const makeDefaultValues = tasks =>
  tasks?.reduce(
    (acc, task) => ({
      ...acc,
      [task.id]: {
        title: task.title,
        completed: task.status === TaskStatus.completed,
        due: task.due && new Date(task.due),
        notes: task.notes,
      },
    }),
    {}
  )

function TasksForm({ list }) {
  const listId = list.id
  const [selectedTask, setSelectedTask] = useState(false)
  const [focusedTask, setFocusedTask] = useState(false)
  const [showCompleted] = useGlobalState('showCompleted')
  const { scrollContentHeight } = useThemeUtils()
  const updateTaskMutation = useUpdateTaskMutation()
  const updateTask = useRef(makeThrottledUpdateTask(updateTaskMutation))
  const taskDetailRef = useDetectClickOutside({
    onTriggered: () => !focusedTask && setSelectedTask(null),
  })
  const form = useForm({
    defaultValues: makeDefaultValues(list?.tasks),
  })

  useEffect(() => {
    // reset when tasks added/removed
    form.reset(makeDefaultValues(list?.tasks))
    // eslint-disable-next-line
  }, [list?.tasks?.length])

  const formValues = form.getValues()

  useEffect(() => {
    const subscription = form.watch((value, { name, type }) => {
      if (!name) {
        return
      }
      // changed task can be different to selected one, e.g. changing completed state
      const [taskId] = name?.split('.')
      const data = { ...value[taskId], listId, taskId }
      updateTask.current(data)
    })
    return () => subscription.unsubscribe()
  }, [form, selectedTask, updateTaskMutation, listId])

  return (
    <FormProvider {...form}>
      <Box display="flex" flexDirection="row">
        <Box flex={1}>
          <TasksToolbox listId={listId} />
          <Box height={scrollContentHeight} overflow="scroll">
            <TaskList
              tasks={list.tasks.filter(
                t => showCompleted || !formValues[t.id]?.completed
              )}
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

export function TasksPage() {
  const { listId } = useParams()
  const { data: list, isLoading } = useTaskList(listId)
  if (!listId) {
    return 'No list selected'
  }
  if (isLoading) {
    return null
  }
  if (!list) {
    return 'List not found'
  }
  return <TasksForm list={list} key={listId} />
}
