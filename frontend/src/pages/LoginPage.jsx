import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchApi, setToken } from "../utils/api.js";
import LoginForm from "../components/login/LoginForm.jsx";

export default function LoginPage() {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleLogin = async (event) => {
        event.preventDefault();
        setError("");

        if (!formData.username || !formData.password) {
            setError("Please complete all required fields before registering.");
            return;
        }

        const payload = {
            username: formData.username,
            password: formData.password
        }

        try {
            const data = await fetchApi("/api/auth/login", {
                method: "POST",
                body: payload
            });

            setToken(data.token);
            
            navigate('/');
        } catch (error) {
            setError("Couldn't login")
        }
    };

    return (
        <div className="loginContainer">
            <div className="login-content">
                <h1>Login</h1>
                {error && <p>{error}</p>}

                <LoginForm
                    formData={formData}
                    onInputChange={handleInputChange}
                    onLogin={handleLogin}
                />
            </div>
        </div>
    );
}