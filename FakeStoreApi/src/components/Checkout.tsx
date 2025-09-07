import React, { useState } from "react";
import type { CartItem } from "../types";
import { useNavigate } from "react-router-dom";

interface Props {
  cart: CartItem[];
  onClearCart: () => void;
}

const Checkout = ({ cart, onClearCart }: Props) => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !address) {
      setError("Pease fill in all fields");
    }

    const total = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const newOrder = {
      id: Date.now().toString(),
      item: cart,
      customer: { name, address },
      date: new Date().toISOString(),
      total,
    };

    const existingProduct = JSON.parse(localStorage.getItem("orders") || "[]");
    existingProduct.push(newOrder);
    localStorage.setItem("orders", JSON.stringify(existingProduct));

    onClearCart();
    navigate("/orders");
  };

  if (!cart.length) {
    return (
      <div>
        <h1>Your cart is empty</h1>
      </div>
    );
  }

  return (
    <div className="h-screen">
      <h1>Checkout</h1>
      <div className="px-4">
        <div className="border border-white rounded-xl bg-white px-3 py-3 dark:bg-gray-700">
          {cart.map((item) => (
            <div className="flex justify-between py-1" key={item.id}>
              <h3>
                {item.title}
                <span className="text-slate-400"> x {item.quantity}</span>
              </h3>
              <h3>${(item.quantity * item.price).toFixed(2)}</h3>
            </div>
          ))}
          <div className="">
            <div className="flex justify-between border-t-1 border-gray-300">
              Total :
              <h2 className="font-semibold">
                $
                {cart
                  .reduce((sum, item) => sum + item.price * item.quantity, 0)
                  .toFixed(2)}
              </h2>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl mt-2 px-3 py-3 dark:bg-gray-700">
          <form action="" onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <label htmlFor="">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border border-gray-500 rounded p-2 w-44 dark:border-gray-400"
              />
            </div>
            <div className="flex flex-col mt-2">
              <label htmlFor="">Address</label>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="border border-gray-500 rounded p-2 text-sm w-96 h-32 dark:border-gray-400"
              ></textarea>
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <button
              type="submit"
              className="bg-blue-500 text-white px-3 py-1 mt-2 rounded"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
