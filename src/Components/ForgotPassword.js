import { useState, useRef } from "react";
import { Card, Button, Form } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const emailRef = useRef()
  const {passwordReset} = useAuth()
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit =  async(e) => {
    e.preventDefault()
    try{
      setMessage('')
      setLoading(true)
      setError('')
      await passwordReset(emailRef.current.value)
      setMessage('Check your Inbox to reset')
    }catch{
      setError('Reset Email Not Sent')
    }
  }

  return (
    <div className="forgotPassword">
      <Card>
        <Card.Body>
          <h2 className="text-center">Password Reset</h2>
          <Form>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control type='email' ref={emailRef} required></Form.Control>
            </Form.Group>
            <Button className="w-100 mt-2" type="submit" disabled={loading}>Reset</Button>
          </Form>
          <div className="loginLink text-center">
            <Link to='/Login'>Log in</Link>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
 
export default ForgotPassword;