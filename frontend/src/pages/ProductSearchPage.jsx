import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom";
import { fetchApi } from "../utils/api";
import ProductSearch from "../components/product/ProductSearch";

export default function ProductSearchPage() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
        
    const location = useLocation();

    const mealType = location.state?.mealType; 

    const fetchProducts = async () => {
        setIsLoading(true);

        try {
            const data = await fetchApi(`/api/products/search?query=${query}`)
        
            setResults(data)
        } catch (error) {
            setError("Service unavailable")
        } finally {
            setIsLoading(false);
        }
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
                mealType={mealType}
                isSearching={isLoading}
            />
        </div>
    )
}