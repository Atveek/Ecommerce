import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Productdescription from "./Productdescription";

export default function Productitem() {
  const [product, setProduct] = useState({});
  const [images, setImages] = useState([]);
  const { category, productid } = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/product/${category}/${productid}`);
        if (!response.ok) {
          throw new Error("Failed to fetch product");
        }

        const data = await response.json();
        console.log("Fetched product data:", data);
        setProduct(data);
        setImages(data.images); // Fix this line
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [category, productid]);

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };
  return (
    <div className="flex flex-col bg-white m-3  justify-start md:flex-row">
      <div className="block relative h-fit m-2 md:ml-5 border-[1px] border-black md:mt-5 md:w-[65%] lg:w-[50%] ">
        {images.length >= 2 && (
          <button className="absolute left-2 top-1/2" onClick={handlePrevImage}>
            <img
              className="rotate-90 w-8"
              src="/image/imgbtn.png"
              alt="button"
            />
          </button>
        )}
        {images.map((image, index) => (
          <img
            key={index}
            className="h-[400px] w-[430px] mix-blend-normal object-contain p-5 sm:py-10 sm:h-[450px] py-[auto]  sm:w-[auto] md:h-[600px] mx-auto  md:w-[auto]"
            src={image}
            alt={`Product`}
            style={{
              display: index === currentImageIndex ? "block" : "none",
            }}
          />
        ))}
        {images.length >= 2 && (
          <button
            className="absolute right-2 top-1/2"
            onClick={handleNextImage}
          >
            <img
              className="-rotate-90 w-8"
              src="/image/imgbtn.png"
              alt="button"
            />
          </button>
        )}
      </div>
      <Productdescription product={product} />
    </div>
  );
}
