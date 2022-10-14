import { DragHandle, ReadMore } from '@mui/icons-material'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import {
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import { range } from 'lodash-es'

const items = range(1, 10)

function Item({ value, index }) {
  return (
    <Draggable draggableId={`draggable-task-${value}`} index={index}>
      {(provided, snapshot) => (
        <div ref={provided.innerRef} {...provided.draggableProps}>
          <ListItem
            secondaryAction={
              <IconButton edge="end">
                <ReadMore />
              </IconButton>
            }
            disablePadding
          >
            <ListItemButton dense>
              <ListItemIcon>
                <IconButton {...provided.dragHandleProps}>
                  <DragHandle />
                </IconButton>
              </ListItemIcon>
              <ListItemText primary={`Line item ${value + 1}`} />
            </ListItemButton>
          </ListItem>
        </div>
      )}
    </Draggable>
  )
}

export function TasksPage() {
  return (
    <Droppable droppableId={`droppable-task`} type="TASK">
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          style={{
            backgroundColor: snapshot.isDraggingOver ? 'blue' : 'grey',
          }}
          {...provided.droppableProps}
        >
          <List>
            {items.map((value, index) => (
              <Item value={value} index={index} key={value} />
            ))}
          </List>
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  )
}
