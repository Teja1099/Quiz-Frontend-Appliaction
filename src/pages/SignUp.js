import React, { useEffect } from "react";
import { Formik, Form } from "formik";
import { TextField } from "./TextField";
import * as Yup from "yup";
import { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  FloatingLabel,
} from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import photo from "../assets/images/photo.png";

export const SignUp = () => {
  let navigate = useNavigate();
  const baseUrl = "https://localhost:44364/api/user/post";

  const validate = Yup.object({
    name: Yup.string()
      .min(5, "Must be 5 characters or less")
      .required("Required"),
    email: Yup.string().email("Email is invalid").required("Email is required"),
    mobile: Yup.string().required("Required"),
    location: Yup.string().required("Required"),
    dob: Yup.string().required("Required"),
    username: Yup.string().required("Required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 charaters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Password must match")
      .required("Confirm password is required"),
  });
  const initial = {
    name: "",
    email: "",
    password: "",
    mobile: "",
    location: "",
    dob: "",
    username: "",
    confirmPassword: "",
    imageSrc: photo,
    ProfilePicture: null,
  };

  const [imageFile, setImageFile] = useState(photo);
  const showPreview = (e) => {
    if (e.target.files && e.target.files[0]) {
      initial.ProfilePicture = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (x) => {
        setImageFile(imageFile);
        setImageFile(x.target.result);
      };
      reader.readAsDataURL(initial.ProfilePicture);
    }
  };
  return (
    <Formik
      initialValues={initial}
      validationSchema={validate}
      onSubmit={(values) => {
        const formData = new FormData();
        formData.append("Name", values.name);
        formData.append("Password", values.password);
        formData.append("EmailId", values.email);
        formData.append("DOB", values.dob);
        formData.append("Location", values.location);
        formData.append("Username", values.username);
        formData.append("Mobile", values.mobile);
        //   formData.append("ImageName", values.imageName);
        formData.append("ProfilePicture", values.ProfilePicture);

        console.log(formData);
        axios({
          method: "POST",
          url: baseUrl,
          data: formData,
        }).then((res) => console.log(res));
        //here naviagte for 200 ok
        navigate("/login");
      }}
    >
      {(formik) => (
        <Container className="mb-5">
          <Row>
            <Col sm="12" md="10" lg="8">
              <h1 className="my-4 font-weight-bold .display-4">Sign Up</h1>
              <Form>
                <Row className="justify-content-center mb-3">
                  <Card className="col-4 p-1 m-1 fluid">
                    <img
                      src={imageFile}
                      width="50px"
                      height="150px"
                      className="card-img-top"
                    />
                  </Card>
                </Row>
                <div className="form-control mb-3">
                  <FloatingLabel
                    className="mb-2"
                    controlId="floatingImage"
                    label="Profile Image"
                  >
                    <input
                      type="file"
                      onChange={showPreview}
                      accept="image/*"
                      className="form-control-file offset-2 p-2"
                    />
                  </FloatingLabel>
                </div>
                <TextField label="Username" name="username" type="text" />
                <TextField label="Name" name="name" type="text" />
                <TextField label="Email" name="email" type="email" />
                <TextField label="Date Of Birth" name="dob" type="date" />
                <TextField label="Mobile" name="mobile" type="text" />
                <TextField label="Location" name="location" type="text" />

                <TextField label="Password" name="password" type="password" />
                <TextField
                  label="Confirm Password"
                  name="confirmPassword"
                  type="password"
                />

                <div className="row">
                  <button
                    className="col-3 offset-2 btn btn-dark mt-3"
                    type="submit"
                  >
                    Register
                  </button>
                  <button
                    className="col-3 offset-2 btn btn-danger mt-3 "
                    type="reset"
                  >
                    Reset
                  </button>
                </div>
              </Form>
            </Col>
          </Row>
        </Container>
      )}
    </Formik>
  );
};
