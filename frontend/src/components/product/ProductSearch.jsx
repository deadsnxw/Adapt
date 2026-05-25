import { useNavigate } from "react-router-dom";

export default function ProductSearch({query, onQueryChange, results, onSearch, mealType }) {
    const navigate = useNavigate();

    return (
        <div className="searchForm">
            <div className="formGroup">
                <input
                    id="query"
                    name="query"
                    type="text"
                    placeholder="Chocolate Milka"
                    value={query}
                    onChange={onQueryChange}
                />
                <button className="searchButton" onClick={onSearch}>Search</button>
                <button className="addCustom" onClick={() => navigate('/products/create', {state: { mealType }})}>Add Custom Product</button>
                <ul className="productsList">
                    <div className="listGroup">
                        {results.map((item) => (
                            <li key={item.id} onClick={() => navigate(`/products/${item.externalId}`, { state: { mealType, product: item } })}>
                                {item.productName} -  
                                {item.calories} kcal - 
                                {item.protein}g- 
                                {item.carbs}g - 
                                {item.fat}g
                            </li>
                        ))}
                    </div>
                </ul>
            </div>
        </div>
    )
}