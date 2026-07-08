import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./login.css";
import useAuthStores from "../store/authStore";
//  import {Link} from 'react-router-dom'
//  import Signup from "./signUp";

function Login() {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const setToken = useAuthStores((state) => state.setToken);
  const navigate = useNavigate();

  const postdata = async () => {
    // if (!username || !password) {
    //   toast.error("All field are required !!!", {
    //     position: "top-right",
    //     autoClose: 2000,
    //   });
    //   return;
    // }
    try {
    let data = { username, password };

    const res = await fetch("http://localhost:3006/admin/adminlogin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials : 'include',
      body: JSON.stringify(data),
    });

    const data1 = await res.json();

    if (res.ok && data1.token) {
      setToken(data1.token);
      toast.success("Login successful");
      navigate("/admin");
    } else {
      toast.error(data1.message || "Invalid credentials");
    }
  } catch (error) {
    console.error(error);
    toast.error("Server error");
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
