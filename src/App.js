import './App.css'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import React from 'react'

import IndexPage from './containers/IndexPage'
import NotFoundPage from './containers/NotFoundPage'
import TaskDetailPage from './containers/TaskDetailPage'
import TasksPage from './containers/TasksPage'

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={IndexPage} />
          <Route path="/app/" exact component={TasksPage} />
          <Route path="/app/list" component={TasksPage} />
          <Route path="/app/detail" component={TaskDetailPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </Router>
    </div>
  )
}

export default App
