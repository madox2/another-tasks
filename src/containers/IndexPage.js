import React from 'react'
import Typography from '@material-ui/core/Typography'

import { Divider } from '../components/Divider'
import { Paragraph, SubHeader } from '../components/Typo'
import { isTasksHost } from '../app/routes'
import LoginRedirect from './app/login/LoginRedirect'
import PageTemplate from './app/PageTemplate'

const Section = props => (
  <div>
    <SubHeader>{props.title}</SubHeader>
    <Divider size={10} />
    <Paragraph>{props.children}</Paragraph>
    <Divider size={10} />
  </div>
)

export default () => (
  <PageTemplate index>
    <LoginRedirect shouldRedirect={isTasksHost} />
    <div
      style={{
        minHeight: '70vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div style={{ maxWidth: 800, textAlign: 'center' }}>
        <Typography variant="h3">Another Tasks</Typography>
        <Divider size={40} />

        <Section title="Web interface for Google Tasks">
          Another Tasks is a simple TODO list application that uses Google Tasks
          API to store the data. You can create and manage the tasks here and
          they will be available in all google services like calendar, etc.
        </Section>

        <Section title="Motivation">
          As the Google shut down Canvas interface for Google Tasks in early
          2019, it didn't provide any full-screen alternative for desktop users.
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
              <li>PWA</li>
            </ul>
          </p>
        </Section>
      </div>
    </div>
  </PageTemplate>
)
