import { useState } from "react";
import { TextField, Button, Box, Snackbar, Alert, MenuItem } from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
const estadoInicial = {
  email: "",
  nombre: "",
  apellido: "",
  telefono: "",
  ciudad: "",
};

const FormularioCliente = ({ onExito }) => {
  const [form, setForm] = useState(estadoInicial);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

const handleSubmit = (e) => {
  e.preventDefault();

  try {
    const nuevoCliente = {
      id: Date.now(),
      email: form.email,
      name: {
        firstname: form.nombre,
        lastname: form.apellido,
      },
      address: {
        city: form.ciudad,
      },
      phone: form.telefono,
    };
    const clientesGuardados =
      JSON.parse(localStorage.getItem("clientes")) || [];
    const actualizados = [...clientesGuardados, nuevoCliente];
    localStorage.setItem("clientes", JSON.stringify(actualizados));

    setForm(estadoInicial);

    if (onExito) onExito(nuevoCliente.id);
  } catch (err) {
    setError("Error al guardar el usuario");
  }
};
const ciudades = [
  "Kilcoole",
  "Cullman",
  "San Antonio",
  "El Paso",
  "Fresno",
  "Mesa",
  "Miami",
  "Fort Wayne"
];
  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: "flex", flexDirection: "column", gap: 2, maxWidth: 400, margin: "0 auto" }}
    >
      <TextField label="Nombre" name="nombre" value={form.nombre} onChange={handleChange} required />
      <TextField label="Apellido" name="apellido" value={form.apellido} onChange={handleChange} required />
      <TextField label="Correo electrónico" name="email" value={form.email} onChange={handleChange} required />
      <TextField label="Teléfono" name="telefono" value={form.telefono} onChange={handleChange} required />
      <TextField select label="Ciudad" name="ciudad" value={form.ciudad} onChange={handleChange} required>
        {ciudades.map((c) => (<MenuItem key={c} value={c}>
        {c}</MenuItem>
        ))}</TextField>
            <Button
            
        variant="contained"
        type="submit"
        startIcon={<AddIcon />}
        sx={{
          background: "linear-gradient(to right, #141E30, #2c4766)",
          padding: 2,
          transition: "0.5s",
          "&:hover": {
            background: "linear-gradient(to right, #4c6faf, #2c4766)",
            transform: "scale(1.02)",
          },  
        }}
      >
        Guardar
      </Button>
      <Snackbar open={!!error} autoHideDuration={3000} onClose={() => setError("")}>
        <Alert severity="error" variant="filled">
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default FormularioCliente;