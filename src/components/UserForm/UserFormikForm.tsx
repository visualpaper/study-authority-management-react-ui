import { Button, Form, Spinner } from 'react-bootstrap'
import { UserFormValues } from '.'
import styles from './index.module.css'

interface FormProps {
  values: UserFormValues
  errors: any
  touched: any
  handleChange: any
  handleBlur: any
  handleSubmit: any
  fetching: boolean
  visibleId: boolean
  initializedId?: string
  visibleName: boolean
  visiblePassword: boolean
}

const UserFormikForm: React.FC<FormProps> = ({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  handleSubmit,
  fetching,
  visibleId,
  initializedId,
  visibleName,
  visiblePassword
}) => {
  const isValid = !Object.keys(errors).length

  return (
    <Form className={`mx-auto ${styles.form}`} onSubmit={handleSubmit}>
      {visibleId && (
        <Form.Group className="mb-3">
          <Form.Label>User Id</Form.Label>
          <Form.Control
            id="id"
            type="input"
            placeholder="User Id"
            value={values.id || ''}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={!!initializedId}
          />
          {errors.id && touched.id && (
            <Form.Text className="text-muted">{errors.id}</Form.Text>
          )}
        </Form.Group>
      )}

      {visibleName && (
        <Form.Group className="mb-3">
          <Form.Label>User Name</Form.Label>
          <Form.Control
            id="name"
            type="input"
            placeholder="User Name"
            value={values.name || ''}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.name && touched.name && (
            <Form.Text className="text-muted">{errors.name}</Form.Text>
          )}
        </Form.Group>
      )}

      {visiblePassword && (
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            id="password"
            type="password"
            placeholder="Password"
            value={values.password || ''}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.password && touched.password && (
            <Form.Text className="text-muted">{errors.password}</Form.Text>
          )}
        </Form.Group>
      )}
      <Button
        variant="primary"
        type="submit"
        className={styles.submit_button}
        disabled={!isValid || fetching}
      >
        {!fetching && 'Submit'}
        {fetching && <Spinner animation="border" size="sm" />}
      </Button>
    </Form>
  )
}

export default UserFormikForm
