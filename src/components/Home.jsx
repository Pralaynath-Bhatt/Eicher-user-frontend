function Home(){
    return(
        <div>
            <h1>Welcome to my login page</h1>
        </div>
    );
}
export default Home;


// import React, { useState } from "react";
// import { login } from "./Auth";
// import { Link } from "react-router-dom";
// import axios from "axios";

// function Home() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [message, setMessage] = useState({});

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.get("http://localhost:8080/api/auth/hii");
//       setMessage(res.data);
//     } catch(error) {
//       setMessage(error.response.data);
//       alert(error.response.data);
//     }
//   };

//   return (
//     <div> 
//       <h2>Login</h2>

//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="Username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           required
//         />

//         <br /><br />

//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />

//         <br /><br />

//         <button type="submit">Login</button>
        
//       </form><br /><br />
//       <Link to="/auth/forgotpass">Forgot Password</Link>        
//       <p>{message.username}</p>
//     </div>
//   );
// }

// export default Home;
