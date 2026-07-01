import { NavLink } from "react-router-dom";
import { Button, Stack, Box } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";

export default function Nav() {
  return (
    <Box
      component="nav"
      sx={{py: 2,background: "linear-gradient(to right, #141E30, #2c4766)",}}
    >
      <Stack direction="row" spacing={2} justifyContent="center">
        <Button
          component={NavLink}
          to="/dashboard"
          variant="contained"
          startIcon={<DashboardIcon />}
          sx={{
            backgroundColor: "#2b67ac",
            "&.active": {
              backgroundColor: "#1976d2",
              color: "#fff",
            },
          }}
        >
          Dashboard
        </Button>
        <Button
          component={NavLink}
          to="/clientes"
          variant="contained"
          startIcon={<PeopleIcon />}
          sx={{
            "&.active": {
              backgroundColor: "#1976d2",
              color: "#fff",
            },
          }}
        >
          Clientes
        </Button>
      </Stack>
    </Box>
  );
}