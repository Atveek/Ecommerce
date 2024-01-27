import React from "react";

export default function Productdescription({ product }) {
  function afterdescount(product) {
    return (
      product.price -
      (product.price * product.discountPercentage) / 100
    ).toFixed(2);
  }
  function savedmoney(product) {
    return ((product.price * product.discountPercentage) / 100).toFixed(2);
  }

  return (
    <div className="px-6 md:px-7">
      <h1 className="text-2xl font-semibold mt-5  md:mt-20 md:mb-2">
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
      <p className="whitespace-normal text-lg ml-5 font-medium w-60 md:w-[480px]">
        {product.description}
      </p>
    </div>
  );
}
