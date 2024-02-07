import React from "react";
import Navbar from "../Navbar";
import Category from "../Category";
import ProductList from "./ProductList";
import { Routes, Route } from "react-router-dom";
import Productitem from "./Productitem";
import AddCart from "./AddCart";

export default function Home({ user }) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-200">
      <Navbar user={user} />
      <Category />
      <Routes>
        <Route exact path="/" element={<ProductList />}></Route>
        <Route exact path="/cart" element={<AddCart />} />
        <Route exact path="/:category" element={<ProductList />} />
        <Route exact path="/:productid" element={<Productitem />} />
        <Route exact path="/:category/:productid" element={<Productitem />} />
      </Routes>
    </div>
  );
}
