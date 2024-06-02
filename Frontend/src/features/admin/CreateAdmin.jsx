import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCreateAdminMutation } from "./adminApiSlice";

export default function CreateAdmin() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [createAdmin, {
    isLoading,
    isError,
    error,
    isSuccess,
    data
  }] = useCreateAdminMutation();
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
    await createAdmin({name, password, email})
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
