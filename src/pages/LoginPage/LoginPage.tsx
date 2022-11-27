import React, { Fragment, useContext, useEffect } from 'react'
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { login } from '../../apis/login'
import { defaultOnError, defaultUseErrorBoundary } from '../../common/error'
import { COMMON_MESSAGES } from '../../common/messages'
import { UserForm } from '../../components/UserForm'
import { User } from '../../model/user'
import { UserContext } from '../UserContext'

export const LoginPage: React.FC<{}> = () => {
  const context = useContext(UserContext)
  const navigate = useNavigate()
  const { isLoading, mutate } = useMutation<
    User,
    unknown,
    {
      id: string
      password: string
    }
  >(
    async ({ id, password }) => {
      return await login(id, password)
    },
    {
      onSuccess: (user: User) => {
        context.setUser(user)

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
    password: string | null
  ) => {
    mutate({
      id: id!,
      password: password!,
    })
  }

  useEffect(() => {
    if (context.user) {
      navigate('/')
    }
  }, [])

  if (context.user) {
    return <Fragment />
  }
  return (
    <>
      <h3>Login</h3>
      <UserForm
        visibleId={true}
        visibleName={false}
        visiblePassword={true}
        fetching={isLoading}
        handleSubmit={handleSubmit}
      />
    </>
  )
}
