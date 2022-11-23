import { FormikErrors } from 'formik'
import { UserFormValues } from '.'

export const validateForm = (
  values: UserFormValues,
  visibleId: boolean,
  visibleName: boolean,
  visiblePassword: boolean
): any => {
  const errors: FormikErrors<UserFormValues> = {}

  if (visibleId && !values.id) {
    errors.id = 'Id is Required'
  }

  if (visibleName && !values.name) {
    errors.name = 'Name is Required'
  }

  if (visiblePassword && !values.password) {
    errors.password = 'Password is Required'
  }
  return errors
}
