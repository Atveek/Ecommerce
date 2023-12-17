import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Buyer/Home";
import SellerHome from "./components/Seller/SellerHome";
import SellerAccount from "./components/Seller/SellerAccount";
import BuyerAccount from "./components/Buyer/BuyerAccount";
import ProductList from "./components/Buyer/ProductList";
import ProductDetail from "./components/Buyer/ProductDetail";
import Navbar from "./components/Navbar";
// import SidePanel from "./components/SidePanel";
function App() {
  return (
    <>
      <Navbar />
      <div className="grid grid-flow-row gap-2">
        {/* <SidePanel /> */}
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />

          {/* {/Buyer Routes } */}

          <Route path="/account" element={<BuyerAccount />} />
          <Route exact path="/products" element={<ProductList />} />
          <Route path="/products/:productid" element={<ProductDetail />} />
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
    </>
  );
}

export default App;
