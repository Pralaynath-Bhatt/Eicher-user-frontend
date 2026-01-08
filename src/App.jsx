import Login from "./components/Login";
import Register from "./components/Register";
import ForgotPass from "./components/ForgotPass";
import {BrowserRouter,Routes,Route,Link} from 'react-router-dom';


function App() {
  return (
    <BrowserRouter>
          <div>
          <Link to="/login/">Login</Link> | {" "}
          <Link to="/login/register">Register</Link>
          </div>
       <Routes>
  <Route path="/login/" element={<Login/>} />
  <Route path="/login/register" element={<Register />} />
  <Route path="/login/forgotpass" element={<ForgotPass/>} />

</Routes>

    </BrowserRouter>
  );
}

export default App;
