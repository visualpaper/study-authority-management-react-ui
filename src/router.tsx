import { Navigate, Route, Routes } from 'react-router-dom'
import { DashboardPage } from './pages/DashboardPage/DashboardPage'
import { LoginPage } from './pages/LoginPage/LoginPage'
import { RegistUserPage } from './pages/RegistUserPage/RegistUserPage'
import { SettingPage } from './pages/SettingPage/SettingPage'
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
      <Route path="/users/regist" element={<RegistUserPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/setting" element={<SettingPage />} />
    </Routes>
  )
}
