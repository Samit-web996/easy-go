import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {toast} from "react-toastify" ;
import 'react-toastify/dist/ReactToastify.css';
import './login.css'
//  import {Link} from 'react-router-dom'
//  import Signup from "./signUp";


function Login() {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();

  const postdata = async () => {
    if (!username || !password) {
      toast.error("All field are required !!!", {
        position : "top-right",
        autoClose : 2000
      });
      return;
    }
    try{

    let data = { username, password };

    const res = await fetch("http://localhost:3006/login", {
      method: "POST",
      headers: {"Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    console.log(res.status , result);
    if(res.ok) {
      toast.success(result.message || "Login successful...", {
        position:"top-right",
        autoClose: 2000,
      });
      navigate("/admin")
    }else{

    toast.error(result.message || "Invalid credentials ", {
      position:"top-right",
      autoClose: 2000
    });   
    }
    } catch (error){
      console.error("fetch",error);
      toast.error("Something went wrong. Please try again later.", {
        position:"top-right",
        autoClose: 2000
      });
    }

    // clear form
    setusername("");
    setpassword("");
  };

  return (
    <div className="page">
      <div className="box">
        <h2 className="title">Admin Log In</h2>
{/* <h1 className=""></h1> */}

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
  )
    };



export default Login;