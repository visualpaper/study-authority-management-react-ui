import { Container } from 'react-bootstrap'
import { Navbars } from '../../components/Navbars'

export const App: React.FC<{ children: any }> = ({ children }) => {
  return (
    <>
      <Navbars />
      <Container className="justify-content-center pt-5">
        <div>{children}</div>
      </Container>
    </>
  )
}
