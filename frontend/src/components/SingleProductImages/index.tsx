import clsx from "clsx";
import { useState } from "react";

type SingleProductImagesProps = {
  images: string[];
};
const SingleProductImages = ({ images }: SingleProductImagesProps) => {
  const [currentImage, setCurrentImage] = useState(images[0]);
  const handleClickImage = (image: string) => {
    setCurrentImage(image);
  };
  return (
    <div className={clsx("flex gap-7 flex-col-reverse min-w-0", "md:flex-row", "max-sm: items-center")}>
      <div className={clsx("max-sm:w-[90%] max-sm:overflow-x-scroll")}>
        <div
          className={clsx("flex gap-6.75", "md:flex-col max-md:justify-center", "max-sm:min-w-100")}
        >
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              className={clsx(
                "w-19 h-20 rounded-[10px]",
                "bg-red-300",
                "overflow-hidden",
                "cursor-pointer",
              )}
              onClick={() => handleClickImage(image)}
            ></img>
          ))}
        </div>
      </div>

      <div className={clsx("h-125 max-w-105.75 w-[90%]", "overflow-hidden")}>
        <img
          src={currentImage}
          className={clsx("h-full w-full", "hover:scale-110 transition")}
        ></img>
      </div>
    </div>
  );
};
export default SingleProductImages;
