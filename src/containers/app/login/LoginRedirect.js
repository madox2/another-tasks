import { Query } from 'react-apollo'
import { Redirect } from 'react-router-dom'
import React, { useEffect, useState } from 'react'

import { CURRENT_USER } from '../../../queries/loginQueries'

const Postponed = ({ children, delay }) => {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShow(true)
    }, delay)
    return () => {
      clearTimeout(timeout)
    }
  }, []) // eslint-disable-line
  return show && children
}

export default function LoginRedirect({ shouldRedirect = true, children }) {
  return (
    <Query query={CURRENT_USER}>
      {({ loading, error, data }) => {
        if (!shouldRedirect || error) {
          return children
        }
        if (loading) return <Postponed delay={1500}>{children}</Postponed>
        const isSignedIn = data.currentUser && data.currentUser.isSignedIn
        if (!isSignedIn) {
          return children
        }
        return <Redirect to="/app/" />
      }}
    </Query>
  )
}
