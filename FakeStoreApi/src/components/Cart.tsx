import { Link } from "react-router-dom";
import type { CartItem } from "../types";

interface Props {
  items: CartItem[];
  onRemove: (id: number) => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
}

const Cart = ({
  items,
  onRemove,
  increaseQuantity,
  decreaseQuantity,
}: Props) => {
  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  return (
    <div className="h-screen mt-5">
      <div className="max-w-lg bg-blue-300 mx-auto p-4 rounded-md mb-10 dark:bg-gray-800">
        <h1 className="text-left text-lg font-bold">Cart</h1>
        {items.length === 0 ? (
          "Your Cart is Empty"
        ) : (
          <div className="flex flex-col justify-center max-w-lg mx-auto">
            {items.map((item, index) => (
              <div key={index} className="my-4 ">
                <div className="flex justify-between">
                  <div className="flex gap-3">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-28 h-28 object-contain bg-white py-2 rounded-lg border-1 "
                    />
                    <div className="grid flex-col content-between">
                      <div>
                        <h3 className="text-sm font-semibold mb-1">
                          {item.title}
                        </h3>
                        <h4 className="capitalize text-xs">
                          Category:
                          <span className="text-white dark:text-slate-500">
                            {" "}
                            {item.category}
                          </span>
                        </h4>
                        <h4 className="text-xs">
                          Price:{" "}
                          <span className="text-white dark:text-slate-500">
                            ${item.price}
                          </span>
                        </h4>
                      </div>
                      <div className="border-1 mt-5 rounded-full flex gap-2 justify-center w-16">
                        <button
                          onClick={() => decreaseQuantity(item.id)}
                          className="font-semibold"
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() => increaseQuantity(item.id)}
                          className="font-semibold"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className=" flex-col content-between grid">
                    <button
                      className="text-red-500 hover:underline"
                      onClick={() => onRemove(item.id)}
                    >
                      Remove
                    </button>
                    <h2 className="font-semibold text-lg">
                      ${(item.price * item.quantity).toFixed(2)}
                    </h2>
                  </div>
                </div>
                <div className="border-1 border-gray-50 w-full rounded-full mt-5"></div>
              </div>
            ))}
          </div>
        )}
        <div className="flex justify-between">
          <h1 className="font-semibold text-lg">
            Grand Total: ${total.toFixed(2)}
          </h1>
          <button className="bg-white rounded-md px-2 py-2 dark:bg-blue-800">
            <Link to="/checkout">Checkout</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
