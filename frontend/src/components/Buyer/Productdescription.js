import React from "react";
import { getToken } from "../Auth/getUserInfo";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Productdescription({ product }) {
  const token = getToken();
  const navigate = useNavigate();
  function afterdescount(product) {
    return (
      product.price -
      (product.price * product.discountPercentage) / 100
    ).toFixed(2);
  }
  function savedmoney(product) {
    return ((product.price * product.discountPercentage) / 100).toFixed(2);
  }

  async function addcartevent(productid) {
    try {
      await axios.post(
        "/cart/add",
        {
          productsArray: [{ product: productid, quantity: 1 }],
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            token,
          },
        }
      );
      navigate("/cart");
    } catch {}
  }

  return (
    <div className="px-6 md:w-1/2 md:px-7">
      <h1 className="text-2xl font-semibold mt-3  md:mt-16 md:mb-2">
        {product.title}
      </h1>
      <span className="text-base p-1 mt-2 bg-green-700 font-bold text-white rounded-md px-2">
        {product.rating}
        <img
          className="inline-block w-5"
          src="/image/rating.png"
          alt="rating"
        />
      </span>
      <hr className="bg-black mt-2 md:mt-5 h-[2px]" />
      {product.discountPercentage !== 0 && (
        <p className="text-lg mt-2 text-green-600">
          Extra ${savedmoney(product)} off
        </p>
      )}
      <p className="font-bold text-2xl text-green-600">
        <span className="text-3xl text-black font-bold mr-1">
          ${afterdescount(product)}
        </span>
        {"  "}
        <span className="text-gray-600 font-semibold text-xl line-through">
          ${product.price}
        </span>{" "}
        {product.discountPercentage}% off
      </p>
      <p className="mt-6 font-medium text-2xl">Stock: {product.stock}</p>
      <h2 className="text-xl bg-gray-600 w-fit my-2 px-5 py-2 text-white rounded-md">
        {product.brand}
      </h2>
      <h3 className="font-semibold">Descriprion :</h3>
      <p className="whitespace-normal text-lg ml-5 font-medium w-60 lg:w-[480px]">
        {product.description}
      </p>
      <br></br>
      <div className="flex gap-3 fixed bottom-1 md:static bg-white py-2">
        <button
          onClick={() => addcartevent(product._id)}
          className="px-5 py-2 md:px-10 text-white text-xl font-medium bg-teal-600 rounded-lg"
        >
          <img className="w-8 inline-block" src="/image/cart.png" alt="icon" />
          Add to Cart
        </button>

        <button
          onClick={() => addcartevent(product._id)}
          className="px-6 py-2 md:px-16 text-white text-xl font-medium bg-[#f2a846] rounded-lg"
        >
          Buy now
        </button>
      </div>
      <hr className="bg-black mt-3  h-[2px]" />
      <div className="mt-8 whitespace-normal"></div>
    </div>
  );
}
