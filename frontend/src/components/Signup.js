import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { getUserRole } from "./Auth/getUserInfo";
const initial = {
  name: "",
  email: "",
  password: "",
  role: "buyer",
};
export default function Signup({ signup }) {
  const [user, setUser] = useState(initial);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const submit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/user", user);
      if (response.status === 200) {
        // Handle successful login here
        setErrorMessage(""); // Clear any previous error messages
        console.log("Login successful");
        const token = response.data.token;
        console.log(token);
        Cookies.set("token", token, { expires: 1, path: "/" });
        const role = getUserRole();
        if (role === "buyer") navigate("/");
        if (role === "seller") navigate("/seller");
      }
    } catch (error) {
      setErrorMessage("Email already exist.");
      console.error("Error sending data:", error);
    }
    // setUser(initial);
  };
  return (
    <>
      <div className="flex flex-1 justify-center items-center w-full flex-grow bg-gray-200 ">
        <form
          className="flex flex-col text-center justify-center space-y-6 w-[30rem] bg-gray-100 h-[auto] rounded-2xl shadow1 py-5"
          onSubmit={submit}
        >
          <div>
            <h1 className="text-2xl font-bold">Signup</h1>
          </div>
          <div>
            <label className="text-xl">Name : </label>
            <input
              className="text-xl px-2 bg-gray-200 border border-black py-1 ml-4 rounded-md outline-1"
              type="text"
              name="name"
              required
              value={user.name}
              placeholder="Full name"
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="text-xl">Email : </label>
            <input
              className="text-xl px-2 bg-gray-200 border border-black py-1 ml-4 rounded-md outline-1"
              type="email"
              name="email"
              required
              value={user.email}
              placeholder="xyz@email.com"
              autoComplete="username"
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="text-xl">Password : </label>
            <input
              className="text-xl px-2 bg-gray-200 border border-black py-1 ml-4 rounded-md outline-1"
              name="password"
              value={user.password}
              type="password"
              placeholder="password"
              required
              autoComplete="current-password"
              onChange={handleChange}
            />
          </div>
          <div>
            <select
              name="role"
              className="px-5 py-2 bg-gray-200 border border-black font-semibold rounded-md"
              onChange={handleChange}
            >
              <option value="buyer" selected>
                Buyer
              </option>
              <option value="seller">Seller</option>
            </select>
          </div>
          {errorMessage && (
            <p className="text-red-900 font-bold">{errorMessage}</p>
          )}
          <div>
            <input
              className="w-[19rem] bg-black p-3 text-white rounded-3xl cursor-pointer"
              type="submit"
              value="submit"
            />
          </div>
          <div>
            <p>
              already Member ?{" "}
              <Link
                to="/login"
                className="text-black text-lg font-bold hover:text-red-800 p-2"
                onClick={() => {
                  signup("/login");
                }}
              >
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
}
