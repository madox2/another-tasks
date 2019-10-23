import React from 'react'

import { Header, Paragraph } from '../components/Typo'
import LoginForm from './app/login/LoginForm'
import LoginRedirect from './app/login/LoginRedirect'
import PageTemplate from './app/PageTemplate'

export default () => (
  <LoginRedirect>
    <PageTemplate style={{ textAlign: 'center' }}>
      <Header>Sign in</Header>
      <Paragraph>
        In order to use Another Tasks, you need to authorize it with Google:
      </Paragraph>

      <LoginForm />
    </PageTemplate>
  </LoginRedirect>
)
