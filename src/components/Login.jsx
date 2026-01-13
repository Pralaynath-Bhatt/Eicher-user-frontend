import React, { useState } from "react";
import { login } from "./Auth";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username.trim() || !password.trim()) {
      setMessage("Username and password are required");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await login(username, password);
      
      if(res.data.success){

      localStorage.setItem("token", res.data.data.jwt);
      localStorage.setItem("name", res.data.data.username);
      localStorage.setItem("UserID", res.data.data.id);
      setMessage(res.data.message)
      setTimeout(() => window.location.href="/innovation/", 1000);
      }
    } catch (error) {
    
      let errorMessage = "Something went wrong. Please try again.";

      if (error.response) {
        if(error.response.data?.data!=null&&typeof error.response.data?.data==="object"){
        errorMessage=  Object.values(error.response.data?.data)[0];
      }
        else{
        errorMessage = error.response.data?.message ||
          "Invalid username or password";}
      } else if (error.request) {
        errorMessage = "Server not reachable. Check your network.";
      } else {
        errorMessage = error.message;
      }

      localStorage.removeItem("token");
      localStorage.removeItem("name");
      localStorage.removeItem("UserID");

      setMessage(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          disabled={loading}
          required
        />

        <br /><br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
          required
        />

        <br /><br />

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <br />

      <Link to="/login/forgotpass">Forgot Password?</Link>

      {message && <p className="error-message">{message}</p>}
    </div>
  );
}

export default Login;
