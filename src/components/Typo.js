import React from 'react'
import Typography from '@material-ui/core/Typography'

import { Divider } from '../components/Divider'

export const Header = ({ children }) => (
  <>
    <Typography variant="h4" style={{ textAlign: 'center' }}>
      {children}
    </Typography>
    <Divider size={40} />
  </>
)

export const SubHeader = ({ children }) => (
  <>
    <Typography variant="h6">{children}</Typography>
    <Divider size={10} />
  </>
)

export const Paragraph = ({ children }) => (
  <Typography paragraph>{children}</Typography>
)
