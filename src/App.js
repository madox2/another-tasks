import './App.css'

import { ApolloProvider } from 'react-apollo'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { SchemaLink } from 'apollo-link-schema'
import React from 'react'

import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'

import { schema } from './app/schema'
import IndexPage from './containers/IndexPage'
import NotFoundPage from './containers/NotFoundPage'
import TaskDetailPage from './containers/TaskDetailPage'
import TasksPage from './containers/TasksPage'

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new SchemaLink({ schema }),
})

function App() {
  return (
    <div className="App">
      <ApolloProvider client={client}>
        <Router>
          <Switch>
            <Route path="/" exact component={IndexPage} />
            <Route path="/app/" exact component={TasksPage} />
            <Route
              path="/app/list/:listId/task/:taskId"
              component={TaskDetailPage}
            />
            <Route path="/app/list/:listId" component={TasksPage} />
            <Route component={NotFoundPage} />
          </Switch>
        </Router>
      </ApolloProvider>
    </div>
  )
}

export default App
