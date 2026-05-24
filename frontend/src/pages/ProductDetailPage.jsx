import { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom";
import { getDate } from "../utils/dateUtils";
import { fetchApi } from "../utils/api";

export default function ProductDetailPage() {
    const [amount, setAmount] = useState(100);
    const [error, setError] = useState("");

    const navigate = useNavigate();
    const location = useLocation();

    const mealType = location.state?.mealType;
    console.log(mealType);
    const product = location.state?.product;

    const calories = (product.calories * amount / 100).toFixed(1);
    const protein = (product.protein * amount / 100).toFixed(1);
    const carbs = (product.carbs * amount / 100).toFixed(1);
    const fat = (product.fat * amount / 100).toFixed(1);

    const addProduct = async (event) => {
        event.preventDefault();
        setError("");

        const payload = {
            product: product,
            amount: amount,
            date: getDate(),
            mealType: mealType
        }

        try {
            await fetchApi('/api/diary/items', {
                method: "POST",
                body: payload
            })
        } catch (error) {
            setError("Couldn't add food to diary")
        }

        navigate('/');
    }

    return (
        <div className="detailContainer">
            <label htmlFor="productName">{product.productName}</label>
            <input
                    id="amount"
                    name="amount"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                />
            <button className="add" onClick={addProduct}>Add</button>

            <span htmlFor="CPCF">Calories: {calories}</span>
            <span htmlFor="CPCF">Protein: {protein}</span>
            <span htmlFor="CPCF">Carbs: {carbs}</span>
            <span htmlFor="CPCF">Fat: {fat}</span>
        </div>
    )
}