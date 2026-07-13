import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./login.css";
import useAuthStores from "../store/authStore";
import API from "../api";

function Login() {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const setToken = useAuthStores((state) => state.setToken);
  const navigate = useNavigate();


const postdata = async (e) => {
  if (e) e.preventDefault(); 

  try {
    let data = { username, password };
    
    const res = await API.post('/admin/adminlogin', data);

    if (res.data && res.data.token) {
      setToken(res.data.token);
      toast.success("Login successful");
      navigate("/admin");
    } else {
      toast.error(res.data.message || "Invalid credentials");
    }
    
  } catch (error) {
    console.error(error);
    
    const errorMessage = error.response?.data?.error || error.response?.data?.message || "Server error";
    
    toast.error(errorMessage);
  }
};

    // clear form
    // setusername("");
    // setpassword("");
  

  return (
    <div className="page">
      <div className="box">
        <h2 className="title">Admin LogIn</h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setusername(e.target.value)}
          className="input"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setpassword(e.target.value)}
          className="input"
        />
        <button onClick={postdata} className="button">
          Log In
        </button>
      </div>
    </div>
  );
}

export default Login;
