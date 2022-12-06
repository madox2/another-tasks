import { Add, Visibility, VisibilityOff } from '@mui/icons-material'
import { IconButton, Button } from '@mui/material'
import { useEffect } from 'react'

import { Toolbox } from './Toolbox'
import {
  useAddTaskMutation,
  useClearCompletedMutation,
} from '../../app/api/tasks'
import { useGlobalState } from '../../state'

function GlobalEnterListener({ allowedContainerRef, onEnter }) {
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key !== 'Enter') {
        return
      }
      if (
        e.target !== document.body &&
        !allowedContainerRef.current?.contains(e.target)
      ) {
        return
      }
      onEnter()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
    // eslint-disable-next-line
  }, [])
  return null
}

export function TasksToolbox({ listId, taskListContainerRef }) {
  const [showCompleted, setShowCompleted] = useGlobalState('showCompleted')
  const addTaskMutation = useAddTaskMutation()
  const clearCompletedMutation = useClearCompletedMutation()
  const addTask = () => addTaskMutation.mutateAsync({ listId })
  return (
    <>
      <GlobalEnterListener
        onEnter={addTask}
        allowedContainerRef={taskListContainerRef}
      />
      <Toolbox>
        <Button
          variant="outlined"
          startIcon={<Add />}
          onClick={addTask}
          disabled={addTaskMutation.isLoading}
        >
          Task
        </Button>
        <IconButton color="primary" onClick={() => setShowCompleted(c => !c)}>
          {showCompleted ? <Visibility /> : <VisibilityOff />}
        </IconButton>
        {showCompleted && (
          <Button
            variant="text"
            onClick={() => clearCompletedMutation.mutateAsync({ listId })}
            disabled={clearCompletedMutation.isLoading}
          >
            Clear completed
          </Button>
        )}
      </Toolbox>
    </>
  )
}
