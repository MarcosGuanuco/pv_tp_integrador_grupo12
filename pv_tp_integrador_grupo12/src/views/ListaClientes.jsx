import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ClientesCards from "../components/common/ClientesCards";

import {
  Container,
  Typography,
  TextField,
  CircularProgress,
  Alert,
  Grid,
  Card,
  CardContent,
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  Snackbar
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FormUsuario from "../components/common/FormularioCliente";

export default function ListaClientes() {
  const navigate = useNavigate();
  
  // Estados requeridos por la consigna

  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [busqueda, setBusqueda] = useState("");
  const [modalAbierto, setModalAbierto] = useState(false);
  const cerrarModal = () => setModalAbierto(false);
  const [snackbar, setSnackbar] = useState({ open: false, mensaje: "" });

  const obtenerClientes = async () => {
    try {
      setLoading(true);
      const res = await fetch("https://fakestoreapi.com/users");
      if (!res.ok) throw new Error("Error al cargar clientes");
      const data = await res.json();

      const clientesLocal = JSON.parse(localStorage.getItem("clientes")) || [];
      setClientes([...data, ...clientesLocal]);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    obtenerClientes();
  }, []);

  const clientesFiltrados = clientes.filter((c) => {
    const t = busqueda.toLowerCase();
    return (
      (c.name?.lastname || "").toLowerCase().includes(t) ||
      (c.address?.city || "").toLowerCase().includes(t)
    );
  });

  if (loading) {
    return (
      <Container sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

return (
  <Container maxWidth="lg" sx={{ mt: 4 }}>

    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
      <Typography variant="h4">Lista de Clientes</Typography>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={() => setModalAbierto(true)}
      >
        Nuevo cliente
      </Button>
    </Box>
    <Dialog open={modalAbierto} onClose={cerrarModal} fullWidth maxWidth="sm">
      <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
         Crear cliente
         <Button onClick={cerrarModal}
         sx={{background: "rgba(231, 58, 58, 0.78)", color: "black", padding: 0.5}}
         >✕</Button></DialogTitle>
         <DialogContent>
          <FormUsuario
          onExito={(id) => {
            cerrarModal();
            obtenerClientes();
            setSnackbar({ open: true, mensaje: `Cliente creado con ID: ${id}` });
          }}/>
          </DialogContent>
          </Dialog>

    <TextField
      fullWidth
      label="Buscar por apellido o ciudad"
      value={busqueda}
      onChange={(e) => setBusqueda(e.target.value)}
      sx={{ mb: 3 }}
    />

    <Grid container spacing={3}>
      {clientesFiltrados.map((c) => (
        <Grid item xs={12} sm={6} md={4} key={c.id} sx={{ display: "flex" }}>
          <ClientesCards
            cliente={c}
            onVerDetalle={(id) => navigate(`/clientes/${id}`)}
          />
        </Grid>
      ))}
    </Grid>

    {clientesFiltrados.length === 0 && (
      <Typography sx={{ textAlign: "center", mt: 4, color: "gray" }}>
        No se encontraron clientes
      </Typography>
    )}

    <Snackbar
      open={snackbar.open}
      autoHideDuration={3000}
      onClose={() => setSnackbar({ open: false, mensaje: "" })}
    >
      <Alert severity="success" variant="filled">
        {snackbar.mensaje}
      </Alert>
    </Snackbar>

  </Container>
);
}