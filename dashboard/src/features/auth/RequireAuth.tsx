import { Navigate, useLocation } from 'react-router-dom';

import { AuthProvider, useAuth } from './AuthContext';

const RequireAuthInner = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="flex h-full items-center justify-center">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <>{children}</>;
};

export const RequireAuth = ({ children }: { children: React.ReactNode }) => (
  <AuthProvider>
    <RequireAuthInner>{children}</RequireAuthInner>
  </AuthProvider>
);

