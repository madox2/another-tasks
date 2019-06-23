import { ApolloProvider } from 'react-apollo'
import Button from '@material-ui/core/Button'
import { withSnackbar } from 'notistack'
import React, { useEffect, useState } from 'react'

import { makeApolloClient } from '../../../app/apollo'

function CustomApolloProvider({ enqueueSnackbar, closeSnackbar, ...props }) {
  const [client, setClient] = useState(null)
  useEffect(() => {
    const showError = () =>
      enqueueSnackbar('Oops something went wrong try again', {
        variant: 'error',
        action: key => (
          <Button onClick={() => closeSnackbar(key)}>DISMISS</Button>
        ),
      })
    setClient(makeApolloClient({ showError }))
    // eslint-disable-next-line
  }, [])
  return client && <ApolloProvider client={client} {...props} />
}

export default withSnackbar(CustomApolloProvider)
