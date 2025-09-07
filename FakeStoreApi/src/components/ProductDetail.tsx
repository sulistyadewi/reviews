import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import type { Product } from "../types";
import { FaStar } from "react-icons/fa";
import { BsCartPlus } from "react-icons/bs";
import { FaArrowLeft } from "react-icons/fa";

interface Props {
  onAddToCart: (product: Product) => void;
}

const ProductDetail = ({ onAddToCart }: Props) => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!response.ok) {
          throw new Error("failed to ftech product data");
        }
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };
    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div className=" w-full h-screen">
      <div className="bg-white max-w-2xl mx-auto mt-10 rounded-lg p-8 shadow-lg dark:bg-gray-800 dark:shadow-gray-700">
        <Link to="/">
          <div className="flex items-center gap-2 hover:underline">
            <FaArrowLeft />
            <span>Back</span>
          </div>
        </Link>
        <div className="flex gap-10 mt-2">
          <div className="bg-white rounded-lg p-3">
            <img
              src={product.image}
              alt={product.title}
              className="h-full max-w-3xs object-contain rounded-lg"
            />
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl font-semibold">{product.title}</h1>
            <div className="flex items-center gap-3 mt-1">
              <FaStar className="w-4 h-4 text-yellow-300" />
              <h3>{product.rating?.rate}</h3>
              <span className="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400"></span>
              <h3>{product.rating?.count} reviews</h3>
            </div>
            <p className="text-slate-500 text-sm mt-2 mr-10 dark:text-slate-400">
              {product.description}
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-blue-950 dark:text-blue-400">
              ${product.price}
            </h2>
            <div className="flex items-center gap-2 mt-8">
              <button
                type="button"
                className="py-2 rounded cursor-pointer px-4 bg-blue-300 text-2xl dark:bg-blue-600"
                onClick={() => onAddToCart(product)}
              >
                <BsCartPlus />
              </button>
              <button className="px-4 py-2 bg-blue-500 text-white cursor-pointer rounded dark:bg-blue-900">
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
