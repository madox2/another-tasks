import { DragDropContext } from 'react-beautiful-dnd'
import { Query } from 'react-apollo'
import { gql } from 'apollo-boost'
import BackIcon from '@material-ui/icons/ArrowBack'
import DeleteIcon from '@material-ui/icons/Delete'
import React from 'react'

import { TaskListLink } from '../components/Link'
import TaskForm from './app/tasks/TaskForm'
import Template from './app/Template'
import ToolbarButton from '../components/ToolbarButton'

export const TASK = gql`
  query Task($listId: String!, $id: String!) {
    task(listId: $listId, id: $id) {
      id
      title
      notes
      due
    }
  }
`

export default function TaskDetailPage({ match: { params }, history }) {
  return (
    <DragDropContext>
      <Template
        toolbar={
          <ToolbarButton
            component={TaskListLink(params.listId)}
            Icon={BackIcon}
          />
        }
        right={
          <ToolbarButton
            component={TaskListLink(params.listId)}
            Icon={DeleteIcon}
          />
        }
      >
        <Query
          query={TASK}
          variables={{ id: params.taskId, listId: params.listId }}
        >
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>
            if (error) return <p>Error :(</p>
            return <TaskForm data={data} listId={params.listId} />
          }}
        </Query>
      </Template>
    </DragDropContext>
  )
}
