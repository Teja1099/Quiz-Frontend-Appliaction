import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Formik } from "formik";
import * as Yup from "yup";

export default function Auth() {
  const [EmailId, setEmailId] = useState("");
  const [Password, setPassword] = useState("");
  const baseUrl = "https://localhost:44364/api/token/Authenticate";

  const validate = Yup.object({
    EmailId: Yup.string()
      .email("Email is invalid")
      .required("Email is required"),

    Password: Yup.string()
      .min(6, "Password must be at least 6 charaters")
      .required("Password is required"),
  });
  function authentiacte(evt) {
    evt.preventDefault();
    const UserCredentials = {
      UserName: EmailId,
      Password: Password,
    };
    axios({
      method: "POST",
      url: baseUrl,
      data: UserCredentials,
    }).then((res) => console.log(res));
    // axios.get(baseUrl).then((res) => console.log(res));
  }

  return (
    <div>
      <Container fluid>
        <Row>
          <Col className="offset-4" sm="8" md="6">
            <Card className="m-5">
              <Card.Header>
                <Card.Title as="h4">Login User</Card.Title>
              </Card.Header>
              <Card.Body className="p-4">
                {/* <Formik
                  initialValues={{
                    EmailId: "",
                    Password: "",
                  }}
                  validationSchema={validate}
                  onSubmit={(values) => {
                    const temp = {
                      EmailId: values.EmailId,
                      Password: values.Password,
                    };
                    const UserCredentials = {
                      UserName: values.EmailId,
                      Password: values.Password,
                    };
                    axios({
                      method: "POST",
                      url: baseUrl,
                      data: UserCredentials,
                    }).then((res) => console.log(res));
                    // setEmployee(temp);
                    // sendDataToParent(temp);
                    console.log(temp);
                  }}
                >
                  {(formik) => ( */}
                <Form validated={true}>
                  {/* // onSubmit={() => authentiacte()} */}
                  <Row>
                    <Col className="px-1">
                      <Form.Group>
                        <label>Enter Email</label>
                        <input
                          className="mt-1  form-control"
                          placeholder="Email"
                          type="text"
                          name="EmailId"
                          onChange={(e) => setEmailId(e.target.value)}
                          value={EmailId}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="px-1">
                      <Form.Group className="mt-1">
                        <label>Password</label>
                        <input
                          className="mt-1 form-control"
                          placeholder="Password"
                          type="password"
                          name="Password"
                          onChange={(e) => setPassword(e.target.value)}
                          value={Password}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <button
                        onClick={authentiacte}
                        className="btn btn-success mt-2"
                        type="submit"
                        disabled={!EmailId.includes("@")}
                      >
                        Login
                      </button>
                    </Col>
                  </Row>
                </Form>
                {/* //   )}
                // </Formik> */}
              </Card.Body>
              <Card.Footer>
                Not an existing user?
                <Link to="/signup">
                  <span>sign up</span>
                </Link>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
