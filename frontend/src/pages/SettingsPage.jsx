import { useState, useEffect } from "react";
import { fetchApi, removeToken } from "../utils/api";
import { useNavigate } from "react-router-dom";
import SettingsForm from "../components/settings/SettingsForm";

export default function SettingsPage() {
    const [formData, setFormData] = useState({
        age: "",
        height: "",
        weight: "",
        gender: "",
        activityLevel: "",
        goal: "",
    });
    const [error, setError] = useState("");
    
    const navigate = useNavigate();
    
    useEffect(() => {
        const loadInfo = async () => {
            const data = await fetchApi('/api/users/me')

            setFormData(data);
        }

        loadInfo();
    }, []);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleUpdate = async (event) => {
        event.preventDefault();
        setError("");

        const payload = {
            age: parseInt(formData.age),
            height: parseInt(formData.height),
            weight: parseFloat(formData.weight),
            gender: formData.gender,
            activityLevel: formData.activityLevel,
            goal: formData.goal
        }

        try {
            const data = await fetchApi("/api/users/me", {
                method: "PUT",
                body: payload
            });
                    
            navigate('/me');
        } catch (error) {
            setError("Couldn't update")
        }
    }

    return (
        <div className="settingsContainer">
            <div className="updateContent">
                <h1>Settings</h1>
                {error && <p>{error}</p>}

                <SettingsForm 
                    formData={formData}
                    onInputChange={handleInputChange}
                    onUpdate={handleUpdate}
                />
            </div>
        </div>
    )
}