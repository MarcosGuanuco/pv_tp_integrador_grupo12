import { Box, Typography, List, ListItem, ListItemIcon } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import CodeIcon from '@mui/icons-material/Code';
import CopyrightIcon from '@mui/icons-material/Copyright';

function Footer() {
  return (
    <Box component="footer" sx={{backgroundColor: '#2c3e50', color: 'white', padding: '20px 30px', marginTop: 'auto'}}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 4 }}>
        
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Trabajo Integrador de Programación Visual
          </Typography>
          <Typography variant="subtitle1" sx={{ marginTop: 1 }}>
            Integrantes:
          </Typography>
          <List sx={{ paddingLeft: 2 }}>
            <ListItem sx={{ padding: 0 }}>
              <ListItemIcon sx={{ color: 'white', minWidth: 30 }}>
                <PersonIcon />
              </ListItemIcon>
              Amador Juan Pablo - AmadorJuan
            </ListItem>
            <ListItem sx={{ padding: 0 }}>
              <ListItemIcon sx={{ color: 'white', minWidth: 30 }}>
                <PersonIcon />
              </ListItemIcon>
              Guanuco Marcos - MarcosGuanuco
            </ListItem>
            <ListItem sx={{ padding: 0 }}>
              <ListItemIcon sx={{ color: 'white', minWidth: 30 }}>
                <PersonIcon />
              </ListItemIcon>
              Torres Santiago - Santiago-Torres72
            </ListItem>
            <ListItem sx={{ padding: 0 }}>
              <ListItemIcon sx={{ color: 'white', minWidth: 30 }}>
                <PersonIcon />
              </ListItemIcon>
              Ayllon Monica - moniayllon
            </ListItem>
            
          </List>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 1 }}>
          <CopyrightIcon sx={{ fontSize: 18 }} />
          <Typography variant="body2">
            2026 - Proyecto ProgramacionVisual
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default Footer;