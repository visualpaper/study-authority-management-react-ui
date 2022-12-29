import React from 'react'
import ReactDOM from 'react-dom/client'
import { ErrorBoundary } from 'react-error-boundary'
import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import { App } from './pages/App/App'
import { ErrorPage } from './pages/ErrorPage/ErrorPage'
import Router from './router'
import 'react-toastify/dist/ReactToastify.css'
import { Amplify } from 'aws-amplify'

Amplify.configure({
  Auth: {
    region: 'ap-northeast-1',
    userPoolId: 'ap-northeast-1_Q4kBz9qhX',
    userPoolWebClientId: '5cb0o4qho18ggiojqb86rcohrt',
    oauth: {
      domain: "https://umejima-sample.auth.ap-northeast-1.amazoncognito.com",
      scope: ['openid', 'aws.cognito.signin.user.admin', 'umejima-sample-server-id/authorityLevel'],
      redirectSignIn: "http://localhost:3000",
      responseType: 'code',
    },
  }
})

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
    <BrowserRouter basename={process.env.REACT_APP_BASE_URL}>
      <QueryClientProvider client={queryClient}>
        <ErrorBoundary FallbackComponent={ErrorPage}>
          <App>
            <Router />
            <ToastContainer position={toast.POSITION.TOP_RIGHT} theme="light" />
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
