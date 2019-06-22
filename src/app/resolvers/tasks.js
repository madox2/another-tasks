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

async function fetchResult(path) {
  try {
    await loadPromise
    const response = await gapi.client.request({
      path,
    })
    return response.result
  } catch (e) {
    console.log(`error fetching data ${path}`, e)
  }
}

async function fetchItems(path) {
  const result = await fetchResult(path)
  return result && result.items
}

export const tasksResolvers = {
  Query: {
    taskLists: () =>
      fetchItems('https://www.googleapis.com/tasks/v1/users/@me/lists'),
    taskList: async (_, { id }) => {
      const result = await fetchResult(
        `https://www.googleapis.com/tasks/v1/users/@me/lists/${id}`
      )
      return {
        ...result,
        tasks: await fetchItems(
          `https://www.googleapis.com/tasks/v1/lists/${id}/tasks`
        ),
      }
    },
    task: (_, { listId, id }) =>
      data.find(l => l.id === listId).tasks.find(t => t.id === id),
  },
  Mutation: {
    addList: (_, { title }) => {
      const list = {
        id: nextId(),
        title,
        tasks: [],
      }
      data.push(list)
      return list
    },
    updateTask: (_, { title, notes, completed, due, id, listId }) => {
      const task = data.find(l => l.id === listId).tasks.find(t => t.id === id)
      task.title = title
      task.notes = notes
      task.due = due
      task.completed = completed
      return task
    },
    addTask: (_, { listId }) => {
      const list = data.find(l => l.id === listId)
      const task = {
        id: nextId(),
        title: '',
        notes: '',
        due: undefined,
        completed: false,
      }
      list.tasks = [task, ...list.tasks]
      return task
    },
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
