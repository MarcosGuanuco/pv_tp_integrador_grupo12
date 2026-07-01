import { useState, useContext } from 'react';
import { AdminContext } from '../context/AdminContext';
import { useNavigate } from 'react-router-dom';
import { Container, Paper, Typography, TextField, Button, FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';

export default function Login() {
  const { loginAdmin } = useContext(AdminContext);
  const navigate = useNavigate();

  const [nombre, setNombre] = useState('');
  const [sector, setSector] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (nombre.trim() === '' || sector === '') {
      alert('Por favor, completa todos los campos.');
      return;
    }
    
    loginAdmin(nombre, sector);
    navigate('/dashboard');
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Paper elevation={3} sx={{ padding: 4, width: '100%', borderRadius: 2 }}>
          <Typography component="h1" variant="h5" align="center" gutterBottom sx={{ fontWeight: 'bold' }}>
            Acceso Administrador
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Nombre del Administrador"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              autoFocus
            />
            <FormControl fullWidth margin="normal" required>
              <InputLabel id="sector-label">Sector de la Empresa</InputLabel>
              <Select
                labelId="sector-label"
                label="Sector de la Empresa"
                value={sector}
                onChange={(e) => setSector(e.target.value)}
              >
                <MenuItem value="Soporte">Soporte</MenuItem>
                <MenuItem value="Gerencia">Gerencia</MenuItem>
              </Select>
            </FormControl>
            <Button type="submit" fullWidth variant="contained" color="primary" startIcon={<LoginIcon />} sx={{ mt: 3, mb: 2 }}>
              Ingresar
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}