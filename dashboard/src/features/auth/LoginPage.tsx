// src/features/auth/LoginPage.tsx
import React, { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Box, Button, Container, Paper, Stack, TextField, Typography } from '@mui/material';
import { useAuth } from './AuthContext';

const LoginForm: React.FC = () => {
  const { signIn, user, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const location = useLocation() as any;
  const from = (location.state && location.state.from) || '/';

  if (user) {
    // already signed in: redirect to origin
    return <Navigate to={from} replace />;
  }

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    setSubmitting(true);
    try {
      await signIn(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      console.error('Login failed', err);
      // in real app show user-facing error
      alert('Sign in failed (mock). Try any email/password.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Stack spacing={2} component="form" onSubmit={handleSubmit}>
          <Typography variant="h5">Sign in</Typography>
          <TextField
            label="Email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            label="Password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Button variant="text" onClick={() => { setEmail('demo@example.com'); setPassword('demo'); }}>
              Fill demo
            </Button>
            <Button type="submit" variant="contained" disabled={isSubmitting || loading}>
              {isSubmitting || loading ? 'Signing in...' : 'Sign in'}
            </Button>
          </Box>
        </Stack>
      </Paper>
    </Container>
  );
};

const LoginPage: React.FC = () => <LoginForm />;

export default LoginPage;
