import React from 'react';
import { Routes, Route } from 'react-router-dom';

import './App.css';

import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Users from './components/users/Users';

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/users' element={<Users />} />
      </Routes>
      
    </>
  )
}

export default App;