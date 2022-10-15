import { DragHandle, ReadMore } from '@mui/icons-material'
import {
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material'

import { DragType } from '../state'
import {
  DraggableProvider,
  DroppableProvider,
  useDraggable,
  useDroppable,
} from './components/DNDContext'
import { useTaskList } from '../app/api'

function TaskItem({ task }) {
  const [provided] = useDraggable()
  return (
    <ListItem
      secondaryAction={
        <IconButton edge="end">
          <ReadMore />
        </IconButton>
      }
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
        <ListItemText primary={task.title} />
      </ListItemButton>
    </ListItem>
  )
}

function TaskItemList({ children }) {
  const [provided, snapshot] = useDroppable()
  return (
    <List
      ref={provided.innerRef}
      style={{
        backgroundColor: snapshot.isDraggingOver ? 'blue' : 'grey',
      }}
      {...provided.droppableProps}
    >
      {children}
      {provided.placeholder}
    </List>
  )
}

export function TasksPage() {
  const [tasks] = useTaskList('TODO')
  return (
    <DroppableProvider droppableId={`droppable-task`} type={DragType.TASK}>
      <TaskItemList>
        {tasks?.map((task, index) => (
          <DraggableProvider
            draggableId={`draggable-task-${task.id}`}
            index={index}
            key={task.id}
          >
            <TaskItem task={task} />
          </DraggableProvider>
        ))}
      </TaskItemList>
    </DroppableProvider>
  )
}
