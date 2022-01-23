import { faGuitar, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";

export default function TopSection() {
  const { currentUser } = useAuth();
  return (
    <>
      <Navbar style={{ backgroundColor: "#ffe499" }} variant="light">
        <Container>
          <Navbar.Brand href="/">
            <FontAwesomeIcon size="lg" icon={faGuitar} />
            <span className="m-1">Guitar Shop</span>
          </Navbar.Brand>
          <Nav className="ms-auto">
            {currentUser && (
              <>
                <Nav.Link href="/profile">Hi, {currentUser.email}</Nav.Link>
                <Nav.Link href="/shopping-cart">
                  <FontAwesomeIcon size='lg' icon={faShoppingCart}/>
                </Nav.Link>
              </>
            )}
            {!currentUser && (
              <Nav.Link href="/login" className="ml-auto">
                {" "}
                Login{" "}
              </Nav.Link>
            )}
            {!currentUser && (
              <Nav.Link href="/register" className="ml-auto">
                {" "}
                Register{" "}
              </Nav.Link>
            )}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}
