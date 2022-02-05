import React, { useRef, useState } from "react";
import TopSection from "../components/TopSection";
import { useSelector } from "react-redux";
import {
  removeAllItems,
  shoppingCartSelector,
} from "../store/shoppingcart.slice";
import GuitarCard from "../components/GuitarCard";
import { Grid } from "@mui/material";
import { useDispatch } from "react-redux";
import { removeFromShoppingCart } from "../store/shoppingcart.slice";
import { Form, Button } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { v4 as uuid } from "uuid";
import { auth, database } from "../firebase";
import { ref, set } from "firebase/database";

export default function ShoppingCart() {
  const deilveryAddress = useRef();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [orderSuccessMessage, setOrderSuccessMessage] = useState("");
  const { currentUser } = useAuth();
  const shoppingCart = useSelector(shoppingCartSelector);
  const dispatch = useDispatch();

  const getItemPrice = (price, qty) => {
    let priceDigits = price.slice(0, -1);
    let finalPrice = parseInt(priceDigits) * parseInt(qty);

    return finalPrice.toString() + "$";
  };
  const getTotalPrice = () => {
    let total = 0;
    shoppingCart.forEach((item) => {
      let price = getItemPrice(item.price, item.qty);
      let priceDigits = price.slice(0, -1);
      total += parseInt(priceDigits);
    });
    return total.toString() + "$";
  };

  const handleOnRemoveFromCart = (item) => {
    dispatch(removeFromShoppingCart(item));
  };

  const placeOrder = (email, products, address) => {
    return set(ref(database, "orders/" + uuid()), {
      email: email,
      products: products,
      address: address,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (shoppingCart.length < 1) return setError("Shopping cart is empty!");
    try {
      setError("");
      setLoading(true);
      await placeOrder(
        currentUser.email,
        shoppingCart,
        deilveryAddress.current.value
      );
    } catch {
      setError("Failed to place order");
    }
    setLoading(false);
    dispatch(removeAllItems());
    deilveryAddress.current = "";
    console.log(deilveryAddress.current.value);
    e.target.reset();
    setOrderSuccessMessage("The order has been placed!");
  };

  return (
    <>
      <TopSection />
      <div className="w-100 mt-5 d-flex justify-content-around">
        <div className="big-container d-flex flex-row text-center justify-content-between">
          <div className="cart-big-div">
            <h3>
              <strong>Shopping Cart</strong>
            </h3>
            {shoppingCart.length === 0 && (
              <>
                <span>
                  {" "}
                  <h3 className="mt-3">
                    <strong>Empty </strong>
                  </h3>{" "}
                </span>
                {orderSuccessMessage && (
                  <div className="mt-4">
                    <h3>
                      {" "}
                      <strong>{orderSuccessMessage}</strong>
                    </h3>
                  </div>
                )}
              </>
            )}
            {shoppingCart.length !== 0 && (
              <div className="shopping-cart-container ">
                <Grid container spacing={2} className="mt-5">
                  {shoppingCart.map((guitar) => {
                    return (
                      <Grid item xs={4} key={guitar.id} zeroMinWidth>
                        <GuitarCard
                          guitar={guitar}
                          hiddenButton={true}
                          handleOnRemoveFromCart={handleOnRemoveFromCart}
                        />
                      </Grid>
                    );
                  })}
                </Grid>
              </div>
            )}
          </div>

          <div className="w-25 items">
            <h3>
              <strong>Total</strong>
            </h3>
            <div className="w-100 mt-5 total-container">
              {shoppingCart.map((product) => {
                return (
                  <div
                    key={product.id}
                    className="d-flex flex-row justify-content-between pt-2 pb-2"
                  >
                    <div>
                      <strong>
                        {product.brand} {product.model}{" "}
                      </strong>
                      x {product.qty}
                    </div>
                    <div>
                      <strong>
                        {getItemPrice(product.price, product.qty)}
                      </strong>
                    </div>
                  </div>
                );
              })}
              <hr />
              <div className="d-flex flex-row justify-content-between h4">
                <div>
                  <strong> Total </strong>
                </div>
                <div>
                  <strong> {getTotalPrice()} </strong>
                </div>
              </div>
            </div>
            <div className="w-100 mt-4 pl-4">
              <Form
                onSubmit={handleSubmit}
                className="w-75"
                style={{ marginLeft: "20%" }}
              >
                <Form.Group id="Delivery Address" className="text-center">
                  <Form.Label>
                    <strong>Delivery Address</strong>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    ref={deilveryAddress}
                    required
                    className="text-center"
                  />
                </Form.Group>
                <Button
                  disabled={loading || shoppingCart.length < 1}
                  className="w-100 mt-1 btn-success"
                  type="submit"
                >
                  Order
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
