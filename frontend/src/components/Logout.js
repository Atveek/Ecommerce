import React from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();
  const handlelogout = () => {
    try {
      console.log("running handlelogout");
      Cookies.remove("token");
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="m-0">
      <button onClick={handlelogout}>Logout</button>
    </div>
  );
}
