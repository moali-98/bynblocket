import { Container, Row, Col } from 'react-bootstrap';
import Search from './Search';

export default function StartPage() {
  return <Container><Row><Col>
    <h1>Välkommen!</h1>
    <Search />
  </Col></Row></Container>
}