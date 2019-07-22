import React from 'react'

import { Header, Paragraph } from '../components/Typo'
import PageTemplate from './app/PageTemplate'

export default () => (
  <PageTemplate style={{ textAlign: 'center' }}>
    <Header>Contact</Header>
    <Paragraph>
      Have you experienced a bug or do you have an improvement idea? Contact me
      with any kind of feecback at:
    </Paragraph>
    <Paragraph>mx.bielik@gmail.com</Paragraph>
  </PageTemplate>
)
