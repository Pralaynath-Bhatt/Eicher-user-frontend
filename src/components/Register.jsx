import React, { useState } from "react";
import { register } from "./Auth";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await register(username, email, password);
      setMessage(res.data);
      alert(res.data);
      window.location.href="/login/";
    } catch (error) {
      if(error.response&&error.response.data){
        setMessage(error.response.data);
        alert(error.response.data);
        console.log(error.response);
      }
      else{
        setMessage("Something went wrong");
      }
    }
  };

  return (
    <div>
      <h2>Register</h2>

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
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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

        <button type="submit">Register</button>
      </form>
<br /><br />
      <p>{message}</p>
    </div>
  );
}

export default Register;
