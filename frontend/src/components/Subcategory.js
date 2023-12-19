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
    <div className="flex-grow flex flex-col justify-center items-cente my-4 mx-3 rounded-md bg-white">
      <ul className="grid grid-flow-row justify-center grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 mx-[auto]">
        {Array.isArray(subcategorys) &&
          subcategorys.map((Subcategory) => {
            return (
              <li
                className="flex flex-col p-5 shadow1 rounded-xl justify-center items-center hover:bg-gray-300 text-center hover:bottom-1 duration-500 cursor-pointer"
                key={Subcategory}
                onClick={() => handleClick(Subcategory)}
              >
                <img
                  className="w-28 aspect-square cover-full"
                  src="image/Electronics.png"
                  alt="a"
                />
                <h2>{Subcategory}</h2>
              </li>
            );
          })}
      </ul>
    </div>
  );
}
