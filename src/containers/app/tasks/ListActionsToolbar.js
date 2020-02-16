import AddIcon from '@material-ui/icons/Add'
import ClearCompletedIcon from '@material-ui/icons/VisibilityOff'
import React from 'react'

import { useAddTask, useClearCompleted } from '../../../queries/taskMutations'
import FabButton from '../../../components/FabButton'

export default function ListActionsToolbar({ listId, onTaskAdd }) {
  const [addTask] = useAddTask({ listId, onTaskAdd })
  const [clearCompleted] = useClearCompleted({ listId })
  return (
    <div>
      <FabButton aria-label="Add task" Icon={AddIcon} onClick={() => addTask()}>
        Add task
      </FabButton>
      <FabButton
        aria-label="Clear completed"
        Icon={ClearCompletedIcon}
        onClick={clearCompleted}
      >
        Clear completed
      </FabButton>
    </div>
  )
}
