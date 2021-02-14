import { Mutation, useMutation } from 'react-apollo'
import { gql } from 'apollo-boost'
import React from 'react'

import { LoadableMutation } from '../containers/app/common/LoadableMutation'
import { TASK_LIST } from './taskListsQueries'
import {
  isTaskOptimistic,
  makeTaskOptimisticId,
  storeTaskOptimisticId,
} from '../app/optimisticCache'

export const withMoveToListMutation = (Component) => (props) => (
  <LoadableMutation
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
  </LoadableMutation>
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

export const withUpdateTaskMutation = (Component) => (props) => (
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

export const DELETE_TASK = gql`
  mutation DeleteTask($listId: String!, $id: String!) {
    deleteTask(listId: $listId, id: $id) {
      id
    }
  }
`

export const CLEAR_COMPLETED = gql`
  mutation ClearCompleted($listId: String!) {
    clearCompleted(listId: $listId)
  }
`

export const withMoveTaskMutation = (Component) => (props) => (
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
    editList(listId: $listId, title: $title) {
      id
      title
    }
  }
`

export function useAddTask({ listId }) {
  const [addTask] = useMutation(ADD_TASK, {
    variables: { listId },
  })
  const customAddTask = () => {
    const optimisticId = makeTaskOptimisticId()
    addTask({
      optimisticResponse: {
        __typename: 'Mutation',
        addTask: {
          id: optimisticId,
          title: null,
          notes: null,
          due: null,
          status: 'needsAction',
          __typename: 'Task',
        },
      },
      update: (proxy, { data: { addTask } }) => {
        const data = proxy.readQuery({
          query: TASK_LIST,
          variables: { id: listId },
        })
        if (!isTaskOptimistic(addTask.id)) {
          storeTaskOptimisticId(addTask.id, optimisticId)
        }
        data.taskList.tasks.unshift(addTask)
        proxy.writeQuery({
          query: TASK_LIST,
          variables: { id: listId },
          data,
        })
      },
    })
  }
  return [customAddTask]
}

export function useClearCompleted({ listId }) {
  return useMutation(CLEAR_COMPLETED, {
    variables: { listId },
    optimisticResponse: { __typename: 'Mutation', clearCompleted: true },
    update: (proxy, { data: { clearCompleted } }) => {
      const data = proxy.readQuery({
        query: TASK_LIST,
        variables: { id: listId },
      })
      data.taskList.tasks = data.taskList.tasks.filter(
        (t) => t.status !== 'completed',
      )
      proxy.writeQuery({
        query: TASK_LIST,
        variables: { id: listId },
        data,
      })
    },
  })
}
