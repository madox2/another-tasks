import { DragDropContext } from 'react-beautiful-dnd'
import BackIcon from '@material-ui/icons/ArrowBack'
import DeleteIcon from '@material-ui/icons/Delete'
import React from 'react'

import { LoadableQuery } from './app/common/LoadableQuery'
import { TASK } from '../queries/taskQueries'
import { TaskListLink } from '../components/Link'
import TaskForm from './app/tasks/TaskForm'
import Template from './app/Template'
import ToolbarButton from '../components/ToolbarButton'

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
        <LoadableQuery
          query={TASK}
          variables={{ id: params.taskId, listId: params.listId }}
        >
          {({ data }) => {
            return <TaskForm data={data} listId={params.listId} />
          }}
        </LoadableQuery>
      </Template>
    </DragDropContext>
  )
}
