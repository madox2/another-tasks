import { Query } from 'react-apollo'
import React from 'react'

import DefaultError from '../../../components/DefaultError'
import GlobalLoadingIndicator from './GlobalLoadingIndicator'

export function LoadableQuery({ loadingDataGuard = false, ...props }) {
  return (
    <Query {...props}>
      {(result) => {
        if (result.loading) {
          return (
            <>
              <GlobalLoadingIndicator />
              {!loadingDataGuard && props.children(result)}
            </>
          )
        }
        if (result.error) {
          return <DefaultError />
        }
        return props.children(result)
      }}
    </Query>
  )
}
