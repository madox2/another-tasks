import { Query } from 'react-apollo'
import React, { useEffect, useRef, useState } from 'react'

import {
  LAST_LIST_STORAGE_KEY,
  saveToLocalStorage,
} from '../app/utils/storageUtils'
import { TASK } from '../queries/taskQueries'
import { TASK_LIST } from '../queries/taskListsQueries'
import { getTaskKey, isTaskOptimistic } from '../app/optimisticCache'
import DefaultError from '../components/DefaultError'
import DraggableList from '../components/DraggableList'
import DropTaskContainer from './app/tasks/DropTaskContainer'
import GlobalLoadingIndicator from './app/common/GlobalLoadingIndicator'
import ListActionsToolbar from './app/tasks/ListActionsToolbar'
import ListContextMenu from './app/tasks/ListContextMenu'
import TaskItem from './app/tasks/TaskItem'
import Template from './app/Template'

function UpdateStore({ list, client }) {
  useEffect(() => {
    list.tasks.forEach(task => {
      client.writeQuery({
        query: TASK,
        variables: { id: task.id, listId: list.id },
        data: { task },
      })
    })
    // eslint-disable-next-line
  }, [])
  return null
}

const NoListSelected = ({ children, ...other }) => (
  <DropTaskContainer>
    <Template {...other}>{children}</Template>
  </DropTaskContainer>
)

// hack to end refreshing (refetch(...).then(...) does not work)
function SetRefreshingToFalse({ setRefreshing, refreshing, loading }) {
  useEffect(() => {
    if (!loading && refreshing) {
      setRefreshing(false)
    }
  }, [loading, refreshing]) // eslint-disable-line
  return null
}

function TasksPage({ match: { params } }) {
  const firstTaskText = useRef()
  useEffect(() => {
    if (params.listId) {
      saveToLocalStorage(LAST_LIST_STORAGE_KEY, params.listId)
    }
  }, [params.listId])
  const [refreshing, setRefreshing] = useState(false)

  if (!params.listId) {
    return <NoListSelected />
  }
  function onTaskAdd() {
    setTimeout(() => {
      firstTaskText.current.focus()
    }, 1)
  }
  return (
    <Query
      variables={{ id: params.listId }}
      fetchPolicy="cache-and-network"
      query={TASK_LIST}
    >
      {({ loading, error, data, client, refetch }) => {
        const taskList = data && data.taskList
        const loaded = !!(data && data.taskList)

        const initialLoading = loading && !data

        return (
          <DropTaskContainer data={data} listId={params.listId}>
            <Template
              toolbar={loaded && taskList.title}
              right={
                loaded && (
                  <ListContextMenu
                    list={taskList}
                    onRefresh={() => {
                      setRefreshing(true)
                      refetch({ id: params.listId })
                    }}
                  />
                )
              }
            >
              <SetRefreshingToFalse
                setRefreshing={setRefreshing}
                refreshing={refreshing}
                loading={loading}
              />
              {(initialLoading || refreshing) && <GlobalLoadingIndicator />}
              {error && <DefaultError />}
              {loaded && (
                <>
                  <UpdateStore list={taskList} client={client} />
                  <ListActionsToolbar
                    listId={params.listId}
                    onTaskAdd={onTaskAdd}
                  />
                  <DraggableList
                    onDragEnd={() => 0}
                    items={taskList.tasks.map((task, idx) => {
                      const key = getTaskKey(task.id)
                      return {
                        id: task.id,
                        dragDisabled: isTaskOptimistic(task.id),
                        key,
                        children: (
                          <TaskItem
                            onTaskAdd={onTaskAdd}
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
