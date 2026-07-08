import { useContext } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Avatar, Chip, Divider } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

export default function Header() {
  const { admin, logoutAdmin } = useContext(AdminContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutAdmin();
    navigate('/', { replace: true });
  };

  return (
    <Box
      component="header"
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        px: 3, py: 1.5,
        background: 'linear-gradient(to right, #141E30, #2c4766)',
        color: 'white',
        boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <AdminPanelSettingsIcon sx={{ fontSize: 28, opacity: 0.9 }} />
        <Box>
          <Typography variant="subtitle1" fontWeight="bold" sx={{ lineHeight: 1.2 }}>
            Sistema de Gestión
          </Typography>
          <Typography variant="caption" sx={{ opacity: 0.6, letterSpacing: 0.5 }}>
            Panel de Clientes
          </Typography>
        </Box>
      </Box>

      {admin && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Avatar sx={{
              width: 34, height: 34, fontSize: 14, fontWeight: 600,
              background: 'rgba(255,255,255,0.15)',
            }}>
              {admin.nombre?.[0]?.toUpperCase()}
            </Avatar>
            <Box>
              <Typography variant="body2" fontWeight="bold" sx={{ lineHeight: 1.2 }}>
                {admin.nombre}
              </Typography>
              <Chip
                label={admin.sector}
                size="small"
                sx={{
                  height: 18, fontSize: 10, fontWeight: 500,
                  background: admin.sector === 'Gerencia' ? '#ef5350' : '#1976d2',
                  color: 'white',
                }}
              />
            </Box>
          </Box>

          <Divider orientation="vertical" flexItem sx={{ borderColor: 'rgba(255,255,255,0.2)' }} />

          <Button
            variant="outlined"
            size="small"
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
            sx={{
              borderColor: 'rgba(255,255,255,0.3)',
              color: 'white',
              textTransform: 'none',
              borderRadius: '8px',
              '&:hover': {
                borderColor: 'white',
                background: 'rgba(255,255,255,0.08)',
              },
            }}
          >
            Cerrar sesión
          </Button>

        </Box>
      )}
    </Box>
  );
}
