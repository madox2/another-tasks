import { Box, Link, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'

import { routes } from '../app/routes'
import demo from '../resources/demo-min.png'

const Section = props => (
  <Box mt={5}>
    <Typography variant="h2" mb={3}>
      {props.title}
    </Typography>
    <Typography paragraph>{props.children}</Typography>
  </Box>
)

export function WelcomePage() {
  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Box maxWidth="800px" textAlign="center" pt={3}>
        <Typography variant="h1">Another Tasks</Typography>

        <Section title="Web interface for Google Tasks">
          Another Tasks is a simple TODO list application that uses Google Tasks
          API to store the data. You can create and manage your tasks here and
          they will be available in all google services like calendar, etc.
        </Section>

        <Box
          style={{
            margin: '50px 0',
            border: '1px solid rgba(0, 0, 0, 0.1)',
          }}
        >
          <img src={demo} alt="tasks demo" style={{ width: '100%' }} />
        </Box>

        <Section title="Motivation">
          As Google shut down Canvas interface for Google Tasks in early 2019,
          they didn't provide any full-screen alternative for desktop users.
          Therefore I have decided to create this web app for the users that are
          missing the Canvas and don't feel confortable with it's replacement
          (GMail task addon).
        </Section>

        <Section title="What's on the roadmap?">
          Some features are currently missing but planned to be added:
          <p>
            <ul
              style={{
                textAlign: 'left',
                display: 'inline-block',
                margin: 0,
                padding: 0,
              }}
            >
              <li>Keyboard shortcuts + documentation</li>
              <li>Sorting tasks</li>
              <li>Subtasks support</li>
            </ul>
          </p>
          If you have experienced a bug or have any improvement ideas, don't
          hesitate to{' '}
          <Link component={RouterLink} to={routes.contact}>
            contact
          </Link>{' '}
          me.
        </Section>
      </Box>
    </Box>
  )
}
