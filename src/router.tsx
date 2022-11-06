import { Route, Routes } from 'react-router-dom'
import IndexPage from './pages/IndexPage'
import UsersPage from './pages/UsersPage'

export default function Router() {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<IndexPage />} />
        <Route path="/users" element={<UsersPage />} />
      </Route>
    </Routes>
  )
}
