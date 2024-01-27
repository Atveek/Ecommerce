import React from "react";
import Navbar from "../Navbar";
import Category from "../Category";
import ProductList from "./ProductList";
import ProductDetail from "./ProductDetail";
import { Routes, Route } from "react-router-dom";

export default function Home({ user }) {
  return (
    <div className="flex flex-col bg-gray-200">
      <Navbar user={user} />
      <Category />
      <Routes>
        <Route exact path="/" element={<ProductList />}></Route>
        <Route exact path="/:category" element={<ProductList />} />
        <Route exact path="/:productid" element={<ProductDetail />} />
        <Route exact path="/:category/:productid" element={<ProductDetail />} />
      </Routes>
    </div>
  );
}
