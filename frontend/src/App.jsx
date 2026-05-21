import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/common/ProtectedRoute";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
                {/* <Route path="/me" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} /> */}
            </Routes>
        </BrowserRouter>
    );
}