import React, { useState } from "react";
import { login } from "./Auth";
import { Link, useNavigate } from "react-router-dom";
import { setUser,removeUser } from "./redux/loginSlice";
import { useDispatch } from "react-redux";

function Login() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      setMessage("email and password are required");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await login(email, password);
      
      if(res.data.success){

      dispatch(setUser({username:res.data.data.username,userId:res.data.data.id,token:res.data.data.jwt}));
      setMessage(res.data.message)
      console.log("hiii")
      console.log(localStorage.getItem("token"));
     // setTimeout(() => window.location.href="/innovation/", 1000);
      }
    } catch (error) {
    
      let errorMessage = "Something went wrong. Please try again.";

      if (error.response) {
        if(error.response.data?.data!=null&&typeof error.response.data?.data==="object"){
        errorMessage=  Object.values(error.response.data?.data)[0];
      }
        else if(error.response.data?.message){
        errorMessage = error.response.data?.message 
      }
      else {
        errorMessage = "Server not reachable. Please try again later.";
      }
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
      <form onSubmit={handleSubmit}>
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
            
            <legend className="fieldset-legend">Login</legend>

            <label className="label">Email</label>
            <input 
            type="email" 
            className="input" 
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            required />

            <label className="label" >Password</label>
            <input 
            type="password" 
            className="input" 
            placeholder="Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            required
            />

          <button className="btn btn-neutral mt-4" type="submit" disabled={loading}>Login</button>
                <Link className="btn btn-neutral mt-4" to="/login/register" disabled={loading}>Register</Link>
             <Link to="/login/forgotpass">Forgot Password?</Link>
            <br />
            {loading ? "Logging in..." : ""}
            
      {message && <p className="error-message">{message}</p>}
        
      </fieldset>
      </form>
    </div>
  );
}

export default Login;
