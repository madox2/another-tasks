import { withStyles } from '@material-ui/core'
import Checkbox from '@material-ui/core/Checkbox'
import React from 'react'
import grey from '@material-ui/core/colors/grey'

function CompletedCheckbox({ status, setStatus, ...other }) {
  const checked = status === 'completed'
  return (
    <Checkbox
      color="default"
      onClick={() => {
        if (status === 'completed') {
          setStatus('needsAction')
        } else {
          setStatus('completed')
        }
      }}
      checked={checked}
      {...other}
    />
  )
}

const withCheckboxStyles = withStyles({
  root: {
    color: grey[500],
    '&$checked': {
      color: grey[400],
    },
  },
})

export default withCheckboxStyles(CompletedCheckbox)
