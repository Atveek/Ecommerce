import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ProductDetail() {
  const [product, setProduct] = useState({});
  const { productid } = useParams();
  console.log(productid);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/product/${productid}`);
        if (!response.ok) {
          throw new Error("Failed to fetch product");
        }

        const data = await response.json();
        console.log("Fetched product data:", data); // Log the data
        setProduct(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [productid]);

  return (
    <div>
      <h1>{product.title}</h1>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <p>Stock: {product.stock}</p>
      <p>Seller ID: {product.seller}</p>
      {/* Add more details as needed */}
    </div>
  );
}
