import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const initial = {
  email: "",
  password: "",
};

export default function Login() {
  const [user, setUser] = useState(initial);
  // const [error, setError] = useState("");
  // const [user, setUser] = useState(initialstate);
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const submit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/login", user);
      if (response.status === 200) {
        const token = response.data.token;
        console.log(token);
        Cookies.set("token", token, { expires: 1 / 48, path: "/" });
      } else {
        alert(response);
      }
    } catch (error) {
      console.error("Error sending data:", error);
    }
    // setUser(initial);
  };
  return (
    <>
      <div className="flex flex-1 justify-center items-center w-full h-screen bg-blue-500 ">
        <form
          className="flex flex-col justify-center space-y-6 w-[30rem] bg-blue-600 h-[20rem] rounded-2xl shadow1"
          onSubmit={submit}
        >
          <div>
            <h1 className="text-2xl font-bold">Login</h1>
          </div>
          <div>
            <label className="text-xl">Email : </label>
            <input
              className="text-xl px-2 py-1 ml-4 rounded-md outline-1"
              type="email"
              name="email"
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
              autoComplete="current-password"
              onChange={handleChange}
            />
          </div>
          {/* {error && <p className="m-1">{error}</p>} */}
          <div>
            <input
              className="w-[19rem] bg-black p-3 text-white rounded-3xl cursor-pointer"
              type="submit"
              value="submit"
            />
          </div>
        </form>
      </div>
    </>
  );
}
