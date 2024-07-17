import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Membership from './components/Membership';
import PrivateRoute from './PrivateRoute';
import Navbar from './components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Callback from './components/Callback';

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <div className="container mt-4">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/auth/:token" element={<Callback />} />
            <Route path="/membership" element={<PrivateRoute />}>
              <Route path="/membership" element={<Membership />} />
            </Route>
            <Route path="/" element={<Login />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
