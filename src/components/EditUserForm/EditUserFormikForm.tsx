import { Button, ButtonGroup, Form, Spinner } from 'react-bootstrap'
import { EditUserFormValues } from '.'
import styles from './index.module.css'

interface FormProps {
  values: EditUserFormValues
  errors: any
  handleChange: any
  handleBlur: any
  handleSubmit: any
  handleCancel: any
  fetching: boolean
}

const EditUserFormikForm: React.FC<FormProps> = ({
  values,
  errors,
  handleChange,
  handleBlur,
  handleSubmit,
  handleCancel,
  fetching,
}) => {
  const isValid = !Object.keys(errors).length

  return (
    <Form
      className={`mx-auto ${styles.form}`}
      onSubmit={handleSubmit}
      onReset={handleCancel}
    >
      <Form.Group className="mb-3">
        <Form.Label>User Id</Form.Label>
        <Form.Control
          id="id"
          type="input"
          placeholder="User Id"
          value={values.id || ''}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={true}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Authority Level</Form.Label>
        <Form.Select
          id="authorityLevel"
          value={values.authorityLevel}
          onChange={handleChange}
          onBlur={handleBlur}
        >
          <option>USER</option>
          <option>ADMIN</option>
        </Form.Select>
      </Form.Group>
      <ButtonGroup className={styles.buttons}>
        <Button variant="outline-secondary" type="reset" className={`me-2`}>
          Cancel
        </Button>
        <Button
          variant="outline-primary"
          type="submit"
          disabled={!isValid || fetching}
        >
          {!fetching && 'Submit'}
          {fetching && <Spinner animation="border" size="sm" />}
        </Button>
      </ButtonGroup>
    </Form>
  )
}

export default EditUserFormikForm
