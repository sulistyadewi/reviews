import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("https://fakestoreapi.com/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });
      if (!response.ok) {
        throw new Error("Login failed. Please check your credentials");
      }
      const data = await response.json();
      localStorage.setItem("token", data.token);
      localStorage.setItem("username", username);
      window.dispatchEvent(new Event("storage"));
      navigate("/");
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen -mt-12">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form
        action=""
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-lg w-80 dark:bg-gray-700"
      >
        <div className="mb-4">
          <label
            htmlFor=""
            className="text-sm font-medium text-gray-700 mb-2 dark:text-slate-300"
          >
            Username
          </label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor=""
            className="text-sm font-medium text-gray-700 mb-2 dark:text-slate-300"
          >
            Password
          </label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="w-full px-3 py-2 border border-gray-300 rounded"
          />
        </div>
        {error && <p className="text-red-400 mb-4 text-sm">{error}</p>}
        <button
          type="submit"
          className="w-full bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-500 transition-colors dark:bg-blue-500 dark:hover:bg-blue-600"
        >
          {loading ? "loading" : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
