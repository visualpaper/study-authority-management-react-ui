import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, Nav, Navbar } from 'react-bootstrap'
import styles from './index.module.css'

export const Navbars: React.FC<{}> = () => {
  const navigate = useNavigate()

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
          <Nav>
            <Nav.Link
              onClick={() => {
                navigate('/users')
              }}
            >
              Register
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
