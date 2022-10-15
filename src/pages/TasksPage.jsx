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

import { DragType } from '../state'
import { useTaskList } from '../app/api'

function TaskItem({ task, dragHandleProps, listItemProps }) {
  return (
    <ListItem
      secondaryAction={
        <IconButton edge="end">
          <ReadMore />
        </IconButton>
      }
      disablePadding
      {...listItemProps}
    >
      <ListItemButton dense>
        <ListItemIcon>
          <IconButton {...dragHandleProps}>
            <DragHandle />
          </IconButton>
        </ListItemIcon>
        <ListItemText primary={task.title} />
      </ListItemButton>
    </ListItem>
  )
}

function TaskItemDraggable({ id, index, children }) {
  return (
    <Draggable draggableId={`draggable-task-${id}`} index={index}>
      {(provided, snapshot) => children(provided, snapshot)}
    </Draggable>
  )
}

function TaskItemDroppable({ children }) {
  return (
    <Droppable droppableId={`droppable-task`} type={DragType.TASK}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          style={{
            backgroundColor: snapshot.isDraggingOver ? 'blue' : 'grey',
          }}
          {...provided.droppableProps}
        >
          {children}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  )
}

export function TasksPage() {
  const [tasks] = useTaskList('TODO')
  return (
    <TaskItemDroppable>
      <List>
        {tasks?.map((task, index) => (
          <TaskItemDraggable id={task.id} index={index} key={task.id}>
            {(provided, snapshot) => (
              <TaskItem
                task={task}
                dragHandleProps={provided.dragHandleProps}
                listItemProps={{
                  ref: provided.innerRef,
                  ...provided.draggableProps,
                }}
              />
            )}
          </TaskItemDraggable>
        ))}
      </List>
    </TaskItemDroppable>
  )
}
