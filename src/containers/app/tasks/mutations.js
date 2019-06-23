import { Mutation } from 'react-apollo'
import { gql } from 'apollo-boost'
import { throttle } from 'lodash'
import React, { useEffect, useState } from 'react'

export const mutateMoveToList = (moveToList, { listId, id, targetListId }) =>
  moveToList({
    variables: { listId, id, targetListId },
    optimisticResponse: {
      __typename: 'Mutation',
      moveToList: true,
    },
    update: (proxy, { data: { moveTask } }) => {
      const data = proxy.readQuery({
        query: TASK_LIST,
        variables: { id: listId },
      })
      data.taskList.tasks = data.taskList.tasks.filter(t => t.id !== id)
      proxy.writeQuery({
        query: TASK_LIST,
        variables: { id: listId },
        data,
      })
    },
    refetchQueries: [
      {
        query: TASK_LIST,
        variables: { id: targetListId },
      },
      {
        query: TASK_LIST,
        variables: { id: listId },
      },
    ],
  })

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

const update = (updateTask, { title, notes, due, listId, id, status }) =>
  updateTask({
    variables: { title, notes, due, listId, id, status },
    optimisticResponse: {
      __typename: 'Mutation',
      updateTask: {
        id: id,
        __typename: 'Task',
        title,
        notes,
        due,
        status,
      },
    },
  })

const throttledUpdate = throttle(update, 500, { leading: false })

export function useUpdateTaskEffect(updateTask, task) {
  const { title, notes, due, listId, id, status } = task
  const [shouldUpdate, setShouldUpdate] = useState(false)
  useEffect(() => {
    if (!shouldUpdate) {
      // skip first update
      setShouldUpdate(true)
      return
    }
    throttledUpdate(updateTask, { title, notes, due, listId, id, status })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, notes, due, status])
}

export const withUpdateTaskMutation = Component => props => (
  <Mutation mutation={UPDATE_TASK}>
    {(updateTask, { data }) => <Component {...props} updateTask={updateTask} />}
  </Mutation>
)

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
