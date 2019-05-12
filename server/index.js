const { ApolloServer, gql } = require('apollo-server')

const data = [
  {
    title: 'TODO',
    id: '1',
    tasks: [
      {
        id: '1',
        title: 'Something',
        notes: 'Harry Potter and the Chamber of Secrets',
      },
      {
        id: '2',
        title: 'Jurassic Park',
      },
    ],
  },
  {
    title: 'Tmp',
    id: '2',
    tasks: [
      {
        id: '3',
        title: 'Something else',
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
  type Query {
    taskLists: [TaskList]
    taskList(id: String!): TaskList
  }
  type Mutation {
    addList(title: String!): TaskList
  }
`

const resolvers = {
  Query: {
    taskLists: () => data,
    taskList: (_, { id }) => data.find(d => d.id === id),
  },
  Mutation: {
    addList: (_, { title }) => {
      const list = {
        id: 1 * data[data.length - 1].id + 1 + '',
        title,
        tasks: [],
      }
      data.push(list)
      return list
    },
  },
}

const server = new ApolloServer({ typeDefs, resolvers })

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})
