import { Link } from 'react-router-dom'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import Checkbox from '@material-ui/core/Checkbox'
import DetailIcon from '@material-ui/icons/ChevronRight'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import React from 'react'
import TextField from '@material-ui/core/TextField'
import grey from '@material-ui/core/colors/grey'

import ListActionsToolbar from './tasks/ListActionsToolbar'

const MyLink = React.forwardRef((props, ref) => (
  <Link to="/app/detail" {...props} ref={ref} />
))

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
  completedInput: {
    textDecoration: 'line-through',
    color: grey[400],
  },
}))

const GreenCheckbox = withStyles({
  root: {
    color: grey[500],
    '&$checked': {
      color: grey[400],
    },
  },
  checked: {},
})(props => <Checkbox color="default" {...props} />)

function CheckboxList() {
  const classes = useStyles()
  const [checked, setChecked] = React.useState([0])

  const handleToggle = value => () => {
    const currentIndex = checked.indexOf(value)
    const newChecked = [...checked]

    if (currentIndex === -1) {
      newChecked.push(value)
    } else {
      newChecked.splice(currentIndex, 1)
    }

    setChecked(newChecked)
  }

  return (
    <List className={classes.root}>
      <ListActionsToolbar />
      {[0, 1, 2, 3, 4, 5, 6, 7].map(value => {
        const isChecked = checked.indexOf(value) !== -1
        return (
          <ListItem key={value} role={undefined} dense button>
            <ListItemIcon>
              <GreenCheckbox
                edge="start"
                checked={isChecked}
                tabIndex={-1}
                disableRipple
                onClick={handleToggle(value)}
              />
            </ListItemIcon>
            <ListItemText
              primary={
                <TextField
                  defaultValue={`Line item ${value + 1}`}
                  margin="none"
                  fullWidth
                  InputProps={{
                    disableUnderline: true,
                    classes: { input: isChecked && classes.completedInput },
                  }}
                />
              }
              secondary={value === 5 && 'some description haha'}
            />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="Comments" component={MyLink}>
                <DetailIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        )
      })}
    </List>
  )
}

export default CheckboxList