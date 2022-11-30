import { AppBar, Box, Button, Divider, Drawer, Toolbar } from '@mui/material'
import { Outlet, Navigate } from 'react-router-dom'

import { Logo } from './Logo'
import { Sidebar } from './Sidebar'
import { TaskDragDropContext } from './TaskDragDropContext'
import { routes } from '../../app/routes'
import { useCurrentUser, useLogoutMutation } from '../../app/api/auth'

const drawerWidth = 250

export function AppTemplate({ children }) {
  const currentUserQuery = useCurrentUser()
  const logout = useLogoutMutation()

  if (currentUserQuery.isLoading) {
    return null
  }
  if (!currentUserQuery.data?.isSignedIn) {
    return <Navigate to={routes.index} />
  }

  return (
    <TaskDragDropContext>
      <Box>
        <Drawer
          variant="permanent"
          open
          PaperProps={{ sx: { width: drawerWidth } }}
        >
          <Toolbar>
            <Logo />
            <Box flexGrow={1} />
          </Toolbar>
          <Divider />
          <Sidebar />
        </Drawer>
        <Box display="flex" ml={`${drawerWidth}px`}>
          <AppBar component="nav">
            <Toolbar>
              <Box flexGrow={1} />
              <Button color="inherit" onClick={logout.mutate}>
                Logout
              </Button>
            </Toolbar>
          </AppBar>
          <Box component="main" flexGrow={1}>
            <Toolbar />
            <Outlet />
          </Box>
        </Box>
      </Box>
    </TaskDragDropContext>
  )
}
