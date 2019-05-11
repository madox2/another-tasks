import './App.css'

import { ApolloProvider } from 'react-apollo'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import ApolloClient from 'apollo-boost'
import React from 'react'

import IndexPage from './containers/IndexPage'
import NotFoundPage from './containers/NotFoundPage'
import TaskDetailPage from './containers/TaskDetailPage'
import TasksPage from './containers/TasksPage'

const client = new ApolloClient()

function App() {
  return (
    <div className="App">
      <ApolloProvider client={client}>
        <Router>
          <Switch>
            <Route path="/" exact component={IndexPage} />
            <Route path="/app/" exact component={TasksPage} />
            <Route path="/app/task/:id" component={TaskDetailPage} />
            <Route path="/app/list/:id" component={TasksPage} />
            <Route component={NotFoundPage} />
          </Switch>
        </Router>
      </ApolloProvider>
    </div>
  )
}

export default App
