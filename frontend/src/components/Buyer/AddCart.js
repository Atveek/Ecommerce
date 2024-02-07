import React, { useState, useEffect } from "react";
import { getToken } from "../Auth/getUserInfo";
import axios from "axios";
import Payment from "./Payment";

export default function AddCart() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = getToken();
        const response = await axios.get("/cart/shaw", {
          headers: {
            "Content-Type": "application/json",
            token: `${token}`,
          },
        });

        if (response.status !== 200) {
          throw new Error("Failed to fetch products");
        }

        const data = response.data;
        console.log(data);
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  function afterDiscount(product) {
    return (
      product.price -
      (product.price * product.discountPercentage) / 100
    ).toFixed(2);
  }

  async function changecart(productId, quantity) {
    const token = getToken();
    const response = await axios.put(
      "/cart/update",
      {
        product: productId,
        quantity,
      },
      {
        headers: {
          "Content-Type": "application/json",
          token: `${token}`,
        },
      }
    );

    if (response.status !== 200) {
      throw new Error("Failed to fetch products");
    } else {
      return true;
    }
  }

  const handleDecreaseQuantity = async (productId, quantity) => {
    try {
      const res = changecart(productId, quantity - 1);
      if (res) {
        if (quantity > 1) {
          setProducts((prevProducts) =>
            prevProducts.map((item) =>
              item._id === productId && item.quantity > 1
                ? { ...item, quantity: item.quantity - 1 }
                : item
            )
          );
        } else {
          setProducts((prevProducts) =>
            prevProducts.filter((item) => {
              if (item._id !== productId) {
                return item;
              }
              return null;
            })
          );
        }
      }
    } catch (error) {
      console.error("Error decreasing quantity:", error);
    }
  };

  const handleIncreaseQuantity = async (productId, quantity) => {
    try {
      changecart(productId, quantity + 1);
      setProducts((prevProducts) =>
        prevProducts.map((item) =>
          item._id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } catch (error) {
      console.error("Error increasing quantity:", error);
    }
  };

  return (
    <div className="flex flex-col rounded-md  flex-grow justify-center items-center bg-white m-3">
      {products.length > 0 && (
        <>
          <ul className="grid grid-flow-row grid-cols-1 gap-5 w-full">
            {Array.isArray(products) &&
              products.map((item) => (
                <li
                  key={item.product ? item.product._id : null}
                  className="p-4 bg-white shadow-md rounded-md w-full"
                >
                  {item.product && (
                    <>
                      <div className="sm:inline-block sm:w-1/3  w-full">
                        <img
                          className="sm:inline-block w-full h-48 sm:h-60 object-cover"
                          src={item.product.thumbnail}
                          alt="Product"
                        />
                      </div>
                      <div className="px-4 sm:inline-block sm:w-2/3 sm:h-60 align-middle">
                        <h3 className="text-xl w-fit sm:text-2xl font-semibold sm:h-fit my-4">
                          {item.product.title}
                        </h3>
                        <hr className="bg-black py-[0.4px]"></hr>
                        <p className="text-gray-700 mb-4 ">
                          {item.product.description}
                        </p>
                        <span className="text-base p-1 bg-gray-500 font-bold text-white rounded-md px-2">
                          {item.product.rating}
                          <img
                            className="inline-block w-5"
                            src="/image/rating.png"
                            alt="rating"
                          />
                        </span>
                        <br />
                        <div className="flex flex-row justify-between align-middle mt-5">
                          <p className="text-green-500 font-bold inline-block w-1/2 ">
                            <span className=" text-black font-bold mr-1">
                              ${afterDiscount(item.product)}
                            </span>{" "}
                            <span className="text-gray-600 font-semibold line-through">
                              ${item.product.price}
                            </span>{" "}
                            {item.product.discountPercentage}% off
                          </p>
                          <div className="flex flex-row gap-2 border-[2px] align-middle  rounded-sm border-black w-fit md:mx-auto font-bold text-2xl">
                            <button
                              className="bg-teal-500 px-3 rounded-l-sm"
                              onClick={() =>
                                handleDecreaseQuantity(item._id, item.quantity)
                              }
                            >
                              -
                            </button>
                            <p className="text-black font-bold mx-1 align-middle">
                              {item.quantity}
                            </p>
                            <button
                              className="bg-teal-500 px-3 rounded-l-sm"
                              onClick={() =>
                                handleIncreaseQuantity(item._id, item.quantity)
                              }
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </li>
              ))}
          </ul>
          <Payment />
        </>
      )}
      {products.length === 0 && <p className="text-4xl">Go to Shop</p>}
    </div>
  );
}
