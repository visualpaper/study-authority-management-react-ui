import React, { Suspense, useContext, useState } from 'react'
import { Stack } from 'react-bootstrap'
import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { getUsers } from '../../apis/user'
import { defaultOnError, defaultUseErrorBoundary } from '../../common/error'
import { PageLoader } from '../../components/PageLoader'
import { RefreshHeader } from '../../components/RefreshHeader'
import UserList from '../../components/UserList'
import { User } from '../../model/user'
import { UserContext } from '../UserContext'

export const UsersPage: React.FC<{}> = () => {
  const [syncDate, setSyncDate] = useState<Date | null>(null)
  const { user } = useContext(UserContext)
  const navigate = useNavigate()
  const { data, isFetching, refetch } = useQuery<User[]>('users', getUsers, {
    onSuccess: () => {
      setSyncDate(new Date())
    },
    onError: defaultOnError,
    useErrorBoundary: defaultUseErrorBoundary,
  })
  const navigateEditUser = (id: string) => {
    navigate(`/users/${id}/edit`)
  }

  return (
    <Suspense>
      <h3>Users</h3>
      <Stack gap={2} className="col-md-8 mx-auto">
        <div className="mb-5">
          <RefreshHeader
            onRefresh={refetch}
            syncDate={syncDate}
            isPageLoding={isFetching}
          />
        </div>

        <PageLoader isPageLoading={isFetching}>
          <UserList
            users={data!}
            userContext={user}
            navigateEditUser={navigateEditUser}
          />
        </PageLoader>
      </Stack>
    </Suspense>
  )
}
