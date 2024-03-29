import React, { useEffect, useState } from "react";
import { getToken } from "./Auth/getUserInfo";
import { useLocation, useNavigate } from "react-router-dom";

export default function Category() {
  const [categorys, setCategorys] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const [image, setImage] = useState(true);

  useEffect(() => {
    const categoryProductPattern = /^\/\w+\/\w+$/; // Regex for /:category/:productid

    if (
      categoryProductPattern.test(location.pathname) ||
      location.pathname === "/cart" ||
      location.pathname === "/order"
    ) {
      setImage(false);
    } else {
      setImage(true);
    }
  }, [location.pathname]);
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
    <div className="flex flex-col justify-center items-center bg-white mt-3 h-auto mx-3 rounded-md">
      <ul className="grid grid-flow-col gap-3 no-scrollbar scroll scroll-smooth py-2 px-3 w-full whitespace-nowrap overflow-x-scroll">
        {Array.isArray(categorys) &&
          categorys.map((Category) => (
            <li
              className="inline-flex flex-col justify-center items-center text-base sm:text-lg px-2 py-2 rounded-lg hover:bg-gray-300 hover:bottom-1 duration-500 cursor-pointer"
              key={Category._id}
              onClick={() => handleClick(Category.name)}
            >
              {image && (
                <img
                  className="w-24 h-24 rounded-md aspect-square object-contain"
                  src={Category.img}
                  alt="i"
                />
              )}
              <p>{Category.name}</p>
            </li>
          ))}
      </ul>
    </div>
  );
}
