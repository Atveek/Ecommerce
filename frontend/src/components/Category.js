import React, { useEffect, useState } from "react";
import { getToken } from "./getUserInfo";
import { useNavigate } from "react-router-dom";

export default function Category() {
  const [categorys, setCategorys] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const getcategory = async () => {
      try {
        const token = getToken();

        const responce = await fetch("/category", {
          headers: {
            token: token,
            "Content-Type": "application/json",
          },
        });
        if (!responce.ok) {
          throw new Error("Failed to fetch category");
        }
        const data = await responce.json();
        setCategorys(data);
      } catch (err) {
        console.log(err);
      }
    };
    getcategory();
  }, []);
  const handleClick = (category) => {
    navigate(`/${category}`);
  };
  return (
    <div className="flex flex-col flex-grow justify-center items-center bg-white">
      <ul className="grid grid-flow-row grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-5">
        {Array.isArray(categorys) &&
          categorys.map((Category) => {
            return (
              <li
                className="p-5 shadow1 rounded-xl hover:bg-gray-300 hover:bottom-1 duration-500 cursor-pointer"
                key={Category._id}
                onClick={() => handleClick(Category.name)}
              >
                {Category.name}
              </li>
            );
          })}
      </ul>
    </div>
  );
}
