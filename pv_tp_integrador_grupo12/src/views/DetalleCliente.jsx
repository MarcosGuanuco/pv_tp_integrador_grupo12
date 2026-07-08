import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AdminContext } from '../context/AdminContext';
import {
  Container, Typography, Card, CardContent, Grid, Button,
  CircularProgress, Box, Divider, Paper, Avatar,
  Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import HomeIcon from '@mui/icons-material/Home';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const InfoCard = ({ icon, title, children }) => (
  <Card variant="outlined" sx={{ borderRadius: 2, height: '100%', bgcolor: '#fdfdfd' }}>
    <CardContent>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
        {icon}
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#1a237e' }}>{title}</Typography>
      </Box>
      <Divider sx={{ mb: 2 }} />
      {children}
    </CardContent>
  </Card>
);

export default function DetalleCliente() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { admin } = useContext(AdminContext);

  const [cliente, setCliente] = useState(null);
  const [loading, setLoading] = useState(true);       
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [eliminado, setEliminado] = useState(false);  

  const buscarCliente = async () => {
    try {
      setLoading(true);
      const clientesLocal = JSON.parse(localStorage.getItem("clientes")) || [];
      const clienteLocal = clientesLocal.find(c => String(c.id) === String(id));
      if (clienteLocal) { setCliente(clienteLocal); return; }

      const res = await fetch(`https://fakestoreapi.com/users/${id}`);
      if (!res.ok) throw new Error("No encontrado");
      const data = await res.json();
      setCliente(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    buscarCliente();
  }, [id]);

  const handleEliminar = async () => {
    try {
      await fetch(`https://fakestoreapi.com/users/${id}`, { method: 'DELETE' });

      const clientesLocal = JSON.parse(localStorage.getItem("clientes")) || [];
      const actualizados = clientesLocal.filter(c => String(c.id) !== String(id));
      localStorage.setItem("clientes", JSON.stringify(actualizados));

      const eliminados = JSON.parse(localStorage.getItem("clientes_eliminados") || "[]");
      const nuevos = [...new Set([...eliminados, String(id)])];
      localStorage.setItem("clientes_eliminados", JSON.stringify(nuevos));

      setConfirmOpen(false);
      setEliminado(true);
      setTimeout(() => navigate('/clientes'), 1500);
    } catch (err) {
      console.error(err);
      setConfirmOpen(false);
    }
  };

  if (loading) return (
    <Container sx={{ display: 'flex', justifyContent: 'center', pt: 10 }}>
      <CircularProgress />
    </Container>
  );

  if (eliminado) return (
    <Container sx={{ textAlign: 'center', pt: 10 }}>
      <Typography variant="h6" color="error">Cliente eliminado correctamente. Redirigiendo...</Typography>
    </Container>
  );

  if (!cliente) return (
    <Container sx={{ pt: 10 }}>
      <Typography>No se encontró el cliente</Typography>
    </Container>
  );


  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/clientes')} sx={{ mb: 3, fontWeight: 'bold' }}>
        Volver a la Lista
      </Button>

      <Paper elevation={4} sx={{ p: 4, borderRadius: 3, borderTop: '6px solid #1976d2' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2, mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar  src={`https://randomuser.me/api/portraits/men/${cliente.id}.jpg`} alt={cliente.name?.firstname}sx={{ width: 65, height: 65, boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }} />
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 800, textTransform: 'capitalize', color: '#2c3e50' }}>
                {cliente.name?.firstname} {cliente.name?.lastname}
              </Typography>
              <Typography variant="body2" color="text.secondary">ID de Registro: # {cliente.id}</Typography>
            </Box>
          </Box>
          {admin?.sector === 'Gerencia' && (
            <Button variant="contained" color="error" startIcon={<DeleteForeverIcon />} onClick={() => setConfirmOpen(true)} sx={{ fontWeight: 'bold' }}>
              Eliminar Cliente
            </Button>
          )}
        </Box>

        <Divider sx={{ mb: 4 }} />

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <InfoCard icon={<AccountCircleIcon color="primary" />} title="Información de Contacto">
              <Typography variant="body2" color="text.secondary"><strong>Email:</strong> {cliente.email}</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1.5 }}><strong>Teléfono:</strong> {cliente.phone}</Typography>
            </InfoCard>
          </Grid>

          <Grid item xs={12} sm={6}>
            <InfoCard icon={<VpnKeyIcon color="primary" />} title="Credenciales del Sistema">
              <Typography variant="body2" color="text.secondary"><strong>Usuario:</strong> {cliente.username}</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1.5 }}><strong>Contraseña:</strong> {cliente.password}</Typography>
            </InfoCard>
          </Grid>

          <Grid item xs={12}>
            <InfoCard icon={<HomeIcon color="primary" />} title="Ubicación y Domicilio Legal">
              <Typography variant="body2" color="text.secondary" sx={{ textTransform: 'capitalize' }}>
                <strong>Calle y Número:</strong> {cliente.address?.street} N° {cliente.address?.number}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ textTransform: 'capitalize', mt: 1 }}>
                <strong>Ciudad:</strong> {cliente.address?.city} — <strong>CP:</strong> {cliente.address?.zipcode}
              </Typography>
            </InfoCard>
          </Grid>
        </Grid>
      </Paper>

      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>¿Eliminar cliente?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Seguro que deseas eliminar a <strong>{cliente.name?.firstname} {cliente.name?.lastname}</strong>? Esta acción no se puede deshacer.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)}>Cancelar</Button>
          <Button onClick={handleEliminar} color="error" variant="contained">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>

    </Container>
  );
}
