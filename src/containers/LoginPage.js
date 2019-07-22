import React from 'react'

import { Header, Paragraph } from '../components/Typo'
import LoginForm from './app/login/LoginForm'
import PageTemplate from './app/PageTemplate'

export default () => (
  <PageTemplate style={{ textAlign: 'center' }}>
    <Header>Sign in</Header>
    <Paragraph>
      In order to use Another Tasks, you need to authorize the applicatio with
      Google.
    </Paragraph>

    <LoginForm />
  </PageTemplate>
)
