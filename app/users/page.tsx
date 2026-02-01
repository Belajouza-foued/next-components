"use client"
import { useEffect, useState } from "react";

interface User {
  id?: number;
  name: string;
  email: string;
}

export default function Users () {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("http://localhost:3001/users");
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        setError("Erreur lors du chargement");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Liste des users</h1>

      {users.map((form) => (
        <div key={form.id} style={{ border: "1px solid #ccc", margin: 10 }}>
          <p><b>Name:</b> {form.name}</p>
          <p><b>Email:</b> {form.email}</p>
        </div>
      ))}
    </div>
  );
};


