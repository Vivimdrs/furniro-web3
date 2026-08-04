import { useParams } from "react-router-dom";
import type ProductModel from "../../interface/Product";

// Requisição ainda sem banco
import seedProducts from "../../db/Seed/Seed.json";
import Container from "../../components/Container";
import SingleProductImages from "../../components/SingleProductImages";
import SingleProductCard from "../../components/SingleProductCard";
import clsx from "clsx";
const products: ProductModel[] = seedProducts.map((product) => ({
    ...product,
    createdAt: new Date(product.createdAt),
    updatedAt: new Date(product.updatedAt),
}));

const Product = () => {
    const { slug } = useParams();

    // Requisição ainda sem banco
    const currentProduct = products.find((p) => p.slug === slug);

    if (!currentProduct) {
        return <h1>Produto não encontrado</h1>;
    }

    return (
        <Container>
            <div
                className={clsx(
                    "flex gap-26.5 justify-center flex-wrap-reverse md:px-0 px-2",
                )}>
                <SingleProductImages
                    images={currentProduct.images}></SingleProductImages>
                <SingleProductCard produto={currentProduct}></SingleProductCard>
            </div>
        </Container>
    );
};

export default Product;
