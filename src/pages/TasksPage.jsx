import { Navigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'

import { TasksForm } from './components/TasksForm'
import { taskListPath } from '../app/routes'
import { useGlobalState } from '../state'
import { useTaskList } from '../app/api/tasks'

function NoListSelected() {
  const [lastListId] = useGlobalState('lastListId')
  if (lastListId) {
    return <Navigate to={taskListPath(lastListId)} />
  }
  return 'No list selected'
}

export function TasksPage() {
  const [, setLastListId] = useGlobalState('lastListId')
  const { listId } = useParams()
  const { data: list, isLoading } = useTaskList(listId)

  useEffect(() => {
    if (listId) {
      setLastListId(listId)
    }
  }, [setLastListId, listId])

  if (!listId) {
    return <NoListSelected />
  }
  if (isLoading) {
    return null
  }
  if (!list) {
    return 'List not found'
  }
  return <TasksForm list={list} key={listId} />
}
