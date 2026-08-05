import clsx from "clsx";

type SingleProductQuantityProps = {
  currentQuantity: number;
  handlePlusQuantity: () => void;
  handleMinusQuantity: () => void;
  SingleProductCartProps: {
    name: string;
    image: string;
    color: string;
    size: string;
    quantity: number;
  };
};

const SingleProductQuantity = ({
  currentQuantity,
  handlePlusQuantity,
  handleMinusQuantity,
  SingleProductCartProps,
}: SingleProductQuantityProps) => {
  //Para implementar a função de chamada para o Cart
  const handleAddToCart = () => {
    console.log(JSON.stringify(SingleProductCartProps, null, 2));
  };
  return (
    <div className={clsx("my-8 font-poppins text-[16px]", "flex gap-4.5")}>
      <div
        className={clsx(
          "flex justify-around items-center w-30.75 h-16",
          "border-[#9F9F9F] border",
          "rounded-[10px]",
          "font-medium",
        )}
      >
        <button
          onClick={handleMinusQuantity}
          className={clsx("cursor-pointer")}
        >
          -
        </button>
        <h1>{currentQuantity}</h1>
        <button onClick={handlePlusQuantity} className={clsx("cursor-pointer")}>
          +
        </button>
      </div>
      <button
        className={clsx(
          "flex justify-around items-center w-53.75 h-16",
          "border-[#9F9F9F] border",
          "rounded-[15px]",
          "text-[20px]",
          "cursor-pointer hover:transform hover:scale-105 transition",
        )}
        onClick={() => handleAddToCart()}
      >
        Add To Cart
      </button>
    </div>
  );
};
export default SingleProductQuantity;
