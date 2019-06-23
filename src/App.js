import './App.css'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { SnackbarProvider } from 'notistack'
import React from 'react'

import { LoadingContextProvider } from './containers/app/common/LoadingContext'
import CustomApolloProvider from './containers/app/providers/CustomApolloProvider'
import IndexPage from './containers/IndexPage'
import NotFoundPage from './containers/NotFoundPage'
import TaskDetailPage from './containers/TaskDetailPage'
import TasksPage from './containers/TasksPage'

function App() {
  return (
    <div className="App">
      <SnackbarProvider>
        <CustomApolloProvider>
          <LoadingContextProvider>
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
          </LoadingContextProvider>
        </CustomApolloProvider>
      </SnackbarProvider>
    </div>
  )
}

export default App
