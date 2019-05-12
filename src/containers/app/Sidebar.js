import { Droppable } from 'react-beautiful-dnd'
import { Query } from 'react-apollo'
import { gql } from 'apollo-boost'
import { withRouter } from 'react-router-dom'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import ListSubheader from '@material-ui/core/ListSubheader'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import MoreIcon from '@material-ui/icons/MoreVert'
import React from 'react'

import { TaskListLink } from '../../components/Link'
import AddTaskListButton from './taskLists/AddTaskListButton'

let hackToPreventIdCollisions = 1

const isSelected = (match, id) =>
  match.path === '/app/list/:listId' && id === match.params.listId

export const TASK_LISTS = gql`
  {
    taskLists {
      id
      title
    }
  }
`

function Sidebar({ match }) {
  const [anchorEl, setAnchorEl] = React.useState(null)
  function handleActionsClick(event) {
    setAnchorEl(event.currentTarget)
  }
  function handleActionsClose() {
    setAnchorEl(null)
  }
  return (
    <Query query={TASK_LISTS}>
      {({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>
        if (error) return <p>Error :(</p>

        return (
          <List>
            <ListSubheader>Task lists</ListSubheader>
            {data.taskLists.map(({ title, id }, index) => (
              <Droppable
                key={id}
                droppableId={`tasklist-${hackToPreventIdCollisions++}-${index}`}
              >
                {(provided, snapshot) => (
                  <div ref={provided.innerRef}>
                    <div style={{ visibility: 'hidden', height: 0 }}>
                      {provided.placeholder}
                    </div>
                    <ListItem
                      selected={isSelected(match, id)}
                      style={{
                        cursor: 'pointer',
                        backgroundColor: snapshot.isDraggingOver
                          ? 'rgb(235,235,235)'
                          : undefined,
                      }}
                      component={TaskListLink(id)}
                      button
                    >
                      <ListItemText primary={title} />
                      <ListItemSecondaryAction>
                        <IconButton
                          edge="end"
                          aria-label="List actions"
                          onClick={handleActionsClick}
                        >
                          <MoreIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  </div>
                )}
              </Droppable>
            ))}
            <AddTaskListButton />
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleActionsClose}
            >
              <MenuItem onClick={handleActionsClose}>Rename list</MenuItem>
              <MenuItem onClick={handleActionsClose}>Delete list</MenuItem>
            </Menu>
          </List>
        )
      }}
    </Query>
  )
}

export default withRouter(Sidebar)
