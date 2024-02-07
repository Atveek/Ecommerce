import React, { useState } from "react";

export default function Payment({ totalamount, handleOrder }) {
  const [cardNumber, setCardNumber] = useState("");

  const handleCardNumberChange = (event) => {
    const input = event.target.value.replace(/\D/g, "");
    const formattedInput = input.replace(/(\d{4})(?=\d)/g, "$1 ");
    setCardNumber(formattedInput);
  };

  return (
    <div className="bg-white p-5 w-fit">
      <form onSubmit={handleOrder}>
        <h1 className="text-2xl mx-5 py-2">Debit / Credit Card</h1>
        <input
          type="text"
          className="text-lg border-b-[1px] w-4/6 border-black  m-3  p-4 outline-none ml-5"
          placeholder="xxxx xxxx xxxx xxxx"
          value={cardNumber}
          name=""
          id=""
          onChange={(e) => handleCardNumberChange(e)}
        />
        <div>
          <input
            type="text"
            className=" text-lg border-b-[1px] w-2/12 border-black text-center  p-2 outline-none ml-5 mr-2"
            placeholder="MM"
          />
          /
          <input
            type="text"
            className="text-lg border-b-[1px] w-2/12 border-black text-center p-2 outline-none"
            placeholder="YY"
          />
          <input
            type="text"
            className="text-lg border-b-[1px] w-1/6 border-black p-2 outline-none ml-20"
            placeholder="CVV"
          />
        </div>
        <input
          type="submit"
          className="mx-auto w-full py-3 px-6 bg-yellow-500 rounded-lg mt-5"
          value={`Pay ${totalamount.toFixed(2)}`}
        />
      </form>
    </div>
  );
}
