import { Query } from 'react-apollo'
import { Redirect } from 'react-router-dom'
import React, { useEffect, useState } from 'react'

import { CURRENT_USER } from '../../../queries/loginQueries'
import logo from '../../../resources/logo.png'

const Indicator = () => {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShow(true)
    }, 1500)
    return () => {
      clearTimeout(timeout)
    }
  })
  return (
    show && (
      <div className="AppLoading">
        <img src={logo} style={{ height: 35 }} alt="logo" />
      </div>
    )
  )
}

export default function LoginRedirect({ shouldRedirect = true, children }) {
  return (
    <Query query={CURRENT_USER}>
      {({ loading, error, data }) => {
        if (!shouldRedirect || error) {
          return children
        }
        if (loading) return <Indicator />
        const isSignedIn = data.currentUser && data.currentUser.isSignedIn
        if (!isSignedIn) {
          return children
        }
        return <Redirect to="/app/" />
      }}
    </Query>
  )
}
