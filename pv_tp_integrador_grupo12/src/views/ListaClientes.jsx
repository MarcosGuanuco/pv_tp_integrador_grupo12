import { useState, useEffect } from 'react';
import { Container, Typography, TextField, CircularProgress, Alert, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Button } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from 'react-router-dom';

export default function ListaClientes() {
  const navigate = useNavigate();
  
  // Estados requeridos por la consigna
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [busqueda, setBusqueda] = useState('');

  useEffect(() => {
    const obtenerClientes = async () => {
      try {
        setLoading(true);
        const respuesta = await fetch('https://fakestoreapi.com/users');
        
        if (!respuesta.ok) {
          throw new Error('No se pudo conectar con el servidor de clientes.');
        }
        
        const datos = await respuesta.json();
        setClientes(datos);
        setError(null);
      } catch (err) {
        setError(err.message || 'Ocurrió un error al cargar los datos.');
      } finally {
        setLoading(false);
      }
    };

    obtenerClientes();
  }, []);

  const clientesFiltrados = clientes.filter(cliente => {
    const termino = busqueda.toLowerCase();
    const apellido = cliente.name?.lastname?.toLowerCase() || '';
    const ciudad = cliente.address?.city?.toLowerCase() || '';
    return apellido.includes(termino) || ciudad.includes(termino);
  });

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress size={60} />
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ mt: 4 }}>
        <Alert severity="error" variant="filled">
          {error} — Intente recargar la página más tarde.
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#2c3e50' }}>
        Panel de Control de Clientes
      </Typography>

      <TextField fullWidth label="Buscar cliente por apellido o ciudad..." variant="outlined" margin="normal" value={busqueda} onChange={(e) => setBusqueda(e.target.value)} sx={{ mb: 3 }}/>

      <TableContainer component={Paper} elevation={3}>
        <Table sx={{ minWidth: 650 }} aria-label="tabla de clientes">
          <TableHead sx={{ backgroundColor: '#1976d2' }}>
            <TableRow>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>ID</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Nombre Completo</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Email</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Teléfono</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Ciudad</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold', align: 'center' }}>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clientesFiltrados.length > 0 ? (
              clientesFiltrados.map((cliente) => (
                <TableRow key={cliente.id} hover>
                  <TableCell>{cliente.id}</TableCell>
                  <TableCell sx={{ textTransform: 'capitalize' }}>
                    {cliente.name.firstname} {cliente.name.lastname}
                  </TableCell>
                  <TableCell>{cliente.email}</TableCell>
                  <TableCell>{cliente.phone}</TableCell>
                  <TableCell sx={{ textTransform: 'capitalize' }}>{cliente.address.city}</TableCell>
                  <TableCell>
                    <Button variant="outlined" size="small" 
                      startIcon={<VisibilityIcon />}
                      onClick={() => navigate(`/clientes/${cliente.id}`)}
                    >
                      Ver Ficha
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 3 }}>
                  No se encontraron clientes que coincidan con la búsqueda.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}