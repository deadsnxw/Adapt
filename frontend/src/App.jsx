import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* <Route path="/" element={<HomePage />} /> */}
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
                {/* <Route path="/me" element={<ProfilePage />} /> */}
            </Routes>
        </BrowserRouter>
    );
}