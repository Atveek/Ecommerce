// ProductList.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getToken } from "../getUserInfo";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = getToken();
        console.log(token);

        // Fetch product data from your server with JWT token in the header
        const response = await fetch("/product/buyer", {
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

  const handleClick = (productid) => {
    navigate(`/products/${productid}`);
  };

  return (
    <div className="flex flex-col justify-center  bg-white">
      <h1>Product List</h1>
      <ul className="grid grid-flow-row grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {Array.isArray(products) &&
          products.map((product) => (
            <li
              key={product._id}
              className="p-5 shadow1 rounded-xl hover:bg-gray-300 hover:bottom-1 duration-500 cursor-pointer"
              onClick={() => handleClick(product._id)}
            >
              <br />
              <h1>{product.title}</h1>
              <p>{product.description}</p>
              <p>Price: ${product.price}</p>
              <p>Stock: {product.stock}</p>
              <p>Seller ID: {product.seller}</p>
              <br />
            </li>
          ))}
      </ul>
    </div>
  );
};

export default ProductList;
