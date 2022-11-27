import React, { Fragment, useContext, useEffect } from 'react'
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { setting } from '../../apis/setting'
import { defaultOnError, defaultUseErrorBoundary } from '../../common/error'
import { COMMON_MESSAGES } from '../../common/messages'
import { UserForm } from '../../components/UserForm'
import { User } from '../../model/user'
import { UserContext } from '../UserContext'

export const SettingPage: React.FC<{}> = () => {
  const { user, setUser } = useContext(UserContext)
  const navigate = useNavigate()
  const { isLoading, mutate } = useMutation<
    User,
    unknown,
    {
      id: string
      name: string
    }
  >(
    async ({ id, name }) => {
      return await setting(id, name)
    },
    {
      onSuccess: (user: User) => {
        setUser(user)

        toast.info(COMMON_MESSAGES.SUCCESS_UPDATE)
        navigate('/')
      },
      onError: defaultOnError,
      useErrorBoundary: defaultUseErrorBoundary,
    }
  )
  const handleSubmit = (
    id: string | null,
    name: string | null,
    password: string | null // eslint-disable-line unused-imports/no-unused-vars
  ) => {
    mutate({
      id: id!,
      name: name!,
    })
  }

  useEffect(() => {
    if (!user) {
      navigate('/')
    }
  }, [])

  if (!user) {
    return <Fragment />
  }
  return (
    <>
      <h3>Setting User</h3>
      <UserForm
        visibleId={true}
        initializedId={user!.id}
        visibleName={true}
        visiblePassword={false}
        fetching={isLoading}
        handleSubmit={handleSubmit}
      />
    </>
  )
}
