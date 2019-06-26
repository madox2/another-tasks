import { Query } from 'react-apollo'
import React, { useEffect, useRef } from 'react'

import {
  LAST_LIST_STORAGE_KEY,
  saveToLocalStorage,
} from '../app/utils/storageUtils'
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
  useEffect(() => {
    if (params.listId) {
      saveToLocalStorage(LAST_LIST_STORAGE_KEY, params.listId)
    }
    // eslint-disable-next-line
  }, [])

  if (!params.listId) {
    return <NoListSelected />
  }
  return (
    <Query variables={{ id: params.listId }} query={TASK_LIST}>
      {({ loading, error, data }) => {
        const taskList = data && data.taskList
        const loaded = !loading && !error

        return (
          <DropTaskContainer data={data} listId={params.listId}>
            {loading && <GlobalLoadingIndicator />}
            <Template
              toolbar={loaded && taskList.title}
              right={loaded && <ListContextMenu list={taskList} />}
            >
              {loading && <GlobalLoadingIndicator />}
              {error && <DefaultError />}
              {loaded && (
                <>
                  <ListActionsToolbar
                    listId={params.listId}
                    onTaskAdd={() => {
                      firstTaskText.current.focus()
                    }}
                  />
                  <DraggableList
                    onDragEnd={() => 0}
                    items={taskList.tasks.map((task, idx) => {
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
                </>
              )}
            </Template>
          </DropTaskContainer>
        )
      }}
    </Query>
  )
}

export default TasksPage
