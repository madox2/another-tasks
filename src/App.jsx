import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { AppTemplate } from './pages/components/AppTemplate'
import { ContactPage } from './pages/ContactPage'
import { LoginPage } from './pages/LoginPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { PageTemplate } from './pages/components/PageTemplate'
import { TasksPage } from './pages/TasksPage'
import { PrivacyPage } from './pages/PrivacyPage'
import { WelcomePage } from './pages/WelcomePage'
import { routes } from './app/routes'

function App() {
  return (
    <BrowserRouter basename={routes.basename}>
      <Routes>
        <Route path={routes.index} element={<PageTemplate />}>
          <Route index element={<WelcomePage />} />
          <Route path={routes.login} element={<LoginPage />} />
          <Route path={routes.contact} element={<ContactPage />} />
          <Route path={routes.privacy} element={<PrivacyPage />} />
        </Route>
        <Route path={routes.app} element={<AppTemplate />}>
          <Route path={routes.app} element={<TasksPage />} />
          <Route path={routes.taskList} element={<TasksPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
