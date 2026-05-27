import styles from "../../styles/ProductCreateForm.module.css"

export default function ProductCreate({ formData, onInputChange, onCreate }) {
    return (
        <form className="productCreateForm" onSubmit={onCreate}>
            <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="productName">Product Name</label>
                <input
                    id="productName"
                    className={styles.input}
                    name="productName"
                    type="text"
                    value={formData.productName}
                    onChange={onInputChange}
                    required
                />

                <label className={styles.label} htmlFor="calories">Calories</label>
                <input
                    id="calories"
                    className={styles.input}
                    name="calories"
                    type="number"
                    min="1"
                    value={formData.calories}
                    onChange={onInputChange}
                    required
                />
                <label className={styles.label} htmlFor="calories">Protein</label>
                <input
                    id="protein"
                    className={styles.input}
                    name="protein"
                    type="number"
                    min="1"
                    value={formData.protein}
                    onChange={onInputChange}
                    required
                />
                <label className={styles.label} htmlFor="calories">Carbs</label>
                <input
                    id="carbs"
                    className={styles.input}
                    name="carbs"
                    type="number"
                    min="1"
                    value={formData.carbs}
                    onChange={onInputChange}
                    required
                />
                <label className={styles.label} htmlFor="calories">Fat</label>
                <input
                    id="fat"
                    className={styles.input}
                    name="fat"
                    type="number"
                    min="1"
                    value={formData.fat}
                    onChange={onInputChange}
                    required
                />

                <button className={styles.button} type="submit">Create Product</button>
            </div>
        </form>
    )
}