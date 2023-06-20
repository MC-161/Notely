import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "react-bootstrap";
import { useState } from "react";


const Navbar = () => {
  const {currentUser, logout} = useAuth()
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogout = async() => {
    setError('')
    try{
      await logout()
      navigate('/Login')
    }catch{
      setError('Failed to Logout')
    }
  }

  return ( 
    <nav className="navbar">
      <Link to='/'>
      <h1>NOTELY</h1>
      </Link>
      <div className="links">
        <Link to='/'>HOME</Link>
        <Link className="new_btn" to='/create'>NEW NOTE</Link>
        {currentUser ? <Link onClick={handleLogout} className="new_btn mt-3" to='/Login'>Log Out</Link> : <Link className="new_btn" to='/Login'>Login</Link>}
      </div>
    </nav>
  );
}
 
export default Navbar
