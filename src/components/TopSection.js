import { faGuitar, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { useSelector } from "react-redux";
import { shoppingCartSelector } from "../store/shoppingcart.slice";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
export default function TopSection() {
  const { currentUser } = useAuth();
  const shoppingCart = useSelector(shoppingCartSelector);
  const history = useHistory();

  const handleClick = (path) => {
    history.push(`${path}`);
  };

  const getNumOfItems = () => {
    let numItems = 0;
    shoppingCart.forEach(item =>{
      numItems += parseInt(item.qty);
    })
    return numItems;
  }

  return (
    <>
      <Navbar style={{ backgroundColor: "#ffe499", borderBottom: '2px solid'}} variant="light">
        <Container>
          <div className="divLink" onClick={() => handleClick("/")}>
            <FontAwesomeIcon size="2x" icon={faGuitar} />
            <span className="m-1 h2">Guitar Shop</span>
          </div>
          <Nav className="ms-auto">
            {currentUser && (
              <>
                <div className="divLink" onClick={() => handleClick("/profile")}>
                  Hi, {currentUser.email}!
                </div>
                <div className="divLink divNavMarg" onClick={() => handleClick('/shopping-cart')}>
                  <FontAwesomeIcon size="lg" icon={faShoppingCart} />
                  {getNumOfItems()}
                </div>
              </>
            )}
            {!currentUser && (
              <div className="divLink ml-auto" onClick={() => handleClick("/login")}>
                {" "}
                Login{" "}
              </div>
            )}
            {!currentUser && (
              <div className="divLink divNavMarg" onClick={() => handleClick("/register")}>
                {" "}
                Register{" "}
              </div>
            )}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}
