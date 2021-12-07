import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  FloatingLabel,
} from "react-bootstrap";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import NotificationAlert from "react-notification-alert";
import { useNavigate } from "react-router-dom";

export default function Register() {
  let navigate = useNavigate();
  const [Name, setName] = useState("");
  const [EmailId, setEmailId] = useState("");
  const [Password, setPassword] = useState("");
  const baseUrl = "https://localhost:44364/api/user/post";
  const notificationAlertRef = React.useRef(null);

  function authentiacte(evt) {
    evt.preventDefault();
    console.log("yes");
    const User = {
      Name: Name,
      EmailId: EmailId,
      Password: Password,
    };
    // axios.get(baseUrl).then((res) => console.log(res));
    axios({
      method: "POST",
      url: baseUrl,
      data: User,
    }).then((res) => console.log(res));
  }
  const options = {
    place: "tc",
    message: (
      <div>
        <div>
          Welcome to <b>Light Bootstrap Dashboard React</b> - a beautiful
          freebie for every web developer.
        </div>
      </div>
    ),
    type: "warning",
    icon: "nc-icon nc-bell-55",
    autoDismiss: 3,
  };
  // const handleAlert = () => {
  //   notificationAlertRef.current.notificationAlert(options);
  // };

  // const timer = setTimeout(handleAlert, 1000);
  return (
    <div>
      <Container fluid>
        <Row>
          <NotificationAlert ref={notificationAlertRef} />
          {/* <button onClick={() => handleAlert()}>alert</button> */}
          <Col className="offset-4" sm="4">
            <Card className="m-5">
              <Card.Header>
                <Card.Title as="h4">Register User</Card.Title>
              </Card.Header>
              <Card.Body className="p-4">
                <Form onSubmit={() => authentiacte()}>
                  <Row>
                    <Col className="px-1">
                      <Form.Group>
                        <FloatingLabel
                          controlId="floatingPassword"
                          label="Name"
                        >
                          <Form.Control
                            className="mt-1 "
                            placeholder="Name"
                            type="text"
                            onChange={(e) => setName(e.target.value)}
                            value={Name}
                          ></Form.Control>
                        </FloatingLabel>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="px-1">
                      <Form.Group>
                        <FloatingLabel
                          controlId="floatingPassword"
                          label="Email Address"
                        >
                          <Form.Control
                            className="mt-1 "
                            placeholder="Email"
                            type="text"
                            onChange={(e) => setEmailId(e.target.value)}
                            value={EmailId}
                          ></Form.Control>
                        </FloatingLabel>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="px-1">
                      <Form.Group className="mt-1">
                        <FloatingLabel
                          controlId="floatingPassword"
                          label="Password"
                        >
                          <Form.Control
                            className="mt-1 "
                            placeholder="Password"
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={Password}
                          ></Form.Control>
                        </FloatingLabel>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Button
                        onClick={authentiacte}
                        className="btn btn-success mt-2"
                        type="submit"
                      >
                        Register
                      </Button>
                      <Button
                        className="btn btn-danger offset-1 mt-2"
                        type="refresh"
                      >
                        Reset
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
