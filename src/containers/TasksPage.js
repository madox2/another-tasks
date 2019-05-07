import { DragDropContext } from 'react-beautiful-dnd'
import { Link } from 'react-router-dom'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import Checkbox from '@material-ui/core/Checkbox'
import DetailIcon from '@material-ui/icons/ChevronRight'
import IconButton from '@material-ui/core/IconButton'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import React from 'react'
import TextField from '@material-ui/core/TextField'
import grey from '@material-ui/core/colors/grey'

import AppTemplate from './AppTemplate'
import DraggableList from '../components/DraggableList'
import ListActionsToolbar from './tasks/ListActionsToolbar'
import ListContextMenu from './tasks/ListContextMenu'

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
      <AppTemplate toolbar="TODO" contextMenu={<ListContextMenu />}>
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
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          paddingRight: 15,
                        }}
                      >
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
                        <IconButton
                          edge="end"
                          aria-label="Comments"
                          component={MyLink}
                        >
                          <DetailIcon />
                        </IconButton>
                      </div>
                    }
                    secondary={value === 5 && 'some description haha'}
                  />
                </>
              ),
            }
          })}
        />
      </AppTemplate>
    </DragDropContext>
  )
}

export default CheckboxList
