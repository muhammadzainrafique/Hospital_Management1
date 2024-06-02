import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useAuthAdminMutation } from "../auth/authApiSlice";
import { setCredentials } from "../auth/authSlice";

export default function LoginAdmin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, { isLoading, isError, error, data, isSuccess }] =
    useAuthAdminMutation();
  useEffect(() => {
    if (isError) console.log(error);
    if (isSuccess) {
      console.log(data);
      dispatch(setCredentials(data));
      setPassword("");
      navigate("/");
    }
  }, [isError, isSuccess]);
  const handleLogin = async (e) => {
    e.preventDefault();
    console.log(email, password);
    await login({ email, password });
  };
  const content = (
    <div style={{padding:'1rem'}}>
      <div className="form-container">
        <h2 className="text-md text-center">Login Form</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label className="form-label" htmlFor="email">
              Email
            </label>
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
      </div>
    </div>
  );
  return content;
}
