import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/common/ProtectedRoute";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import ProductSearchPage from "./pages/ProductSearchPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingsPage";
import ProductCreatePage from "./pages/ProductCreatePage";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/me" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
                <Route path="/me/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
                <Route path="/products/search" element={<ProtectedRoute><ProductSearchPage /></ProtectedRoute>} />
                <Route path="/products/:id" element={<ProtectedRoute><ProductDetailPage /></ProtectedRoute>} />
                <Route path="/products/create" element={<ProtectedRoute><ProductCreatePage /></ProtectedRoute>} />
            </Routes>
        </BrowserRouter>
    );
}