import { useState, useEffect } from "react";
import type { User } from "../types";

const UserLIst = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchUser = async () => {
    setLoading(true);
    const response = await fetch("https://fakestoreapi.com/users");
    const data = await response.json();
    setUsers(data);
    console.log(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (loading) return <div>Loading...</div>;
  return (
    <div className="mb-5 px-5">
      <h1>User List</h1>
      <div className="grid grid-cols-3 gap-4">
        {users.map((user, index) => (
          <div
            key={index}
            className="bg-blue-400 max-w-md p-4 rounded-md dark:bg-gray-700"
          >
            <div className="flex justify-between">
              <div>
                <h1 className="capitalize font-bold">
                  {user.name.firstname} {user.name.lastname}
                </h1>
                <h3 className="text-xs text-sky-200">{user.email}</h3>
              </div>
              <div>
                <a
                  className="px-2 py-1 bg-white rounded-lg text-sm hover:bg-blue-100 dark:text-black"
                  href={`/users/${user.id}`}
                >
                  View
                </a>
              </div>
            </div>
            <div className="text-sm mt-3 flex flex-col gap-1">
              <h2>
                Username:{" "}
                <span className="text-sky-100 font-semibold">
                  {user.username}
                </span>
              </h2>
              <h2>
                City:{" "}
                <span className="text-sky-100 font-semibold capitalize">
                  {user.address.city}
                </span>
              </h2>
              <h2>
                Phone:{" "}
                <span className="text-sky-100 font-semibold">{user.phone}</span>
              </h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserLIst;
