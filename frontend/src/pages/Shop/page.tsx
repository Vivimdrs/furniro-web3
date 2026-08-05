import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import clsx from "clsx";
import Container from "../../components/Container";
import BannerCard from "../../components/BannerCard";
import BenefitsCard from "../../components/BenefitsCard";
import OurProductsCard from "../../components/OurProductsCard";
import { isValidCategory } from "../../utils/validCategories";
import { getProducts } from "../../services/product.service";
import type Product from "../../interface/Product";
import FilterBar from "../../components/FilterBar";

const Shop = () => {
    const { category } = useParams<{ category?: string }>();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const categoryIsValid = !category || isValidCategory(category);

    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 16;
    const sort = searchParams.get("sort") as "price_asc" | "price_desc" | null;


    const [products, setProducts] = useState<Product[]>([]);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (!categoryIsValid) {
            toast.error("Category not found. Showing all products.");
            navigate("/shop", { replace: true });
        }
    }, [categoryIsValid, navigate]);

    useEffect(() => {
        if (!categoryIsValid) return;

        async function fetchProducts() {
            setLoading(true);
            setError(false);

            try {
                const data = await getProducts({
                    category,
                    page,
                    limit,
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
    }, [category, categoryIsValid, page, limit, sort]);

    return (
        <div>
            <BannerCard
                title="Shop"
                breadcrumbs={[{ label: "Home", href: "/" }, { label: "Shop" }]}
            />

            <FilterBar 
            totalResults={products.length} 
            currentPage={page}
            currentLimit={limit}
            />

            <Container className="py-16 px-4">
                {loading && <p>Loading products...</p>}

                {!loading && error && (
                    <p>
                        Something went wrong while loading products. Please try
                        again.
                    </p>
                )}

                {!loading && !error && products.length === 0 && (
                    <p>No products found.</p>
                )}

                {!loading && !error && products.length > 0 && (
                    <>
                        <div
                            className={clsx(
                                "max-w-309 w-full mx-auto",
                                "flex gap-8 flex-wrap justify-center",
                            )}>
                            {products.map((product) => (
                                <OurProductsCard
                                    key={product.id}
                                    produto={product}></OurProductsCard>
                            ))}
                        </div>
                        <p className="text-center mt-8 text-sm text-over-card-product">
                            Page {page} of {totalPages}
                        </p>
                    </>
                )}
            </Container>

            <BenefitsCard />
        </div>
    );
};

export default Shop;
