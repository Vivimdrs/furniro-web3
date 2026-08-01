import { useParams } from "react-router-dom";
import type Product from "../../interface/Product";

// Requisição ainda sem banco
import seedProducts from "../../db/Seed/Seed.json";
import Container from "../../components/Container";
import SingleProductImages from "../../components/SingleProductImages";
const products: Product[] = seedProducts.map((product) => ({
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
      <SingleProductImages images={currentProduct.images}></SingleProductImages>
    </Container>
  );
};

export default Product;
