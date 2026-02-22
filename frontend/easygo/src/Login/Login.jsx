import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './login.css'
//  import {Link} from 'react-router-dom'
//  import Signup from "./signUp";


function Login() {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();

  const postdata = async () => {
    if (!username || !password) {
      alert("All fields are required ❌");
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
      alert("Login Successful 👍");
      navigate("/DashBoard")
    }else{

    alert (result.message || "Invalid credentials ❌")
    }
    } catch (error){
      console.error("fetch",error);
      alert ("server connectin faild")
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