import { useRef, useState } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import createCollectionForUser from "./CreateCollection";

const Signup = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords Do Not Match");
    }

    setLoading(true);
    try {
      setError("");
      await signup(emailRef.current.value, passwordRef.current.value);
      createCollectionForUser()
      navigate('/Login')
    } catch (error) {
      console.log(error);
      setError("Failed to create an account");
    }
    setLoading(false);
  };


  return (
    <div className="Signup">
      <Card>
        <Card.Body>
          <h2 className="text-center">Sign Up</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required></Form.Control>
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required></Form.Control>
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control type="password" ref={passwordConfirmRef} required></Form.Control>
            </Form.Group>
            <Button className="w-100 mt-2" type="submit" disabled={loading}>Sign Up</Button>
          </Form>
        </Card.Body> 
      </Card>
      <div className="loginLink">
        Already have an account? <Link to='/Login'>Log in</Link>
      </div>
    </div>
  );
}
 
export default Signup;