// /* eslint-disable react-hooks/exhaustive-deps */
// import "./App.css";
// import { Route, Routes, useNavigate } from "react-router-dom";
// import Login from "./components/Login";
// import Signup from "./components/Signup";
// import Home from "./components/Buyer/Home";
// import SellerHome from "./components/Seller/SellerHome";
// import SellerAccount from "./components/Seller/SellerAccount";
// import BuyerAccount from "./components/Buyer/BuyerAccount";
// import ProductList from "./components/Buyer/ProductList";
// import ProductDetail from "./components/Buyer/ProductDetail";
// import Navbar from "./components/Navbar";
// import { useState, useEffect } from "react";
// import { getToken, getUserRole } from "./components/getUserInfo";
// import Category from "./components/Category";
// // import SidePanel from "./components/SidePanel";

// function App() {
//   const [user, setUser] = useState("");
//   const [loginorsignup, setLoginorsignup] = useState("/login");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = getToken();
//     if (!token) {
//       navigate(loginorsignup); // Redirect to "/login" if no token is present
//       setUser("");
//     } else {
//       const role = getUserRole();
//       setUser(role);
//     }
//   }, [navigate, loginorsignup]);

//   function signup(value) {
//     if (value === "/signup") setLoginorsignup("/signup");
//     else setLoginorsignup("/login");
//   }

//   return (
//     <div className="flex flex-col bg-gray-200">
//       <Navbar user={user} />

//       {user === "buyer" && <Category />}
//       {/* <div className="grid grid-flow-row gap-2"> */}
//       {/* <SidePanel /> */}

//       <Routes>
//         <Route exact path="/" element={<Home />} />
//         {!user && (
//           <Route exact path="/login" element={<Login signup={signup} />} />
//         )}
//         {!user && (
//           <Route exact path="/signup" element={<Signup signup={signup} />} />
//         )}
//         {/* {/Buyer Routes } */}
//         <Route exact path="/account" element={<BuyerAccount />} />
//         {/* <Route exact path="/" element={<Category />} /> */}
//         <Route exact path="/:category" element={<ProductList />} />
//         <Route path="/:category/:productid" element={<ProductDetail />} />
//         {/* <Route path="/cart" component={<Cart />} />
//         <Route path="/checkout" component={<Checkout />} /> */}
//         {/* Seller Routes }*/}
//         <Route path="/seller" exact element={<SellerHome />} />
//         <Route path="/seller/account" exact element={<SellerAccount />} />
//         {/* <Route path="/seller/products" component={SellerProductManagement} />
//         <Route path="/seller/orders" component={SellerOrders} />
//         <Route path="/seller/analytics" component={SellerAnalytics} /> */}
//         {/* 404 Route }
//         <Route component={NotFound} /> */}
//       </Routes>
//     </div>
//     // </div>
//   );
// }

// export default App;

/* eslint-disable react-hooks/exhaustive-deps */
import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Buyer/Home";
// import SellerHome from "./components/Seller/SellerHome";
// import SellerAccount from "./components/Seller/SellerAccount";
// import BuyerAccount from "./components/Buyer/BuyerAccount";
// import ProductList from "./components/Buyer/ProductList";
// import ProductDetail from "./components/Buyer/ProductDetail";
// import Navbar from "./components/Navbar";
import { useState, useEffect } from "react";
import { getToken, getUserRole } from "./components/getUserInfo";
import SellerHome from "./components/Seller/SellerHome";
// import Category from "./components/Category";
// import SidePanel from "./components/SidePanel";

function App() {
  const [user, setUser] = useState("");
  const [loginorsignup, setLoginorsignup] = useState("/login");
  const navigate = useNavigate();

  useEffect(() => {
    const token = getToken();
    if (!token) {
      navigate(loginorsignup); // Redirect to "/login" if no token is present
      setUser("");
    } else {
      const role = getUserRole();
      setUser(role);
    }
  }, [navigate, loginorsignup]);

  function signup(value) {
    if (value === "/signup") setLoginorsignup("/signup");
    else setLoginorsignup("/login");
  }

  return (
    <div className="flex flex-col bg-gray-200">
      {user === "buyer" && <Home user={user} />}
      {user === "seller" && <SellerHome />}
      {!user && (
        <div>
          <Routes>
            <Route exact path="/login" element={<Login signup={signup} />} />
            <Route exact path="/signup" element={<Signup signup={signup} />} />
          </Routes>
        </div>
      )}
    </div>
    // </div>
  );
}

export default App;
