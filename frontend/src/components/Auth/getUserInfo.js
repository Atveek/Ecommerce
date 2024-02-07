import Cookies from "js-cookie";
import { decodeToken } from "react-jwt";

const getUserRole = () => {
  const jwtToken = Cookies.get("token");
  if (jwtToken) {
    try {
      const decodedToken = decodeToken(jwtToken);
      return decodedToken.role;
    } catch (error) {
      console.error("Error decoding JWT token:", error);
    }
  }

  return null;
};

const getToken = () => {
  const jwtToken = Cookies.get("token");
  return jwtToken || null;
};

export { getUserRole, getToken };
