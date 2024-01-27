import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import { getUserRole } from "./getUserInfo";
const initial = {
  email: "",
  password: "",
};

export default function Login({ signup }) {
  const [user, setUser] = useState(initial);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const submit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/login", user);
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
      setErrorMessage("Invalid username or password.");
      console.error("Error sending data:", error);
    }
    // setUser(initial);
  };
  return (
    <div className="h-screen">
      <div className="flex flex-1 justify-center items-center w-full flex-grow bg-gradient-to-r from-gray-200 from-50% to-black to-50%">
        <form
          className="flex flex-col justify-center space-y-6 w-[30rem] text-center  bg-gray-100  h-[23rem] rounded-2xl shadow1"
          onSubmit={submit}
        >
          <div>
            <h1 className="text-2xl font-bold">Login</h1>
          </div>
          <div>
            <label className="text-xl">Email : </label>
            <input
              className="text-xl px-2 py-1 ml-4 bg-gray-200 border border-black rounded-md outline-1"
              type="email"
              name="email"
              value={user.email}
              placeholder="xyz@email.com"
              autoComplete="username"
              required
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="text-xl">Password : </label>
            <input
              className="text-xl px-2 py-1 bg-gray-200 border border-black ml-4 rounded-md outline-1"
              name="password"
              value={user.password}
              type="password"
              placeholder="password"
              required
              autoComplete="current-password"
              onChange={handleChange}
            />
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
              Not a Member ?{" "}
              <Link
                to="/signup"
                className="text-black text-lg font-bold hover:text-red-800 p-2"
                onClick={() => {
                  signup("/signup");
                }}
              >
                Signup
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
