import React, { useEffect, useState } from "react";

const SignupForm = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");


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
        const fetchConfig = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
    };
    try {
        const response = await fetch(accountUrl, fetchConfig);
        if (response.ok) {
            setEmail('');
            setUsername('');
            setPassword('');
        }

    } catch (error) {
        console.error(error);
    }
};
useEffect(() => {
}, []);

return (
    <div className="container">
          <div className="row">
            <div className="offset-3 col-6">
              <div className="shadow p-4 mt-4">
                <h1 className='text-center'>Make an Account</h1>
                <form onSubmit={handleSubmit} id="add-customer-form">
                  <div className="form-floating mb-3">
                    <input onChange={handleEmailChange} placeholder="Email" required type="text" name="email" id="email" className="" value={email} />
                    <label htmlFor="name">Email</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input onChange={handleUsernameChange} placeholder="Username" required type="text" name="username" id="username" className="" value={username} />
                    <label htmlFor="fabric">Username</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input onChange={handlePasswordChange} placeholder="Password" required type="password" name="password" id="password" className="" value={password} />
                    <label htmlFor="fabric">Address</label>
                  </div>
                  <button className="btn btn-success w-100">Sign up</button>
                </form>
              </div>
            </div>
          </div>
        </div>
)
}
export default SignupForm;
