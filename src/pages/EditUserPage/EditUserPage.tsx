import React, { useContext, useEffect } from 'react'
import { useMutation, useQuery } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { editUser, getEditUser } from '../../apis/user'
import { defaultOnError, defaultUseErrorBoundary } from '../../common/error'
import { COMMON_MESSAGES } from '../../common/messages'
import { EditUserForm } from '../../components/EditUserForm'
import { PageLoader } from '../../components/PageLoader'
import { AuthorityLevel, isAdmin, User } from '../../model/user'
import { UserContext } from '../UserContext'

export const EditUserPage: React.FC<{}> = () => {
  const { user } = useContext(UserContext)
  let { userId } = useParams();
  const navigate = useNavigate()
  const { data, isFetching } = useQuery<User | null>(
    'editUser',
    () => {
      return getEditUser(userId!)
    },
    {
      onError: defaultOnError,
      useErrorBoundary: defaultUseErrorBoundary,
      suspense: false
    }
  )
  const { isLoading, mutate } = useMutation<
    void,
    unknown,
    {
      id: string
      authorityLevel: AuthorityLevel
    }
  >(
    async ({ id, authorityLevel }) => {
      return await editUser(id, authorityLevel)
    },
    {
      onSuccess: () => {
        toast.info(COMMON_MESSAGES.SUCCESS_UPDATE)
        navigate('/users')
      },
      onError: defaultOnError,
      useErrorBoundary: defaultUseErrorBoundary,
    }
  )

  useEffect(() => {
    if (!isAdmin(user)) {
      navigate('/users')
    }
  }, [])

  const handleSubmit = (id: string, authorityLevel: AuthorityLevel) => {
    mutate({
      id: id,
      authorityLevel: authorityLevel,
    })
  }

  return (
    <>
      <h3>Edit User</h3>
      <PageLoader isPageLoading={isFetching}>
        {data && (
          <EditUserForm
            user={data!}
            fetching={isLoading}
            handleSubmit={handleSubmit}
            handleCancel={() => navigate('/users')}
          />
        )}
      </PageLoader>
    </>
  )
}
