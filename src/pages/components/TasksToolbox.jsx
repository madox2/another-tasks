import { Add, Visibility, VisibilityOff } from '@mui/icons-material'
import { IconButton, Button } from '@mui/material'

import { Toolbox } from './Toolbox'
import {
  useAddTaskMutation,
  useClearCompletedMutation,
} from '../../app/api/tasks'
import { useGlobalState } from '../../state'

export function TasksToolbox({ listId }) {
  const [showCompleted, setShowCompleted] = useGlobalState('showCompleted')
  const addTaskMutation = useAddTaskMutation()
  const clearCompletedMutation = useClearCompletedMutation()
  return (
    <Toolbox>
      <Button
        variant="outlined"
        startIcon={<Add />}
        onClick={() => addTaskMutation.mutateAsync({ listId })}
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
          Clear
        </Button>
      )}
    </Toolbox>
  )
}
