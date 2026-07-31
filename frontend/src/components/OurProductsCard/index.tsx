import clsx from "clsx";
import share from "/Icons/share.svg";
import compare from "/Icons/compare.svg";
import like from "/Icons/like.svg";


type OurProductsCardProps = {
  image: string;
  name: string;
  description: string;
  currentPrice: string;
  offer: boolean;
  oldPrice?: string;
  discount?: number;
  isNew: boolean;
};
const OurProductsCard = ({
  image,
  name,
  description,
  currentPrice,
  offer,
  oldPrice,
  discount,
  isNew,
}: OurProductsCardProps) => {
  const commonClass: string =
    "h-12 w-12 rounded-full " +
    "flex justify-center items-center " +
    "text-primary font-poppins font-medium text-[16px] leading-6 " +
    "absolute top-6 right-6";
  return (
    <div
      className={clsx(
        "min-w-71.25 h-111.5",
        "bg-card-product",
        "group",
        "relative",
      )}
    >
      <div
        className={clsx("w-full h-75.25", "relative")}
        style={{ backgroundImage: `url(${image})` }}
      >
        {offer && (
          <div className={clsx("bg-[#E97171]", commonClass)}>-{discount}%</div>
        )}
        {isNew && <div className={clsx("bg-[#2EC1AC]", commonClass)}>New</div>}
      </div>
      <h1
        className={clsx(
          "text-[24px] text-primary-text-200 font-poppins font-semibold leading-[28.8px]",
          "ml-4 mt-4",
        )}
      >
        {name}
      </h1>
      <p
        className={clsx(
          "text-over-card-product text-[16px] font-poppins leading-6 font-medium",
          "ml-4 mt-2",
        )}
      >
        {description}
      </p>
      <div className={clsx("ml-4 mt-2", "flex gap-4 items-center")}>
        <p
          className={clsx(
            "text-primary-text-200 font-semibold leading-6 font-poppins",
          )}
        >
          {currentPrice}
        </p>
        {offer && (
          <p
            className={clsx(
              "text-[#B0B0B0] leading-6 text-[16px] line-through",
            )}
          >
            {oldPrice}
          </p>
        )}
      </div>
      {/*Hover*/}
      <div
        className={clsx(
          "flex flex-col justify-center items-center gap-6",
          "w-full h-full",
          "absolute top-0",
          "opacity-0 group-hover:opacity-100 transition duration-300",
        )}
      >
        <div
          className={clsx(
            "w-full h-full bg-black",
            "opacity-[0.72]",
            "absolute z-10",
          )}
        ></div>
        <button
          className={clsx(
            "bg-primary",
            "h-12 w-55.25",
            "z-20",
            "text-over-secundary text-[16px] font-semibold font-poppins",
            "hover:bg-over-secundary hover:text-secundary transition cursor-pointer"
          )}
        >
          Add to cart
        </button>
        <nav className={clsx("z-20", "flex justify-between items-center", "w-full px-4")}>
          <a
            className={clsx(
              "text-primary text-[16px] font-poppins font-semibold",
              "flex gap-px",
              "hover:opacity-80 cursor-pointer transition"
            )}
          >
            <img src={share} />
            Share
          </a>
          <a
            className={clsx(
              "text-primary text-[16px] font-poppins font-semibold",
              "flex gap-px",
              "hover:opacity-80 cursor-pointer transition"
            )}
          >
            <img src={compare} />
            Compare
          </a>
          <a
            className={clsx(
              "text-primary text-[16px] font-poppins font-semibold",
              "flex gap-px",
              "hover:opacity-80 cursor-pointer transition"
            )}
          >
            <img src={like} />
            Like
          </a>
        </nav>
      </div>
    </div>
  );
};
export default OurProductsCard;
