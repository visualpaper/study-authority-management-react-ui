import { render as rtlRender } from '@testing-library/react'
import React from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { QueryClient, QueryClientProvider } from 'react-query'
import { MemoryRouter } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import { App } from '../pages/App/App'
import { ErrorPage } from '../pages/ErrorPage/ErrorPage'
import Router from '../router'

function render(url: string) {
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

  return rtlRender(
    <React.StrictMode>
      <MemoryRouter initialEntries={[{ pathname: url }]}>
        <QueryClientProvider client={queryClient}>
          <ErrorBoundary FallbackComponent={ErrorPage}>
            <App>
              <Router />
              <ToastContainer
                position={toast.POSITION.TOP_RIGHT}
                theme="light"
              />
            </App>
          </ErrorBoundary>
        </QueryClientProvider>
      </MemoryRouter>
    </React.StrictMode>
  )
}

// re-export everything
export * from '@testing-library/react'
// override render method
export { render }
