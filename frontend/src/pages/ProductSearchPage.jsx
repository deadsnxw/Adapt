import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom";
import { fetchApi } from "../utils/api";
import ProductSearch from "../components/product/ProductSearch";

export default function ProductSearchPage() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);

    const navigate = useNavigate();
    const location = useLocation();

    const mealType = location.state?.mealType; 

     const fetchProducts = async () => {
            const data = await fetchApi(`/api/products/search?query=${query}`)
    
            setResults(data)
        };
    
    const handleInputChange = (event) => {
        setQuery(event.target.value);
    };
    
    return (
        <div className="searchContainer">
            <ProductSearch
                query={query}
                onQueryChange={handleInputChange}
                results={results}
                onSearch={fetchProducts}
            />
        </div>
    )
}