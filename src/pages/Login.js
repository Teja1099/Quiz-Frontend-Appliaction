import React, { useEffect, useContext, useState } from "react";
import { Formik, Form } from "formik";
import { TextField } from "./TextField";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LoginContext from "../component/context/LoginContext";
import { Alert } from "@material-ui/lab";

export default function Login() {
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");
  let navigate = useNavigate();
  const loginCtx = useContext(LoginContext);
  const baseUrl = "https://localhost:44364/api/token/Authenticate";

  const validate = Yup.object({
    email: Yup.string().email("Email is invalid").required("Email is required"),

    password: Yup.string()
      .min(8, "Password must be at least 8 charaters")
      .required("Password is required"),
  });
  const initial = {
    email: "",
    password: "",
  };
  const submitHandler = (values) => {
    const UserCredentials = {
      UserName: values.email,
      Password: values.password,
    };

    axios({
      method: "POST",
      url: baseUrl,
      data: UserCredentials,
    })
      .then((response) => {
        try {
          if (response.status == "200") {
            // const expTime = new Date(
            //     new Date().getTime() + response.data.expTime
            //   );
            //   loginCtx.login(response.data.token, expTime.toISOString());
            loginCtx.login(
              response.data.id,
              response.data.token,
              response.data.expTime
            );
            // loginCtx.admin(response.data.role);
            console.log(response);
            console.log(loginCtx.token);
            console.log(loginCtx.isLoggedIn);
            navigate("/profile");
          } else {
            alert("Something Wrong!Please Try Again");
          }
        } catch (err) {
          console.log(err);
        }
      })
      .catch((err) => {
        if (err && err.response) {
          switch (err.response.status) {
            case 401:
              console.log("401 status");
              setMessage("Authentication Failed. Bad Credentials");

              break;
            default:
              setMessage("Something Wrong!Please Try Again");
          }
          setIsError(true);
        } else {
          setMessage("Some logic Wrong!Please Try Again");
          setIsError(true);
        }
      });
  };
  return (
    <Container fluid>
      <Row className="justify-content-center m-5">
        <Col sm="12" md="8" lg="6">
          {isError && (
            <div>
              <Alert
                severity="error"
                onClose={() => {
                  navigate("/login1");
                }}
              >
                {message}!
              </Alert>
            </div>
          )}
        </Col>
      </Row>
      <Row className="justify-content-center m-5">
        <Col sm="12" md="8" lg="6">
          <Card className=" m-5">
            <Card.Header>
              <Card.Title as="h4">Login User</Card.Title>{" "}
            </Card.Header>
            <Card.Body className="p-4">
              <Formik
                initialValues={initial}
                validationSchema={validate}
                onSubmit={submitHandler}
              >
                {(formik) => (
                  <Form>
                    <TextField label="Email" name="email" type="email" />
                    <TextField
                      label="Password"
                      name="password"
                      type="password"
                    />

                    <Row>
                      <Col>
                        <button className="btn btn-success mt-2" type="submit">
                          Login
                        </button>
                      </Col>
                    </Row>
                  </Form>
                )}
              </Formik>
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
  );
}
