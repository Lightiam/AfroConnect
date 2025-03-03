
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface AuthGuardProps {
  children: React.ReactNode;
  requireVendor?: boolean;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children, requireVendor = false }) => {
  const { isAuthenticated, isLoading, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/signin');
    } else if (!isLoading && isAuthenticated && requireVendor && !user?.isVendor) {
      // If the route requires a vendor but the user is not a vendor
      navigate('/buyer-profile');
    }
  }, [isAuthenticated, isLoading, navigate, requireVendor, user]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#355E3B]"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Render nothing while redirecting
  }

  if (requireVendor && !user?.isVendor) {
    return null; // Render nothing while redirecting
  }

  return <>{children}</>;
};

export default AuthGuard;
