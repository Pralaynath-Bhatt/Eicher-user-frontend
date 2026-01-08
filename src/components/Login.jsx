import React, { useState } from "react";
import { login } from "./Auth";
import { Link } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(username, password);
      setMessage(res.data);
      
      localStorage.setItem("token",res.data.jwt);
      localStorage.setItem("name",res.data.username);
      localStorage.setItem("UserID",res.data.id);
    } catch(error) {
      localStorage.setItem("token","");
      localStorage.setItem("name","");
      localStorage.setItem("UserID","");
      setMessage(error.response.data);
      alert(error.response.data);
      console.log(error.response.data);
    }
  };

  return (
    <div> 
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <br /><br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <br /><br />

        <button type="submit">Login</button>
        
      </form><br /><br />
      <Link to="/user/auth/forgotpass">Forgot Password</Link>        
      <p>{localStorage.getItem("name")}</p>
    </div>
  );
}

export default Login;
