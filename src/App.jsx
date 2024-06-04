import React from 'react'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './config/AuthContext';
import { ProtectedRoutes } from './config/ProtectedRoutes';

import Home from './Pages/Home';

import Login from './Pages/Auth/Login'
import Register from './Pages/Auth/Register'

import Todo from './Pages/Todo';


function App() {

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/todo" element={
            <ProtectedRoutes>
              <Todo />
            </ProtectedRoutes>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
