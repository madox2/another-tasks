import { Mutation } from 'react-apollo'
import { gql } from 'apollo-boost'
import AddIcon from '@material-ui/icons/Add'
import ClearCompletedIcon from '@material-ui/icons/VisibilityOff'
import React from 'react'

import { TASK_LIST } from './mutations'
import FabButton from '../../../components/FabButton'

const ADD_TASK = gql`
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

const CLEAR_COMPLETED = gql`
  mutation ClearCompleted($listId: String!) {
    clearCompleted(listId: $listId)
  }
`

export default function ListActionsToolbar({ listId, onTaskAdd }) {
  return (
    <div>
      <Mutation
        mutation={ADD_TASK}
        variables={{ listId }}
        optimisticResponse={{
          __typename: 'Mutation',
          addTask: {
            id: Date.now() + '',
            title: null,
            notes: null,
            due: null,
            status: 'needsAction',
            __typename: 'Task',
          },
        }}
        update={(proxy, { data: { addTask } }) => {
          const data = proxy.readQuery({
            query: TASK_LIST,
            variables: { id: listId },
          })
          data.taskList.tasks.unshift(addTask)
          proxy.writeQuery({
            query: TASK_LIST,
            variables: { id: listId },
            data,
          })
        }}
      >
        {addTask => (
          <FabButton
            aria-label="Add task"
            Icon={AddIcon}
            onClick={() => {
              addTask().then(() => {
                onTaskAdd()
              })
            }}
          >
            Add task
          </FabButton>
        )}
      </Mutation>
      <Mutation
        mutation={CLEAR_COMPLETED}
        variables={{ listId }}
        optimisticResponse={{
          __typename: 'Mutation',
          clearCompleted: true,
        }}
        update={(proxy, { data: { clearCompleted } }) => {
          const data = proxy.readQuery({
            query: TASK_LIST,
            variables: { id: listId },
          })
          data.taskList.tasks = data.taskList.tasks.filter(
            t => t.status !== 'completed'
          )
          proxy.writeQuery({
            query: TASK_LIST,
            variables: { id: listId },
            data,
          })
        }}
      >
        {clearCompleted => (
          <FabButton
            aria-label="Clear completed"
            Icon={ClearCompletedIcon}
            onClick={clearCompleted}
          >
            Clear completed
          </FabButton>
        )}
      </Mutation>
    </div>
  )
}
