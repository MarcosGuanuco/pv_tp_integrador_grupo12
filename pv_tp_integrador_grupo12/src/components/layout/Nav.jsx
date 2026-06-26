import { NavLink } from 'react-router-dom';
import { Button, Stack } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';

export default function Nav() {
  return (
    <nav style={{ margin: '10px 0' }}>
      <Stack direction="row" spacing={2} justifyContent="center"> 
        <Button component={NavLink} to="/dashboard" variant="contained" startIcon={<DashboardIcon />}
          style={({ isActive }) => ({backgroundColor: isActive ? '#1976d2' : '#e0e0e0', color: isActive ? '#fff' : '#000',})}>
          Dashboard
        </Button>

        <Button component={NavLink} to="/clientes" variant="contained" startIcon={<PeopleIcon />}
          style={({ isActive }) => ({backgroundColor: isActive ? '#1976d2' : '#e0e0e0', color: isActive ? '#fff' : '#000',})}>
          Clientes
        </Button>
      </Stack>
    </nav>
  );
}