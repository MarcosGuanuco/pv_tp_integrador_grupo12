import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  const [snackbar, setSnackbar] = useState({ open: false, mensaje: "" });

  const obtenerClientes = async () => {
    try {
      setLoading(true);

      const res = await fetch("https://fakestoreapi.com/users");
      if (!res.ok) throw new Error("Error al cargar clientes");

      const data = await res.json();
      setClientes(data);
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

      {/* HEADER */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="h4">
          Lista de Clientes
        </Typography>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setModalAbierto(true)}
        >
          Nuevo cliente
        </Button>
      </Box>

      {/* MODAL */}
      <Dialog
        open={modalAbierto}
        onClose={() => setModalAbierto(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Crear cliente</DialogTitle>
        <DialogContent>
          <FormUsuario
            onExito={(id) => {
              setModalAbierto(false);
              obtenerClientes();

              setSnackbar({
                open: true,
                mensaje: `Cliente creado con ID: ${id}`
              });
            }}
          />
        </DialogContent>
      </Dialog>

      {/* BUSCADOR */}
      <TextField
        fullWidth
        label="Buscar por apellido o ciudad"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        sx={{ mb: 3 }}
      />

      {/* CARDS */}
      <Grid container spacing={3}>
        {clientesFiltrados.map((c) => (
          <Grid item xs={12} sm={6} md={4} key={c.id}>
            <Card
              sx={{
                boxShadow: 3,
                borderRadius: 3,
                transition: "0.3s",
                "&:hover": { transform: "scale(1.03)" }
              }}
            >
              <CardContent>
                <Typography variant="h6">
                  {c.name?.firstname} {c.name?.lastname}
                </Typography>

                <Typography variant="body2">
                  📧 {c.email}
                </Typography>

                <Typography variant="body2">
                  📞 {c.phone}
                </Typography>

                <Typography variant="body2">
                  📍 {c.address?.city}
                </Typography>

                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<VisibilityIcon />}
                  sx={{ mt: 2 }}
                  onClick={() => navigate(`/clientes/${c.id}`)}
                >
                  Ver ficha
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* SIN RESULTADOS */}
      {!loading && clientesFiltrados.length === 0 && (
        <Typography sx={{ textAlign: "center", mt: 4, color: "gray" }}>
          No se encontraron clientes
        </Typography>
      )}

      {/* SNACKBAR */}
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