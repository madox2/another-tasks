import { Navigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'

import { StorageKeys, getStorageItem, setStorageItem } from '../utils/storage'
import { TasksForm } from './components/TasksForm'
import { taskListPath } from '../app/routes'
import { useTaskList } from '../app/api/tasks'

const storageListId = getStorageItem(StorageKeys.LAST_LIST)

function NoListSelected() {
  if (storageListId) {
    return <Navigate to={taskListPath(storageListId)} />
  }
  return 'No list selected'
}

export function TasksPage() {
  const { listId } = useParams()
  const { data: list, isLoading } = useTaskList(listId)

  useEffect(() => {
    if (listId) {
      setStorageItem(StorageKeys.LAST_LIST, listId)
    }
  }, [listId])

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
