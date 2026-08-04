import OurProductsCard from "../OurProductsCard";
import seedProducts from "../../db/Seed/Seed.json";
import type Product from "../../interface/Product";
import clsx from "clsx";
import { useEffect, useState } from "react";
import OurProductsButton from "../OurProductsButton";

const products: Product[] = seedProducts.map((product) => ({
  ...product,
  createdAt: new Date(product.createdAt),
  updatedAt: new Date(product.updatedAt),
}));

type OurProductsProps = {
  title: string;
  font: "font-bold" | "font-semibold";
};

const OurProducts = ({ title, font }: OurProductsProps) => {
  const [lineProducts, setLineProducts] = useState(8);
  const [display, setDisplay] = useState(2);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 649) {
        setLineProducts(1);
      } else if (window.innerWidth < 966) {
        setLineProducts(2);
      } else if (window.innerWidth < 1283) {
        setLineProducts(3);
      } else {
        setLineProducts(4);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleClick = () => {
    setDisplay((prev) => prev + 1);
  };

  return (
    <div
      className={clsx("w-full", "flex flex-col items-center", "px-4 pb-17.25")}
    >
      <h1
        className={clsx(
          "text-primary-text-200 text-[40px] font-poppins leading-12",
          "mb-8", {font}
        )}
      >
        {title}
      </h1>
      <div
        className={clsx(
          "max-w-309 w-full",
          "flex gap-8 flex-wrap justify-center",
          "mb-8",
        )}
      >
        {products.slice(0, lineProducts * display).map((product) => (
          <OurProductsCard key={product.id} produto={product}></OurProductsCard>
        ))}
      </div>
      <OurProductsButton
        handleClick={handleClick}
        label="Show More"
        disabled={seedProducts.length <= lineProducts * display}
      ></OurProductsButton>
    </div>
  );
};
export default OurProducts;
