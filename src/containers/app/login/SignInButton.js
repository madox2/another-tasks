import { Query } from 'react-apollo'
import Button from '@material-ui/core/Button'
import React from 'react'

import { CURRENT_USER } from '../../../queries/loginQueries'
import { LoginLink } from '../../../components/Link'

function SignInButton() {
  return (
    <Query query={CURRENT_USER}>
      {({ loading, error, data }) => {
        if (loading || error) return null
        const isSignedIn = data.currentUser && data.currentUser.isSignedIn
        if (isSignedIn) {
          return (
            <Button color="primary" component={LoginLink}>
              Open tasks
            </Button>
          )
        }
        return (
          <Button color="primary" component={LoginLink}>
            Sign in
          </Button>
        )
      }}
    </Query>
  )
}

export default SignInButton
