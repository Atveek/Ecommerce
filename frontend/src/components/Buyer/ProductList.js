// ProductList.js
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getToken } from "../getUserInfo";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  let { category } = useParams();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = getToken();
        console.log(token);

        // Construct the fetch URL based on the category value
        const fetchUrl =
          category === undefined ? "/product/buyer" : `/product/${category}`;

        // Fetch product data from your server with JWT token in the header
        const response = await fetch(fetchUrl, {
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
  }, [category]);

  const handleClick = (productid, category1) => {
    navigate(`/${category1}/${productid}`);
  };
  function afterdescount(product) {
    return (
      product.price -
      (product.price * product.discountPercentage) / 100
    ).toFixed(2);
  }

  return (
    <div className="flex flex-col rounded-md flex-grow justify-center items-center bg-white m-3">
      <ul className="grid grid-flow-row grid-cols-1 sm:grid-cols-2 lg:grid-cols-4  gap-5">
        {Array.isArray(products) &&
          products.map((product) => (
            <li
              key={product._id}
              className="p-4 bg-white shadow-md rounded-md cursor-pointer"
              onClick={() => handleClick(product._id, product.category)}
            >
              <img
                className="w-full h-48 object-cover"
                src={product.thumbnail}
                alt="Product"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{product.title}</h3>
                <p className="text-gray-700 mb-4">{product.description}</p>
                <span className="text-base p-1 bg-gray-500 font-bold text-white rounded-md px-2">
                  {product.rating}
                  <img
                    className="inline-block w-5"
                    src="/image/rating.png"
                    alt="rating"
                  />
                </span>
                <br />
                <div>
                  <p className="text-green-500 font-bold inline-block w-1/2">
                    <span className=" text-black font-bold mr-1">
                      ${afterdescount(product)}
                    </span>
                    {"  "}
                    <span className="text-gray-600 font-semibold line-through">
                      ${product.price}
                    </span>{" "}
                    {product.discountPercentage}% off
                  </p>
                  <button className=" inline-block mt-2 bg-teal-500 text-white py-2 px-4 rounded-full">
                    Add to Cart
                  </button>
                </div>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default ProductList;
