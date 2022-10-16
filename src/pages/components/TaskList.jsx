import { List } from '@mui/material'

import { DragType } from '../../state'
import {
  DraggableProvider,
  DroppableProvider,
  useDroppable,
} from './DNDContext'
import { TaskItem } from './TaskItem'

function TaskItemList({ children }) {
  const [provided] = useDroppable()
  return (
    <List ref={provided.innerRef} {...provided.droppableProps}>
      {children}
      {provided.placeholder}
    </List>
  )
}

export function TaskList({ tasks, onTaskBlur, onTaskFocus, selectedTask }) {
  return (
    <DroppableProvider droppableId={`droppable-task`} type={DragType.TASK}>
      <TaskItemList>
        {tasks?.map((task, index) => (
          <DraggableProvider
            draggableId={`draggable-task-${task.id}`}
            index={index}
            key={task.id}
          >
            <TaskItem
              task={task}
              onFocus={() => onTaskFocus(task)}
              onBlur={() => onTaskBlur(task)}
              highlighted={task.id === selectedTask?.id}
            />
          </DraggableProvider>
        ))}
      </TaskItemList>
    </DroppableProvider>
  )
}
