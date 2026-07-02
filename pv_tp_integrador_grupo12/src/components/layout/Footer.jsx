import { Box, Typography, Stack, Divider } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import SchoolIcon from "@mui/icons-material/School";

const integrantes = [
  { nombre: "Amador Juan Pablo", github: "AmadorJuan" },
  { nombre: "Guanuco Marcos",    github: "MarcosGuanuco" },
  { nombre: "Torres Santiago",   github: "Santiago-Torres72" },
];

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 4,
        background: "linear-gradient(to right, #141E30, #2c4766)",
        color: "white",
      }}
    >
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "center", sm: "flex-start" }}
        spacing={3}
      >
        {/* Izquierda — título */}
        <Stack spacing={0.5}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <SchoolIcon sx={{ fontSize: 18, opacity: 0.8 }} />
            <Typography variant="body2" sx={{ opacity: 0.7, letterSpacing: 1, textTransform: "uppercase", fontSize: 11 }}>
              Programación Visual
            </Typography>
          </Stack>
          <Typography variant="h6" fontWeight="bold">
            Trabajo Integrador
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.6 }}>
            © 2026 — Todos los derechos reservados
          </Typography>
        </Stack>

        <Divider orientation="vertical" flexItem sx={{ borderColor: "rgba(255,255,255,0.15)", display: { xs: "none", sm: "block" } }} />

        {/* Derecha — integrantes */}
        <Stack spacing={0.75} alignItems={{ xs: "center", sm: "flex-start" }}>
          <Typography variant="body2" sx={{ opacity: 0.6, fontSize: 11, textTransform: "uppercase", letterSpacing: 1 }}>
            Integrantes
          </Typography>
          {integrantes.map(({ nombre, github }) => (
            <Stack key={github} direction="row" alignItems="center" spacing={1}>

              <Typography variant="body2">
                {nombre}{" "}
                <Box component="span" sx={{ opacity: 0.5, fontSize: 12 }}>
                  @{github}
                </Box>
              </Typography>
            </Stack>
          ))}
        </Stack>
      </Stack>
    </Box>
  );
}