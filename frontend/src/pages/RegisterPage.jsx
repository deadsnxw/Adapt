import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchApi, setToken } from "../utils/api.js";
import StepOne from "../components/register/StepOne.jsx";
import StepTwo from "../components/register/StepTwo.jsx";
import styles from '../styles/RegisterPage.module.css'

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

        if (!formData.username) {
            setError("Username should not be empty")
            return;
        }

        if (!formData.password) {
            setError("Password should not be empty")
            return;
        }

        if (formData.password !== formData.passwordConfirm) {
            setError("Passwords do not match.");
            return;
        }

        if (formData.password.length < 8) {
            setError("Password should contain at least 8 characters")
            return;
        }

        if (formData.password.length > 32) {
            setError("Password should contain less than 32 characters")
            return;
        }

        if (formData.username.length > 16) {
            setError("Username can contain up to 16 characters")
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

        if (!formData.age) {
            setError("Age should not be empty")
            return;
        }

        if (!formData.height) {
            setError("Height should not be empty")
            return;
        }

        if (!formData.weight) {
            setError("Weight should not be empty")
            return;
        }

        if (formData.age < 1 || formData.age > 120) {
            setError("Enter correct age")
            return;
        }

        if (formData.height < 1 || formData.height > 300) {
            setError("Enter correct height")
            return;
        }

        if (formData.weight < 1 || formData.weight > 200) {
            setError("Enter correct weight")
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
        <div className={styles.registerContainer}>
            <div className={styles.registerContent}>
                <h1 className={styles.title}>Registration</h1>
                {error && <p className={styles.error}>{error}</p>}

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
                <p className={styles.loginLink}>
                    Already have an account? <span onClick={() => navigate('/login')}>Login</span>
                </p>
            </div>
        </div>
    );
}