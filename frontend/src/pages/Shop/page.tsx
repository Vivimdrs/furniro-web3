import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import Container from "../../components/Container";
import { isValidCategory } from "../../utils/validCategories";

const Shop = () => {
    const { category } = useParams<{ category?: string }>();
    const navigate = useNavigate();

    useEffect(() => {
        if (category && !isValidCategory(category)) {
            toast.error("Category not found. Showing all products.");
            navigate("/shop", { replace: true });
        }
    }, [category, navigate]);

    return (
        <Container>
            <h1>Shop {category ? `- ${category}` : ""}</h1>
        </Container>
    );
};

export default Shop;
