import React from 'react'
import Typography from '@material-ui/core/Typography'

import { Divider } from '../components/Divider'
import PageTemplate from './app/PageTemplate'

export default () => (
  <PageTemplate>
    <Typography variant="h4">Terms of use</Typography>
    <Divider size={20} />
    <Typography paragraph>Comming soon...</Typography>
    <Divider size={20} />
    <Typography variant="h6">In short</Typography>
    <Divider size={10} />
    <Typography paragraph>
      This application does not store any personal data. It only collects
      anonynous data about the site traffic and usage.
    </Typography>
  </PageTemplate>
)
