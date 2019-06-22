import { Mutation, Query } from 'react-apollo'
import { Redirect } from 'react-router-dom'
import { gql } from 'apollo-boost'
import Button from '@material-ui/core/Button'
import React from 'react'

export const CURRENT_USER = gql`
  query CurrentUser {
    currentUser {
      id
      isSignedIn
    }
  }
`

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
        <Button onClick={() => login()} color="primary">
          Login
        </Button>
      )
    }}
  </Mutation>
)

function LoginForm() {
  return (
    <Query query={CURRENT_USER}>
      {({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>
        if (error) return <p>Error :(</p>
        const isSignedIn = data.currentUser && data.currentUser.isSignedIn
        return isSignedIn ? <Redirect to="/app/" /> : <LoginButton />
      }}
    </Query>
  )
}

export default LoginForm
