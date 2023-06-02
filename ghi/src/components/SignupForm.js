import React, { useState } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import { useNavigate } from "react-router-dom";

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
    <div>
      <h1 className="">Make an Account</h1>
      <form onSubmit={handleSubmit} id="add-customer-form">
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
          <label htmlFor="email">Email</label>
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
          <label htmlFor="username">Username</label>
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
          <label htmlFor="password">Password</label>
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
          <label htmlFor="name">Name</label>
        <button className="">Sign up</button>
        </div>
      </form>
    </div>
  );
};
export default SignupForm;
