import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import type { User } from "../types";

const UserDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`https://fakestoreapi.com/users/${id}`);
        if (!response.ok) {
          throw new Error("failed to fetch user data");
        }
        const data = await response.json();
        setUser(data);
        console.log(data.id, " di klik");
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };
    if (id) {
      fetchUser();
    }
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!user) return <div>User not found</div>;

  return (
    <div className="mx-auto">
      UserDetail
      <div className="bg-sky-400 flex justify-center">
        <div className="">
          <div className="px-20">
            <h1 className="capitalize text-lg font-semibold text-center">
              {user.name.firstname} {user.name.lastname}
            </h1>
            <h3 className="text-sm text-sky-100">Email: {user.email}</h3>
          </div>
          <div className="mt-10 ">
            <h2>Username: {user.username}</h2>
            <h2>Phone: {user.phone}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
