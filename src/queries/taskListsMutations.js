import { gql } from 'apollo-boost'

export const ADD_LIST = gql`
  mutation AddList($title: String!) {
    addList(title: $title) {
      id
      title
    }
  }
`
