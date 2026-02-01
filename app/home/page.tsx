"use client"
import './home.css'
import { FaSearch } from "react-icons/fa";
import { useState  } from "react";
import Link from 'next/link';
import Image from 'next/image';

const projects = [
  {
id: "1",
image: "/images/nature-1.jpg",
imageHover: "/images/tree.jpg.jpg",
title: 'Riviere',
subtitle: "belle vue",
  },
   {
id: "2",
image: "/images/nature-2.jpg",
imageHover: "/images/bird.jpg.jpg",
title: "mountain",
subtitle: "belle montagne",
  },
  {
  id: "3",
image: "/images/nature-2.jpg",
imageHover: "/images/cake.jpg.jpg",
title: "mountain",
subtitle: "belle montagne",
  }
]


  const Home = () => {    
        const [query, setQuery] = useState("");
  const [hoverId, setHover] = useState<string | null>(null);
  const [open,setOpen] = useState(false)
 const [form,setForm] = useState({name:"",email:""})
  const [affiched,setAffiched] = useState<null | {email: string; name: string;  }>(null);


  const pages = [
  { name: "Dashboard", path: "/dashboard" },
  { name: "Profile", path: "/profile" },
  { name: "Settings", path: "/settings" },
  { name: "About", path: "/about" }
]; 
 
const filteredPages = pages.filter(page =>
  page.name.toLowerCase().includes(query.toLowerCase())
);
 const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault()
  setAffiched(form)
  }


     
    return (
<div className="layout">
  <header>
    <div className='flex flex-wrap md:flex-nowrap justify-between items-center pt-5 gap-5 md:max-w-7xl'>
<div className='flex item-center gap-5 md:ml-20'>
<img
  src="/images/profile-1.jpg"
  alt="profile"
  className="md:w-12 md:h-12 h-6 w-6 rounded-full object-cover"
/>
<h1 className='text-gray-200 font-bold md:text-lg text-xs pt-3'>Foued belajouza</h1>
</div>
  <nav className='flex justify-between itmes-center gap-10 md:w-2xl pt-1'>      
        <ul className='flex items-center md:text-lg text-xs text text-gray-100 font-medium gap-5 md:ml-0 ml-5 ' >
          <li>Home</li>
          <li>About</li>
          <li>Blog</li>
          <li>Services</li>
        </ul>        
 
 <div className="relative inline-block md:pt-2 text-xs md:text-[15px] search-input">
  <FaSearch
    onClick={() => console.log("search")}
    className="absolute right-3 top-1/2 -translate-y-1/2
               cursor-pointer text-gray-500 hover:text-green-500"
  />

  <input
    type="search"
  value={query}
  onChange={(e) => setQuery(e.target.value)}
  placeholder="search"
        className="md:w-40 w-10 rounded-xl px-3 py-1 pr-9 bg-gray-200
    focus:outline-none focus:ring-2 focus:ring-green-400"   
  />
          {/* search */}
{query && (
  filteredPages.map((page) => (
    <Link
      key={page.path}
      href={page.path}
      className="block px-3 py-2 hover:bg-gray-100"
          >
      {page.name}
    </Link>
  ))
)}
</div>




    </nav>     
    </div>

  </header>
  <aside className='hidden md:block'>Sidebar</aside>
  <main  >
<div className='relative inline-block group'>
<span className="flex items-center gap-1 cursor-pointer hover:text-green-400">
  Menu
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
  </svg>
</span>
<div className='absolute w-30 bg-gray-200 opacity-0 invisible
  group-hover:opacity-100  group-hover:visible
            px-5 text-xl py-5 block bg-gray-200
'>
  <ul>
    <li>front</li>
    <li>mark</li>
    <li>back</li>
    
  </ul>

</div>
</div>
<div className="pt-10 container bg-gray-200 border-2 mt-10 max-w-6xl md:w-full w-[280px] mx-auto min-h-[400px] 
">
  <div className="grid grid-cols-12 gap-10 text-center pt-10 md:ml-15">

    {/* CARD 1 */}
    <div className="col-span-12 md:col-span-3 border-2 border-gray-400 rounded-xl bg-white md:col-start-2 md:w-[230px] w-[220px] md:ml-0 ml-5">
      <div className="flex flex-col justify-center items-start group">
        <img src="/images/tree.jpg.jpg" className="md:w-64 md:h-32 w-56 h-32 object-cover rounded-t-lg 
            " alt="tree" />
         <div className="text-start p-3">
        <h1 className="font-bold text-xl">fofo</h1>
        <Link href="/about" className="font-bold text-sm">welcome fofo</Link>
        <p className="font-bold text-sm">welcome to our project</p>
      </div>
      </div>
    </div>

    {/* CARD 2 */}
    <div className="col-span-12 md:col-span-3 border-2 border-gray-400 rounded-xl bg-white md:w-[230px] w-[220px] md:ml-0 ml-5">
       <div className="flex flex-col justify-center items-start">
        <img src="/images/tree.jpg.jpg" className="md:w-64 md:h-32 w-56 h-32object-cover rounded-t-lg " alt="tree" />
         <div className="text-start p-3">
        <h1 className="font-bold text-xl">samir</h1>
        <p className="font-bold text-sm">welcome samir</p>
        <Link href="/home"  className="font-bold text-sm">welcome to our project samir</Link>
      </div>
      </div>
    </div>

    {/* CARD 3 */}
    <div className="col-span-12 md:col-span-3 border-2 border-gray-400 rounded-xl bg-white md:w-[230px] w-[220px] md:ml-0 ml-5">
       <div className="flex flex-col justify-center items-start ">
        <img src="/images/tree.jpg.jpg" className="md:w-64 md:h-32 w-56 h-32 object-cover rounded-t-lg " alt="tree" />
         <div className="text-start p-3">
        <h1 className="font-bold text-xl">salma</h1>
        <p className="font-bold text-sm">welcome salma</p>
        <Link href="/users"  className="font-bold text-sm">welcome to our project salma</Link>
      </div>
      </div>
    </div>

  </div>
</div>
<div className='card-3 container bg-gray-200 max-w-5xl flex justify-center items-center gap-10 mt-10 p-10 mx-auto'>
  {projects.map((projet) => ( 
    <div key={projet.id} className=' card-title  border-1 w-56 h-48 bg-white'>
          {/* IMAGE CLIQUABLE */}     
          <Link className='' href="/about">
      <img
        src={hoverId === projet.id ? projet.imageHover : projet.image }
    
        alt={projet.title}
        className='w-full h-32 object-cover rounded-t-lg'
        onMouseEnter={() => setHover(projet.id)}
        onMouseLeave={() => setHover(null)}       
        />
        </Link>
        <div className='text-start ps-3'>
        <h1>{projet.title}</h1>
             <p>{projet.subtitle}</p>
             </div>
</div>
  ))} 

</div>
<div className=''>
    <p>nbbjjhgfghjhbgffvhhjjjnbbvvvv</p>
    {open && (
      <p>bbbbbbbbbbbbbbbbbbb</p>
    )}
 <button className='p-5 bg-gray-300' onClick={() => setOpen(prev => !prev)}>
  {open ? "reduire" : "lire la suite"}  
     </button>
  </div>
 <form onSubmit={handleSubmit}>
  <input type='email' value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder='email'/>
  <input type='text' placeholder='name' value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value})}/> 
 <button className='' type='submit' >envoyer</button>
 </form>
 <div className=''>
  {affiched && (
    <>
    <h1>{affiched.email}</h1>
     <h1>{affiched.name}</h1>
    </>
  )
  }
 </div>
  
 
  </main>
  <footer>Footer</footer>
</div>
    )
  }
  export default Home
 