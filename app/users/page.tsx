'use client';

import { useEffect, useState } from 'react';

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState<any>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  // 1️⃣ Crée la fonction fetchUsers
  const fetchUsers = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`);
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error(err);
    }
  };

  // 2️⃣ Appel initial
  useEffect(() => {
    fetchUsers();
  }, []);
    // Start editing
  const startEdit = (user: any) => {
    setEditingUser(user);
    setName(user.name);
    setEmail(user.email);
  };
    // Update user
  const handleUpdate = async () => {
    if (!editingUser) return;

    await fetch('/api/updateUser', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: editingUser._id, name, email }),
    });

    setEditingUser(null);
    setName('');
    setEmail('');
    fetchUsers();
  };
  const handleDelete = async (id: string) => {
  if (!confirm('Supprimer cet utilisateur ?')) return;

  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${id}`, {
    method: 'DELETE',
  });

  fetchUsers(); // recharge la liste
};

  return (
    <div className='bg-gray-200 flex'>
        <div className=''>
      <h1>Users</h1>

      {users.map((user: any) => (
        <div key={user._id} style={{ marginBottom: 10 }}>
          <strong>{user.name}</strong> — {user.email}
           <button onClick={() => startEdit(user)}>Edit</button>
            <button  onClick={() => handleDelete(user._id)}
      style={{
        marginLeft: 10,
        backgroundColor: 'red',
        color: 'white',
        border: 'none',
        padding: '5px 10px',
        cursor: 'pointer',
      }}
    >
      Delete
    </button>
        </div>
      ))}
           {editingUser && (
        <div style={{ marginTop: 20 }}>
          <h2>Modifier {editingUser.name}</h2>
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Nom"
          />
          <input
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email"
          />
          <button onClick={handleUpdate}>Mettre à jour</button>
          <button onClick={() => setEditingUser(null)}>Annuler</button>
           
        </div>
      )}
      </div>
    </div>
  );
}
