import { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom";
import { getDate } from "../utils/dateUtils";
import { fetchApi } from "../utils/api";
import styles from "../styles/ProductDetailPage.module.css"

export default function ProductDetailPage() {
    const navigate = useNavigate();
    const location = useLocation();

    const isEdit = location.state?.edit;
    const mealType = location.state?.mealType;
    const product = location.state?.product;

    console.log(location.state);

    const [amount, setAmount] = useState(isEdit ? product.amount : 100);
    const [error, setError] = useState("");

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

    const updateProduct = async (event) => {
        event.preventDefault();
        setError("");

        const payload = {
            amount: amount,
        }

        try {
            await fetchApi(`/api/diary/items/${product.id}`, {
                method: "PUT",
                body: payload
            })
        } catch (error) {
            setError("Couldn't update food")
        }

        navigate('/');
    }

    const deleteProduct = async (event) => {
        event.preventDefault();
        setError("");

        try {
            await fetchApi(`/api/diary/items/${product.id}`, {
                method: "DELETE"
            })
        } catch (error) {
            setError("Couldn't delete food")
        }

        navigate('/');
    }

    return (
        <div className={styles.detailContainer}>
                <div className={styles.detailContent}>
                    <h2 className={styles.productName} htmlFor="productName">{product.productName}</h2>
                    <input
                            id="amount"
                            className={styles.input}
                            name="amount"
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            required
                        />
                <div className={styles.buttonContainer}>
                    {isEdit ? (
                        <>
                            <button className={styles.button} onClick={updateProduct}>Update</button>
                            <button className={styles.delete} onClick={deleteProduct}>Delete</button>
                        </>
                    ) : ( 
                        <button className={styles.button} onClick={addProduct}>Add</button>
                    )}
                </div>
                <div className={styles.macrosCard}>
                    <div className={styles.statItem}>
                        <span className={styles.statLabel}>Calories: </span>
                        <span className={styles.statValue}>{calories}</span>
                    </div>
                    <div className={styles.statItem}>
                        <span className={styles.statLabel}>Protein: </span>
                        <span className={styles.statValue}>{protein}</span>
                    </div>
                    <div className={styles.statItem}>
                        <span className={styles.statLabel}>Carbs: </span>
                        <span className={styles.statValue}>{carbs}</span>
                    </div>
                    <div className={styles.statItem}>
                        <span className={styles.statLabel}>Fat: </span>
                        <span className={styles.statValue}>{fat}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}