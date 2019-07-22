import React from 'react'
import Typography from '@material-ui/core/Typography'

import { Divider } from '../components/Divider'

export const Header = ({ children }) => (
  <>
    <Typography variant="h1" style={{ textAlign: 'center' }}>
      {children}
    </Typography>
    <Divider size={50} />
  </>
)

export const SubHeader = ({ children }) => (
  <>
    <Typography variant="h2">{children}</Typography>
    <Divider size={20} />
  </>
)

export const Paragraph = ({ children }) => (
  <Typography paragraph>{children}</Typography>
)
