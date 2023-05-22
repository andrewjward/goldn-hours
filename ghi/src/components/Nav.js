import React from 'react'
import { NavLink } from 'react-router-dom'

const Nav = () => {
     return (
       <nav className="bg-lime-400">
         <div className="flex justify-between">
           <ul className="flex justify-center items-center">
             <li className="">
               <NavLink className="ml-2 mr-2" aria-current="page" to="/main">
                 Gold'n Hours
               </NavLink>
             </li>
             <li className="">
               <NavLink
                 className="ml-2 mr-2"
                 aria-current="page"
                 to="/pins/profile/:id"
               >
                 My Profile
               </NavLink>
             </li>
             <li className="">
               <NavLink className="ml-2 mr-2" aria-current="page" to="/">
                 Search Users
               </NavLink>
             </li>
             <li className="">
               <NavLink className="ml-2 mr-2" aria-current="page" to="/">
                 New Post +
               </NavLink>
             </li>
           </ul>
           <div className="flex">
             <input
               type="search"
               id="default-search"
               className="p-3 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
               placeholder="Search Locations"
             ></input>
             <button
               type="submit"
               className="ml-2 mr-2 text-white right-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
             >
               Search
             </button>
           </div>
         </div>
       </nav>
     );
}

export default Nav