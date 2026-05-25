import { useState, useEffect } from "react";
import { fetchApi, removeToken } from "../utils/api";
import { useNavigate } from "react-router-dom";
import { BounceLoader } from "react-spinners";
import SettingsForm from "../components/settings/SettingsForm";
import styles from "../styles/SettingsForm.module.css"

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
    const [isLoading, setIsLoading] = useState(false);
    
    const navigate = useNavigate();
    
    useEffect(() => {
        const loadInfo = async () => {
            try {
                setIsLoading(true);

                const data = await fetchApi('/api/users/me')

                setFormData(data);
            } catch (error) {
                setError("Couldn't load info")
            } finally {
                setIsLoading(false);
            }
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

    const handleDelete = async (event) => {
        event.preventDefault();
        
        await fetchApi("/api/users/me", {
            method: "DELETE"
        });

        removeToken();

        navigate('/register')
    }

    if (isLoading) {
        return <div className={styles.loading}><BounceLoader color="var(--color-btn-bg)" size={60} speedMultiplier={1.2} /></div>;
    }

    return (
        <div className={styles.settingsContainer}>
            <div className={styles.updateContent}>
                <h1 className={styles.title}>Settings</h1>
                {error && <p className={styles.error}>{error}</p>}

                <SettingsForm 
                    formData={formData}
                    onInputChange={handleInputChange}
                    onUpdate={handleUpdate}
                    onDelete={handleDelete}
                />
            </div>
        </div>
    )
}