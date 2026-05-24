import { useState, useEffect } from "react";
import { fetchApi, removeToken } from "../utils/api";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
    const [profile, setProfile] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            const data = await fetchApi('/api/users/me')

            setProfile(data);
        };

        fetchProfile();
    }, []);

    function handleLogout() {
        removeToken()
        
        navigate('/login')
    };

    return (
        <div className="profileContainer">
            <h2>{profile?.username}</h2>
            <span>Age: {profile?.age}</span>
            <span>Sex: {profile?.gender}</span>
            <span>Height: {profile?.height}</span>
            <span>Weight: {profile?.weight}</span>
            <span>Activity Level: {profile?.activityLevel}</span>
            <span>Goal: {profile?.goal}</span>
            <span>Target Calories: {profile?.targetCalories}</span>
            <span>Target Protein: {profile?.targetProtein}</span>
            <span>Target Carbs: {profile?.targetCarbs}</span>
            <span>Target Fat: {profile?.targetFat}</span>
            <button onClick={() => navigate('/me/settings')}>Settings</button>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}