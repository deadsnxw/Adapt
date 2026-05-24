import { useState } from "react"
import { useNavigate } from "react-router-dom";

export default function MealSection({ mealName, productList, mealType }) {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const totals = productList[0];

    return (
        <div className="meals">
            <label className="mealName" onClick={() => setOpen(!open)}>{mealName} 
                | {totals?.calories}kcal |
                Protein: {totals?.protein}g | 
                Carbs: {totals?.carbs}g |
                Fat: {totals?.fat}g
            </label>
            {open &&
                <ul className="mealSectionList">
                    <div className="listGroup">
                        {productList.flatMap((entry) => entry.product.map((item) =>
                            <li key={item.id}>
                                {item.productName} - 
                                {item.amount}g - 
                                {item.calories} kcal - 
                                {item.protein}g- 
                                {item.carbs}g - 
                                {item.fat}g
                            </li>
                        ))}
                    </div>
                </ul>
            }
            <button className="add" onClick={() => navigate('/products/search', { state: { mealType: `${mealType}`}})}>+</button>
        </div>
    )
}