import {
  AppBar,
  Box,
  Divider,
  Drawer,
  Toolbar,
  Typography,
} from '@mui/material'
import { DragDropContext } from 'react-beautiful-dnd'
import { Outlet } from 'react-router-dom'

import { DragType, useGlobalState } from '../../state'
import { Sidebar } from './Sidebar'

const drawerWidth = 250

export function AppTemplate({ children }) {
  const [, setDragType] = useGlobalState('dragType')
  return (
    <DragDropContext
      onBeforeDragStart={({ draggableId }) => {
        setDragType(
          draggableId.startsWith('draggable-task-')
            ? DragType.TASK
            : DragType.LIST
        )
      }}
      onDragEnd={(...args) => {
        setDragType(null)
      }}
    >
      <Box>
        <Drawer
          variant="permanent"
          open
          PaperProps={{ sx: { width: drawerWidth } }}
        >
          <Toolbar>
            <Typography variant="h6" component="div" flexGrow={1}>
              Tasks
            </Typography>
          </Toolbar>
          <Divider />
          <Sidebar />
        </Drawer>
        <Box display="flex" ml={`${drawerWidth}px`}>
          <AppBar component="nav">
            <Toolbar />
          </AppBar>
          <Box component="main" flexGrow={1}>
            <Toolbar />
            <Outlet />
          </Box>
        </Box>
      </Box>
    </DragDropContext>
  )
}
