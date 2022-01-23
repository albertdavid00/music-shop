import { child, get, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import GuitarCard from "../components/GuitarCard";
import TopSection from "../components/TopSection";
import { database } from "../firebase";
import "../styles.css";
import { Grid } from "@mui/material";
import { useAuth } from "../contexts/AuthContext";
import { Alert } from "react-bootstrap";

export default function Guitars() {
  const [guitars, setGuitars] = useState([]);
  const [error, setError] = useState("");
  const { currentUser } = useAuth();
  const [userData, setUserData] = useState();

  
  const addItemToCartDB = async (item) => {
    
    console.log(userData);
  };

  const handleOnAddToCart = async (guitar) => {
    setError("");
    if (!currentUser) {
      setError("You must be logged in to add items to cart!");
      window.scrollTo(0, 0);
      return;
    }
    await addItemToCartDB(guitar);
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
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <TopSection />
      <div className="w-100 d-flex flex-row justify-content-center">
        <div className="w-25 mainContent h-100 d-flex flex-column align-items-center justify-content-center filtersContainer">
          <div className="text-center">
            <strong>
              <h3>
                <i>Grab a guitar and start playing now!</i>
              </h3>
            </strong>
            
          </div>
          <div className="mt-4">
            <h4>Filters</h4>
          </div>
        </div>
        <div className="ml-4 d-flex flex-row gridContainer justify-content-center mainContent">
          <div className="d-flex flex-column align-items-center">
          {error && <Alert className="w-50 text-center" variant="danger"> {error} </Alert>}
            <Grid container spacing={2} className="mainGrid">
              {guitars.map((guitar) => {
                return (
                  <Grid item xs={4.1} key={guitar.id} zeroMinWidth>
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

// {guitars.map((guitar) => {
//   return (
//     <>
//       <div key={guitar.id}>
//         <GuitarCard guitar={guitar} />
//       </div>
//       <br />
//       <br />
//     </>
//   );
// })}
