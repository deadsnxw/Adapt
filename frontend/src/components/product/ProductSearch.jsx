export default function ProductSearch({query, onQueryChange, results, onSearch}) {
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
                <ul className="productsList">
                    <div className="listGroup">
                        {results.map((item) => (
                            <li key={item.id}>
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