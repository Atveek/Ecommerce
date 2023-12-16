import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Buyer/Home";
import SellerHome from "./components/Seller/SellerHome";
import SellerAccount from "./components/Seller/SellerAccount";
import BuyerAccount from "./components/Buyer/BuyerAccount";
function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />

        {/*<Route path="/products" exact component={<ProductList />} />
        <Route path="/products/:productId" component={<ProductDetail />} />
        <Route path="/cart" component={<Cart />} />
        <Route path="/checkout" component={<Checkout />} />

  {/Buyer Routes }*/}
        <Route path="/account" element={<BuyerAccount />} />

        {/* Seller Routes }*/}
        <Route path="/seller" exact element={<SellerHome />} />
        <Route path="/seller/account" exact element={<SellerAccount />} />
        {/* <Route path="/seller/products" component={SellerProductManagement} />
        <Route path="/seller/orders" component={SellerOrders} />
        <Route path="/seller/analytics" component={SellerAnalytics} /> */}

        {/* 404 Route }
        <Route component={NotFound} /> */}
      </Routes>
    </>
  );
}

export default App;
