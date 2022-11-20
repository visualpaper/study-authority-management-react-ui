import React from 'react'
import ReactDOM from 'react-dom/client'
import { ErrorBoundary } from 'react-error-boundary'
import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter } from 'react-router-dom'
import { App } from './pages/App/App'
import { ErrorPage } from './pages/ErrorPage/ErrorPage'
import Router from './router'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

/**
 * retry: デフォルト 3 retry を行うか。
 * refetchOnWindowFocus: デフォルトでユーザーがブラウザのコンポーネントにフォーカスを当てた時に自動でフェッチが動くか。
 * suspense: Suspense 待機を行うか
 */
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      suspense: true,
    },
  },
})

root.render(
  <React.StrictMode>
    {/* 最初に baseurl に history push し、homepage を "/" にしたい */}
    <BrowserRouter basename={process.env.REACT_APP_BASE_URL}>
      <QueryClientProvider client={queryClient}>
        <ErrorBoundary FallbackComponent={ErrorPage}>
          <App>
            <Router />
          </App>
        </ErrorBoundary>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
