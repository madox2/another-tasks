import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { pick } from 'lodash'

import { TaskStatus } from '../constants'
import { gapi } from '../gclient'
import { loadPromise } from './auth'

let updateTaskPromises = []
function updatePromises(promises, promise) {
  promises.push(promise)
  return promise
}

const log = (...args) => console.debug(...args)

const TASKS_API_URL = 'https://www.googleapis.com/tasks/v1'

async function fetchResult(path, { method = 'GET', body } = {}) {
  try {
    await loadPromise
    path = TASKS_API_URL + path
    // overriding If-None-Match header to prevent caching
    const headers = { 'If-None-Match': 'test' }
    const payload = { path, method, headers }
    if (body) payload.body = body
    log(`${method}: request:`, payload)
    const response = await gapi.client.request(payload)
    log(`${method}: response:`, response)
    return response.result
  } catch (e) {
    log(`${method}: error fetching data ${path}`, e)
    throw e
  }
}

async function doPut(path, body) {
  return fetchResult(path, { body, method: 'PUT' })
}

async function doPost(path, body) {
  return fetchResult(path, { body, method: 'POST' })
}

async function doDelete(path) {
  return fetchResult(path, { method: 'DELETE' })
}

async function fetchItems(path) {
  const result = await fetchResult(path)
  return (result && result.items) || []
}

const getTasks = async id => {
  const tasks = await fetchItems(`/lists/${id}/tasks`)
  tasks.sort((a, b) => a.position.localeCompare(b.position))
  return tasks
}

const getList = async id => {
  const [result, tasks] = await Promise.all([
    fetchResult(`/users/@me/lists/${id}`),
    getTasks(id),
  ])
  return {
    ...result,
    tasks,
  }
}

const getLists = () => fetchItems('/users/@me/lists')

const getTask = (id, listId) => fetchResult(`/lists/${listId}/tasks/${id}`)

const createTask = (listId, task) => doPost(`/lists/${listId}/tasks`, task)

const deleteTask = (id, listId) => doDelete(`/lists/${listId}/tasks/${id}`)

const updateTask = async task =>
  await updatePromises(
    updateTaskPromises,
    doPut(`/lists/${task.listId}/tasks/${task.id}`, task)
  )

const addList = title => doPost('/users/@me/lists', { title })

const updateList = (listId, title) =>
  doPut(`/users/@me/lists/${listId}`, {
    title,
    id: listId,
  })

const deleteList = listId => doDelete(`/users/@me/lists/${listId}`)

const clearCompleted = async listId => {
  await Promise.all(updateTaskPromises)
  await doPost(`/lists/${listId}/clear`)
}

const moveTask = async (id, previousId, listId) => {
  if (previousId) {
    await doPost(`/lists/${listId}/tasks/${id}/move?previous=${previousId}`)
  } else {
    await doPost(`/lists/${listId}/tasks/${id}/move`)
  }
}

const moveToList = async (id, listId, targetListId) => {
  const task = await getTask(id, listId)
  const movedTask = pick(task, ['title', 'notes', 'due', 'status'])
  await createTask(targetListId, movedTask)
  await deleteTask(id, listId)
}

export const useTaskLists = () => useQuery(['lists'], getLists)

export const useTaskList = id =>
  useQuery(['lists', id], () => getList(id), { enabled: !!id })

export const useAddListMutation = () => {
  const queryClient = useQueryClient()
  return useMutation(({ title }) => addList(title), {
    onSuccess: list =>
      queryClient.setQueryData(['lists'], lists => [...lists, list]),
  })
}

export const useDeleteListMutation = () => {
  const queryClient = useQueryClient()
  return useMutation(({ listId }) => deleteList(listId), {
    onSuccess: (_, { listId }) =>
      queryClient.setQueryData(['lists'], lists =>
        lists.filter(({ id }) => id !== listId)
      ),
  })
}

export const useEditListMutation = () => {
  const queryClient = useQueryClient()
  return useMutation(({ listId, title }) => updateList(listId, title), {
    onSuccess: (_, { listId, title }) =>
      queryClient.setQueryData(['lists'], lists =>
        lists.map(list => {
          if (list.id === listId) {
            return { ...list, title }
          }
          return list
        })
      ),
  })
}

export const useUpdateTaskMutation = () => {
  const queryClient = useQueryClient()
  return useMutation(
    ({ title, notes, status, due, id, listId }) =>
      updateTask({ title, notes, status, due, id, listId }),
    {
      onSuccess: (updatedTask, { listId }) => {
        queryClient.setQueryData(['lists', listId], list => ({
          ...list,
          tasks: list?.tasks.map(t => {
            if (t.id === updatedTask.id) {
              return updatedTask
            }
            return t
          }),
        }))
      },
    }
  )
}

export const useAddTaskMutation = () => {
  const queryClient = useQueryClient()
  return useMutation(({ listId }) => createTask(listId), {
    onSuccess: (newTask, { listId }) => {
      queryClient.setQueryData(['lists', listId], list => ({
        ...list,
        tasks: [newTask, ...list?.tasks],
      }))
    },
  })
}

export const useDeleteTaskMutation = () =>
  useMutation(({ listId, id }) => deleteTask(id, listId))

export const useClearCompletedMutation = () => {
  const queryClient = useQueryClient()
  return useMutation(({ listId }) => clearCompleted(listId), {
    onSuccess: (_, { listId }) => {
      queryClient.setQueryData(['lists', listId], list => ({
        ...list,
        tasks: list?.tasks.filter(t => t.status !== TaskStatus.completed),
      }))
    },
  })
}

export const useMoveTaskMutation = () =>
  useMutation(({ listId, id, previousId }) => moveTask(id, previousId, listId))

export const useMoveToListMutation = () =>
  useMutation(({ listId, id, targetListId }) =>
    moveToList(id, listId, targetListId)
  )
