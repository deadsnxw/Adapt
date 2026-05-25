import { Navigate, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function ProtectedRoute({ children }) {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    useEffect(() => {
        const handler = () => navigate('/login')
        window.addEventListener('unauthorized', handler) 
        return () => window.removeEventListener('unauthorized', handler);
    }, [])

    return token ? <>{children}</> : <Navigate to="/login" />; 
}