import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);
  };

  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setPassword(value);
  };

 const handleSubmit = async (event) => {
   event.preventDefault();

   const data = {};

   data.email = email;
   data.password = password;

   const accountUrl = "http://localhost:8000/api/accounts/{account_id}";
   const fetchConfig = {
     method: "POST",
     body: JSON.stringify(data),
     headers: {
       "Content-Type": "application/json",
     },
   };
   try {
     const response = await fetch(accountUrl, fetchConfig);
     if (response.ok) {
       setEmail("");
       setPassword("");
     }
   } catch (error) {
     console.error(error);
   }
 };
 useEffect(() => {}, []);

  return (
    <div className="login-form">

    </div>
  );
};

export default LoginForm;
