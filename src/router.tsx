import { BrowserRouter, Route, Routes } from 'react-router-dom'
import IndexPage from './pages/IndexPage'
import ItemsPage from './pages/ItemsPage'
import UsersPage from './pages/UsersPage'

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<IndexPage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/items" element={<ItemsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
