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
import { Auth, Hub } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css';

export const LoginPage: React.FC<{}> = () => {
  const { user, setUser } = useContext(UserContext)
  const navigate = useNavigate()

  Auth.currentAuthenticatedUser()
  .then(user => {
    console.log(user)
  })

  useEffect(() => {
    if (user) {
      navigate('/')
    }

    Hub.listen('auth', ({ payload: { event, data } }) => {
      switch (event) {
        case 'signIn':
          setUser(data)

          toast.info(COMMON_MESSAGES.SUCCESS_UPDATE)
          navigate('/')
          break;
      }
    });
  }, [])


  if (user) {
    return <Fragment />
  }
  return (
    <>
      <h3>Login</h3>
      <Authenticator>

      </Authenticator>
    </>
  )
}
