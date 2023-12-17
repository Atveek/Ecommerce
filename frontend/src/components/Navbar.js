import React, { useEffect, useState } from "react";
import { getUserRole } from "./getUserInfo";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [user, setUser] = useState("");
  useEffect(() => {
    const role = getUserRole();
    setUser(role);
  }, [user]);
  return (
    <>
      {user === "buyer" && (
        <div className="sticky  top-0">
          <ul className="flex w-full flex-row gap-7 justify-center py-5 text-xl bg-blue-500">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/account">Account</Link>
            </li>
            <li>
              <Link to="/products">Products</Link>
            </li>
            <li>
              <Link to="/order">Orders</Link>
            </li>
          </ul>
        </div>
      )}
      {user === "seller" && (
        <div className="sticky  top-0">
          <ul className="flex w-full flex-row gap-7 justify-center py-5 text-xl bg-blue-500">
            <li>
              <Link to="/seller">Home</Link>
            </li>
            <li>
              <Link to="/seller/account">Account</Link>
            </li>
            <li>
              <Link to="/seller/products">Products</Link>
            </li>
            <li>
              <Link to="/seller/orders">Orders</Link>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}
