import { gql } from 'apollo-boost'

export const CURRENT_USER = gql`
  query CurrentUser {
    currentUser {
      id
      isSignedIn
    }
  }
`
