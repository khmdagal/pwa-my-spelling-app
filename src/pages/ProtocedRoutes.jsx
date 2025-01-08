import React from "react";
import { Navigate } from 'react-router-dom'

function ProtectedRoutes({ children }) {
    const token = localStorage.getItem('token');

    return !token ? <Navigate to={'/logIn'} replace /> : <div>{children}</div>
}

export default ProtectedRoutes