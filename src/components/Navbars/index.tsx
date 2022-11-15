import React, { useContext } from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../pages/UserContext'
import styles from './index.module.css'

export const Navbars: React.FC<{}> = () => {
  const navigate = useNavigate()
  const userContext = useContext(UserContext)

  return (
    <Navbar bg="dark" variant="dark">
      <Container fluid className={styles.container}>
        <Navbar.Brand
          className={styles.container_title}
          onClick={() => {
            navigate('/')
          }}
        >
          Authrity Management
        </Navbar.Brand>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={() => {}}>Users</Nav.Link>
          </Nav>
          <Nav>
            {!userContext && (
              <>
                <Nav.Link onClick={() => {}}>Register</Nav.Link>
                <Nav.Link onClick={() => {}}>Login</Nav.Link>
              </>
            )}
            {userContext && (
              <>
                <Navbar.Text>{userContext.name} さん </Navbar.Text>
                <Nav.Link onClick={() => {}}>Setting</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
