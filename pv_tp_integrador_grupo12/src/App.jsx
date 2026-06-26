import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AdminProvider } from './context/AdminContext'

import Login from './views/Login'
import Header from './components/layout/Header'
import Nav from './components/layout/Nav'
import Footer from './components/layout/Footer'
import Dashboard from './views/Dashboard'
import DetalleCliente from './views/DetalleCliente'
import ListaCliente from './views/ListaClientes'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <AdminProvider>
      <Router>
      <Header/>
      <Nav/>
      <main style={{ minHeight: '80vh', padding: '20px' }}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/clientes" element={<ListaCliente />} />
            <Route path="/clientes/:id" element={<DetalleCliente />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </main>
      <Footer/>
      </Router>
    </AdminProvider>
    </>
  )
}

export default App
