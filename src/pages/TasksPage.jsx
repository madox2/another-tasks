import {
  Checkbox,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField,
} from '@mui/material'
import { DragIndicator } from '@mui/icons-material'

import { DragType, useGlobalState } from '../state'
import {
  DraggableProvider,
  DroppableProvider,
  useDraggable,
  useDroppable,
} from './components/DNDContext'
import { useTaskList } from '../app/api'

function TaskItem({ task }) {
  const [provided] = useDraggable()
  const [dragType] = useGlobalState('dragType')
  return (
    <ListItem
      disablePadding
      sx={{
        '.MuiListItemIcon-root': {
          visibility: dragType === DragType.TASK ? 'inherit' : 'hidden',
        },
        '&:hover .MuiListItemIcon-root': {
          visibility: dragType === DragType.LIST ? 'hidden' : 'inherit',
        },
      }}
      ref={provided.innerRef}
      {...provided.draggableProps}
    >
      <ListItemButton
        disableRipple
        sx={{
          '&.Mui-focusVisible': { bgcolor: 'transparent' },
        }}
      >
        <ListItemIcon sx={{ ml: -2, mr: -2 }}>
          <IconButton {...provided.dragHandleProps} disableRipple>
            <DragIndicator />
          </IconButton>
        </ListItemIcon>
        <Checkbox />
        <TextField
          variant="standard"
          defaultValue={task.title}
          sx={{
            width: '100%',
            ml: 2,
            '.MuiInputBase-root::before': { borderBottom: 'none !important' },
          }}
        />
      </ListItemButton>
    </ListItem>
  )
}

function TaskItemList({ children }) {
  const [provided] = useDroppable()
  return (
    <List ref={provided.innerRef} {...provided.droppableProps}>
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
