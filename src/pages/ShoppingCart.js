import React from "react";
import TopSection from "../components/TopSection";
import { useSelector } from "react-redux";
import { shoppingCartSelector } from "../store/shoppingcart.slice";
import { Link } from "react-router-dom";
import GuitarCard from "../components/GuitarCard";
import { Grid } from "@mui/material";

export default function ShoppingCart() {
  const shoppingCart = useSelector(shoppingCartSelector);

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
              <span>
                {" "}
                <h3>
                  <strong>Empty </strong>
                </h3>{" "}
              </span>
            )}
            {shoppingCart.length !== 0 && (
              <div className="shopping-cart-container ">
                <Grid container spacing={2} className="mt-5">
                  {shoppingCart.map((guitar) => {
                    return (
                      <Grid item xs={4} key={guitar.id} zeroMinWidth>
                        <GuitarCard guitar={guitar} hiddenButton={"true"} />
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
                  <div className="d-flex flex-row justify-content-between pt-2 pb-2">
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
          </div>
        </div>
      </div>
    </>
  );
}
