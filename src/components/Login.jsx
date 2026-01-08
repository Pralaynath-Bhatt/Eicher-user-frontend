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

      if (!res?.data?.jwt || !res?.data?.username || !res?.data?.id) {
        throw new Error("Invalid login response");
      }

      localStorage.setItem("token", res.data.jwt);
      localStorage.setItem("name", res.data.username);
      localStorage.setItem("UserID", res.data.id);
      setTimeout(() => window.location.href="/innovation/", 1000);

    } catch (error) {
      console.error("Login error:", error);

      let errorMessage = "Something went wrong. Please try again.";

      if (error.response) {
        errorMessage =
          error.response.data?.message ||
          error.response.data ||
          "Invalid username or password";
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
