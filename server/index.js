const { ApolloServer, gql } = require('apollo-server')

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

const typeDefs = gql`
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
    completed: Boolean
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
  type Query {
    taskLists: [TaskList]
    taskList(id: String!): TaskList
    task(listId: String!, id: String!): Task
  }
  type Mutation {
    addList(title: String!): TaskList
    addTask(listId: String!): Task
    updateTask(
      title: String
      notes: String
      due: String
      completed: Boolean
      id: String
      listId: String
    ): Task
  }
`

const resolvers = {
  Query: {
    taskLists: () => data,
    taskList: (_, { id }) => data.find(d => d.id === id),
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
  },
}

const server = new ApolloServer({ typeDefs, resolvers })

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})
