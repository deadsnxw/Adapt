import { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom";
import { fetchApi } from "../utils/api";
import ProductCreate from "../components/product/ProductCreate";
import styles from "../styles/ProductCreatePage.module.css"

export default function ProductCreatePage() {
    const [formData, setFormData] = useState({
        productName: "",
        calories: "",
        protein: "",
        carbs: "",
        fat: "",
        source: "CUSTOM"
    });
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    const mealType = location.state?.mealType; 

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleCreate = async (event) => {
        event.preventDefault();
        setError("");

        const payload = {
            productName: formData.productName,
            calories: parseFloat(formData.calories),
            protein: parseFloat(formData.protein),
            carbs: parseFloat(formData.carbs),
            fat: parseFloat(formData.fat),
            source: formData.source
        }

        try {
            const data = await fetchApi("/api/products", {
                method: "POST",
                body: payload
            });

            setFormData(data);

            console.log(data);

            navigate(`/products/${data.id}`, { state: { product: data, mealType }})
        } catch (error) {
            setError("couldn't create product")
        }
    }

    return (
        <div className={styles.productCreateContainer}>
            <div className={styles.createContent}>
                <h1 className={styles.pageName}>Create a product</h1>
                {error && <p className={styles.error}>{error}</p>}

                <ProductCreate
                    formData={formData}
                    onInputChange={handleInputChange}
                    onCreate={handleCreate}
                />
            </div>
        </div>
    )
}