import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

const initial = {
  name: "",
  email: "",
  password: "",
  role: "buyer",
};
export default function Signup() {
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
        Cookies.set("token", token, { expires: 1 / 48, path: "/" });
        navigate("/home");
      }
    } catch (error) {
      setErrorMessage("Email already exist.");
      console.error("Error sending data:", error);
    }
    // setUser(initial);
  };
  return (
    <>
      <div className="flex flex-1 justify-center items-center w-full h-screen bg-blue-500 ">
        <form
          className="flex flex-col justify-center space-y-6 w-[30rem] bg-blue-600 h-[auto] rounded-2xl shadow1 py-5"
          onSubmit={submit}
        >
          <div>
            <h1 className="text-2xl font-bold">Signup</h1>
          </div>
          <div>
            <label className="text-xl">Name : </label>
            <input
              className="text-xl px-2 py-1 ml-4 rounded-md outline-1"
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
              className="text-xl px-2 py-1 ml-4 rounded-md outline-1"
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
              className="text-xl px-2 py-1 ml-4 rounded-md outline-1"
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
              already Member ?{" "}
              <Link
                to="/login"
                className="text-[#4ee7e4] font-bold hover:text-amber-200 p-2"
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
