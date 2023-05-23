import React from 'react'
import { NavLink } from 'react-router-dom'
import logo from "../images/gold-icon.png";

const Nav = () => {
     return (
       <nav className="bg-slate-700 text-white w-screen">
         <div className="flex justify-between">
           <ul className="flex justify-center items-center">
             <li className="">
               <NavLink className="" aria-current="page" to="/main">
                 <img
                   src={logo}
                   alt="Golden Logo"
                   style={{ width: "50px" }}
                   className='p-1 mx-2'
                 />
               </NavLink>
             </li>
             <li className="">
               <NavLink
                 className="m-2"
                 aria-current="page"
                 to="/pins/profile/:id"
               >
                 My Profile
               </NavLink>
             </li>
             <li className="">
               <NavLink className="m-2" aria-current="page" to="/">
                 Search Users
               </NavLink>
             </li>
             <li className="">
               <NavLink className="m-2" aria-current="page" to="/">
                 New Post +
               </NavLink>
             </li>
           </ul>
           <div className="flex">
             <input
               type="search"
               id="default-search"
               className="m-2 p-3 pl-10 text-sm text-orange-900 border border-orange-300 rounded-lg bg-orange-50 focus:ring-orange-500 focus:border-orange-500 dark:bg-orange-700 dark:border-orange-600 dark:placeholder-orange-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500"
               placeholder="Search Locations"
             ></input>
             <button
               type="submit"
               className="m-2 text-white right-2.5 bg-amber-600 hover:bg-orange-400 focus:ring-4 focus:outline-none focus:ring-orange-400 font-medium rounded-lg text-sm px-4 py-2 dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800"
             >
               Search
             </button>
           </div>
         </div>
       </nav>
     );
}

export default Nav
