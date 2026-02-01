"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function About () {
     const [form,setForm] = useState({name:"",email:""})
  const [affiched,setAffiched] = useState<null | {email: string; name: string;  }>(null);
 const router = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const res = await fetch("http://localhost:3001/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    // data = user créé par NestJS
    setAffiched({
      name: data.name,
      email: data.email,
    });

    setForm({ name: "", email: "" });
     router.push('/users'); 
  } catch (error) {
    console.error("Erreur backend :", error);
  }
};

    return (
        <>
        <div className="">
        <form onSubmit={handleSubmit}>
  <input
    type="email"
    placeholder="email"
    value={form.email}
    onChange={(e) => setForm({ ...form, email: e.target.value })}
  />

  <input
    type="text"
    placeholder="name"
    value={form.name}
    onChange={(e) => setForm({ ...form, name: e.target.value })}
  />

  <button type="submit">envoyer</button>
</form>

{affiched && (
  <>
    <h1>{affiched.email}</h1>
    <h1>{affiched.name}</h1>
  </>
)}
</div>
</>
    )
}
