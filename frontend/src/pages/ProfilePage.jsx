import { useState, useEffect } from "react";
import { fetchApi, removeToken } from "../utils/api";
import { useNavigate } from "react-router-dom";
import styles from "../styles/ProfilePage.module.css"
import { BounceLoader } from "react-spinners";
import { formatNumber } from "../utils/numberFormat";

export default function ProfilePage() {
    const [profile, setProfile] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await fetchApi('/api/users/me')

                setProfile(data);
            } catch (error) {
                setError("Couldn't load profile");
            } finally {
                setIsLoading(false);
            }
        };

        fetchProfile();
    }, []);

    function handleLogout() {
        removeToken()
        
        navigate('/login')
    };

    if (isLoading) {
        return <div className={styles.loading}><BounceLoader color="var(--color-btn-bg)" size={60} speedMultiplier={1.2} /></div>;
    }

    if (!profile) {
        return <div className={styles.error}>Couldn't load profile</div>;
    }

    return (
        <div className={styles.profileContainer}>
            <div className={styles.usernameContainer}>
                <h2>{profile.username}</h2>
            </div>

            <div className={styles.anthropometryCard}>
                <div className={styles.statItem}>
                    <span className={styles.statLabel}>Age</span>
                    <span className={styles.statValue}>{profile.age}</span>
                </div>

                <div className={styles.statItem}>
                    <span className={styles.statLabel}>Height</span>
                    <span className={styles.statValue}>{profile.height} cm</span>
                </div>

                <div className={styles.statItem}>
                     <span className={styles.statLabel}>Weight</span>
                     <span className={styles.statValue}>{profile.weight} kg</span>
                </div>
            </div>
            <div className={styles.goalContainer}>
                <div className={styles.statItem}>
                    <span className={styles.statLabel}>Target Calories</span>
                    <span className={styles.statValue}>{formatNumber(profile.targetCalories)} kcal</span>
                </div>

                <div className={styles.statItem}>
                    <span className={styles.statLabel}>Target Protein</span>
                    <span className={styles.statValue}>{formatNumber(profile.targetProtein)} g</span>
                </div>

                <div className={styles.statItem}>
                    <span className={styles.statLabel}>Target Carbs</span>
                    <span className={styles.statValue}>{formatNumber(profile.targetCarbs)} g</span>
                </div>

                <div className={styles.statItem}>
                    <span className={styles.statLabel}>Target Fat</span>
                    <span className={styles.statValue}>{formatNumber(profile.targetFat)} g</span>
                </div>
            </div>

            <div className={styles.buttonContainer}>
                <button className={styles.button} onClick={() => navigate('/me/settings')}>Settings</button>
                <button className={styles.button} onClick={handleLogout}>Logout</button>
            </div>
        </div>
    )
}