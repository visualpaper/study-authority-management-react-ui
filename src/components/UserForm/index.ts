import { withFormik } from 'formik'
import UserFormikForm from './UserFormikForm'
import { validateForm } from './validate'

export interface UserFormProps {
  initializedId?: string
  visibleId: boolean
  visibleName: boolean
  visiblePassword: boolean
  fetching: boolean
  handleSubmit: (
    id: string | null,
    name: string | null,
    password: string | null
  ) => void
}

export interface UserFormValues {
  id: string | null
  name: string | null
  password: string | null
}

export const UserForm = withFormik<UserFormProps, UserFormValues>({
  enableReinitialize: true,

  mapPropsToValues: (props) => ({
    id: props.initializedId || '',
    name: '',
    password: ''
  }),

  validate: (values, props) => {
    return validateForm(
      values,
      props.visibleId,
      props.visibleName,
      props.visiblePassword
    )
  },

  handleSubmit: (values, { props, setSubmitting }) => {
    props.handleSubmit(values.id, values.name, values.password)
    setSubmitting(false)
  },

  displayName: 'UserForm'
})(UserFormikForm)
