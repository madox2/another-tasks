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

import { DragType, useGlobalState } from '../../state'
import { useTaskLists } from '../../app/api'

function TaskListItemDroppable({ id, children, type }) {
  return (
    <Droppable droppableId={`droppable-tasklist-${id}`} type={type}>
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

function TaskListItem({ list, listItemProps, dragHandleProps }) {
  return (
    <ListItem disablePadding {...listItemProps}>
      <ListItemButton>
        <ListItemIcon>
          <IconButton {...dragHandleProps}>
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
            <TaskListItemDroppable
              id={list.id}
              key={list.id}
              type={DragType.TASK}
            >
              <TaskListItem list={list} />
            </TaskListItemDroppable>
          ))}
        </List>
      </VisibilityGuard>
      <VisibilityGuard visible={!isDraggingTask}>
        <TaskListItemDroppable id="listdrop" type={DragType.LIST}>
          <List>
            {lists?.map((list, index) => (
              <Draggable
                draggableId={`draggable-tasklist-${list.id}`}
                index={index}
                key={list.id}
              >
                {(provided, snapshot) => (
                  <TaskListItem
                    list={list}
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
        </TaskListItemDroppable>
      </VisibilityGuard>
    </>
  )
}
