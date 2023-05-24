import React, { useState } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";

const SignupForm = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { register } = useToken();

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

  const handleSubmit = async (event) => {
      event.preventDefault();

      const data = {}
      data.email = email;
      data.username = username;
      data.password = password;

      const accountUrl = "http://localhost:8000/api/accounts/";
    try {
      register(
        data,
        accountUrl
      );
      setEmail('');
      setUsername('');
      setPassword('');

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-screen flex flex-col items-center justify-center">
      <h1 className="">Make an Account</h1>
      <form onSubmit={handleSubmit} id="add-customer-form">
        <div className="flex flex-col items-center justify-center">
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
          <button className="m-2 p-3 pl-10  rounded-lg ">Sign Up</button>
        </div>
      </form>
    </div>
  );
}
export default SignupForm;
