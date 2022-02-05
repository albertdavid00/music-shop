import React, { useRef, useState } from "react";
import { Form, Card, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import TopSection from "../components/TopSection";
const ForgotPassword = () => {
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setMessage("");
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage("A message has been sent to your email address.");
    } catch {
      setError("Failed to reset password.");
    }
    setLoading(false);
  }
  return (
    <>
      <TopSection />
      
      <div className="w-100 d-flex justify-content-center mt-5">
        <Card className="w-25">
          <Card.Body className="cardBody">
            <h2 className="text-center mb-4"> Reset Password </h2>
            {error && (
              <Alert variant="danger" className="text-center">
                {" "}
                {error}{" "}
              </Alert>
            )}
            {message && (
              <Alert variant="success" className="text-center">
                {" "}
                {message}
              </Alert>
            )}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="email" className="text-center">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  ref={emailRef}
                  required
                  className="text-center"
                />
              </Form.Group>

              <Button disabled={loading} className="w-100 mt-4" type="submit">
                Reset Password
              </Button>
            </Form>
            <div className="w-100 text-center mt-3">
              <Link to="/login"> Login </Link>
            </div>
          </Card.Body>
        </Card>
      </div>
      <div className="w-100 text-center mt-2">
        Don't have an account? <Link to="/register">Register</Link>
      </div>
    </>
  );
};

export default ForgotPassword;
