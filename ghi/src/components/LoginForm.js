import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useToken from "@galvanize-inc/jwtdown-for-react";
import "../App.css";

const LoginForm = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useToken();
  const [userData, setUserData] = useState({});

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

  function refreshPage() {
    window.location.reload(false);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      login(username, password);
      // setUsername("");
      setPassword("");
      await handleGetLoggedInUser();
      navigate(`/profile/${userData.username}`);
    } catch (error) {
      console.error(error);
    }
  };

    const handleGetLoggedInUser = async () => {
      const url = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/token`;
      fetch(url, {
        credentials: "include",
      })
        .then((response) => response.json())
        .then((data) => {
          setUserData(data.account);
        })
        .catch((error) => console.error(error));
    };
    // useEffect(() => {
    //   handleGetLoggedInUser();
    // }, []);
  console.log("ran through it")
  return (
    <div className="w-screen flex flex-col items-center justify-center">
      <form onSubmit={handleSubmit} id="add-customer-form">
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
          <button>
            <span className="loginButton m-2 p-3 pl-10  rounded-lg ">
              Login
            </span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
