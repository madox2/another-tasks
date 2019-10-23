import { useTheme } from '@material-ui/core/styles'
import React from 'react'

import { ContactLink } from '../components/Link'
import { Divider } from '../components/Divider'
import { Header, Paragraph, SubHeader } from '../components/Typo'
import { isTasksHost } from '../app/routes'
import LoginRedirect from './app/login/LoginRedirect'
import PageTemplate from './app/PageTemplate'
import demo from '../resources/demo-min.png'

const Section = props => (
  <div>
    <SubHeader>{props.title}</SubHeader>
    <Divider size={10} />
    <Paragraph>{props.children}</Paragraph>
    <Divider size={10} />
  </div>
)

export default () => {
  const theme = useTheme()
  return (
    <LoginRedirect shouldRedirect={isTasksHost}>
      <PageTemplate index>
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
            <Header>Another Tasks</Header>

            <Section title="Web interface for Google Tasks">
              Another Tasks is a simple TODO list application that uses Google
              Tasks API to store the data. You can create and manage the tasks
              here and they will be available in all google services like
              calendar, etc.
            </Section>

            <div
              style={{
                margin: '50px 0',
                border: '1px solid rgba(0, 0, 0, 0.1)',
              }}
            >
              <img src={demo} alt="tasks demo" style={{ width: '100%' }} />
            </div>

            <Section title="Motivation">
              As the Google shut down Canvas interface for Google Tasks in early
              2019, it didn't provide any full-screen alternative for desktop
              users. Therefore I have decided to create this web app for the
              users that are missing the Canvas and don't feel confortable with
              it's replacement (GMail task addon).
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
              If you have experienced a bug or have any improvement ideas, don't
              hesitate to{' '}
              <ContactLink
                style={{
                  color: theme.palette.primary.main,
                  textDecoration: 'none',
                }}
              >
                contact
              </ContactLink>{' '}
              me.
            </Section>
          </div>
        </div>
      </PageTemplate>
    </LoginRedirect>
  )
}
