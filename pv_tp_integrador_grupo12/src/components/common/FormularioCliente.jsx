import { useState } from "react";
import { TextField, Button, Box, Snackbar, Alert } from "@mui/material";

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      email: form.email,
      username: form.email,
      password: "temp1234",
      name: {
        firstname: form.nombre,
        lastname: form.apellido,
      },
      address: {
        city: form.ciudad,
        street: "",
        number: 0,
        zipcode: "",
        geolocation: { lat: "0", long: "0" },
      },
      phone: form.telefono,
    };

    try {
      const res = await fetch("https://fakestoreapi.com/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (![200, 201].includes(res.status)) {
        throw new Error("Respuesta inesperada del servidor");
      }

      const data = await res.json();
      setForm(estadoInicial);
      if (onExito) onExito(data.id);
    } catch (err) {
      setError("Error al crear el usuario");
    }
  };

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
      <TextField label="Ciudad" name="ciudad" value={form.ciudad} onChange={handleChange} required />

            <Button
        variant="contained"
        type="submit"
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