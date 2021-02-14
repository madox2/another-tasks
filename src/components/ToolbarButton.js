import { makeStyles } from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton'
import React from 'react'

const useStyles = makeStyles((theme) => ({
  button: {
    color: 'white',
  },
}))

export default function ToolbarButton({ Icon, ...other }) {
  const classes = useStyles()
  return (
    <IconButton className={classes.button} {...other}>
      <Icon />
    </IconButton>
  )
}
