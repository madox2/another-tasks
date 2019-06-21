import { makeStyles } from '@material-ui/core'
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

export default function FabButton({ Icon, children, ...other }) {
  const classes = useStyles()
  return (
    <Fab
      variant="extended"
      size="small"
      className={classes.fab}
      color="primary"
      {...other}
    >
      {Icon && <Icon className={classes.extendedIcon} />}
      {children}
    </Fab>
  )
}
