import {
  AppBar,
  Box,
  Divider,
  Drawer,
  Toolbar,
  Typography,
} from '@mui/material'
import { Outlet } from 'react-router-dom'

import { Sidebar } from './Sidebar'

const drawerWidth = 250

export function AppTemplate({ children }) {
  return (
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
  )
}
