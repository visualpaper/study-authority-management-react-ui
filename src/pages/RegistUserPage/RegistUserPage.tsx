import React, { Fragment, useContext } from 'react'
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { registUser } from '../../apis/user'
import {
  ApiError,
  defaultOnError,
  defaultUseErrorBoundary,
  isAppError,
} from '../../common/error'
import { COMMON_MESSAGES, USERS_MESSAGES } from '../../common/messages'
import { UserForm } from '../../components/UserForm'
import { UserContext } from '../UserContext'

export const RegistUserPage: React.FC<{}> = () => {
  const { user } = useContext(UserContext)
  const navigate = useNavigate()
  const { isLoading, mutate } = useMutation<
    void,
    unknown,
    {
      id: string
      name: string
      password: string
    }
  >(
    async ({ id, name, password }) => {
      await registUser(id, name, password)
    },
    {
      onSuccess: () => {
        toast.info(COMMON_MESSAGES.SUCCESS_UPDATE)
        navigate('/')
      },
      onError: (error: any) => {
        if (isAppError(error, ApiError) && error.isConflict()) {
          toast.warn(USERS_MESSAGES.CONFLICT)
        }
        defaultOnError(error)
      },
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
      name: name!,
      password: password!,
    })
  }

  /*
   * test にて MemoryRouter で loginWithCookie 前に来てしまう都合ここにおけない
  useEffect(() => {
    if (user) {
      navigate('/')
    }
  }, [])
  */

  if (user) {
    return <Fragment />
  }
  return (
    <>
      <h3>Regist User</h3>
      <UserForm
        visibleId={true}
        visibleName={true}
        visiblePassword={true}
        fetching={isLoading}
        handleSubmit={handleSubmit}
      />
    </>
  )
}
