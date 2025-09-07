import "./App.css";
import { useState, useEffect } from "react";
import CategoryFilter from "./components/CategoryFilter";
import ProductList from "./components/ProductList";
import type { Product } from "./types";
import type { CartItem } from "./types";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import Cart from "./components/Cart";
import UserLIst from "./components/UserLIst";
import UserDetail from "./components/UserDetail";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import { FiShoppingCart } from "react-icons/fi";
import ProductDetail from "./components/ProductDetail";
import Checkout from "./components/Checkout";
import Orders from "./components/Orders";
import { FaMoon } from "react-icons/fa";
import { MdSunny } from "react-icons/md";

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLogin, setIsLogin] = useState<boolean>(() => {
    return !!localStorage.getItem("token");
  });
  const [username, setUsername] = useState<string>(() => {
    return localStorage.getItem("username");
  });
  const [theme, setTheme] = useState("light");

  const fetchProducts = async (category: string) => {
    setLoading(true);
    let url = "https://fakestoreapi.com/products";
    if (category !== "all") {
      url = `https://fakestoreapi.com/products/category/${category}`;
    }
    const res = await fetch(url);
    const data = await res.json();
    setProducts(data);
    setLoading(false);
    console.log(data);
  };

  const fetchCategories = async () => {
    const res = await fetch("https://fakestoreapi.com/products/categories");
    const data = await res.json();
    setCategories(data);
  };

  useEffect(() => {
    fetchProducts(selectedCategory);
    fetchCategories();
  }, [selectedCategory]);

  const addToCart = (products: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === products.id);
      if (existing) {
        return prev.map((item) =>
          item.id === products.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prev, { ...products, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const increaseQuantity = (id: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + 1) }
          : item
      )
    );
  };

  const decreaseQuantity = (id: number) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };
  useEffect(() => {
    const handleLogin = () => {
      setIsLogin(!!localStorage.getItem("token"));
    };
    window.addEventListener("storage", handleLogin);
    return () => {
      window.removeEventListener("storage", handleLogin);
    };
  }, []);

  useEffect(() => {
    let html = document.documentElement;
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  });

  useEffect(() => {
    let saveTheme = localStorage.getItem("theme");
    let systemPrefersColor = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    if (saveTheme) {
      setTheme(saveTheme);
    } else if (systemPrefersColor) {
      setTheme("dark");
    }
  });

  const toggle = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setIsLogin(false);
    window.location.href = "/login";
  };

  // johnd
  // m38rmF$

  return (
    <div className="w-full bg-sky-100 py-5 dark:bg-gray-900">
      <BrowserRouter>
        <nav className="flex gap-5 justify-end px-10 items-center">
          <button
            onClick={toggle}
            aria-label={`switch to ${theme === "dark" ? "light" : "dark"}`}
            className="bg-sky-800 px-2 py-2 text-black dark:text-white text-lg rounded-full transition-all duration-300"
          >
            {theme === "dark" ? <MdSunny /> : <FaMoon />}
          </button>
          <div className="flex gap-8 px-5 font-semibold dark:text-white">
            <Link to="/" className="hover:underline">
              Products
            </Link>
            <Link to="/users" className="hover:underline">
              Users
            </Link>
            <Link to="/checkout">Checkout</Link>
            <Link to="/orders">Orders</Link>
            <Link to="/cart" className="hover:underline text-2xl">
              <FiShoppingCart />
            </Link>
          </div>
          <div className="font-semibold flex gap-3">
            {isLogin && username && <span>Hello, {username}</span>}
            {isLogin ? (
              <button
                onClick={handleLogOut}
                className="bg-red-300 px-3 py-1 hover:bg-red-400 rounded"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="bg-gray-900 hover:bg-black text-white px-3 py-1 rounded"
              >
                Login
              </Link>
            )}
          </div>
        </nav>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <>
                  <CategoryFilter
                    categories={categories}
                    selected={selectedCategory}
                    onChange={setSelectedCategory}
                  />
                  {loading ? (
                    <div className="text-center mt-10">Loading...</div>
                  ) : (
                    <ProductList products={products} onAddToCart={addToCart} />
                  )}
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <>
                  <Cart
                    items={cart}
                    onRemove={removeFromCart}
                    increaseQuantity={increaseQuantity}
                    decreaseQuantity={decreaseQuantity}
                  />
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="/products/:id"
            element={
              <ProtectedRoute>
                <>
                  <ProductDetail onAddToCart={addToCart} />
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="/users"
            element={
              <ProtectedRoute>
                <>
                  <UserLIst />
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <Checkout cart={cart} onClearCart={() => setCart([])} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <Orders />
              </ProtectedRoute>
            }
          />
          <Route path="/users/:id" element={<UserDetail />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
      {/* <UserLIst /> */}
      {/* <UserDetail /> */}
      {/* <Cart
        items={cart}
        onRemove={removeFromCart}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
      /> */}
      {/* <CategoryFilter
        categories={categories}
        selected={selectedCategory}
        onChange={setSelectedCategory}
      /> */}
      {/* {loading ? (
        <div className="text-center mt-10">Loading...</div>
      ) : (
        <ProductList products={products} onAddToCart={addToCart} />
      )} */}
    </div>
  );
}

export default App;
