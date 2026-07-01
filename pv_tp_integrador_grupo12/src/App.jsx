import { useContext } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AdminProvider, AdminContext } from './context/AdminContext'

import Login from './views/Login'
import Header from './components/layout/Header'
import Nav from './components/layout/Nav'
import Footer from './components/layout/Footer'
import Dashboard from './views/Dashboard'
import DetalleCliente from './views/DetalleCliente'
import ListaCliente from './views/ListaClientes'

function AppContent() {
  const { admin } = useContext(AdminContext);

  return (
    <Router>
      <Header />
      {admin && <Nav />}
      
      <main style={{ minHeight: '80vh', padding: '20px' }}>
        <Routes>
          <Route path="/login" element={!admin ? <Login /> : <Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={admin ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/clientes" element={admin ? <ListaCliente /> : <Navigate to="/login" />} />
          <Route path="/clientes/:id" element={admin ? <DetalleCliente /> : <Navigate to="/login" />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

function App() {
  return (
    <AdminProvider>
      <AppContent />
    </AdminProvider>
  )
}

export default App;