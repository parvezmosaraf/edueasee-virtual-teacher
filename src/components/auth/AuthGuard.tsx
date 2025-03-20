
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/auth';

interface AuthGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
}

const AuthGuard = ({ children, requireAuth = true }: AuthGuardProps) => {
  const { isAuthenticated, isLoading, tempAuthEnabled } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading) {
      // If auth is required but user is not authenticated, redirect to login
      if (requireAuth && !isAuthenticated && !tempAuthEnabled) {
        navigate('/login', { replace: true });
      }
      
      // If auth is not required AND we're on a login/signup page AND user is authenticated, redirect to homepage
      if (!requireAuth && isAuthenticated && (window.location.pathname === '/login' || window.location.pathname === '/signup')) {
        navigate('/', { replace: true });
      }
    }
  }, [isAuthenticated, isLoading, navigate, requireAuth, tempAuthEnabled]);

  // Show nothing while checking auth status
  if (isLoading) {
    return null;
  }

  // If auth requirements are met, render children
  if ((requireAuth && (isAuthenticated || tempAuthEnabled)) || (!requireAuth && !isAuthenticated)) {
    return <>{children}</>;
  }

  // Default case - render nothing while redirecting
  return null;
};

export default AuthGuard;
