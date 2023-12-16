import React from "react";
import BuyerHome from "./Buyer/BuyerHome";
import SellerHome from "./Seller/SellerHome";
import { useEffect, useState } from "react";
import { getUserRole } from "./getUserRole";
import Home from "./Default/Home";

export default function User() {
  const [userRole, setUserRole] = useState(null);
  useEffect(() => {
    const role = getUserRole();
    setUserRole(role);
  }, [userRole]);
  return (
    <>
      {userRole === "buyer" && <BuyerHome />}
      {userRole === "seller" && <SellerHome />}
      {userRole === null && <Home />}
    </>
  );
}
