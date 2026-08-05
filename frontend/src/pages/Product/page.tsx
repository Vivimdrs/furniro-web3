import { useParams } from "react-router-dom";
import type Product from "../../interface/Product";

// Requisição ainda sem banco
import seedProducts from "../../db/Seed/Seed.json";
import Container from "../../components/Container";
import SingleProductImages from "../../components/SingleProductImages";
import SingleProductCard from "../../components/SingleProductCard";
import clsx from "clsx";
import SingleProductCardAdditional from "../../SingleProductCardAdditional";
import OurProducts from "../../components/OurProducts";
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
    <div>
      <Container className={clsx("border-b border-[#9f9f9f]")}>
        <div
          className={clsx(
            "flex gap-26.5 justify-center flex-wrap-reverse md:px-0 px-2 pt-8.75 pb-15",
          )}
        >
          <SingleProductImages
            images={currentProduct.images}
          ></SingleProductImages>
          <SingleProductCard produto={currentProduct}></SingleProductCard>
        </div>
      </Container>
      <Container className={clsx("border-b border-[#9f9f9f]")}>
        <SingleProductCardAdditional
          produto={currentProduct}
        ></SingleProductCardAdditional>
      </Container>
      <Container className={clsx("py-10")}>
        <OurProducts title="Related Products" font="font-semibold"></OurProducts>
      </Container>
    </div>
  );
};

export default Product;
