import './App.css'

import { ApolloProvider } from 'react-apollo'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import React from 'react'

import { apolloClient } from './app/apollo'
import IndexPage from './containers/IndexPage'
import NotFoundPage from './containers/NotFoundPage'
import TaskDetailPage from './containers/TaskDetailPage'
import TasksPage from './containers/TasksPage'

function App() {
  return (
    <div className="App">
      <ApolloProvider client={apolloClient}>
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
