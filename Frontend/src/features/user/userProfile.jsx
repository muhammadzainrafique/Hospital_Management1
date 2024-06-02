import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useGetDoctorQuery, useUpdateDoctorMutation } from "../doctor/doctorApiSlice";
import { useGetPaitentQuery, useUpdatePaitentMutation } from "../paitent/paitentApiSlice";

export default function UserProfile() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const { userId, role } = useSelector((state) => state.auth);
  const { data, isSuccess } = role==="doctor"? useGetDoctorQuery(userId):useGetPaitentQuery(userId);
  const navigate = useNavigate();
  const [
    updateDoctor,
    {
      isLoading: isUpdateLoading,
      isError,
      error,
      isSuccess: isUpdateSuccess,
      data: updateData,
    },
  ] = useUpdateDoctorMutation();
  const [
    updatePaitent,
    {
      isLoading: isPaitetnUpdateLoading,
      isError: isPaitentError,
      error:paitentError,
      isSuccess: isUpdatePaitentSuccess,
      data: updatePaitentData,
    },
  ] = useUpdatePaitentMutation();
  useEffect(() => {
    if (isSuccess || isUpdatePaitentSuccess) {
      const { username, name, email } = data?.Message
      setUsername(username);
      setName(name);
      setEmail(email)
    }
  }, [isSuccess, isUpdatePaitentSuccess]);
  useEffect(() => {
    if (isError || isPaitentError) {
      console.log(error?.data || paitentError?.data);
    }
    if (isUpdateSuccess || isUpdatePaitentSuccess) {
      alert("Profile Updated Successfully");
      navigate("/")
    }
  }, [isUpdateSuccess, isError, error, isPaitentError, isUpdatePaitentSuccess]);
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    const data = { username, name, password };
    if(role==="doctor") await updateDoctor({ userId, data });
    if(role==="paitent") await updatePaitent({ userId, data });
  };
  const content = (
    <div className="user-profile">
      <h1 className="text-center">Here is User profile</h1>
      <div className="form-container">
        <h2 className="text-md text-center">User Profile</h2>
        <form onSubmit={handleUpdateProfile}>
          <div className="form-group">
            <label className="form-label" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              placeholder="Enter name"
              className="form-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
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
            />
          </div>
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
            />
          </div>
          <button className="btn btn-primary">Update Profile</button>
        </form>
      </div>
    </div>
  );
  return content;
}
