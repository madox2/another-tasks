import React from 'react'
import Typography from '@material-ui/core/Typography'

import { Divider } from '../components/Divider'
import PageTemplate from './app/PageTemplate'

export default () => (
  <PageTemplate>
    <Typography variant="h4">Contact</Typography>
    <Divider size={20} />
    <Typography paragraph>
      Have you experienced a bug or do you have an improvement idea? Contact me
      with any kind of feecback at:
    </Typography>
    <Typography paragraph>mx.bielik(at)gmail.com</Typography>
  </PageTemplate>
)
