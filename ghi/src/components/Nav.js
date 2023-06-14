import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../images/gold-icon.png";
import useToken from "@galvanize-inc/jwtdown-for-react";
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";
import { useNavigate } from "react-router-dom";
import SearchBox from "./SearchBox";
import { motion } from "framer-motion";

const Nav = ({ username, setUserData, searchTerm, setSearchTerm }) => {
  const { logout } = useToken();
  const navigate = useNavigate();
  const { token } = useAuthContext();

  const handleLogout = () => {
    logout();
    navigate("/");
  };
  const handleLogin = () => {
    navigate("/login");
  };
  const handleSignup = () => {
    navigate("/signup");
  };
  return (
    <nav className="bg-slate-700 text-white">
      <div className="flex justify-between">
        <ul className="flex justify-center items-center">
          <motion.li
            whileTap={{ translateY: 1, scale: 0.9 }}
            whileHover={{ translateY: -3 }}
          >
            <NavLink aria-current="page" to="/">
              <img
                src={logo}
                alt="Golden Logo"
                style={{ width: "50px", minWidth: "50px" }}
                aria-current="page"
                className="p-1 mx-2"
              />
            </NavLink>
          </motion.li>
          {token ? (
            <motion.li
              whileTap={{ translateY: 1, scale: 0.9 }}
              whileHover={{ translateY: -3 }}
            >
              <NavLink
                className="m-2 hover:text-orange-500 active:text-orange-500 focus:text-orange-500"
                to={`/profile/${username}`}
                aria-current="page"
              >
                My Profile
              </NavLink>
            </motion.li>
          ) : (
            <></>
          )}

          <motion.li
            whileTap={{ translateY: 1, scale: 0.9 }}
            whileHover={{ translateY: -3 }}
          >
            <NavLink
              className="m-2 hover:text-orange-500 active:text-orange-500 focus:text-orange-500"
              aria-current="page"
              to="/search-users"
            >
              Search Users
            </NavLink>
          </motion.li>
          {token ? (
            <motion.li
              whileTap={{ translateY: 1, scale: 0.9 }}
              whileHover={{ translateY: -3 }}
            >
              <NavLink
                className="m-2 hover:text-orange-500 active:text-orange-500 focus:text-orange-500"
                aria-current="page"
                to="/new-pin"
              >
                New Pin +
              </NavLink>
            </motion.li>
          ) : (
            <></>
          )}
        </ul>
        <div className="flex">
          <SearchBox searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          {token ? (
            <button
              onClick={handleLogout}
              type="submit"
              className="m-2 text-white right-2.5 bg-amber-600 hover:bg-orange-400 focus:ring-4 focus:outline-none focus:ring-orange-400 font-medium rounded-lg text-sm px-4 py-2 dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800"
            >
              Logout
            </button>
          ) : (
            <div className="flex">
              <button
                onClick={handleLogin}
                type="submit"
                className="m-2 text-white right-2.5 bg-amber-600 hover:bg-orange-400 font-medium rounded-lg text-sm px-4 py-2 dark:bg-orange-600 dark:hover:bg-orange-700"
              >
                Login
              </button>
              <button
                onClick={handleSignup}
                type="submit"
                className="m-2 text-white right-2.5 bg-amber-600 hover:bg-orange-400 font-medium rounded-lg text-sm px-4 py-2 dark:bg-orange-600 dark:hover:bg-orange-700"
              >
                Sign up
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
