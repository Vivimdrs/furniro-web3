import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import Container from "../../components/Container";
import { isValidCategory } from "../../utils/validCategories";
import { getProducts } from "../../services/product.service";
import type Product from "../../interface/Product";

const Shop = () => {
    const { category } = useParams<{ category?: string }>();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const page = Number(searchParams.get("page")) || 1;
    const sort = searchParams.get("sort") as "price_asc" | "price_desc" | null;

    const [products, setProducts] = useState<Product[]>([]);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (category && !isValidCategory(category)) {
            toast.error("Category not found. Showing all products.");
            navigate("/shop", { replace: true });
        }
    }, [category, navigate]);

    useEffect(() => {
        if (category && !isValidCategory(category)) return;

        async function fetchProducts() {
            setLoading(true);
            setError(false);

            try {
                const data = await getProducts({
                    category,
                    page,
                    sort: sort ?? undefined,
                });
                setProducts(data.products);
                setTotalPages(data.totalPages);
            } catch {
                setError(true);
            } finally {
                setLoading(false);
            }
        }

        fetchProducts();
    }, [category, page, sort]);

    if (loading) {
        return (
            <Container>
                <p>Loading products...</p>
            </Container>
        );
    }

    if (error) {
        return (
            <Container>
                <p>
                    Something went wrong while loading products. Please try
                    again.
                </p>
            </Container>
        );
    }

    if (products.length === 0) {
        return (
            <Container>
                <p>No products found.</p>
            </Container>
        );
    }

    return (
        <Container>
            <ul>
                {products.map((product) => (
                    <li key={product.id}>{product.name}</li>
                ))}
            </ul>
            <p>Total pages: {totalPages}</p>
        </Container>
    );
};

export default Shop;
