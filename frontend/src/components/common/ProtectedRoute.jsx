import { Navigate, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./Navbar";

export default function ProtectedRoute({ children }) {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    useEffect(() => {
        const handler = () => navigate('/login')
        window.addEventListener('unauthorized', handler) 
        return () => window.removeEventListener('unauthorized', handler);
    }, [])

    return token ? (
        <>
            <Navbar/>
            {children}
        </>
    ) : <Navigate to="/login" />; 
}