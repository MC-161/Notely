import { useRef, useState } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const emailRef = useRef()
  const passwordRef = useRef()
  const {login} = useAuth()
  const [error, setError] = useState()
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try{
      setError('')
      await login(emailRef.current.value, passwordRef.current.value)
      navigate('/')
    }catch(error){
      console.log(error)
      setError('Failed to Login')
    }
    setLoading(false)
  }

  return (
    <div className="Login">
      <Card>
        <Card.Body>
          <h2 className="text-center">Login</h2>
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
            <Button className="w-100 mt-2" type="submit" disabled={loading}>Login</Button>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to='/forgot-Password'>Forgot Password</Link>
          </div>
        </Card.Body> 
      </Card>
      <div className="loginLink">
        Need an account? <Link to='/Signup'>Sign Up</Link> 
      </div>
    </div>
  );
}
 
export default Login;