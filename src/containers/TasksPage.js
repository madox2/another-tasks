import { Query } from 'react-apollo'
import React, { useRef } from 'react'

import { TASK_LIST } from '../queries/taskListsQueries'
import { getTaskKey } from '../app/optimisticCache'
import DefaultError from '../components/DefaultError'
import DraggableList from '../components/DraggableList'
import DropTaskContainer from './app/tasks/DropTaskContainer'
import GlobalLoadingIndicator from './app/common/GlobalLoadingIndicator'
import ListActionsToolbar from './app/tasks/ListActionsToolbar'
import ListContextMenu from './app/tasks/ListContextMenu'
import TaskItem from './app/tasks/TaskItem'
import Template from './app/Template'

const NoListSelected = ({ children, ...other }) => (
  <DropTaskContainer>
    <Template {...other}>{children}</Template>
  </DropTaskContainer>
)

function TasksPage({ match: { params } }) {
  const firstTaskText = useRef()

  if (!params.listId) {
    return <NoListSelected toolbar="Select list" />
  }
  return (
    <Query variables={{ id: params.listId }} query={TASK_LIST}>
      {({ loading, error, data }) => {
        if (loading)
          return (
            <NoListSelected>
              <GlobalLoadingIndicator />
            </NoListSelected>
          )
        if (error)
          return (
            <NoListSelected>
              <DefaultError />
            </NoListSelected>
          )

        return (
          <DropTaskContainer data={data} listId={params.listId}>
            <Template toolbar={data.taskList.title} right={<ListContextMenu />}>
              <ListActionsToolbar
                listId={params.listId}
                onTaskAdd={() => {
                  firstTaskText.current.focus()
                }}
              />
              <DraggableList
                onDragEnd={() => 0}
                items={data.taskList.tasks.map((task, idx) => {
                  const key = getTaskKey(task.id)
                  return {
                    id: task.id,
                    key,
                    children: (
                      <TaskItem
                        key={key}
                        task={task}
                        inputRef={idx === 0 ? firstTaskText : undefined}
                        listId={params.listId}
                      />
                    ),
                  }
                })}
              />
            </Template>
          </DropTaskContainer>
        )
      }}
    </Query>
  )
}

export default TasksPage
