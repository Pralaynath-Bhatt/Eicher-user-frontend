import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import ForgotPass from "./components/ForgotPass";
import {BrowserRouter,Routes,Route,Link} from 'react-router-dom';


function App() {
  return (
    <BrowserRouter>
          <div><Link to="/user">Innovations</Link> | {" "}
          <Link to="/user/auth/login">Login</Link> | {" "}
          <Link to="/user/auth/register">Register</Link>
          </div>
       <Routes>
  <Route path="/user/" element={<Home />} />
  <Route path="/user/auth/login" element={<Login />} />
  <Route path="/user/auth/register" element={<Register />} />
  <Route path="/user/auth/forgotpass" element={<ForgotPass/>} />

</Routes>

    </BrowserRouter>
  );
}

export default App;
