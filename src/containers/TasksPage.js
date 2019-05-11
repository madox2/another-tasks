import { DragDropContext } from 'react-beautiful-dnd'
import { Query } from 'react-apollo'
import { gql } from 'apollo-boost'
import { makeStyles } from '@material-ui/core/styles'
import DetailIcon from '@material-ui/icons/ChevronRight'
import IconButton from '@material-ui/core/IconButton'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import React from 'react'
import TextField from '@material-ui/core/TextField'
import grey from '@material-ui/core/colors/grey'

import { TaskDetailLink } from '../components/Link'
import CompletedCheckbox from '../components/CompletedCheckbox'
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

const Container = props => (
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
    {...props}
  />
)

const NoListSelected = ({ children }) => (
  <Container>
    <Template toolbar="Select list">{children}</Template>
  </Container>
)

function TasksPage({ match: { params } }) {
  const classes = useStyles()
  const [checked, setChecked] = React.useState([0])

  if (!params.id) {
    return <NoListSelected />
  }
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
    <Container>
      <Query
        variables={{ id: params.id }}
        query={gql`
          query TaskList($id: String!) {
            taskList(id: $id) {
              id
              title
              tasks {
                id
                title
                notes
              }
            }
          }
        `}
      >
        {({ loading, error, data }) => {
          if (loading) return <NoListSelected>Loading...</NoListSelected>
          if (error) return <NoListSelected>Error :(</NoListSelected>

          return (
            <Template toolbar="TODO" right={<ListContextMenu />}>
              <ListActionsToolbar />
              <DraggableList
                onDragEnd={() => 0}
                items={data.taskList.tasks.map(({ title, notes, id }) => {
                  const isChecked = checked.indexOf(id) !== -1
                  return {
                    id: id,
                    children: (
                      <>
                        <ListItemIcon>
                          <CompletedCheckbox
                            edge="start"
                            checked={isChecked}
                            tabIndex={-1}
                            disableRipple
                            onClick={handleToggle(id)}
                          />
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <TextField
                              defaultValue={title}
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
                          secondary={notes}
                        />
                        <ListItemSecondaryAction>
                          <IconButton
                            edge="end"
                            aria-label="Task detail"
                            component={TaskDetailLink(id)}
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
          )
        }}
      </Query>
    </Container>
  )
}

export default TasksPage
