import { Query } from 'react-apollo'
import { Redirect } from 'react-router-dom'
import React from 'react'

import { CURRENT_USER } from '../../../queries/loginQueries'
import { isRootHost } from '../../../app/routes'

export default function LoginRedirect({ shouldRedirect = true }) {
  return (
    <Query query={CURRENT_USER}>
      {({ loading, error, data }) => {
        if (loading || error) return null
        const isSignedIn = data.currentUser && data.currentUser.isSignedIn
        if (!shouldRedirect || !isSignedIn) {
          return null
        }
        if (isRootHost) {
          window.location.href = 'https://tasks.anothertasks.com/app/'
          return null
        }
        return <Redirect to="/app/" />
      }}
    </Query>
  )
}
