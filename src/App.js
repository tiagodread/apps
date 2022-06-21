import NavCustom from "./components/NavCustom/NavCustom";
import { Card, Button, Container, Row, Col } from "react-bootstrap";

import "./App.css";

function App() {
  return (
    <div className="App">
      <NavCustom />
      <Container className="App-container">
        <Row>
          <Col xs>
            <Card style={{ width: "18rem" }}>
              <Card.Body>
                <Card.Title>Currency Converter</Card.Title>
                <Card.Text>
                  Quickly convert currencies using the latest exchange rates.
                </Card.Text>
                <Button variant="primary" href="/currency-converter">
                  Visit
                </Button>
              </Card.Body>
            </Card>
          </Col>
          {/* <Col xs={{ order: 12 }}>Second, but last</Col>
          <Col xs={{ order: 1 }}>Third, but second</Col> */}
        </Row>
      </Container>
    </div>
  );
}

export default App;
