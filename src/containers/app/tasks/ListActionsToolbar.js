import { makeStyles } from '@material-ui/core/styles'
import AddIcon from '@material-ui/icons/Add'
import ClearCompletedIcon from '@material-ui/icons/VisibilityOff'
import Fab from '@material-ui/core/Fab'
import React from 'react'

const useStyles = makeStyles(theme => ({
  fab: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}))

export default function ListActionsToolbar() {
  const classes = useStyles()
  return (
    <div>
      <Fab
        variant="extended"
        aria-label="Create"
        size="small"
        className={classes.fab}
        color="primary"
      >
        <AddIcon className={classes.extendedIcon} />
        Add task
      </Fab>
      <Fab
        variant="extended"
        aria-label="Clear completed"
        size="small"
        className={classes.fab}
        color="primary"
      >
        <ClearCompletedIcon className={classes.extendedIcon} />
        Clear completed
      </Fab>
    </div>
  )
}
