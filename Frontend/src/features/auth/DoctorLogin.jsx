import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthDoctorMutation } from "./authApiSlice";
import { useDispatch } from "react-redux";
import { setCredentials } from "./authSlice";

export default function DoctorLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, { isLoading, isError, error, data, isSuccess }] =
    useAuthDoctorMutation();
  useEffect(() => {
    if (isError) console.log(error);
    if (isSuccess) {
      console.log(data);
      dispatch(setCredentials(data));
      setUsername("");
      setPassword("");
      navigate("/");
    }
  }, [isError, isSuccess]);
  const handleLogin = async (e) => {
    e.preventDefault();
    console.log(username, password);
    await login({ username, password });
  };
  const content = (
    <div style={{padding:'1rem'}}>
      <div className="form-container">
        <h2 className="text-md text-center">Login Form</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label className="form-label" htmlFor="username">
              Username
            </label>
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
            <label className="form-label" htmlFor="password">
              Password
            </label>
            <input
              placeholder="Enter password"
              type="password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className="btn btn-primary">Login</button>
        </form>
        <p className="text-sm text-center">or</p>
        <p className="text-center">
          <Link to={"/register"}>Create New Account</Link>
        </p>
      </div>
    </div>
  );
  return content;
}
