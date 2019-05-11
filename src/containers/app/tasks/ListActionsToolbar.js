import AddIcon from '@material-ui/icons/Add'
import ClearCompletedIcon from '@material-ui/icons/VisibilityOff'
import React from 'react'

import FabButton from '../../../components/FabButton'

export default function ListActionsToolbar() {
  return (
    <div>
      <FabButton aria-label="Add task" Icon={AddIcon}>
        Add task
      </FabButton>
      <FabButton aria-label="Clear completed" Icon={ClearCompletedIcon}>
        Clear completed
      </FabButton>
    </div>
  )
}
