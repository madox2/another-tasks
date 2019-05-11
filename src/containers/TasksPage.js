import { DragDropContext } from 'react-beautiful-dnd'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import Checkbox from '@material-ui/core/Checkbox'
import DetailIcon from '@material-ui/icons/ChevronRight'
import IconButton from '@material-ui/core/IconButton'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import React from 'react'
import TextField from '@material-ui/core/TextField'
import grey from '@material-ui/core/colors/grey'

import { TaskDetailLink } from '../components/Link'
import DraggableList from '../components/DraggableList'
import ListActionsToolbar from './app/tasks/ListActionsToolbar'
import ListContextMenu from './app/tasks/ListContextMenu'
import Template from './app/Template'

const useStyles = makeStyles(theme => ({
  completedInput: {
    textDecoration: 'line-through',
    color: grey[400],
  },
}))

const GreyCheckbox = withStyles({
  root: {
    color: grey[500],
    '&$checked': {
      color: grey[400],
    },
  },
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
    <DragDropContext
      onDragEnd={result => {
        console.log('droppable result', result)
        // dropped outside the list
        /*
        if (!result.destination) {
          return
        }
        // a little function to help us with reordering the result
        const reorder = (list, startIndex, endIndex) => {
          const result = Array.from(list)
          const [removed] = result.splice(startIndex, 1)
          result.splice(endIndex, 0, removed)

          return result
        }
        const items = reorder(
          props.items,
          result.source.index,
          result.destination.index
        )
        */
      }}
    >
      <Template toolbar="TODO" right={<ListContextMenu />}>
        <ListActionsToolbar />
        <DraggableList
          onDragEnd={() => 0}
          items={[1, 2, 3, 4, 5, 6, 7].map(value => {
            const isChecked = checked.indexOf(value) !== -1
            return {
              id: value,
              children: (
                <>
                  <ListItemIcon>
                    <GreyCheckbox
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
                          classes: {
                            input: isChecked && classes.completedInput,
                          },
                        }}
                      />
                    }
                    secondary={value === 5 && 'some description haha'}
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      aria-label="Task detail"
                      component={TaskDetailLink}
                    >
                      <DetailIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </>
              ),
            }
          })}
        />
      </Template>
    </DragDropContext>
  )
}

export default CheckboxList
