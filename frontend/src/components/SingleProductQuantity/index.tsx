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
  const handleAddToCart = () => {
    console.log(JSON.stringify(SingleProductCartProps, null, 2));
  };

  return (
    <div
      className={clsx(
        "my-8 font-poppins text-[16px] flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between",
      )}
    >
      <div
        className={clsx(
          "flex items-center justify-between w-[106.54px] h-[47px] rounded-[10px] border border-[#9F9F9F] px-1",
        )}
      >
        <button
          type="button"
          aria-label="Diminuir quantidade"
          onClick={handleMinusQuantity}
          className={clsx(
            "w-[38px] h-[38px] rounded-[8px] border border-[#9F9F9F] text-[20px] font-semibold text-[#3A3A3A]",
            "flex items-center justify-center hover:bg-[#E5E5E5] transition",
            "focus:outline-2 focus:outline-over-secundary",
          )}
        >
          -
        </button>
        <span
          className={clsx(
            "text-[16px] font-semibold font-poppins text-[#3A3A3A]",
          )}
        >
          {currentQuantity}
        </span>
        <button
          type="button"
          aria-label="Aumentar quantidade"
          onClick={handlePlusQuantity}
          className={clsx(
            "w-[38px] h-[38px] rounded-[8px] border border-[#9F9F9F] text-[20px] font-semibold text-[#3A3A3A]",
            "flex items-center justify-center hover:bg-[#E5E5E5] transition",
            "focus:outline-2 focus:outline-over-secundary",
          )}
        >
          +
        </button>
      </div>
      <button
        className={clsx(
          "h-[47px] min-w-[150px] rounded-[15px] bg-[#B88E2F] px-4 text-[16px] font-semibold text-white",
          "hover:brightness-110 transition",
        )}
        onClick={handleAddToCart}
      >
        Add To Cart
      </button>
    </div>
  );
};
export default SingleProductQuantity;
