import './SidebarTaskListItem.css'

import { useTheme } from '@material-ui/core/styles'
import { Droppable } from 'react-beautiful-dnd'
import IconButton from '@material-ui/core/IconButton'
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import MoreIcon from '@material-ui/icons/MoreVert'
import React from 'react'

import { TaskListLink } from '../../../components/Link'
import ErrorBoundary from '../../../components/ErrorBoundary'

let hackToPreventIdCollisions = 1

const draggingOverStyle = (theme) => ({
  backgroundColor: 'rgb(235,235,235)',
  color: theme.palette.primary.main,
})

export default function SidebarTaskListItem({
  id,
  title,
  handleActionsClick,
  selected,
}) {
  const theme = useTheme()
  return (
    <ErrorBoundary>
      <Droppable
        key={id}
        droppableId={`tasklist-${hackToPreventIdCollisions++}-${id}`}
      >
        {(provided, snapshot) => (
          <div ref={provided.innerRef} className="SidebarTaskListItem">
            <div style={{ visibility: 'hidden', height: 0 }}>
              {provided.placeholder}
            </div>
            <ListItem
              selected={selected}
              style={{
                cursor: 'pointer',
                boxSizing: 'border-box',
                ...(snapshot.isDraggingOver && draggingOverStyle(theme)),
              }}
              component={TaskListLink(id)}
              button
            >
              <ListItemText primary={title} />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  className="SidebarTaskListItem-action"
                  aria-label="List actions"
                  onClick={(e) => handleActionsClick(e, { id, title })}
                >
                  <MoreIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          </div>
        )}
      </Droppable>
    </ErrorBoundary>
  )
}
