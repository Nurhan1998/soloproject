import React, { useContext, useEffect, useState } from "react";
import { Navbar, Nav, Form, Button } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { FaCartPlus } from "react-icons/fa";
import { cartContext } from "../contexts/CartContext/CartContext";

const NaviBar = () => {
  const history = useHistory();
  const user = localStorage.getItem("user");
  const handleLogOut = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    history.push("/login");
  };
  const [isAdmin, setIsAdmin] = useState(false);
  const { carts } = useContext(cartContext);
  useEffect(() => {
    const admin = localStorage.getItem("role");

    if (admin) {
      setIsAdmin(true);
    }
  }, []);

  return (
    <Navbar expand="lg" sticky="top" bg="white">
      <Link to="/">
        <img
          style={{ width: "50px", height: "50px" }}
          src="https://thumbs.dreamstime.com/b/vintage-denim-jeans-frame-logo-classical-clothing-line-label-great-retro-badge-shop-more-78791983.jpg"
        />
      </Link>

      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto ml-auto">
          <Link className="nav-link" to="/list" variant="outline-info">
            <strong>Shop</strong>
          </Link>

          <Link className="nav-link" to="/" variant="outline-info">
            <strong>Main</strong>
          </Link>

          <Link className="nav-link" to="/" variant="outline-info">
            <strong>Home</strong>
          </Link>

          <Link className="nav-link" to="/payment" variant="outline-info">
            <strong>Payment</strong>
          </Link>
        </Nav>

        <Form inline>
          <h5>{user}</h5>
          {isAdmin ? (
            <Button
              variant="outline-danger"
              className="mr-3 ml-3 rounded-pill border border-dark"
              onClick={() => history.push("/add")}
              size="sm"
            >
              Add Product
            </Button>
          ) : (
            <Button
              variant="outline-primary"
              size="sm"
              className="mr-3 ml-3 rounded-pill border border-primary"
              onClick={() => history.push("/cart")}
            >
              <FaCartPlus />
              <span>{carts.length ? carts.length : null}</span>
            </Button>
          )}

          {user ? (
            <Button
              variant="outline-danger"
              className="rounded-pill border border-dark"
              size="sm"
              onClick={() => handleLogOut()}
            >
              Log Out
            </Button>
          ) : (
            <>
              <Link to="/register">
                <Button
                  variant="outline-danger"
                  className="mr-3 rounded-pill border border-dark"
                  size="sm"
                >
                  Sign Up
                </Button>
              </Link>
              <Button
                variant="outline-danger"
                className="rounded-pill border border-dark"
                size="sm"
                onClick={() => history.push("/login")}
              >
                Log In
              </Button>
            </>
          )}
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NaviBar;
