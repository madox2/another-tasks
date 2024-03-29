import { DragIndicator } from '@mui/icons-material'
import {
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'

import { DragType, useGlobalState } from '../../state'
import { TaskListsActionButton } from './lists/TaskListActionsButton'
import { taskListPath } from '../../app/routes'
import { useDraggable } from './DNDContext'

export function TaskListItem({
  list,
  lists,
  listItemProps,
  dragHandleProps,
  selected,
}) {
  const [provided] = useDraggable()
  const [dragType] = useGlobalState('dragType')
  const navigate = useNavigate()
  return (
    <ListItem
      disablePadding
      secondaryAction={<TaskListsActionButton list={list} lists={lists} />}
      sx={{
        '.MuiListItemIcon-root': {
          visibility: dragType === DragType.LIST ? 'inherit' : 'hidden',
        },
        '.MuiListItemSecondaryAction-root': {
          visibility: 'hidden',
        },
        '&:hover .MuiListItemIcon-root': {
          visibility: dragType === DragType.TASK ? 'hidden' : 'inherit',
        },
        '&:hover .MuiListItemSecondaryAction-root': {
          visibility: dragType ? 'hidden' : 'inherit',
        },
      }}
      ref={provided.innerRef}
      selected={selected}
      {...provided.draggableProps}
    >
      <ListItemButton onClick={() => navigate(taskListPath(list.id))}>
        <ListItemIcon sx={{ ml: -2.5, mr: -2.5 }}>
          <IconButton {...provided.dragHandleProps} disableRipple>
            <DragIndicator />
          </IconButton>
        </ListItemIcon>
        <ListItemText primary={list.title} />
      </ListItemButton>
    </ListItem>
  )
}
