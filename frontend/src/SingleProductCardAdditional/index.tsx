import { useState } from "react";
import type Product from "../interface/Product";
import clsx from "clsx";

type SingleProductCardAdditionalProps = {
  produto: Product;
};
const SingleProductCardAdditional = ({
  produto,
}: SingleProductCardAdditionalProps) => {
  const [visible, setVisible] = useState(0);
  return (
    <div className={clsx("flex items-center flex-col pb-9")}>
      <div
        className={clsx(
          "flex gap-32.5 justify-center py-9",
          "text-[24px] text-[#9f9f9f]",
        )}
      >
        <h1
          onClick={() => setVisible(0)}
          className={clsx("cursor-pointer", {
            "text-black": visible === 0,
          })}
        >
          Description
        </h1>
        <h1
          onClick={() => setVisible(1)}
          className={clsx("cursor-pointer", {
            "text-black": visible === 1,
          })}
        >
          Additional Information
        </h1>
      </div>
      <div className={clsx("max-w-5xl w-full p-2")}>
        <div
          className={clsx(
            visible === 0 ? "block" : "hidden",
            "flex flex-col items-center gap-10",
          )}
        >
          <p className={clsx("text-[16px] text-[#9f9f9f]")}>
            {produto.description}
          </p>
          <div
            className={clsx(
              "flex gap-10 flex-wrap items-center justify-center",
            )}
          >
            <img src={produto.images[0]}></img>
            <img src={produto.images[1]}></img>
          </div>
          <p className={clsx("text-[16px] text-[#9f9f9f]")}>
            {produto.description}
          </p>
        </div>
        <div className={clsx(visible === 1 ? "block" : "hidden")}>
          <ul className={clsx("text-[16px] text-[#9f9f9f] leading-7")}>
            <li>ID: {produto.id}</li>
            <li>Name: {produto.name}</li>
            <li>Slug: {produto.slug}</li>
            <li>New: {produto.isNew ? "Yes" : "No"}</li>
            <li>Description: {produto.description}</li>
            <li>Price: {produto.price}</li>
            <li>Discount Price: {produto.discountPrice ?? "No discount"}</li>
            <li>Category: {produto.category}</li>
            <li>Rating: {produto.rating}</li>
            <li>Review Count: {produto.reviewCount}</li>
            <li>Stock: {produto.stock}</li>
            <li>Colors: {produto.colors.join(", ")}</li>
            <li>Sizes: {produto.sizes.join(", ")}</li>
            <li>SKU: {produto.sku}</li>
            <li>Created At: {produto.createdAt.toLocaleDateString()}</li>
            <li>Updated At: {produto.updatedAt.toLocaleDateString()}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
export default SingleProductCardAdditional;
