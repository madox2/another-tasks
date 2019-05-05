import { makeStyles } from '@material-ui/core/styles'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import React from 'react'
import RefreshIcon from '@material-ui/icons/Refresh'
import ClearCompletedIcon from '@material-ui/icons/VisibilityOff'

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
        aria-label="Refresh"
        size="small"
        className={classes.fab}
        color="primary"
      >
        <RefreshIcon className={classes.extendedIcon} />
        Refresh
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
