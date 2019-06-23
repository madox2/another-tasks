import React from 'react'
import Typography from '@material-ui/core/Typography'

import { Divider } from '../components/Divider'
import LoginForm from './app/login/LoginForm'

export default () => (
  <div
    style={{
      height: '70vh',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <Typography variant="h2">Another tasks (BETA)</Typography>
    <Divider size={20} />
    <Typography paragraph>Desktop web interface for Google Tasks</Typography>
    <LoginForm />
  </div>
)
