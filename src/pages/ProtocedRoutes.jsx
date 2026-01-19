import React, { useEffect, useState } from "react";
import { Navigate } from 'react-router-dom'
import { axiosForLoginAndSignUpOnly } from '../api/axios';

function ProtectedRoutes({ children }) {
   const location = window.location;
  const [authState, setAuthState] = useState({ loading: true, isAuthenticated: false, admin: null });

  useEffect(() => {
     
    const checkAuth = async () => {
      try {
        const res = await axiosForLoginAndSignUpOnly.get(
          '/api/v1/spelling/users/isLoggedIn',
          { withCredentials: true }
        );

        if (res.data.status === 'authenticated' || res.data.status === 'success') {
          setAuthState({ loading: false, isAuthenticated: true, admin: res.data.admin });
        } else {
          setAuthState({ loading: false, isAuthenticated: false, admin: null });
        }
      } catch {
        setAuthState({ loading: false, isAuthenticated: false, admin: null });
      }
    };

    checkAuth();
  }, []);

  if (authState.loading) return <div>Loading...</div>;
  if (!authState.isAuthenticated) return <Navigate to="/login" replace />;



 if (authState.admin) {
  if (location.pathname !== "/admin_dashboard") {
    return <Navigate to="/admin_dashboard" replace />;
  }
} else {
  if (location.pathname !== "/student_dashboard") {
    return <Navigate to="/student_dashboard" replace />;
  }
}

  return <>{children}</>;
}


export default ProtectedRoutes;