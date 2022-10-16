import { generatePath } from 'react-router-dom'

export const routes = {
  basename: 'another-tasks',
  index: '/',
  login: '/login',
  contact: '/contact',
  privacy: '/privacy',
  app: '/app',
  taskList: '/app/list/:listId',
}

export const taskListPath = listId => generatePath(routes.taskList, { listId })
