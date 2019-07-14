import './App.css'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { SnackbarProvider } from 'notistack'
import React from 'react'

import { LoadingContextProvider } from './containers/app/common/LoadingContext'
import ContactPage from './containers/ContactPage'
import CustomApolloProvider from './containers/app/providers/CustomApolloProvider'
import IndexPage from './containers/IndexPage'
import NotFoundPage from './containers/NotFoundPage'
import TaskDetailPage from './containers/TaskDetailPage'
import TasksPage from './containers/TasksPage'
import TermsPage from './containers/TermsPage'

function App() {
  return (
    <div className="App">
      <SnackbarProvider>
        <CustomApolloProvider>
          <LoadingContextProvider>
            <Router>
              <Switch>
                <Route path="/" exact component={IndexPage} />
                <Route path="/contact" exact component={ContactPage} />
                <Route path="/terms" exact component={TermsPage} />
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
