import React from "react";
import { Link } from "react-router-dom";
export default function BuyerHome() {
  return (
    <>
      <Link to="/seller/account">Account</Link>
      <div>Hello It's Seller</div>
    </>
  );
}
