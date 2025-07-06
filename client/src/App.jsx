import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import Register from './pages/Register'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'


function App() {

  return (
    <>
    <div>
  <Routes>
    <Route path="/" element={<Register />} /> 
    <Route path="/login" element={<Login />} />
    <Route path="/dashboard" element={<Dashboard />} />  
  </Routes>
  </div>
   </>
  )
}

export default App
