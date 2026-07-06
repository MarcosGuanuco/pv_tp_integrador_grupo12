import {
  Box, Grid, Card, CardContent,
  Typography, Stack, Divider, Chip
} from "@mui/material";

import PeopleIcon from "@mui/icons-material/People";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import VisibilityIcon from "@mui/icons-material/Visibility";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

const metricas = [
  { icon: <PeopleIcon sx={{ fontSize: 36, color: "#1976d2" }} />, valor: "120",  label: "Clientes totales" },
  { icon: <PersonAddIcon sx={{ fontSize: 36, color: "#2e7d32" }} />, valor: "15",   label: "Nuevos este mes" },
  { icon: <VisibilityIcon sx={{ fontSize: 36, color: "#ed6c02" }} />, valor: "340",  label: "Consultas" },
  { icon: <TrendingUpIcon sx={{ fontSize: 36, color: "#9c27b0" }} />, valor: "+12%", label: "Crecimiento" },
];

const actividad = [
  { texto: "Se agregó el cliente", nombre: "John Doe",       tipo: "Alta",     color: "#2e7d32", chip: "success" },
  { texto: "Se editó el cliente",  nombre: "David Morrison", tipo: "Edición",  color: "#e65100", chip: "warning" },
  { texto: "Se consultó la ficha de", nombre: "Kevin Ryan",  tipo: "Consulta", color: "#1565c0", chip: "info"    },
  { texto: "Se agregó el cliente", nombre: "Don Romer",      tipo: "Alta",     color: "#2e7d32", chip: "success" },
  { texto: "Se consultó la ficha de", nombre: "Derek Powell",tipo: "Consulta", color: "#1565c0", chip: "info"    },
];

const tiempos = ["Hace 5 min", "Hace 20 min", "Hace 1 h", "Hace 2 h", "Hace 3 h"];

export default function Dashboard() {
  return (
    <Box sx={{ p: 3 }}>

      {/* Hero */}
      <Box sx={{
        p: 3, borderRadius: 3, mb: 3,
        background: "linear-gradient(to right, #5d78a8, #476d99)",
        color: "white",
      }}>
        <Typography variant="h4" fontWeight="bold">Panel de Control</Typography>
        <Typography sx={{ opacity: 0.8 }}>Gestión de clientes — resumen general</Typography>
      </Box>

      {/* Métricas */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        {metricas.map(({ icon, valor, label }) => (
          <Grid item xs={12} sm={6} md={3} key={label}>
            <Card sx={{ borderRadius: 3, boxShadow: 3, background: "#d3ddf8", height: 140 }}>
              <CardContent>
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                  {icon}
                  <Typography variant="h5" fontWeight="bold">{valor}</Typography>
                </Stack>
                <Typography color="text.secondary" variant="body2">{label}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Actividad reciente */}
      <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
        Actividad reciente
      </Typography>
      <Divider sx={{ mb: 2 }} />

      <Card sx={{ borderRadius: 3, boxShadow: 1 }}>
        {actividad.map(({ texto, nombre, tipo, color, chip }, i) => (
          <Box key={i}>
            <Stack
              direction="row"
              alignItems="center"
              spacing={1.5}
              sx={{ px: 2, py: 1.5 }}
            >
              <FiberManualRecordIcon sx={{ fontSize: 10, color, flexShrink: 0 }} />
              <Typography variant="body2" sx={{ flex: 1 }}>
                {texto} <strong>{nombre}</strong>
              </Typography>
              <Chip label={tipo} color={chip} size="small" variant="outlined" />
              <Typography variant="caption" color="text.disabled" sx={{ flexShrink: 0 }}>
                {tiempos[i]}
              </Typography>
            </Stack>
            {i < actividad.length - 1 && <Divider />}
          </Box>
        ))}
      </Card>

    </Box>
  );
}