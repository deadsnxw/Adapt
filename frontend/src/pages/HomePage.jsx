import { useState, useEffect } from "react"; 
import { fetchApi } from "../utils/api";
import { getDate } from "../utils/dateUtils";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import MealSection from "../components/home/MealSection";

export default function HomePage() {
    const [meal, setMeal] = useState([]);
    const [profile, setProfile] = useState(null);
    const [selectedDate, setSelectedDate] = useState(new Date())

    useEffect(() => {
        const fetchMeals = async () => {
            const data = await fetchApi(`/api/diary?date=${getDate(selectedDate)}`,
        )

        setMeal(data)
        };

        const fetchProfile = async () => {
            const data = await fetchApi('/api/users/me')

            setProfile(data);
        };

        fetchMeals();
        fetchProfile();
    }, [selectedDate]);

    const totalCalories = meal.reduce((sum, entry) => sum + entry.calories, 0);
    const totalProtein = meal.reduce((sum, entry) => sum + entry.protein, 0);
    const totalCarbs = meal.reduce((sum, entry) => sum + entry.carbs, 0);
    const totalFat = meal.reduce((sum, entry) => sum + entry.fat, 0);

    return (
        <div className="homeContainer">
            <div className="calendar">
                <DatePicker
                    selected={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                />
            </div>
            <div className="mealSection">
                <MealSection
                    mealName="Breakfast"
                    mealType="BREAKFAST"
                    productList={meal.filter(item => item.mealType === "BREAKFAST")}
                />
                <MealSection
                    mealName="Lunch"
                    mealType="LUNCH"
                    productList={meal.filter(item => item.mealType === "LUNCH")} 
                />
                <MealSection
                    mealName="Dinner"
                    mealType="DINNER"
                    productList={meal.filter(item => item.mealType === "DINNER")} 
                />
                <MealSection
                    mealName="Snack"
                    mealType="SNACK"
                    productList={meal.filter(item => item.mealType === "SNACK")} 
                />
            </div>
            <div className="progressBars">
                <span>Calories: {totalCalories}/{profile?.targetCalories} |</span>
                <span>Protein: {totalProtein}/{profile?.targetProtein} |</span>
                <span>Carbs: {totalCarbs}/{profile?.targetCarbs} |</span>
                <span>Fat: {totalFat}/{profile?.targetFat}</span>
            </div>
        </div>
    )
}