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
    <div className="container">
      <div className="">
        <div className="">
          <div className="">
            <h1 className="">Make an Account</h1>
            <form onSubmit={handleSubmit} id="add-customer-form">
              <div className="">
                <input onChange={handleEmailChange} placeholder="Email" required type="text" name="email" id="email" className="" value={email} />
                <label htmlFor="email">Email</label>
              </div>
              <div className="">
                <input onChange={handleUsernameChange} placeholder="Username" required type="text" name="username" id="username" className="" value={username} />
                <label htmlFor="username">Username</label>
              </div>
              <div className="">
                <input onChange={handlePasswordChange} placeholder="Password" required type="password" name="password" id="password" className="" value={password} />
                <label htmlFor="password">Password</label>
              </div>
              <button className="">Sign up</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
export default SignupForm;
