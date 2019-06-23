import { gql } from 'apollo-boost'

export const TASK = gql`
  query Task($listId: String!, $id: String!) {
    task(listId: $listId, id: $id) {
      id
      title
      notes
      due
      status
    }
  }
`
