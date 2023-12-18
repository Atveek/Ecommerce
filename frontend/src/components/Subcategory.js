import React, { useEffect, useState } from "react";
import { getToken } from "./getUserInfo";
import { useNavigate, useParams } from "react-router-dom";

export default function Subcategory() {
  const [subcategorys, setSubategorys] = useState([]);
  const navigate = useNavigate();
  const { category } = useParams();
  useEffect(() => {
    const getsubcategory = async () => {
      try {
        const token = getToken();
        const responce = await fetch(`/category/${category}`, {
          headers: {
            token: token,
            "Content-Type": "application/json",
          },
        });
        if (!responce.ok) {
          throw new Error("Failed to fetch category");
        }
        const data = await responce.json();
        setSubategorys(data);
      } catch (err) {
        console.log(err);
      }
    };
    getsubcategory();
  }, [category]);
  const handleClick = (Subcategory) => {
    navigate(`/${category}/${Subcategory}`);
  };
  return (
    <div className=" flex-grow flex flex-col justify-center items-center bg-white">
      <ul className="grid grid-flow-row grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-5">
        {Array.isArray(subcategorys) &&
          subcategorys.map((Subcategory) => {
            return (
              <li
                className="p-5 shadow1 rounded-xl hover:bg-gray-300 hover:bottom-1 duration-500 cursor-pointer"
                key={Subcategory}
                onClick={() => handleClick(Subcategory)}
              >
                {Subcategory}
              </li>
            );
          })}
      </ul>
    </div>
  );
}
