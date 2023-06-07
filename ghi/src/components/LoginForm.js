import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useToken from "@galvanize-inc/jwtdown-for-react";
import "../App.css";
import loginz from "../images/login.png";
import { motion } from "framer-motion";

const LoginForm = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, token } = useToken();

  if (token) {
    navigate(`/profile/${username}`);
  }

  const handleUsernameChange = (event) => {
    const value = event.target.value;
    setUsername(value);
  };

  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setPassword(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      login(username, password);
      setPassword("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-screen flex flex-col items-center justify-center">
      <form
        className="flex flex-col justify-center items-center"
        onSubmit={handleSubmit}
        id="add-customer-form"
      >
        <img className="m-4 w-1/2 rounded-full" src={loginz} alt="Login Pic" />
        <div className="flex flex-col items-center justify-center">
          <input
            onChange={handleUsernameChange}
            placeholder="Username"
            required
            type="text"
            name="username"
            id="username"
            className="m-2 p-3 text-sm text-orange-900 border border-orange-300 rounded-lg bg-orange-50 focus:ring-orange-500 focus:border-orange-500 dark:bg-orange-700 dark:border-orange-600 dark:placeholder-orange-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500"
            value={username}
          />
          <label htmlFor="username"></label>
          <input
            onChange={handlePasswordChange}
            placeholder="Password"
            required
            type="password"
            name="password"
            id="password"
            className="m-2 p-3 text-sm text-orange-900 border border-orange-300 rounded-lg bg-orange-50 focus:ring-orange-500 focus:border-orange-500 dark:bg-orange-700 dark:border-orange-600 dark:placeholder-orange-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500"
            value={password}
          />
          <label htmlFor="password"></label>
          <motion.button
            className="m-2 text-white right-2.5 bg-amber-600 hover:bg-orange-400 focus:ring-4 focus:outline-none focus:ring-orange-400 font-medium rounded-lg text-sm px-4 py-2 dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800"
            whileHover={{
              scale: 1.2,
              transition: { duration: 0.2 },
            }}
            whileTap={{ scale: 0.9 }}
          >
            Login
          </motion.button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
