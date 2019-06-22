import { gapi } from '../gclient'
import { loadPromise } from './auth'

const nextId = (function() {
  let id = 0
  return () => ++id + ''
})()

const data = [
  {
    title: 'TODO',
    id: nextId(),
    tasks: [
      {
        id: nextId(),
        title: 'Something',
        notes: 'Harry Potter and the Chamber of Secrets',
        completed: false,
      },
      {
        id: nextId(),
        title: 'Jurassic Park',
        due: '2017-05-24',
        completed: false,
        notes: '',
      },
    ],
  },
  {
    title: 'Tmp',
    id: nextId(),
    tasks: [
      {
        id: nextId(),
        title: 'Something else',
        completed: false,
        notes: '',
      },
    ],
  },
]

async function fetchResult(path, { method = 'GET', body } = {}) {
  try {
    await loadPromise
    const payload = { path, method }
    if (body) payload.body = body
    console.log(`${method}: request:`, payload)
    const response = await gapi.client.request(payload)
    console.log(`${method}: response:`, response)
    return response.result
  } catch (e) {
    console.log(`${method}: error fetching data ${path}`, e)
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

const getTasks = id =>
  fetchItems(`https://www.googleapis.com/tasks/v1/lists/${id}/tasks`)

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

const createTask = listId =>
  doPost(`https://www.googleapis.com/tasks/v1/lists/${listId}/tasks`)

const updateTask = task =>
  doPut(
    `https://www.googleapis.com/tasks/v1/lists/${task.listId}/tasks/${task.id}`,
    task
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
    moveTask: (_, { listId, id, previousId }) => {
      const list = data.find(l => l.id === listId)
      const task = list.tasks.find(t => t.id === id)
      list.tasks = list.tasks.filter(t => t.id !== id)
      if (previousId) {
        const prevIndex = list.tasks.findIndex(t => t.id === previousId)
        list.tasks.splice(prevIndex + 1, 0, task)
      } else {
        // push to beginning
        list.tasks.unshift(task)
      }
      return list
    },
  },
}
