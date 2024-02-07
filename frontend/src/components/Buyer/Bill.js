import React, { useEffect, useState } from "react";
import Payment from "./Payment";
import { useNavigate } from "react-router-dom";
import { getToken } from "../Auth/getUserInfo";
import axios from "axios";

export default function Bill({ afterDiscount, products }) {
  const [totalamount, setTotalamount] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [totalprice, setTotalprice] = useState(0);
  const [charges, setCharges] = useState(0);
  const [css, setCss] = useState("hidden");
  const navigate = useNavigate();
  useEffect(() => {
    function TotalAmount(products) {
      var sum = 0;
      var disc = 0;
      var total = 0;
      var charge = 0;
      products.map((item) => {
        sum += item.product.price * item.quantity;
        disc +=
          (item.product.price - afterDiscount(item.product)) * item.quantity;
        total += afterDiscount(item.product) * item.quantity;
        charge += 10 * item.quantity;
        return null;
      });
      total += charge;
      setTotalprice(sum);
      setDiscount(disc);
      setTotalamount(total);
      setCharges(charge);
    }
    TotalAmount(products);
  }, [products, afterDiscount]);

  async function handleOrder(e) {
    e.preventDefault();

    try {
      const token = getToken(); // Assuming you have a function to get the authentication token
      const response = await axios.post(
        "/order/add",
        {},
        {
          headers: {
            "Content-Type": "application/json",
            token: `${token}`,
          },
        }
      );
      console.log(response);
      if (response.status === 200) {
        setTimeout(() => {
          navigate("/order");
        }, 3000);
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="sm:sticky w-full lg:w-2/6 top-[90px] h-fit">
      <div className="block bg-white">
        <h1 className="p-5 text-xl text-slate-400">PRICE DETAILS</h1>
        <hr className="bg-black py-[0.1px]"></hr>
        <div className="flex justify-between mx-10 my-5 font-medium text-xl">
          <p>Price</p>
          <p>${totalprice}</p>
        </div>
        <div className="flex justify-between mx-10 my-5 font-medium text-xl">
          <p>Discount</p>
          <p className="text-green-700">-${discount.toFixed(2)}</p>
        </div>

        <div className="flex justify-between mx-10 my-5 font-medium text-xl">
          <p>Delivery Charges</p>
          <p>${charges}</p>
        </div>
        <div className="flex justify-between mx-10 py-7 font-medium text-xl border-dotted border-y-[2px] border-gray-300">
          <p>Total Amount</p>
          <p>${totalamount.toFixed(2)}</p>
        </div>
        <h1 className="text-green-700 text-lg font-bold  mx-10 my-3">
          You will save ${discount.toFixed(2)} on this order
        </h1>
      </div>
      <div>
        <div className={css}>
          <Payment totalamount={totalamount} handleOrder={handleOrder} />
        </div>
        <button
          className={`${
            css === "hidden" ? "block" : "hidden"
          } mx-auto w-full py-3 px-6 bg-yellow-500 rounded-lg mt-5`}
          onClick={() => {
            setCss(css === "hidden" ? "block" : "hidden");
          }}
        >
          Pay ${totalamount.toFixed(2)}
        </button>
      </div>
    </div>
  );
}
