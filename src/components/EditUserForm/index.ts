import { withFormik } from 'formik'
import { AuthorityLevel, User } from '../../model/user'
import EditUserFormikForm from './EditUserFormikForm'

export interface EditUserFormProps {
  user: User
  fetching: boolean
  handleSubmit: (id: string, authorityLevel: AuthorityLevel) => void
  handleCancel: () => void
}

export interface EditUserFormValues {
  id: string
  authorityLevel: AuthorityLevel
}

export const EditUserForm = withFormik<EditUserFormProps, EditUserFormValues>({
  enableReinitialize: true,

  mapPropsToValues: (props) => ({
    id: props.user.id,
    authorityLevel: props.user.authorityLevel,
  }),

  validate: (values, props) => {},

  handleSubmit: (values, { props, setSubmitting }) => {
    props.handleSubmit(values.id, values.authorityLevel)
    setSubmitting(false)
  },

  displayName: 'UserForm',
})(EditUserFormikForm)
