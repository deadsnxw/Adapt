import { useState, useEffect } from "react"; 
import { fetchApi } from "../utils/api";
import MealSection from "../components/home/MealSection";

export default function HomePage() {
    const [meal, setMeal] = useState([]);

    function getDate() {
        const today = new Date();

        const year = today.getFullYear();
        const month = (today.getMonth() + 1).toString().padStart(2, "0");
        const day = today.getDate().toString().padStart(2, "0");

        return `${year}-${month}-${day}`
    };

    useEffect(() => {
        const fetchMeals = async () => {
            const data = await fetchApi(`/api/diary?date=${getDate()}`,
        )

        setMeal(data)
        };

        fetchMeals();
    }, []);


    return (
        <div className="homeContainer">
            <div className="mealSection">
                <MealSection
                    mealName="Breakfast"
                    productList={meal.filter(item => item.mealType === "BREAKFAST")} 
                />
                <MealSection
                    mealName="Lunch"
                    productList={meal.filter(item => item.mealType === "LUNCH")} 
                />
                <MealSection
                    mealName="Dinner"
                    productList={meal.filter(item => item.mealType === "DINNER")} 
                />
                <MealSection
                    mealName="Snack"
                    productList={meal.filter(item => item.mealType === "SNACK")} 
                />
            </div>
        </div>
    )
}