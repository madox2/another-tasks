import { isObject } from 'lodash'
import { useTheme } from '@material-ui/core/styles'
import BackIcon from '@material-ui/icons/ArrowBack'
import IconButton from '@material-ui/core/IconButton'
import React from 'react'
import Typography from '@material-ui/core/Typography'

import { ContactLink, TermsLink, WelcomeLink } from '../../components/Link'
import { Divider } from '../../components/Divider'
import SignInButton from './login/SignInButton'
import logo from '../../resources/logo.png'

function FooterItem({ label, link, target = '_self', ...other }) {
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
        {...other}
      >
        {label}
      </LinkComponent>
    </span>
  )
}

export default function({ children, index, ...other }) {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          padding: 20,
          paddingBottom: 0,
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <img src={logo} style={{ height: 35 }} alt="logo" />
        <SignInButton />
      </div>
      <div style={{ flex: 1, padding: 20 }}>
        {!index && (
          <IconButton component={WelcomeLink}>
            <BackIcon />
          </IconButton>
        )}
        <Divider size={10} />
        <div {...other}>{children}</div>
      </div>
      <footer style={{ padding: 20 }}>
        <Typography paragraph style={{ margin: 0 }}>
          <FooterItem label="Contact" link={ContactLink} />
          <FooterItem label="Privacy Policy" link={TermsLink} />
          <span style={{ float: 'right' }}>
            <FooterItem
              label="©2019 madox2"
              link="https://madox2.poriadne.sk"
              target="_blank"
              rel="noopener noreferrer"
            />
          </span>
        </Typography>
      </footer>
    </div>
  )
}
