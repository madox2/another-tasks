import { Mutation, Query } from 'react-apollo'
import { Redirect } from 'react-router-dom'
import { gql } from 'apollo-boost'
import Button from '@material-ui/core/Button'
import React from 'react'

import { CURRENT_USER } from '../../../queries/loginQueries'
import DefaultError from '../../../components/DefaultError'
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
    <Query query={CURRENT_USER}>
      {({ loading, error, data }) => {
        if (loading) return null
        if (error) return <DefaultError />
        const isSignedIn = data.currentUser && data.currentUser.isSignedIn
        return isSignedIn ? <Redirect to="/app/" /> : <LoginButton />
      }}
    </Query>
  )
}

export default LoginForm
