import React from "react";
import Jumbotron from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

const Checkout = () => {
  return (
    <Jumbotron className="login-container">
      <h1>Thanks for using our cart ✌🏽</h1>
      <p>Checkout functionality will be implemented soon! 🤞🏽</p>
      <p>
        <Button bsStyle="primary">
          <Link to={"/home"} style={{ color: "#fff" }}>
            Back to Cart
          </Link>
        </Button>
      </p>
    </Jumbotron>
  );
};

export default Checkout;
