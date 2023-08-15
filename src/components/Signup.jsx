import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CognitoUserAttribute } from "amazon-cognito-identity-js";
import { Link } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import userpool from "../userpool";

import "./stylesForm.css";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");

  const [showMessage, setShowMessage] = useState(false);

  const formInputChange = (formField, value) => {
    formField === "email" ? setEmail(value) : setPassword(value);
  };

  const navigate = useNavigate();

  const validation = () => {
    return new Promise((resolve, reject) => {
      if (email === "" && password === "") {
        setEmailErr("Email is Required");
        setPasswordErr("Password is Required");
        resolve({
          email: "Email is required",
          password: "Password is required",
        });
      } else if (email === "") {
        setEmailErr("Email is Required");
        resolve({ email: "Email is Required", password: "" });
      } else if (password === "") {
        setPasswordErr("Password is required");
        resolve({ email: "", password: "Password is required" });
      } else if (password.length < 6) {
        setPasswordErr("must be 6 character");
        resolve({ email: "", password: "must be 6 character" });
      } else {
        resolve({ email: "", password: "" });
      }
      reject("");
    });
  };

  const handleClick = (e) => {
    e.preventDefault();
    setEmailErr("");
    setPasswordErr("");

    validation()
      .then((validationErrors) => {
        if (!validationErrors.email && !validationErrors.password) {
          // Clear the error messages here
          setEmailErr("");
          setPasswordErr("");

          const attributeList = [
            new CognitoUserAttribute({
              Name: "email",
              Value: email,
            }),
          ];
          let username = email;
          userpool.signUp(
            username,
            password,
            attributeList,
            null,
            (err, data) => {
              if (err) {
                console.log(err);
                alert("Couldn't sign up");
              } else {
                console.log(data);
                alert("User Added Successfully");
                setShowMessage(true);
                navigate("/login");
              }
            }
          );
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="login-container">
      <h1>Sign Up</h1>
      <Form onSubmit={handleClick} className="login-form">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={(e) => formInputChange("email", e.target.value)}
          />
          {emailErr && <p className="error">{emailErr}</p>}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(e) => formInputChange("password", e.target.value)}
          />
          {passwordErr && <p className="error">{passwordErr}</p>}
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      <Link to="/login" className="link">
        Have an account? Sign In.
      </Link>
      {showMessage && <h1>Hey 🙋🏽‍♂️ You can now sign in</h1>}
    </div>
  );
};

export default Signup;
