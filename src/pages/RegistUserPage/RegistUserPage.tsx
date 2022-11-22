import React, { Fragment, useContext } from 'react'
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { registUser } from '../../apis/user'
import { AppError } from '../../common/error'
import { UserForm } from '../../components/UserForm'
import { UserContext } from '../UserContext'

export const RegistUserPage: React.FC<{}> = () => {
  const user = useContext(UserContext)
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
        navigate("/")
      },
      onError: (error: any) => {
        // do - nothing
      },
      useErrorBoundary: (error: any) => {
        return !(error instanceof AppError)
      },
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
