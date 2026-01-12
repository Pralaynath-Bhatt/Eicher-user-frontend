import React, { useState } from "react";
import { register } from "./Auth";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);



  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🛑 Client-side validation
    if (!username.trim()) {
      setMessage("Username is required");
      return;
    }

    if (!password || password.length < 6) {
      setMessage("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await register(username, email, password);

      // 🛡 Defensive response check
      if (!res?.data) {
        throw new Error("Invalid registration response");
      }

      setMessage(res.data);

      // 🚀 Redirect after success
      setTimeout(() => window.location.href="/login/", 1000);

    } catch (error) {
      console.error("Register error:", error);

      let errorMessage = "Something went wrong. Please try again.";

      if (error.response) {
        errorMessage =
          error.response.data?.message ||err.response.data?.errors?.email||err.response.data?.errors?.password||err.response.data?.errors?.username||
          error.response.data ||
          errorMessage;
      } else if (error.request) {
        errorMessage = "Server not reachable. Please try again.";
      } else {
        errorMessage = error.message;
      }

      setMessage(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>

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
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
          {loading ? "Registering..." : "Register"}
        </button>
      </form>

      <br />

      {message && <p className="feedback">{message}</p>}
    </div>
  );
}

export default Register;
