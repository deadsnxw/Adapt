export default function ProductCreate({ formData, onInputChange, onCreate }) {
    return (
        <form className="productCreateForm" onSubmit={onCreate}>
            <div className="formGroup">
                <label htmlFor="productName">Product Name</label>
                <input
                    id="productName"
                    name="productName"
                    type="text"
                    value={formData.productName}
                    onChange={onInputChange}
                    required
                />

                <label htmlFor="calories">Calories</label>
                <input
                    id="calories"
                    name="calories"
                    type="number"
                    min="1"
                    value={formData.calories}
                    onChange={onInputChange}
                    required
                />
                <label htmlFor="calories">Protein</label>
                <input
                    id="protein"
                    name="protein"
                    type="number"
                    min="1"
                    value={formData.protein}
                    onChange={onInputChange}
                    required
                />
                <label htmlFor="calories">Carbs</label>
                <input
                    id="carbs"
                    name="carbs"
                    type="number"
                    min="1"
                    value={formData.carbs}
                    onChange={onInputChange}
                    required
                />
                <label htmlFor="calories">Fat</label>
                <input
                    id="fat"
                    name="fat"
                    type="number"
                    min="1"
                    value={formData.fat}
                    onChange={onInputChange}
                    required
                />

                <button className="createButton" type="submit">Create Product</button>
            </div>
        </form>
    )
}