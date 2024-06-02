import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCreateDoctorMutation } from "../doctor/doctorApiSlice";

export default function SignUpFormDoctor() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [register, {
    isLoading,
    isError,
    error,
    isSuccess,
    data
  }] = useCreateDoctorMutation();
  useEffect(()=>{
    if(isError){
      console.log(error?.data)
    }
    if(isSuccess){
      navigate('/');
    }
  },[isError, isSuccess])
  const handleSubmit = async (e)=>{
    e.preventDefault();
    await register({name, username, password, email})
  }
  const content = (
    <div className="form-container">
        <h2 className="text-md text-center">Sign Up Form</h2>
        <form action="">
      <div className="form-group">
        <label className="form-label" htmlFor="name">Name</label>
        <input
          type="text"
          placeholder="Enter name"
          className="form-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label className="form-label" htmlFor="email">Email</label>
        <input
          type="email"
          placeholder="Enter email"
          className="form-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label className="form-label" htmlFor="username">Username</label>
        <input
          type="text"
          placeholder="Enter username"
          className="form-input"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label className="form-label" htmlFor="password">Password</label>
        <input
          placeholder="Enter password"
          type="password"
          className="form-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button onClick={handleSubmit} className="btn btn-primary">Sign Up</button>
    </form>
    </div>
  );
  return content;
}
