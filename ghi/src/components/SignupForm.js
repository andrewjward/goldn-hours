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
  const { register, token, logout } = useToken();
  const navigate = useNavigate();

  if (token && !duplicateAccountError) {
    navigate(`/profile/${username}`);
  } else if (token && duplicateAccountError) {
    logout();
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

    const tryToFetchUsername = async () => {
      const fetchUrl = `http://localhost:8000/api/accounts/69?username=${username}`;
      try {
        const response = await fetch(fetchUrl);
        if (response.ok) {
          setDuplicateAccountError(true);
          console.log(response);
        } else {
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
        }
      } catch (error) {
        console.error("BAD FETCH", error);
      }
    };

    try {
      tryToFetchUsername();
    } catch (error) {
      console.error("TRIED TO GET USERNAME BUT GOT ERROR!", error);
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
        {duplicateAccountError && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <strong className="font-bold">Holy smokes!</strong>
              <span className="block sm:inline">Something bad happened.</span>
              <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                <svg className="fill-current h-6 w-6 text-red-500" role="button" onClick={() => setDuplicateAccountError(false)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
              </span>
            </div>
          )
        }
      </div>
    </div>
  );
};
export default SignupForm;
