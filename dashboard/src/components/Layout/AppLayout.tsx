import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Box, Button } from '@mui/material';

import { useAuth } from '../../features/auth/AuthContext';

const navLinks = [
  { to: '/', label: 'Dashboard' },
  { to: '/readings', label: 'Readings' },
  { to: '/exceptions', label: 'Exceptions' },
];

export const AppLayout = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Meter Supervisor
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, mr: 3 }}>
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  isActive ? 'text-blue-600 font-semibold' : 'text-gray-700'
                }
              >
                {link.label}
              </NavLink>
            ))}
          </Box>
          <Typography variant="body2" sx={{ mr: 2 }}>
            {user?.email}
          </Typography>
          <Button variant="outlined" onClick={handleSignOut}>
            Sign out
          </Button>
        </Toolbar>
      </AppBar>
      <Box component="main" sx={{ flex: 1, p: 3 }}>
        <Outlet />
      </Box>
    </Box>
  );
};

