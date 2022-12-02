import { AppBar, Box, Button, Link, Toolbar } from '@mui/material'
import {
  useNavigate,
  Navigate,
  Outlet,
  Link as RouterLink,
} from 'react-router-dom'

import { Logo } from './Logo'
import { routes } from '../../app/routes'
import { useCurrentUser, useLoginMutation } from '../../app/api/auth'

export function PageTemplate() {
  const navigate = useNavigate()
  const login = useLoginMutation()
  const currentUserQuery = useCurrentUser()

  if (currentUserQuery.isLoading) {
    return null
  }
  if (currentUserQuery.data?.isSignedIn) {
    return <Navigate to={routes.app} />
  }

  return (
    <Box display="flex">
      <AppBar component="nav" style={{ backgroundColor: 'white' }}>
        <Toolbar>
          <RouterLink to="/" style={{ lineHeight: 0 }}>
            <Logo />
          </RouterLink>
          <Box flexGrow={1} />
          <Button
            color="primary"
            component={RouterLink}
            variant="contained"
            onClick={async () => {
              await login.mutateAsync()
              navigate(routes.app)
            }}
          >
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
            ©2022 madox2
          </Link>
        </Box>
      </Box>
    </Box>
  )
}
