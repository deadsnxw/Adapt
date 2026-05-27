import { useState } from "react"
import { useNavigate } from "react-router-dom";
import styles from "../../styles/MealSection.module.css"
import { formatNumber } from "../../utils/numberFormat";

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
                        {formatNumber(totals?.calories)} kcal • P:{formatNumber(totals?.protein)}g C:{formatNumber(totals?.carbs)}g F:{formatNumber(totals?.fat)}g
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
                                    <span>{formatNumber(item.calories)} kcal</span>
                                    <span>P:{formatNumber(item.protein)} g</span>
                                    <span>C:{formatNumber(item.carbs)} g</span>
                                    <span>F:{formatNumber(item.fat)} g</span>
                                </div>
                            </li>
                        ))}
                    </div>
                </ul>
            }
        </div>
    )
}