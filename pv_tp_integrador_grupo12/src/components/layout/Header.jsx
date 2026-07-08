import { useContext } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { Box, Typography, Button } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';

export default function Header() {
  const { admin, logoutAdmin } = useContext(AdminContext);

  return (
    <Box component="header" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 30px',background: "linear-gradient(to right, #141E30, #2c4766)", color: 'white' }}>
      <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
        Sistema de Gestión de Clientes
      </Typography>

      {admin && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography variant="body1">
            Admin: <strong>{admin.nombre}</strong> ({admin.sector})
          </Typography>
          <Button 
            variant="contained" 
            color="error" 
            size="small"
            startIcon={<LogoutIcon />}
            onClick={logoutAdmin}
          >
            Cerrar Sesión
          </Button>
        </Box>
      )}
    </Box>
  );
}