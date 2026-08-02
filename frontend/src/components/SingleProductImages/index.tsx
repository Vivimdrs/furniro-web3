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
    <div className={clsx("flex gap-7 flex-col-reverse", "md:flex-row")}>
      <div
        className={clsx("flex gap-6.75", "md:flex-col max-md:justify-center")}
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
      <div className={clsx("h-125 w-105.75", "overflow-hidden")}>
        <img
          src={currentImage}
          className={clsx("h-full w-full", "hover:scale-110 transition")}
        ></img>
      </div>
    </div>
  );
};
export default SingleProductImages;
