import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Stack,
  Divider
} from "@mui/material";

import PeopleIcon from "@mui/icons-material/People";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import VisibilityIcon from "@mui/icons-material/Visibility";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

export default function Dashboard() {
  return (
    <Box sx={{ p: 3 }}>

      <Box
        sx={{
          p: 3,
          borderRadius: 3,
          background: "linear-gradient(to right, #5d78a8, #476d99)",
          color: "white",
        }}
      >
        <Typography variant="h4" fontWeight="bold">
          Panel de Control
        </Typography>
        <Typography sx={{ opacity: 0.8 }}>
          Gestión de clientes - resumen general
        </Typography>
      </Box>

      <Grid container spacing={2}>

        <Grid item xs={12} sm={6} md={6}>
          <Card sx={{ borderRadius: 3, boxShadow: 3, background: "#d3ddf8",height: 160, display: "flex", alignItems: "center", justifyContent: "center", }}>
            <CardContent>
              <Stack direction="row" justifyContent="space-between">
                <PeopleIcon sx={{ fontSize: 40, color: "#1976d2" }} />
                <Typography variant="h5" fontWeight="bold">
                  120
                </Typography>
              </Stack>
              <Typography color="text.secondary">
                Clientes
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={6}>
<Card sx={{ borderRadius: 3, boxShadow: 3, background: "#d3ddf8",height: 160, display: "flex", alignItems: "center", justifyContent: "center", }}>
            <CardContent>
              <Stack direction="row" justifyContent="space-between">
                <PersonAddIcon sx={{ fontSize: 40, color: "#2e7d32" }} />
                <Typography variant="h5" fontWeight="bold">
                  15
                </Typography>
              </Stack>
              <Typography color="text.secondary">
                Nuevos este mes
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={6}>
          <Card sx={{ borderRadius: 3, boxShadow: 3, background: "#d3ddf8",height: 160, display: "flex", alignItems: "center", justifyContent: "center", }}>
            <CardContent>
              <Stack direction="row" justifyContent="space-between">
                <VisibilityIcon sx={{ fontSize: 40, color: "#ed6c02" }} />
                <Typography variant="h5" fontWeight="bold">
                  340
                </Typography>
              </Stack>
              <Typography color="text.secondary">
                Consultas
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={6}>
          <Card sx={{ borderRadius: 3, boxShadow: 3, background: "#d3ddf8",height: 160, display: "flex", alignItems: "center", justifyContent: "center", }}>
            <CardContent>
              <Stack direction="row" justifyContent="space-between">
                <TrendingUpIcon sx={{ fontSize: 40, color: "#9c27b0" }} />
                <Typography variant="h5" fontWeight="bold">
                  +12%
                </Typography>
              </Stack>
              <Typography color="text.secondary">
                Crecimiento
              </Typography>
            </CardContent>
          </Card>
        </Grid>

      </Grid>

      <Box sx={{ mt: 5 }}>
        <Typography variant="h6" fontWeight="bold">
          Actividad reciente
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Card sx={{ p: 2, borderRadius: 3 }}>
          <Typography>• Se agregó un nuevo cliente</Typography>
          <Typography>• Se editó un cliente existente</Typography>
          <Typography>• Se consultó una ficha</Typography>
        </Card>
      </Box>

    </Box>
  );
}