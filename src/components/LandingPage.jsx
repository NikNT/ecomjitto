import Jumbotron from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import React from "react";
import { Link } from "react-router-dom";
import "./stylesForm.css";

const LandingPage = () => {
  return (
    <Jumbotron className="login-container">
      <h1>Hi there ✌🏽</h1>
      <p>
        Welcome to a basic e-commerce shopping cart powered by ReactJS and AWS
        Cognito
      </p>
      <p>Login or create an account first and get started right away!</p>
      <p>
        <Button bsStyle="primary">
          <Link to={"/login"} style={{ color: "#fff" }}>
            Continue to Login
          </Link>
        </Button>
      </p>
    </Jumbotron>
  );
};

export default LandingPage;
