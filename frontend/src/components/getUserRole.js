// src/utils/authUtils.js
import Cookies from "js-cookie";
import { decodeToken } from "react-jwt";

export const getUserRole = () => {
  const jwtToken = Cookies.get("token");
  if (jwtToken) {
    try {
      const decodedToken1 = decodeToken(jwtToken);
      return decodedToken1.role;
    } catch (error) {
      console.error("Error decoding JWT token:", error);
    }
  }

  return null;
};
