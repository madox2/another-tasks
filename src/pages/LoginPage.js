import { Box, Button } from '@mui/material'
import { OpenInNew } from '@mui/icons-material'
import { Link as RouterLink } from 'react-router-dom'

import { routes } from '../app/routes'

export function LoginPage() {
  return (
    <Box textAlign="center">
      <Button variant="contained" component={RouterLink} to={routes.app}>
        <OpenInNew sx={{ marginRight: 1 }} />
        Login with Google
      </Button>
    </Box>
  )
}
