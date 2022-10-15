import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import { DragHandle } from '@mui/icons-material'

import { DragType, useGlobalState } from '../../state'
import {
  DraggableProvider,
  DroppableProvider,
  useDraggable,
  useDroppable,
} from './DNDContext'
import { useTaskLists } from '../../app/api'

function TaskListDroppable({ children, highlighted }) {
  const [provided, snapshot] = useDroppable()
  return (
    <Box
      ref={provided.innerRef}
      sx={{
        backgroundColor:
          highlighted && snapshot.isDraggingOver && 'primary.main',
      }}
      {...provided.droppableProps}
    >
      {children}
      <div style={{ display: 'none' }}>{provided.placeholder}</div>
    </Box>
  )
}

function TaskListItem({ list, listItemProps, dragHandleProps }) {
  const [provided] = useDraggable()
  return (
    <ListItem
      disablePadding
      ref={provided.innerRef}
      {...provided.draggableProps}
    >
      <ListItemButton dense>
        <ListItemIcon>
          <IconButton {...provided.dragHandleProps}>
            <DragHandle />
          </IconButton>
        </ListItemIcon>
        <ListItemText primary={list.title} />
      </ListItemButton>
    </ListItem>
  )
}

function VisibilityGuard({ visible, children }) {
  const style = visible ? undefined : { overflow: 'hidden', height: 0 }
  return <div style={style}>{children}</div>
}

export function Sidebar() {
  const [dragType] = useGlobalState('dragType')
  const [lists] = useTaskLists()
  const isDraggingTask = dragType === DragType.TASK
  return (
    <>
      <VisibilityGuard visible={isDraggingTask}>
        <List>
          {lists?.map(list => (
            <DroppableProvider
              droppableId={`droppable-tasklist-${list.id}`}
              type={DragType.TASK}
              key={list.id}
            >
              <TaskListDroppable highlighted>
                <TaskListItem list={list} />
              </TaskListDroppable>
            </DroppableProvider>
          ))}
        </List>
      </VisibilityGuard>
      <VisibilityGuard visible={!isDraggingTask}>
        <DroppableProvider
          droppableId={`droppable-tasklist-listdrop`}
          type={DragType.LIST}
        >
          <TaskListDroppable>
            <List>
              {lists?.map((list, index) => (
                <DraggableProvider
                  draggableId={`draggable-tasklist-${list.id}`}
                  index={index}
                  key={list.id}
                >
                  <TaskListItem list={list} />
                </DraggableProvider>
              ))}
            </List>
          </TaskListDroppable>
        </DroppableProvider>
      </VisibilityGuard>
    </>
  )
}
