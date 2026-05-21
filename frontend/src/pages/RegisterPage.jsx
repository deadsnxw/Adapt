import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchApi, setToken } from "../utils/api.js";
import StepOne from "../components/register/StepOne.jsx";
import StepTwo from "../components/register/StepTwo.jsx";

export default function RegisterPage() {
    const [step, setStep] = useState(0);
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        passwordConfirm: "",
        age: "",
        height: "",
        weight: "",
        gender: "",
        activityLevel: "",
        goal: "",
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

    const handleNext = (event) => {
        event.preventDefault();
        setError("");

        if (formData.password !== formData.passwordConfirm) {
            setError("Passwords do not match.");
            return;
        }

        setStep(1);
    };

    const handleBack = () => {
        setError("");
        setStep(0);
    };

    const handleRegister = async (event) => {
        event.preventDefault();
        setError("");

        if (!formData.gender || !formData.activityLevel || !formData.goal) {
            setError("Please complete all required fields before registering.");
            return;
        }

        const payload = {
            username: formData.username,
            password: formData.password,
            age: parseInt(formData.age),
            height: parseInt(formData.height),
            weight: parseFloat(formData.weight),
            gender: formData.gender,
            activityLevel: formData.activityLevel,
            goal: formData.goal
        }

        try {
            const data = await fetchApi("/api/auth/register", {
                method: "POST",
                body: payload
            });

            setToken(data.token);
            
            navigate('/');
        } catch (error) {
            setError("Couldn't register")
        }
    };

    return (
        <div className="registerContainer">
            <div className="register-content">
                <h1>Registration</h1>
                {error && <p>{error}</p>}

                {step === 0 && (
                    <StepOne
                        formData={formData}
                        onInputChange={handleInputChange}
                        onNext={handleNext}
                    />
                )}

                {step === 1 && (
                    <StepTwo
                        formData={formData}
                        onInputChange={handleInputChange}
                        onBack={handleBack}
                        onRegister={handleRegister}
                    />
                )}
            </div>
        </div>
    );
}