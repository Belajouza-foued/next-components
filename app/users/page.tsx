"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

interface User {
  _id: string;     // IMPORTANT (MongoDB / NestJS)
  name: string;
  email: string;
}

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [editForm, setEditForm] = useState({ name: "", email: "" });

  // GET USERS
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch("http://localhost:3001/users");
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error("Erreur chargement users");
    } finally {
      setLoading(false);
    }
  };

  // UPDATE USER
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;

    try {
      const res = await fetch(
        `http://localhost:3001/users/${editingUser._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editForm),
        }
      );

      const updatedUser = await res.json();

      setUsers((prev) =>
        prev.map((u) =>
          u._id === updatedUser._id ? updatedUser : u
        )
      );

      setEditingUser(null);
    } catch (err) {
      console.error("Erreur update user");
    }
  };
  const handleDelete = async (id: string) => {
  const confirmDelete = confirm("Voulez-vous vraiment supprimer ce user ?");
  if (!confirmDelete) return;

  try {
    await fetch(`http://localhost:3001/users/${id}`, {
      method: "DELETE",
    });

    // supprimer le user de la liste localement
    setUsers((prev) => prev.filter((u) => u._id !== id));
  } catch (error) {
    console.error("Erreur suppression user");
  }
};

  if (loading) return <p>Chargement...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h1>Liste des users</h1>

      {/* LISTE */}
      {users.map((user) => (
        <div
          key={user._id}
          style={{
            border: "1px solid #ccc",
            padding: 10,
            marginBottom: 10,
          }}
        >
          <p><b>Name:</b> {user.name}</p>
          <p><b>Email:</b> {user.email}</p>

<Link href={`/users/${user._id}/edit`}>
  modifier
</Link>
          <button
            onClick={() => {
              setEditingUser(user);
              setEditForm({ name: user.name, email: user.email });
            }}
          >
            Update
          </button>
              <button
      onClick={() => handleDelete(user._id)}
      style={{ marginLeft: 10, color: "red" }}
    >
      Delete
    </button>
        </div>
      ))}

      {/* FORM UPDATE */}
      {editingUser && (
        <form
          onSubmit={handleUpdate}
          style={{
            marginTop: 30,
            padding: 15,
            border: "2px solid black",
            maxWidth: 400,
          }}
        >
          <h2>Modifier utilisateur</h2>

          <input
            type="text"
            value={editForm.name}
            onChange={(e) =>
              setEditForm({ ...editForm, name: e.target.value })
            }
            placeholder="Name"
          />

          <input
            type="email"
            value={editForm.email}
            onChange={(e) =>
              setEditForm({ ...editForm, email: e.target.value })
            }
            placeholder="Email"
          />

          <div style={{ marginTop: 10 }}>
            <button type="submit">Save</button>
            <button
              type="button"
              onClick={() => setEditingUser(null)}
              style={{ marginLeft: 10 }}
            >
              Cancel
            </button>
          
          </div>
        </form>
      )}
    </div>
  );
}
