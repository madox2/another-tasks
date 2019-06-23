import { Mutation } from 'react-apollo'
import React, { useContext } from 'react'

import { LoadingConext } from './LoadingContext'

export function LoadableMutation(props) {
  const { putLoading, clearLoading } = useContext(LoadingConext)
  return (
    <Mutation {...props}>
      {(mutate, result) => {
        const enhanced = (...args) => {
          putLoading()
          return mutate(...args)
            .then(result => {
              clearLoading()
              return result
            })
            .catch(err => {
              clearLoading()
              throw err
            })
        }
        return props.children(enhanced, result)
      }}
    </Mutation>
  )
}
