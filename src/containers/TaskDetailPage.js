import { DragDropContext } from 'react-beautiful-dnd'
import { Mutation } from 'react-apollo'
import BackIcon from '@material-ui/icons/ArrowBack'
import DeleteIcon from '@material-ui/icons/Delete'
import React from 'react'

import { DELETE_TASK } from '../queries/taskMutations'
import { LoadableQuery } from './app/common/LoadableQuery'
import { TASK } from '../queries/taskQueries'
import { TASK_LIST } from '../queries/taskListsQueries'
import { TaskListLink } from '../components/Link'
import TaskForm from './app/tasks/TaskForm'
import Template from './app/Template'
import ToolbarButton from '../components/ToolbarButton'

export default function TaskDetailPage({
  match: {
    params: { listId, taskId },
  },
  history,
}) {
  return (
    <DragDropContext>
      <Template
        toolbar={
          <ToolbarButton component={TaskListLink(listId)} Icon={BackIcon} />
        }
        right={
          <Mutation mutation={DELETE_TASK} variables={{ listId, id: taskId }}>
            {(deleteTask) => (
              <ToolbarButton
                onClick={() => {
                  deleteTask({
                    optimisticResponse: {
                      __typename: 'Mutation',
                      deleteTask: {
                        id: taskId,
                        __typename: 'Task',
                      },
                    },
                    update: (proxy, { data: { deleteTask } }) => {
                      const data = proxy.readQuery({
                        query: TASK_LIST,
                        variables: { id: listId },
                      })
                      data.taskList.tasks = data.taskList.tasks.filter(
                        (t) => t.id !== taskId,
                      )
                      proxy.writeQuery({
                        query: TASK_LIST,
                        variables: { id: listId },
                        data,
                      })
                    },
                  }).then(() => {
                    history.push(`/app/list/${listId}`)
                  })
                }}
                component={TaskListLink(listId)}
                Icon={DeleteIcon}
              />
            )}
          </Mutation>
        }
      >
        <LoadableQuery
          query={TASK}
          variables={{ id: taskId, listId: listId }}
          loadingDataGuard
        >
          {({ data }) => {
            return <TaskForm data={data} listId={listId} />
          }}
        </LoadableQuery>
      </Template>
    </DragDropContext>
  )
}
