import { AppBar, Box, Button, Link, Toolbar, Typography } from '@mui/material'
import { Outlet, Link as RouterLink } from 'react-router-dom'

import { routes } from '../../app/routes'

export function PageTemplate() {
  return (
    <Box display="flex">
      <AppBar component="nav">
        <Toolbar>
          <Typography variant="h6" component="div" flexGrow={1}>
            Tasks
          </Typography>
          <Button color="inherit" component={RouterLink} to={routes.login}>
            Login
          </Button>
        </Toolbar>
      </AppBar>
      <Box component="main" m={2} width="100%">
        <Toolbar />
        <Outlet />
        <Box display="flex" gap={2} mt={2}>
          <Link component={RouterLink} to={routes.contact}>
            Contact
          </Link>
          <Link component={RouterLink} flexGrow={1} to={routes.privacy}>
            Privacy Policy
          </Link>
          <Link href="https://madox2.poriadne.sk" target="_blank">
            ©2019 madox2
          </Link>
        </Box>
      </Box>
    </Box>
  )
}
