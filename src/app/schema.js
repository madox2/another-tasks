import { merge } from 'lodash'

import { makeExecutableSchema } from 'graphql-tools'

import { authResolvers } from './resolvers/auth'
import { tasksResolvers } from './resolvers/tasks'

const typeDefs = `
  type Link {
    type: String
    description: String
    link: String
  }
  type Task {
    id: String
    etag: String
    title: String
    updated: String
    selfLink: String
    parent: String
    position: String
    notes: String
    status: String
    due: String
    completed: String
    deleted: String
    hidden: String
    links: [Link]
  }
  type TaskList {
    kind: String
    id: String
    etag: String
    title: String
    selfLink: String
    updated: String
    tasks: [Task]
  }
  type User {
    id: String!,
    isSignedIn: Boolean!
  }
  type Query {
    taskLists: [TaskList]
    taskList(id: String!): TaskList
    task(listId: String!, id: String!): Task
    currentUser: User
  }
  type Mutation {
    addList(title: String!): TaskList
    deleteList(listId: String!): TaskList
    editList(listId: String!, title: String): TaskList
    addTask(listId: String!): Task
    updateTask(
      title: String
      notes: String
      due: String
      status: String
      id: String
      listId: String
    ): Task
    moveTask(listId: String!, id: String!, previousId: String): TaskList
    logout: User
    login: User
    clearCompleted(listId: String): Boolean
  }
`

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers: merge(tasksResolvers, authResolvers),
})
