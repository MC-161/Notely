import './App.css';
import Navbar from './Navbar';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation} from 'react-router-dom';
import Home from './Home';
import NoteDetails from './NoteDetails';
import NotFound from '../NotFound';
import Create from './Create';
import Login from './Login';
import Signup from './Signup';
import AuthProvider from '../contexts/AuthContext';
import ForgotPassword from './forgotPassword';

function App() {
  return (
      <Router>
        <div className="App">
        <AuthProvider>
        <Navbar />
          <div className="content">
            <Routes>
              <Route exact path='/' element={<Home />} />
              <Route exact path='/create' element={<Create/>} />
              <Route exact path='/notes/:id' element={<NoteDetails />}/>
              <Route exact path='/Login' element={<Login />}/>
              <Route exact path='/Signup' element={<Signup />}/>
              <Route exact path="/forgot-Password" element={<ForgotPassword />} />
              <Route path='*' element={<NotFound />}/>
            </Routes>
          </div>

        </AuthProvider>
        </div>
      </Router>
  );
}

export default App;
