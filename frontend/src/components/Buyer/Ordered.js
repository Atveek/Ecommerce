import axios from "axios";
import React, { useEffect, useState } from "react";
import { getToken } from "../Auth/getUserInfo";

export default function Ordered() {
  const [orders, setOrders] = useState([]);
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
  return (
    <div className="m-3 bg-white flex-grow p-5">
      <table className="w-full h-[100%] rounded-lg">
        <tr className="bg-yellow-500">
          <th className="py-3">Date</th>
          <th>Item Name</th>
          <th>Quantity</th>
          <th>Status</th>
        </tr>
        {orders.map((item) => {
          return (
            <tr key={item.id}>
              <td>{item.date}</td>
              <td>{item.product}</td>
              <td>{item.quantity}</td>
              <td>{item.status}</td>
            </tr>
          );
        })}
      </table>
    </div>
  );
}
