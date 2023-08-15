import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  FormControl,
  Navbar,
  Dropdown,
  Badge,
  Button,
} from "react-bootstrap";

import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { CartState } from "../Context/Context";
import { AiFillDelete } from "react-icons/ai";
import { logout } from "../services/authenticate";
import userpool from "../userpool";
import "./styles.css";

const Header = () => {
  const Navigate = useNavigate();

  useEffect(() => {
    let user = userpool.getCurrentUser();
    console.log(user);

    if (!user) {
      Navigate("/login");
    }
  }, []);

  const handleLogout = () => {
    logout();
  };

  const {
    state: { cart },
    dispatch,
    productDispatch,
  } = CartState();
  return (
    <Navbar bg="dark" variant="dark" style={{ height: 80 }}>
      <Container>
        <Navbar.Brand>
          <Link to="/home" className="link-header">
            Shopping Cart
          </Link>
        </Navbar.Brand>
        <Navbar.Text className="search">
          <FormControl
            style={{ width: 500 }}
            placeholder="Search"
            className="m-auto"
            onChange={(e) => {
              productDispatch({
                type: "FILTER_BY_SEARCH",
                payload: e.target.value,
              });
            }}
          />
        </Navbar.Text>
        <Dropdown className="m-2" alignRight>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            <FaShoppingCart color="white" fontSize={25} />
            <Badge>{cart.length}</Badge>
          </Dropdown.Toggle>

          <Dropdown.Menu style={{ minWidth: 300 }}>
            {cart.length > 0 ? (
              <>
                {cart.map((prod) => (
                  <span className="cartitem" key={prod.id}>
                    <img
                      src={prod.image}
                      className="cartItemImg"
                      alt={prod.name}
                    />
                    <div className="cartItemDetail">
                      <span>{prod.name}</span>
                      <span>${prod.price.split(".")[0]}</span>
                    </div>
                    <AiFillDelete
                      fontSize="20px"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        dispatch({
                          type: "REMOVE_FROM_CART",
                          payload: prod,
                        });
                      }}
                    />
                  </span>
                ))}
                <Link to="/cart">
                  <Button style={{ width: "95%", margin: "0 10px" }}>
                    Go to Cart
                  </Button>
                </Link>
              </>
            ) : (
              <span style={{ padding: 10 }}>Cart Empty!</span>
            )}
          </Dropdown.Menu>
        </Dropdown>
      </Container>
      <Button variant="danger" onClick={handleLogout} className="m-2">
        Logout
      </Button>
    </Navbar>
  );
};

export default Header;
