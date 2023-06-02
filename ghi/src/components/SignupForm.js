import React, { useState } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import signup from '../images/signup.png';

const SignupForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [duplicateAccountError, setDuplicateAccountError] = useState(false);
  const { register, token } = useToken();
  const navigate = useNavigate();

  if (token && !duplicateAccountError) {
    navigate(`/profile/${username}`);
  }

  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);
  };

  const handleUsernameChange = (event) => {
    const value = event.target.value;
    setUsername(value);
  };

  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setPassword(value);
  };

  const handleNameChange = (event) => {
    const value = event.target.value;
    setName(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {};
    data.email = email;
    data.username = username;
    data.password = password;
    data.name = name;

    const accountUrl = "http://localhost:8000/api/accounts/";
    try {
      register(data, accountUrl);
      setEmail("");
      // setUsername("");
      setPassword("");
      setName("");
      setDuplicateAccountError(false);
    } catch (error) {
      console.error(error);
      setDuplicateAccountError(true);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      {/* <img className="m-4 w-1/4 rounded" src={signup} /> */}
      <div className="w-1/3 rounded-lg bg-slate-700 flex flex-col justify-center items-center p-4 mt-4 drop-shadow-lg">
        <form
          className="flex flex-col justify-center items-center"
          onSubmit={handleSubmit}
          id="add-customer-form"
        >
          <div className="">
            <input
              onChange={handleEmailChange}
              placeholder="Email"
              required
              type="text"
              name="email"
              id="email"
              className="m-2 p-3 text-sm text-orange-900 border border-orange-300 rounded-lg bg-orange-50 focus:ring-orange-500 focus:border-orange-500 dark:bg-orange-700 dark:border-orange-600 dark:placeholder-orange-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500"
              value={email}
            />
            <label htmlFor="email"></label>
          </div>
          <div className="">
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
          </div>
          <div className="">
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
          </div>
          <div className="">
            <input
              onChange={handleNameChange}
              placeholder="Name"
              required
              type="name"
              name="name"
              id="name"
              className="m-2 p-3 text-sm text-orange-900 border border-orange-300 rounded-lg bg-orange-50 focus:ring-orange-500 focus:border-orange-500 dark:bg-orange-700 dark:border-orange-600 dark:placeholder-orange-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500"
              value={name}
            />
            <label htmlFor="name"></label>
          </div>
          <motion.button
            className="m-2 text-white right-2.5 bg-amber-600 hover:bg-orange-400 focus:ring-4 focus:outline-none focus:ring-orange-400 font-medium rounded-lg text-sm px-4 py-2 dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800"
            whileHover={{
              scale: 1.1,
              transition: { duration: 0.2 },
            }}
            whileTap={{ scale: 0.9 }}
          >
            Sign up
          </motion.button>
        </form>
      </div>
    </div>
  );
};
export default SignupForm;
