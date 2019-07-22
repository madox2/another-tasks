import Button from '@material-ui/core/Button'
import React from 'react'

import { LoginLink } from '../../../components/Link'

function SignInButton() {
  return (
    <Button color="primary" component={LoginLink}>
      Sign in
    </Button>
  )
}

export default SignInButton
