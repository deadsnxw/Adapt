import { useNavigate } from "react-router-dom";
import { BounceLoader } from "react-spinners";
import styles from "../../styles/ProductSearch.module.css"
import { formatNumber } from "../../utils/numberFormat";

export default function ProductSearch({query, onQueryChange, results, onSearch, mealType, isSearching }) {
    const navigate = useNavigate();

    return (
        <div className={styles.searchForm}>
            <div className={styles.formGroup}>
                <div className={styles.searchRow}>
                    <input
                        id="query"
                        className={styles.input}
                        name="query"
                        type="text"
                        placeholder="Chocolate Milka"
                        value={query}
                        onChange={onQueryChange}
                    />
                    <button className={styles.searchButton} onClick={onSearch}>Search</button>
                </div>

                    <button className={styles.addCustom} onClick={() => navigate('/products/create', {state: { mealType }})}>
                        Add Custom Product
                    </button>
                {isSearching ? (
                    <>
                        <div className={styles.loading}><BounceLoader color="var(--color-btn-bg)" size={60} speedMultiplier={1.2} /></div>
                    </>
                ) : (
                    <ul className={styles.productsList}>
                            {results.map((item) => (
                                <li key={item.id} className={styles.productItem} onClick={() => navigate(`/products/${item.externalId}`, { state: { mealType, product: item } })}>
                                    <div className={styles.productInfo}>
                                        <span className={styles.productName}>{item.productName}</span>
                                    </div>
                                    <div className={styles.productMacros}>
                                        <span>{formatNumber(item.calories)} kcal</span>
                                        <span>P: {formatNumber(item.protein)} g</span>
                                        <span>C: {formatNumber(item.carbs)} g</span>
                                        <span>F: {formatNumber(item.fat)} g</span>
                                    </div>
                                </li>
                            ))}
                    </ul>
                )}
            </div>
        </div>
    )
}