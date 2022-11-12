import React from 'react'
import { Container, Navbar } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
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
      </Container>
    </Navbar>
  )
}
