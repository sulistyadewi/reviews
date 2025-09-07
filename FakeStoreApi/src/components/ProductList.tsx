import { Link } from "react-router-dom";
import type { Product } from "../types";
import { BsCartPlus } from "react-icons/bs";

interface Props {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

const ProductList = ({ products, onAddToCart }: Props) => {
  return (
    <div className="grid grid-cols-4 p-4 gap-5">
      {products.map((product) => (
        <div
          key={product.id}
          className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-200 dark:bg-gray-800 dark:shadow-gray-700 dark:transition-all dark:duration-200"
        >
          <Link to={`/products/${product.id}`}>
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-32 object-contain rounded-t-lg mb-4 dark:bg-white py-2"
            />
          </Link>
          <h2 className="font-semibold mb-2">{product.title}</h2>
          <p className="text-gray-700 mb-2 text-sm dark:text-gray-400">
            {`${product.description.substring(1, 70)}...`}
            <span className="text-blue-400 underline hover:text-blue-700">
              Read More
            </span>
          </p>
          <p className="text-xl font-semibold text-sky-600 dark:text-sky-300">
            ${product.price}
          </p>
          <button
            type="button"
            className="py-1 mt-2 rounded cursor-pointer px-4 bg-cyan-600 text-2xl dark:bg-cyan-800"
            onClick={() => onAddToCart(product)}
          >
            <BsCartPlus />
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
