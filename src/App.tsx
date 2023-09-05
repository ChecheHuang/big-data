import ErrorBoundary from './components/ErrorBoundary'
import router from '@/router/router'
import '@tanstack/react-query'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useRoutes, HashRouter as BrowserRouter } from 'react-router-dom'

const Routes = () => {
  const routes = useRoutes(router)

  return routes
}

function App() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { staleTime: 1000 * 60 * 5 } },
  })
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <Routes />
        </QueryClientProvider>
      </BrowserRouter>
    </ErrorBoundary>
  )
}
export default App
