import { Box, List } from '@mui/material'
import { useParams } from 'react-router-dom'

import { DragType, useGlobalState } from '../../state'
import {
  DraggableProvider,
  DroppableProvider,
  useDroppable,
} from './DNDContext'
import { TaskListAddButton } from './lists/TaskListAddButton'
import { TaskListItem } from './TaskListItem'
import { Toolbox } from './Toolbox'
import { useSortedLists } from '../hooks/useSortedLists'
import { useTaskLists } from '../../app/api/tasks'
import { useThemeUtils } from '../../utils/themeUtils'

function TaskListDroppable({ children, highlighted }) {
  const [provided, snapshot] = useDroppable()
  return (
    <Box
      ref={provided.innerRef}
      sx={{
        backgroundColor:
          highlighted && snapshot.isDraggingOver && 'primary.light',
      }}
      {...provided.droppableProps}
    >
      {children}
      <div style={{ display: 'none' }}>{provided.placeholder}</div>
    </Box>
  )
}

function VisibilityGuard({ visible, children }) {
  const style = visible ? undefined : { overflow: 'hidden', height: 0 }
  return <div style={style}>{children}</div>
}

export function Sidebar() {
  const { listId } = useParams()
  const [dragType] = useGlobalState('dragType')
  const { data: rawLists } = useTaskLists()
  const lists = useSortedLists(rawLists)
  const { scrollContentHeight } = useThemeUtils()
  const isDraggingTask = dragType === DragType.TASK
  return (
    <>
      <Toolbox>
        <TaskListAddButton />
      </Toolbox>
      <Box height={scrollContentHeight} overflow="scroll">
        <VisibilityGuard visible={isDraggingTask}>
          <List>
            {lists?.map(list => (
              <DroppableProvider
                droppableId={`droppable-tasklist-${list.id}`}
                type={DragType.TASK}
                key={list.id}
              >
                <TaskListDroppable highlighted>
                  <TaskListItem list={list} selected={list.id === listId} />
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
                    <TaskListItem
                      list={list}
                      lists={lists}
                      selected={list.id === listId}
                    />
                  </DraggableProvider>
                ))}
              </List>
            </TaskListDroppable>
          </DroppableProvider>
        </VisibilityGuard>
      </Box>
    </>
  )
}
