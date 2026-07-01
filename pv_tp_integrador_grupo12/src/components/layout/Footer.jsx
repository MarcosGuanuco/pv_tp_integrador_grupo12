import { Box, Typography, Stack } from "@mui/material";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 1,
        background: "linear-gradient(to right, #141E30, #2c4766)",
        color: "white",
        textAlign: "center",
      }}
    >
      <Stack spacing={2} alignItems="center">

        <Typography variant="h6" fontWeight="bold">
          Trabajo Integrador de Programación Visual
        </Typography>

        <Box>
          <Typography variant="subtitle1" fontWeight="bold">
            Integrantes
          </Typography>

          <Typography>Amador Juan Pablo - AmadorJuan</Typography>
          <Typography>Guanuco Marcos - MarcosGuanuco</Typography>
          <Typography>Torres Santiago - Santiago-Torres72</Typography>
        </Box>

        <Typography variant="body2" sx={{ opacity: 0.7 }}>
          © 2026 - Proyecto Programación Visual
        </Typography>

      </Stack>
    </Box>
  );
}