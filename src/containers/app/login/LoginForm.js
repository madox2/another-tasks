import { Mutation } from 'react-apollo'
import { gql } from 'apollo-boost'
import Button from '@material-ui/core/Button'
import React from 'react'

import LoginRedirect from './LoginRedirect'
import googleIcon from '../../../resources/icon_google.svg'

const iconStyle = {
  height: 40,
  width: 'auto',
  position: 'absolute',
  left: 0,
  top: -2,
}

const GoogleIcon = () => <img src={googleIcon} alt="google" style={iconStyle} />

const LoginButton = () => (
  <Mutation
    mutation={gql`
      mutation Login {
        login {
          id
          isSignedIn
        }
      }
    `}
  >
    {(login, { data }) => {
      return (
        <Button onClick={() => login()} color="default" variant="contained">
          <GoogleIcon />
          <span
            style={{
              color: '#2d2d2d',
              textTransform: 'none',
              paddingLeft: 30,
            }}
          >
            Sign in with Google
          </span>
        </Button>
      )
    }}
  </Mutation>
)

function LoginForm() {
  return (
    <>
      <LoginRedirect>
        <LoginButton />
      </LoginRedirect>
    </>
  )
}

export default LoginForm
