import { Mutation } from 'react-apollo'
import { gql } from 'apollo-boost'
import IconButton from '@material-ui/core/IconButton'
import LogoutIcon from '@material-ui/icons/PowerSettingsNew'
import React from 'react'

export const LogoutButton = () => (
  <Mutation
    mutation={gql`
      mutation Logout {
        logout {
          id
          isSignedIn
        }
      }
    `}
  >
    {(logout, { data }) => {
      return (
        <IconButton color="inherit" aria-label="Logout" onClick={logout}>
          <LogoutIcon />
        </IconButton>
      )
    }}
  </Mutation>
)
