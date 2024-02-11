// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { getToken } from "../Auth/getUserInfo";
// import { useNavigate } from "react-router-dom";

// export default function Ordered() {
//   const [orders, setOrders] = useState([]);
//   const navigate = useNavigate();
//   useEffect(() => {
//     async function getOrders() {
//       const token = getToken();
//       try {
//         const response = await axios.get("/order/shaw", {
//           headers: {
//             token,
//           },
//         });
//         if (response.status !== 200) {
//           throw new Error("Failed to fetch orders");
//         }
//         const data = response.data;
//         console.log(data);
//         setOrders(data);
//       } catch (err) {
//         console.log(err);
//       }
//     }
//     getOrders();
//   }, []);
//   function handleClick(productid, category) {
//     navigate(`/${category}/${productid}`);
//   }
//   return (
//     <div className="m-3 bg-white flex-grow p-5">
//       <table className="w-full h-[100%] rounded-lg ">
//         <tr className="bg-yellow-500">
//           <th className="py-3">Order Date</th>
//           <th>Item Name</th>
//           <th>Quantity</th>
//           <th>Status</th>
//         </tr>
//         {orders.map((item) => {
//           return (
//             <tr
//               key={item.id}
//               className="pt-10 odd:bg-gray-100 text-center"
//               onClick={() => handleClick(item.id, item.category)}
//             >
//               <td>{item.date}</td>
//               <td>
//                 <p className="text-left">
//                   <img
//                     className="w-20 h-20 inline-block m-5 rounded-lg "
//                     src={item.thumbnail}
//                     alt="productImage"
//                   />
//                   {item.product}
//                 </p>
//               </td>
//               <td>{item.quantity}</td>
//               <td>{item.status}</td>
//             </tr>
//           );
//         })}
//       </table>
//     </div>
//   );
// }

import axios from "axios";
import React, { useEffect, useState } from "react";
import { getToken } from "../Auth/getUserInfo";
import { useNavigate } from "react-router-dom";

export default function Ordered() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function getOrders() {
      const token = getToken();
      try {
        const response = await axios.get("/order/shaw", {
          headers: {
            token,
          },
        });
        if (response.status !== 200) {
          throw new Error("Failed to fetch orders");
        }
        const data = response.data;
        console.log(data);
        setOrders(data);
      } catch (err) {
        console.log(err);
      }
    }
    getOrders();
  }, []);

  function handleClick(productid, category) {
    navigate(`/${category}/${productid}`);
  }

  return (
    <div className="flex flex-col relative flex-grow m-3 rounded-lg">
      {orders.length > 0 && (
        <div className=" bg-white flex-grow p-5">
          <table className="w-full h-[100%] rounded-lg ">
            <thead>
              <tr className="bg-yellow-500">
                <th className="py-3">Order Date</th>
                <th>Item Name</th>
                <th>Quantity</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((item) => (
                <tr key={item.id} className="pt-10 odd:bg-gray-100 text-center">
                  <td>{item.date}</td>
                  <td
                    onClick={() => handleClick(item.productid, item.category)}
                    className="cursor-pointer"
                  >
                    <p className="text-left">
                      <img
                        className="w-20 h-20 inline-block m-5 rounded-lg "
                        src={item.thumbnail}
                        alt="productImage"
                      />
                      {item.product}
                    </p>
                  </td>
                  <td>{item.quantity}</td>
                  <td>{item.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {orders.length === 0 && (
        <div className="flex  flex-col flex-1 bg-white justify-center items-center rounded-lg">
          <img src="/image/emptycart.png" className="w-64" alt="Go to shop" />
          <h1 className="text-4xl mb-3">Your cart is empty!</h1>
          <p className="mb-3"> Add items to it now.</p>
          <button
            className="bg-blue-500 py-3 px-8 rounded-lg"
            onClick={() => {
              navigate("/");
            }}
          >
            Shop now
          </button>
        </div>
      )}
    </div>
  );
}
