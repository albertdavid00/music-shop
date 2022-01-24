import { child, get, ref } from "firebase/database";
import React, { useEffect, useRef, useState } from "react";
import GuitarCard from "../components/GuitarCard";
import TopSection from "../components/TopSection";
import { database } from "../firebase";
import "../styles.css";
import { Grid, Radio } from "@mui/material";
import { useAuth } from "../contexts/AuthContext";
import {
  Alert,
  Button,
  ButtonGroup,
  Form,
  ToggleButton,
} from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addToShoppingCart } from "../store/shoppingcart.slice";
import { Link } from "react-router-dom";
import { faSearch, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Guitars() {
  const [guitars, setGuitars] = useState([]);
  const [error, setError] = useState("");
  const { currentUser } = useAuth();
  const [filteredData, setFilteredData] = useState([]);
  const [checked, setChecked] = useState(false);
  const [radioValue, setRadioValue] = useState("default");
  const searchItemRef = useRef();
  const dispatch = useDispatch();

  const getRadios = () => {
    let set = new Set();
    guitars.map((guitar) => set.add(guitar.brand));
    let radiosArray = [{ name: "All Brands", value: "default" }];
    set.forEach(function (brand) {
      radiosArray = [...radiosArray, { name: brand, value: brand }];
    });
    return radiosArray;
  };
  const radios = getRadios();

  const handleOnAddToCart = (guitar) => {
    setError("");
    if (!currentUser) {
      setError("You must be logged in to add items to cart!");
      window.scrollTo(0, 0);
      return;
    }
    dispatch(addToShoppingCart(guitar));
  };

  useEffect(() => {
    const dbRef = ref(database);
    get(child(dbRef, `guitars`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          let guitarsData = [];
          snapshot.forEach(function (childSnapshot) {
            let key = childSnapshot.key;
            let childData = childSnapshot.val();
            guitarsData.push({ id: key, ...childData });
          });
          setGuitars(guitarsData);
          setFilteredData(guitarsData);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const checkGuitar = (guitar) => {
    const item = (guitar.brand + " " + guitar.model).toLowerCase();
    let result = item.includes(searchItemRef.current.value.toLowerCase());
    return result;
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const data = guitars.filter(checkGuitar);
    setFilteredData(data);
  };

  useEffect(() => {
    if (radioValue === "default"){
      setFilteredData(guitars);
      return;
    }
    const data = guitars.filter((guitar) => {
      const item = guitar.brand;
      let result = item.includes(radioValue);
      return result;
    });
    setFilteredData(data);
  }, [radioValue]);

  return (
    <>
      <TopSection />

      <div className="w-100 d-flex flex-row justify-content-around">
        <div className="w-25 mainContent h-100 d-flex flex-column align-items-center justify-content-center filtersContainer">
          <div className="text-center">
            <strong>
              <h3>
                <i>Grab a guitar and start playing now!</i>
              </h3>
            </strong>
          </div>
          <div className="mt-4 d-flex flex-column align-items-center">
            <div className="search-container">
              <Form className="d-flex flex-row">
                <Form.Group>
                  <Form.Control
                    type="text"
                    ref={searchItemRef}
                    placeholder="Search guitar..."
                    onChange={handleSubmit}
                  />
                </Form.Group>
              </Form>
            </div>
            <div className="mt-4 w-100 text-center">
              <h4>
                <strong>Filter by brand</strong>
              </h4>
              <div className="filter-container mt-2 ">
                <ButtonGroup className="d-flex flex-column">
                  {radios.map((radio, idx) => (
                    <ToggleButton
                      className="border-bottom"
                      key={idx}
                      id={`radio-${idx}`}
                      type="radio"
                      variant="outline"
                      name="radio"
                      value={radio.value}
                      checked={radioValue === radio.value}
                      onChange={(e) => setRadioValue(e.currentTarget.value)}
                    >
                      <strong>{radio.name}</strong>
                    </ToggleButton>
                  ))}
                </ButtonGroup>
              </div>
            </div>
          </div>
        </div>
        <div className="ml-4 d-flex flex-row gridContainer justify-content-center mainContent">
          <div className="d-flex flex-column align-items-center">
            {error && (
              <Alert className="w-50 text-center" variant="danger">
                {" "}
                {error}{" "}
              </Alert>
            )}
            <Grid
              container
              spacing={filteredData.length < 3 ? 20 : 4}
              className="mainGrid"
            >
              {filteredData.map((guitar) => {
                return (
                  <Grid item xs={4} key={guitar.id} zeroMinWidth>
                    <GuitarCard
                      guitar={guitar}
                      handleOnAddToCart={handleOnAddToCart}
                    />
                  </Grid>
                );
              })}
            </Grid>
          </div>
        </div>
      </div>
    </>
  );
}
