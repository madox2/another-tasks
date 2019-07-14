import { pick } from 'lodash'

import { gapi } from '../gclient'
import { loadPromise } from './auth'
import { log } from '../utils/devLogger'

let updateTaskPromises = []
function updatePromises(promises, promise) {
  promises.push(promise)
  return promise
}

async function fetchResult(path, { method = 'GET', body } = {}) {
  try {
    await loadPromise
    const payload = { path, method }
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
  const tasks = await fetchItems(
    `https://www.googleapis.com/tasks/v1/lists/${id}/tasks`
  )
  tasks.sort((a, b) => a.position.localeCompare(b.position))
  return tasks
}

const getList = async id => {
  const result = await fetchResult(
    `https://www.googleapis.com/tasks/v1/users/@me/lists/${id}`
  )
  return {
    ...result,
    tasks: await getTasks(id),
  }
}

const getLists = () =>
  fetchItems('https://www.googleapis.com/tasks/v1/users/@me/lists')

const getTask = (id, listId) =>
  fetchResult(`https://www.googleapis.com/tasks/v1/lists/${listId}/tasks/${id}`)

const createTask = (listId, task) =>
  doPost(`https://www.googleapis.com/tasks/v1/lists/${listId}/tasks`, task)

const deleteTask = (id, listId) =>
  doDelete(`https://www.googleapis.com/tasks/v1/lists/${listId}/tasks/${id}`)

const updateTask = async task =>
  await updatePromises(
    updateTaskPromises,
    doPut(
      `https://www.googleapis.com/tasks/v1/lists/${task.listId}/tasks/${task.id}`,
      task
    )
  )

const addList = title =>
  doPost('https://www.googleapis.com/tasks/v1/users/@me/lists', { title })

const updateList = (listId, title) =>
  doPut(`https://www.googleapis.com/tasks/v1/users/@me/lists/${listId}`, {
    title,
    id: listId,
  })

const deleteList = listId =>
  doDelete(`https://www.googleapis.com/tasks/v1/users/@me/lists/${listId}`)

const clearCompleted = async listId => {
  await Promise.all(updateTaskPromises)
  await doPost(`https://www.googleapis.com/tasks/v1/lists/${listId}/clear`)
  return true
}

const moveTask = async (id, previousId, listId) => {
  if (previousId) {
    await doPost(
      `https://www.googleapis.com/tasks/v1/lists/${listId}/tasks/${id}/move?previous=${previousId}`
    )
  } else {
    await doPost(
      `https://www.googleapis.com/tasks/v1/lists/${listId}/tasks/${id}/move`
    )
  }
  return true
}

const moveToList = async (id, listId, targetListId) => {
  const task = await getTask(id, listId)
  const movedTask = pick(task, ['title', 'notes', 'due', 'status'])
  await createTask(targetListId, movedTask)
  await deleteTask(id, listId)
  return true
}

export const tasksResolvers = {
  Query: {
    taskLists: () => getLists(),
    taskList: (_, { id }) => getList(id),
    task: (_, { listId, id }) => getTask(id, listId),
  },
  Mutation: {
    addList: (_, { title }) => addList(title),
    deleteList: (_, { listId }) => deleteList(listId),
    editList: (_, { listId, title }) => updateList(listId, title),
    updateTask: (_, { title, notes, status, due, id, listId }) =>
      updateTask({ title, notes, status, due, id, listId }),
    addTask: (_, { listId }) => createTask(listId),
    deleteTask: (_, { listId, id }) => deleteTask(id, listId),
    clearCompleted: (_, { listId }) => clearCompleted(listId),
    moveTask: (_, { listId, id, previousId }) =>
      moveTask(id, previousId, listId),
    moveToList: (_, { listId, id, targetListId }) =>
      moveToList(id, listId, targetListId),
  },
}
