import clsx from "clsx";

type SingleProductSizeProps = {
  sizes: string[];
  handleChangeSize: (index: number) => void;
  selectedSize: string;
};
const SingleProductSize = ({
  sizes,
  handleChangeSize,
  selectedSize,
}: SingleProductSizeProps) => {
  return (
    <div className={clsx("font-poppins flex flex-col gap-3")}>
      <h1 className={clsx("text-[#9F9F9F] text-[14px]")}>Size</h1>
      <div className={clsx("flex gap-4")}>
        {sizes.map((size, index) => {
          return (
            <div
              key={index}
              onClick={() => handleChangeSize(index)}
              className={clsx(
                "w-7.25 h-7.25 rounded-[5px]",
                "flex items-center justify-center",
                "text-[13px] uppercase",
                "bg-[#f9f1e7]",
                "cursor-pointer",
                { "bg-over-secundary": selectedSize === size },
              )}
            >
              {size}
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default SingleProductSize;
