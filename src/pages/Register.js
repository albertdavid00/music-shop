import React, { useRef, useState } from "react";
import { Form, Card, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useAuth } from "../contexts/AuthContext";
import { Container } from "react-bootstrap";
import TopSection from "../components/TopSection";
const Register = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const phoneNumberRef = useRef();
  const { register } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords don't match");
    }
    let regex = /^[0]\d{3}\s?\d{3}\s?\d{3}\s*$/;
    const phoneNumber = phoneNumberRef.current.value.trim();

    if (!regex.test(phoneNumber)) {
      return setError("Invalid phone number format");
    }
    try {
      setError("");
      setLoading(true);
      await register(
        emailRef.current.value,
        passwordRef.current.value,
        firstNameRef.current.value,
        lastNameRef.current.value,
        phoneNumber
      );
      history.push("/profile");
    } catch {
      setError("Failed to register");
    }
    setLoading(false);
  }
  return (
    <>
      <TopSection />

      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "90vh" }}
      >
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <Card>
            <Card.Body className="cardBody">
              <div>
                <h2 className="text-center mb-4"> Register </h2>
              </div>
              {error && (
                <Alert variant="danger" className="text-center">
                  {" "}
                  {error}{" "}
                </Alert>
              )}
              <Form onSubmit={handleSubmit}>
                <Form.Group id="firstName" className="text-center">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    ref={firstNameRef}
                    required
                    className="text-center"
                  />
                </Form.Group>
                <Form.Group id="lastName" className="text-center">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    ref={lastNameRef}
                    required
                    className="text-center"
                  />
                </Form.Group>
                <Form.Group id="phoneNumber" className="text-center">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    placeholder="e.g. 0799 999 999"
                    type="text"
                    ref={phoneNumberRef}
                    required
                    className="text-center"
                  />
                </Form.Group>
                <Form.Group id="email" className="text-center">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    ref={emailRef}
                    required
                    className="text-center"
                  />
                </Form.Group>
                <Form.Group id="password" className="text-center">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    ref={passwordRef}
                    required
                    className="text-center"
                  />
                </Form.Group>
                <Form.Group id="password-cofirm" className="text-center">
                  <Form.Label>Confirm Password </Form.Label>
                  <Form.Control
                    type="password"
                    ref={passwordConfirmRef}
                    required
                    className="text-center"
                  />
                </Form.Group>
                <Button disabled={loading} className="w-100 mt-4" type="submit">
                  Register
                </Button>
              </Form>
            </Card.Body>
          </Card>
          <div className="w-100 text-center mt-2">
            Already have an account? <Link to="/login">Log In</Link>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Register;
