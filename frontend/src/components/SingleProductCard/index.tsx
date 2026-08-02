import clsx from "clsx";
import type Product from "../../interface/Product";
import NumberToStringRS from "../../utils/NumberToStringRS";
import StarCount from "../StarCount";
import SingleProductSize from "../SingleProductSize";
import { useState } from "react";

type SingleProductCardProps = {
  produto: Product;
};

const sizePrice: Record<string, number> = {
  xl: 20,
  l: 10,
  m: 0,
  s: -10,
};

const SingleProductCard = ({ produto }: SingleProductCardProps) => {
  const [selectedSize, setSelectedSize] = useState(produto.sizes[0]);
  const handleChangeSize = (index: number) => {
    setSelectedSize(produto.sizes[index]);
  };
  const priceWithSize = produto.price + produto.price * sizePrice[selectedSize]/100;
  return (
    <div className={clsx("font-poppins")}>
      <h1 className={clsx("text-[42px]")}>{produto.name}</h1>
      <div className={clsx("flex gap-6 items-end", "text-[#9f9f9f] ")}>
        <h1 className={clsx("text-[24px]")}>
          Rs.{" "}
          {produto.discountPrice
            ? NumberToStringRS(
                priceWithSize - produto.price * (produto.discountPrice / 100),
              )
            : NumberToStringRS(produto.price)}
        </h1>
        {produto.discountPrice && (
          <h1 className="line-through">R$ {NumberToStringRS(priceWithSize)}</h1>
        )}
      </div>
      <StarCount
        rating={produto.rating}
        reviewCount={produto.reviewCount}
      ></StarCount>
      <p className={clsx("max-w-106 text-[13px] mb-5.5")}>
        {produto.description}
      </p>
      <SingleProductSize
        sizes={produto.sizes}
        handleChangeSize={handleChangeSize}
        selectedSize={selectedSize}
      ></SingleProductSize>
    </div>
  );
};
export default SingleProductCard;
