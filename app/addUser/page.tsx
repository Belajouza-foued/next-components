'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddUserPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
    const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email }),
    });
    router.push('/users'); 

    setName('');
    setEmail('');
     };

  return (
    <div className="min-h-screen flex justify-center items-center">
      
      <div className='g-gray-200 p-12 border-2 rounded-xl w-[500px]'>
     <h1 className='text-center text-2xl text-blue-600 pb-10'>Ajouter un utilisateur</h1>
      <form onSubmit={handleSubmit}>
        <input
        className='border-2 rounded-xl w-sm px-6 py-2 '
          placeholder="Nom"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <br /><br />
        <input
        className='border-2 rounded-xl w-sm px-6 py-2'
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <br /><br />
        <div className='text-center'>
        <button className='p-2 px-6 py-2 bg-green-600 rounded-xl w-sm' type="submit">Ajouter</button>
        </div>
      </form>
      </div>
    

    </div>
    
  );
}
