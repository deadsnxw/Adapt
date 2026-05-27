import { useState, useEffect } from "react"; 
import { fetchApi } from "../utils/api";
import { getDate } from "../utils/dateUtils";
import { formatNumber } from "../utils/numberFormat";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import MealSection from "../components/home/MealSection";
import styles from "../styles/HomePage.module.css"

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
    const dailyCalories = profile?.targetCalories ?? 0;

    const calorieProgress = dailyCalories > 0
        ? Math.min((totalCalories / dailyCalories) * 100, 100)
        : 0;

    const macroDistribution = [
        { name: "Protein", value: totalProtein, target: profile?.targetProtein ?? 0, color: "#16a34a" },
        { name: "Carbs", value: totalCarbs, target: profile?.targetCarbs ?? 0, color: "#2563eb" },
        { name: "Fat", value: totalFat, target: profile?.targetFat ?? 0, color: "#f59e0b" },
    ];

    const totalMacros = totalProtein + totalCarbs + totalFat;
    const hasMacros = totalMacros > 0;
    const proteinAngle = hasMacros ? (totalProtein / totalMacros) * 360 : 0;
    const carbsAngle = hasMacros ? (totalCarbs / totalMacros) * 360 : 0;
    const pieChartStyle = hasMacros
        ? {
            backgroundImage: `conic-gradient(
                #16a34a 0deg ${proteinAngle}deg,
                #2563eb ${proteinAngle}deg ${proteinAngle + carbsAngle}deg,
                #f59e0b ${proteinAngle + carbsAngle}deg 360deg
            )`,
        }
        : undefined;

    return (
        <div className={styles.homeContainer}>
            <div className={styles.calendar}>
                <DatePicker
                    selected={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                />
            </div>
            <div className={styles.mealSection}>
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
            <div className={styles.progressBars}>
                <div className={styles.calorieProgress}>
                    <div className={styles.progressHeader}>
                        <span>Calories</span>
                        <span>{formatNumber(totalCalories)}/{dailyCalories ? formatNumber(dailyCalories) : "-"}</span>
                    </div>
                    <progress
                        className={styles.progressElement}
                        max={100}
                        value={calorieProgress}
                    />
                </div>
                <div className={styles.macroChart}>
                    <div className={styles.chartWrapper}>
                        {hasMacros ? (
                            <div className={styles.pieChart} style={pieChartStyle} />
                        ) : (
                            <div className={styles.emptyChart}>No macro data</div>
                        )}
                    </div>
                    <div className={styles.macroLegend}>
                        {macroDistribution.map((macro) => (
                            <div key={macro.name} className={styles.legendItem}>
                                <span
                                    className={styles.legendDot}
                                    style={{ backgroundColor: macro.color }}
                                />
                                <div className={styles.legendText}>
                                    <span>{macro.name}: {formatNumber(macro.value)}/{macro.target ? formatNumber(macro.target) : "-"} g</span>
                                    <span className={macro.value > macro.target && macro.target > 0 ? styles.macroOver : styles.macroLeft}>
                                        {macro.target > 0
                                            ? macro.value > macro.target
                                                ? `+${formatNumber(macro.value - macro.target)} g over`
                                                : `${formatNumber(macro.target - macro.value)} g left`
                                            : "No target"}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}