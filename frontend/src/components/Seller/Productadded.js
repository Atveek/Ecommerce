import React, { useState, useEffect } from "react";
import { getToken } from "../getUserInfo";

const Productadded = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = getToken();
        // Fetch product data from your server with JWT token in the header
        const response = await fetch("/product/seller", {
          headers: {
            token: `${token}`,
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Product List</h1>
      <ul>
        {Array.isArray(products) &&
          products.map((product) => (
            <li key={product._id}>
              <br />
              <h1>{product.title}</h1>
              <p>{product.description}</p>
              <p>Price: ${product.price}</p>
              <p>Stock: {product.stock}</p>
              <br />
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Productadded;
