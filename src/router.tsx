import { Navigate, Route, Routes } from 'react-router-dom'
import { DashboardPage } from './pages/DashboardPage/DashboardPage'
import { UsersPage } from './pages/UsersPage/UsersPage'

export default function Router() {
  return (
    <Routes>
      <Route
        index
        path="/"
        element={<Navigate to="/dashboard" replace={true} />}
      />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/users" element={<UsersPage />} />
    </Routes>
  )
}
