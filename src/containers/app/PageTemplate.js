import { isObject } from 'lodash'
import { useTheme } from '@material-ui/core/styles'
import BackIcon from '@material-ui/icons/ArrowBack'
import IconButton from '@material-ui/core/IconButton'
import React from 'react'
import Typography from '@material-ui/core/Typography'

import { ContactLink, TermsLink, WelcomeLink } from '../../components/Link'
import { Divider } from '../../components/Divider'

function FooterItem({ label, link, target = '_self' }) {
  const theme = useTheme()
  const LinkComponent = isObject(link) ? link : 'a'
  return (
    <span
      style={{
        marginRight: 15,
      }}
    >
      <LinkComponent
        href={link}
        target={target}
        style={{
          color: theme.palette.primary.main,
          textDecoration: 'none',
        }}
      >
        {label}
      </LinkComponent>
    </span>
  )
}

export default function({ children, index }) {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div style={{ flex: 1, padding: 20 }}>
        {!index && (
          <IconButton component={WelcomeLink}>
            <BackIcon />
          </IconButton>
        )}
        <Divider size={10} />
        <div style={{ textAlign: 'center' }}>{children}</div>
      </div>
      <footer style={{ padding: 20 }}>
        <Typography paragraph style={{ margin: 0 }}>
          <FooterItem label="Contact" link={ContactLink} />
          <FooterItem label="Terms of use" link={TermsLink} />
          <span style={{ float: 'right' }}>
            <FooterItem
              label="©2019 madox2"
              link="https://madox2.poriadne.sk"
              target="_blank"
            />
          </span>
        </Typography>
      </footer>
    </div>
  )
}
