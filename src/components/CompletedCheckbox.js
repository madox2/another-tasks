import { withStyles } from '@material-ui/core'
import Checkbox from '@material-ui/core/Checkbox'
import React from 'react'
import grey from '@material-ui/core/colors/grey'

export default withStyles({
  root: {
    color: grey[500],
    '&$checked': {
      color: grey[400],
    },
  },
})(props => <Checkbox color="default" {...props} />)
