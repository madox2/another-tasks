import { Mutation } from 'react-apollo'
import { gql } from 'apollo-boost'
import AddIcon from '@material-ui/icons/Add'
import ClearCompletedIcon from '@material-ui/icons/VisibilityOff'
import React from 'react'

import { TASK_LIST } from '../../TasksPage'
import FabButton from '../../../components/FabButton'

const ADD_TASK = gql`
  mutation AddTask($listId: String!) {
    addTask(listId: $listId) {
      id
      title
      notes
    }
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
            title: '',
            notes: '',
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
      <FabButton aria-label="Clear completed" Icon={ClearCompletedIcon}>
        Clear completed
      </FabButton>
    </div>
  )
}
