import { useState, useEffect } from "react"; 
import { fetchApi } from "../utils/api";
import { getDate } from "../utils/dateUtils";
import MealSection from "../components/home/MealSection";

export default function HomePage() {
    const [meal, setMeal] = useState([]);

    useEffect(() => {
        const fetchMeals = async () => {
            const data = await fetchApi(`/api/diary?date=${getDate()}`,
        )

        getDate();

        setMeal(data)
        };

        fetchMeals();
    }, []);


    return (
        <div className="homeContainer">
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
        </div>
    )
}