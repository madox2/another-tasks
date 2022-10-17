import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SnackbarProvider } from 'notistack'

import { AppTemplate } from './pages/components/AppTemplate'
import { ContactPage } from './pages/ContactPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { PageTemplate } from './pages/components/PageTemplate'
import { PrivacyPage } from './pages/PrivacyPage'
import { TasksPage } from './pages/TasksPage'
import { WelcomePage } from './pages/WelcomePage'
import { routes } from './app/routes'

const queryClient = new QueryClient()

function App() {
  return (
    <SnackbarProvider maxSnack={3} autoHideDuration={4000}>
      <QueryClientProvider client={queryClient}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <BrowserRouter basename={routes.basename}>
            <Routes>
              <Route path={routes.index} element={<PageTemplate />}>
                <Route index element={<WelcomePage />} />
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
        </LocalizationProvider>
      </QueryClientProvider>
    </SnackbarProvider>
  )
}

export default App
