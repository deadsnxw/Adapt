import { useState } from "react"
import { useNavigate } from "react-router-dom";
import styles from "../../styles/MealSection.module.css"

export default function MealSection({ mealName, productList, mealType }) {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const totals = productList[0];

    return (
        <div className={styles.meals}>
            <div className={styles.mealHeader}>
                <div className={styles.mealName} onClick={() => setOpen(!open)}>
                    <span className={styles.title}>{mealName}</span>
                    <span className={styles.summary}>
                        {(totals?.calories || 0).toFixed(0)} kcal • P:{(totals?.protein || 0).toFixed(0)}g C:{(totals?.carbs || 0).toFixed(0)}g F:{(totals?.fat || 0).toFixed(0)}g
                    </span>
                </div>
                <button className={styles.add} onClick={() => navigate('/products/search', { state: { mealType: `${mealType}`}})}>+</button>
            </div>
            {open &&
                <ul className={styles.mealSectionList}>
                    <div className={styles.listGroup}>
                        {productList.flatMap((entry) => entry.product.map((item) =>
                            <li key={item.id} className={styles.productItem} onClick={() => navigate(`/products/${item.id}`, { state: { product: item, edit: true } })}>
                                <div className={styles.productInfo}>
                                    <span className={styles.productName}>{item.productName}</span>
                                    <span className={styles.productDetails}>{item.amount}g</span>
                                </div>
                                <div className={styles.productMacros}>
                                    <span>{item.calories} kcal</span>
                                    <span>{item.protein} g</span>
                                    <span>{item.carbs} g</span>
                                    <span>{item.fat} g</span>
                                </div>
                            </li>
                        ))}
                    </div>
                </ul>
            }
        </div>
    )
}