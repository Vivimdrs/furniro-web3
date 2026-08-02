import clsx from "clsx";
import type Product from "../../interface/Product";
import NumberToStringRS from "../../utils/NumberToStringRS";
import StarCount from "../StarCount";
import SingleProductSize from "../SingleProductSize";
import { useState } from "react";
import SingleProductColor from "../SingleProductColor";
import SingleProductQuantity from "../SingleProductQuantity";

type SingleProductCardProps = {
  produto: Product;
};

type SigleProductCardStages = {
  name: string;
  image: string;
  color: string;
  size: string;
  quantity: number;
};

const sizePrice: Record<string, number> = {
  xl: 20,
  l: 10,
  m: 0,
  s: -10,
};

const SingleProductCard = ({ produto }: SingleProductCardProps) => {
  const [productStages, setProductStages] = useState<SigleProductCardStages>({
    name: produto.name,
    image: produto.images[0],
    color: produto.colors[0],
    size: produto.sizes[0],
    quantity: 1,
  });
  const handleChangeSize = (index: number) => {
    setProductStages((prev) => ({
      ...prev,
      size: produto.sizes[index],
    }));
  };
  const handleChangeColor = (index: number) => {
    setProductStages((prev) => ({
      ...prev,
      color: produto.colors[index],
    }));
  };
  const handlePlusQuantity = () => {
    setProductStages((prev) => ({
      ...prev,
      quantity: prev.quantity + 1,
    }));
  };
  const handleMinusQuantity = () => {
    setProductStages((prev) => ({
      ...prev,
      quantity: prev.quantity == 1 ? prev.quantity : prev.quantity - 1,
    }));
  };
  const priceWithSizeAndQuantity =
    (produto.price + (produto.price * sizePrice[productStages.size]) / 100) *
    productStages.quantity;

  return (
    <div className={clsx("font-poppins")}>
      <h1 className={clsx("text-[42px]")}>{produto.name}</h1>
      <div className={clsx("flex gap-6 items-end", "text-[#9f9f9f] ")}>
        <h1 className={clsx("text-[24px]")}>
          Rs.{" "}
          {produto.discountPrice
            ? NumberToStringRS(
                priceWithSizeAndQuantity -
                  produto.price *
                    (produto.discountPrice / 100) *
                    productStages.quantity,
              )
            : NumberToStringRS(priceWithSizeAndQuantity)}
        </h1>
        {produto.discountPrice && (
          <h1 className="line-through">
            R$ {NumberToStringRS(priceWithSizeAndQuantity)}
          </h1>
        )}
      </div>
      <StarCount
        rating={produto.rating}
        reviewCount={produto.reviewCount}
      ></StarCount>
      <p className={clsx("max-w-106 text-[13px] mb-5.5")}>
        {produto.shortDescription}
      </p>
      <SingleProductSize
        sizes={produto.sizes}
        handleChangeSize={handleChangeSize}
        selectedSize={productStages.size}
      ></SingleProductSize>
      <SingleProductColor
        colors={produto.colors}
        handleChangeColor={handleChangeColor}
        selectedColor={productStages.color}
      ></SingleProductColor>
      <SingleProductQuantity
        currentQuantity={productStages.quantity}
        handlePlusQuantity={handlePlusQuantity}
        handleMinusQuantity={handleMinusQuantity}
        SingleProductCartProps={productStages}
      ></SingleProductQuantity>
    </div>
  );
};
export default SingleProductCard;
