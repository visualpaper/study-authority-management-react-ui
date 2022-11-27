import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import { BsPencilSquare, BsXCircleFill } from 'react-icons/bs'
import { isAdmin, User } from '../../model/user'
import { Pagination } from '../Pagination'
import styles from './index.module.css'

type UserListProps = {
  users: User[]
  userContext: User | null
  navigateEditUser: (id: string) => void
}

const PAGE_SIZE = 5

const AdminUserRow: React.FC<{
  user: User
  navigateEditUser: (id: string) => void
}> = ({ user, navigateEditUser }) => {
  return (
    <tr key={user.id}>
      <td>
        <button
          onClick={() => navigateEditUser(user.id)}
          style={{ border: 'none', background: 'transparent' }}
        >
          <BsPencilSquare />
        </button>
        <button
          onClick={() => {}}
          style={{ border: 'none', background: 'transparent' }}
        >
          <BsXCircleFill />
        </button>
      </td>
      <td>{user.id}</td>
      <td>{user.name}</td>
      <td>{user.authorityLevel}</td>
    </tr>
  )
}

const UserRow: React.FC<{ user: User }> = ({ user }) => {
  return (
    <tr key={user.id}>
      <td />
      <td>{user.id}</td>
      <td>{user.name}</td>
      <td>{user.authorityLevel}</td>
    </tr>
  )
}

const UserList: React.FC<UserListProps> = ({
  users,
  userContext,
  navigateEditUser,
}) => {
  const [currentPage, setPage] = useState(1)
  const [viewUsers, setViewUsers] = useState<User[]>([])

  const updateViewUsers = (currentPage: number) => {
    const start = (currentPage - 1) * PAGE_SIZE
    const end = start + PAGE_SIZE
    setViewUsers(users.slice(start, end))
  }

  useEffect(() => {
    setPage(1)
    updateViewUsers(1)
  }, [users])

  useEffect(() => {
    updateViewUsers(currentPage)
  }, [currentPage])

  return (
    <>
      <div className={styles.table}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th></th>
              <th>User Id</th>
              <th>User Name</th>
              <th>Authority Level</th>
            </tr>
          </thead>
          <tbody>
            {viewUsers.map((user) => {
              if (isAdmin(userContext)) {
                return (
                  <AdminUserRow
                    key={user.id}
                    user={user}
                    navigateEditUser={navigateEditUser}
                  />
                )
              } else {
                return <UserRow key={user.id} user={user} />
              }
            })}
          </tbody>
        </Table>
      </div>
      <Pagination
        pageSize={PAGE_SIZE}
        listCount={users.length}
        currentPage={currentPage}
        setPage={setPage}
      />
    </>
  )
}

export default UserList
