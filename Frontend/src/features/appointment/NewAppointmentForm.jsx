import React, { useEffect, useState } from "react";
import { useCreateAppointmentMutation } from "./appointmentApiSlice";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export default function NewAppointmentFrom() {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const { userId } = useSelector(state=>state.auth);
  const { id:doctor } = useParams();
  const [message, setMessage] = useState('');
  const [createAppointment, { isLoading, data, isSuccess, isError, error }] =
    useCreateAppointmentMutation();
    
    useEffect(() => {
        if (isLoading) {
          setMessage("Loading...");
        } else if (isSuccess) {
          setMessage("Appointment created successfully!");
        } else if (isError) {
          setMessage(error?.data || "An error occurred");
        } else {
          setMessage("");
        }
      }, [isLoading, isSuccess, isError, error]);
  const handleAppointment = async (e) => {
    e.preventDefault();
    const data = {
        doctor,
        paitent:userId,
        date,
        time
    }
    await createAppointment(data)
  };
  const content = (
    <div className="form-container">
        <p>{message}</p>
      <h2 className="text-md text-center">New Appointment</h2>
      <form onSubmit={handleAppointment}>
        <div className="form-group">
          <label className="form-label" htmlFor="date">
            Date
          </label>
          <input
            type="date"
            placeholder="Enter date"
            className="form-input"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="time">
            Time
          </label>
          <input
            placeholder="Enter time"
            type="time"
            className="form-input"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
        </div>
        <button className="btn btn-primary">Create Appointment</button>
      </form>
    </div>
  );
  return content;
}
