"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

interface User {
  _id: string;
  name: string;
  email: string;
}

export default function EditUser() {
  const { id } = useParams();
  const router = useRouter();

  const [form, setForm] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(true);

  // GET USER BY ID
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`http://localhost:3001/users/${id}`);
        const data = await res.json();
        setForm({ name: data.name, email: data.email });
      } catch (err) {
        console.error("Erreur chargement user");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchUser();
  }, [id]);

  // UPDATE
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await fetch(`http://localhost:3001/users/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      router.push("/users");
    } catch (err) {
      console.error("Erreur update");
    }
  };

  if (loading) return <p>Chargement...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h1>Edit user</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
          placeholder="Name"
        />

        <input
          type="email"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
          placeholder="Email"
        />

        <button type="submit">Save</button>
      </form>
    </div>
  );
}
