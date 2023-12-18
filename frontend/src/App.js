import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
// import Home from "./components/Buyer/Home";
import SellerHome from "./components/Seller/SellerHome";
import SellerAccount from "./components/Seller/SellerAccount";
import BuyerAccount from "./components/Buyer/BuyerAccount";
import ProductList from "./components/Buyer/ProductList";
import ProductDetail from "./components/Buyer/ProductDetail";
import Navbar from "./components/Navbar";
import { useEffect } from "react";
import { getToken } from "./components/getUserInfo";
import Category from "./components/Category";
import Subcategory from "./components/Subcategory";
// import SidePanel from "./components/SidePanel";

function App() {
  const navigate = useNavigate();
  useEffect(() => {
    const token = getToken();
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      {/* <div className="grid grid-flow-row gap-2"> */}
      {/* <SidePanel /> */}
      <Routes>
        {/* <Route exact path="/" element={<Home />} /> */}
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />

        {/* {/Buyer Routes } */}

        <Route exact path="/account" element={<BuyerAccount />} />
        <Route exact path="/" element={<Category />} />
        <Route exact path="/:category" element={<Subcategory />} />
        <Route exact path="/:category/:subcategory" element={<ProductList />} />
        <Route
          path="/:category/:subcategory/:productid"
          element={<ProductDetail />}
        />
        {/* <Route path="/cart" component={<Cart />} />
        <Route path="/checkout" component={<Checkout />} /> */}

        {/* Seller Routes }*/}
        <Route path="/seller" exact element={<SellerHome />} />
        <Route path="/seller/account" exact element={<SellerAccount />} />
        {/* <Route path="/seller/products" component={SellerProductManagement} />
        <Route path="/seller/orders" component={SellerOrders} />
        <Route path="/seller/analytics" component={SellerAnalytics} /> */}

        {/* 404 Route }
        <Route component={NotFound} /> */}
      </Routes>
    </div>
    // </div>
  );
}

export default App;
