import { useState, FormEvent } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Link,
  Stack,
  TextField,
  Typography,
  Alert,
} from '@mui/material';

import { useAuth } from './AuthContext';

const LoginForm = () => {
  const { signIn, user, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: { pathname?: string } })?.from?.pathname ?? '/';

  if (user && !loading) {
    return <Navigate to={from} replace />;
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      await signIn(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError((err as Error).message || 'Sign in failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleForgotPassword = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    // TODO: Implement forgot password functionality
    console.log('Forgot password clicked');
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 4,
      }}
    >
      <Box sx={{ width: '100%', maxWidth: 400 }}>
        {/* Logo Placeholder */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            mb: 3,
          }}
        >
          <Box
            sx={{
              width: 64,
              height: 64,
              border: 2,
              borderColor: 'grey.300',
              borderRadius: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          />
        </Box>

        {/* Title */}
        <Typography
          variant="h4"
          component="h1"
          sx={{
            fontWeight: 700,
            textAlign: 'center',
            mb: 0.5,
            textTransform: 'uppercase',
            letterSpacing: 'tight',
            color: 'grey.900',
          }}
        >
          UTILITY METER READER
        </Typography>

        {/* Subtitle */}
        <Typography
          variant="body2"
          sx={{
            textAlign: 'center',
            mb: 4,
            color: 'grey.500',
          }}
        >
          Admin Dashboard
        </Typography>

        {/* Login Form */}
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Stack spacing={2.5}>
            {/* Email Field */}
            <TextField
              id="email"
              name="email"
              type="email"
              label="Email Address"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              fullWidth
              autoComplete="email"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                },
              }}
            />

            {/* Password Field */}
            <TextField
              id="password"
              name="password"
              type="password"
              label="Password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              fullWidth
              autoComplete="current-password"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                },
              }}
            />

            {/* Remember Me Checkbox */}
            <FormControlLabel
              control={
                <Checkbox
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  size="small"
                />
              }
              label={
                <Typography variant="body2" sx={{ color: 'grey.700' }}>
                  Remember me
                </Typography>
              }
              sx={{ alignSelf: 'flex-start' }}
            />

            {/* Error Message */}
            {error && (
              <Alert severity="error" sx={{ borderRadius: 2 }}>
                {error}
              </Alert>
            )}

            {/* Login Button */}
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={isSubmitting || loading}
              sx={{
                py: 1.5,
                borderRadius: 2,
                bgcolor: 'grey.800',
                '&:hover': {
                  bgcolor: 'grey.900',
                },
                textTransform: 'none',
                fontSize: '1rem',
                fontWeight: 500,
              }}
            >
              {isSubmitting || loading ? 'Signing in...' : 'Login'}
            </Button>

            {/* Forgot Password Link */}
            <Box sx={{ textAlign: 'center' }}>
              <Link
                href="#"
                underline="hover"
                onClick={(event) => {
                  event.preventDefault();
                  handleForgotPassword(event);
                }}
                sx={{
                  fontSize: '0.875rem',
                  textDecoration: 'underline',
                  cursor: 'pointer',
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                }}
              >
                Forgot password?
              </Link>
            </Box>
          </Stack>
        </Box>

        {/* Copyright */}
        <Typography
          variant="caption"
          sx={{
            display: 'block',
            textAlign: 'center',
            mt: 6,
            color: 'grey.500',
          }}
        >
          © 2025 Utility Meter Reader System
        </Typography>
      </Box>
    </Container>
  );
};

const LoginPage = () => <LoginForm />;

export default LoginPage;
