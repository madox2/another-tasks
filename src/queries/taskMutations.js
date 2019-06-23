import { Mutation } from 'react-apollo'
import { gql } from 'apollo-boost'
import React from 'react'

export const withMoveToListMutation = Component => props => (
  <Mutation
    mutation={gql`
      mutation MoveToList(
        $id: String!
        $listId: String!
        $targetListId: String!
      ) {
        moveToList(id: $id, listId: $listId, targetListId: $targetListId)
      }
    `}
  >
    {(moveToList, { data }) => <Component {...props} moveToList={moveToList} />}
  </Mutation>
)

const UPDATE_TASK = gql`
  mutation UpdateTask(
    $title: String
    $notes: String
    $due: String
    $status: String
    $id: String
    $listId: String
  ) {
    updateTask(
      title: $title
      notes: $notes
      due: $due
      id: $id
      status: $status
      listId: $listId
    ) {
      id
      title
      notes
      due
      status
    }
  }
`

export const withUpdateTaskMutation = Component => props => (
  <Mutation mutation={UPDATE_TASK}>
    {(updateTask, { data }) => <Component {...props} updateTask={updateTask} />}
  </Mutation>
)

export const ADD_TASK = gql`
  mutation AddTask($listId: String!) {
    addTask(listId: $listId) {
      id
      title
      notes
      due
      status
    }
  }
`

export const CLEAR_COMPLETED = gql`
  mutation ClearCompleted($listId: String!) {
    clearCompleted(listId: $listId)
  }
`

export const withMoveTaskMutation = Component => props => (
  <Mutation
    mutation={gql`
      mutation MoveTask($id: String!, $previousId: String, $listId: String!) {
        moveTask(id: $id, previousId: $previousId, listId: $listId)
      }
    `}
  >
    {(moveTask, { data }) => <Component {...props} moveTask={moveTask} />}
  </Mutation>
)

export const DELETE_LIST = gql`
  mutation DeleteList($listId: String!) {
    deleteList(listId: $listId)
  }
`

export const EDIT_LIST = gql`
  mutation EditList($listId: String!, $title: String) {
    editList(listId: $listId, title: $title)
  }
`
