import { DragHandle } from '@mui/icons-material'
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

import { DragType, useGlobalState } from '../../state'

const items = range(20, 30)

function DroppableWrapper({ value, children, type }) {
  return (
    <Droppable droppableId={`droppable-tasklist-${value}`} type={type}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          style={{
            backgroundColor: snapshot.isDraggingOver ? 'blue' : 'grey',
          }}
          {...provided.droppableProps}
        >
          {children}
          <div style={{ display: 'none' }}>{provided.placeholder}</div>
        </div>
      )}
    </Droppable>
  )
}

function Item({ value, listItemProps, dragHandleProps }) {
  return (
    <ListItem disablePadding key={value} {...listItemProps}>
      <ListItemButton>
        <ListItemIcon>
          <IconButton {...dragHandleProps}>
            <DragHandle />
          </IconButton>
        </ListItemIcon>
        <ListItemText primary={`Item ${value}`} />
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
  const isDraggingTask = dragType === DragType.TASK
  return (
    <>
      <VisibilityGuard visible={isDraggingTask}>
        <List>
          {items.map(value => (
            <DroppableWrapper value={value} key={value} type="TASK">
              <Item value={value} />
            </DroppableWrapper>
          ))}
        </List>
      </VisibilityGuard>
      <VisibilityGuard visible={!isDraggingTask}>
        <DroppableWrapper value="droppable-tasklist-x" type="LIST">
          <List>
            {items.map((value, index) => (
              <Draggable
                draggableId={`draggable-tasklist-${value}`}
                index={index}
                key={value}
              >
                {(provided, snapshot) => (
                  <Item
                    value={value}
                    listItemProps={{
                      ref: provided.innerRef,
                      ...provided.draggableProps,
                    }}
                    dragHandleProps={provided.dragHandleProps}
                  />
                )}
              </Draggable>
            ))}
          </List>
        </DroppableWrapper>
      </VisibilityGuard>
    </>
  )
}
