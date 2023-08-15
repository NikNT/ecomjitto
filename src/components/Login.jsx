import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authenticate } from "../services/authenticate";
import "./stylesForm.css";
import { Link } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [loginErr, setLoginErr] = useState("");

  const [isLogin, setIsLogin] = useState(false);

  const navigate = useNavigate();

  const formInputChange = (formField, value) => {
    if (formField === "email") {
      setEmailErr("");
      setEmail(value);
    }
    if (formField === "password") {
      setPasswordErr("");
      setPassword(value);
    }
  };

  const validation = () => {
    return new Promise((resolve, reject) => {
      if (email === "" && password === "") {
        setEmailErr("Email is Required");
        setPasswordErr("Password is required");
        resolve({
          email: "Email is Required",
          password: "Password is required",
        });
      } else if (email === "") {
        setEmailErr("Email is Required");
        resolve({ email: "Email is Required", password: "" });
      } else if (password === "") {
        setPasswordErr("Password is required");
        resolve({ email: "", password: "Password is required" });
      } else {
        resolve({ email: "", password: "" });
      }
    });
  };

  const handleClick = (e) => {
    e.preventDefault(); // Prevent the default form submission

    setEmailErr("");
    setPasswordErr("");
    validation()
      .then(
        (res) => {
          if (res.email === "" && res.password === "") {
            authenticate(email, password)
              .then(
                (data) => {
                  setLoginErr("");
                  setIsLogin(true);
                  navigate("/home");
                },
                (err) => {
                  console.log(err);
                  setLoginErr(err.message);
                }
              )
              .catch((err) => console.log(err));
          }
        },
        (err) => console.log(err)
      )
      .catch((err) => console.log(err));
  };

  return (
    <div className="login-container">
      {isLogin && <h1>Welcome</h1>}
      <h1>Login</h1>
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
      <Link to="/signup" className="link">
        Sign Up Here
      </Link>
    </div>
  );
};

export default Login;
