import React, { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { database } from "../firebase";
import { ref, child, get } from "firebase/database";
import { Container } from "react-bootstrap";
import TopSection from "../components/TopSection";
import * as constants from "../components/Constants";
import '../styles.css';
const Profile = () => {
  const { currentUser, logout } = useAuth();
  const [error, setError] = useState("");
  const [userData, setUserData] = useState("");
  const history = useHistory();

  useEffect(() => {
    const userId = currentUser.uid;
    const dbRef = ref(database);
    setError("");
    get(child(dbRef, `users/${userId}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setUserData(snapshot.val());
        }
      })
      .catch((err) => {
        setError(err);
      });
  }, [currentUser.uid]);

  async function handleLogout() {
    setError("");
    try {
      await logout();
      history.push("/login");
    } catch {
      setError("Failed to log out");
      console.log(error);
    }
  }

  return (
    <>
      
      <TopSection />
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "80vh" }}
      >
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <Card border="dark" className="border border-5 rounded">
            <Card.Body className="cardBody">
              <div className="profileTitleContainer">
                <h2 className="text-center mb-2"> Profile </h2>
              </div>
              <div className="d-flex flex-column align-items-center">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="60"
                    height="60"
                    fill="currentColor"
                    className="bi bi-person"
                    viewBox="0 0 16 16"
                  >
                    <path d={constants.SVG_AVATAR_PATH} />
                  </svg>
                </div>
                <div className="p-2 w-100 d-flex flex-row justify-content-between">
                  <div>
                    <strong> First Name:</strong>
                  </div>
                  {userData.firstName}
                </div>
                <div className="w-100">
                  <hr />
                </div>
                <div className="p-2 w-100 d-flex flex-row justify-content-between">
                  <strong> Last Name:</strong> {userData.lastName}
                </div>
                <div className="w-100">
                  <hr />
                </div>
                <div className="p-2 w-100 d-flex flex-row justify-content-between">
                  <strong> Phone Number:</strong> {userData.phoneNumber}
                </div>
                <div className="w-100">
                  <hr />
                </div>
                <div className="p-2 w-100 d-flex flex-row justify-content-between">
                  <strong> Email: </strong> {currentUser.email}
                </div>
              </div>
            </Card.Body>
          </Card>
          <div className="w-100 text-center mt-2">
            <Button variant="link" onClick={handleLogout}>
              {" "}
              Log Out
            </Button>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Profile;
