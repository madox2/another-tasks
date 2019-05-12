import { DragDropContext } from 'react-beautiful-dnd'
import { Query } from 'react-apollo'
import { gql } from 'apollo-boost'
import BackIcon from '@material-ui/icons/ArrowBack'
import DeleteIcon from '@material-ui/icons/Delete'
import React from 'react'

import TaskForm from './app/tasks/TaskForm'
import Template from './app/Template'
import ToolbarButton from '../components/ToolbarButton'

export const TASK = gql`
  query Task($id: String!) {
    task(id: $id) {
      id
      title
      notes
    }
  }
`

export default function TaskDetailPage({ match: { params }, history }) {
  return (
    <DragDropContext>
      <Template
        toolbar={
          <ToolbarButton onClick={() => history.goBack()} Icon={BackIcon} />
        }
        right={
          <ToolbarButton onClick={() => history.goBack()} Icon={DeleteIcon} />
        }
      >
        <Query query={TASK} variables={{ id: params.id }}>
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>
            if (error) return <p>Error :(</p>
            return <TaskForm data={data} />
          }}
        </Query>
      </Template>
    </DragDropContext>
  )
}
