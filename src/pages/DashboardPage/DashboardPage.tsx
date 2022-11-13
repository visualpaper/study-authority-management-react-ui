import React, { useContext } from 'react'
import { Dashboard } from '../../components/Dashboard'
import { UserContext } from '../App/UserContext'

export const DashboardPage: React.FC<{}> = () => {
  const user = useContext(UserContext)

  return (
    <>
      <h3>Authrity Management Dashboard</h3>
      <div>{user?.id}</div>
      <Dashboard />
    </>
  )
}
