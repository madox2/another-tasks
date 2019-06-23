import { gql } from 'apollo-boost'

export const TASK_LIST = gql`
  query TaskList($id: String!) {
    taskList(id: $id) {
      id
      title
      tasks {
        id
        title
        notes
        due
        status
      }
    }
  }
`

export const MINIMAL_TASK_LISTS = gql`
  {
    taskLists {
      id
      title
    }
  }
`
