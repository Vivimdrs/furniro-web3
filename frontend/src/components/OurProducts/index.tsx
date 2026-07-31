import OurProductsCard from "../OurProductsCard";
import seedProducts from "../../db/Seed/Seed.json";
import clsx from "clsx";
import { useEffect, useState } from "react";
import OurProductsButton from "../OurProductsButton";

const OurProducts = () => {
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
          "text-primary-text-200 text-[40px] font-bold font-poppins leading-12",
          "mb-8",
        )}
      >
        Our Products
      </h1>
      <div
        className={clsx(
          "max-w-309 w-full",
          "flex gap-8 flex-wrap justify-center",
          "mb-8",
        )}
      >
        {seedProducts.slice(0, lineProducts * display).map((product) => (
          <OurProductsCard
            key={product.id}
            image={product.image}
            name={product.name}
            description={product.description}
            currentPrice={product.currentPrice}
            offer={product.offer}
            oldPrice={product.oldPrice}
            discount={product.discount}
            isNew={product.isNew}
          ></OurProductsCard>
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
