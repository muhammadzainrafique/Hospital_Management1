import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useUpdateAppointmentStatusMutation } from "./appointmentApiSlice";

function formatDate(date) {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const year = d.getFullYear();
  return `${year}-${month}-${day}`;
}


function formatTime(time) {
  const [hours, minutes] = time.split(':');
  return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`;
}

export default function UpdatePatinentAppointment() {
  const { date: prevDate, status: preStatus, time: prevTime, id } = useParams();
  const [date, setDate] = useState(formatDate(prevDate));
  const [time, setTime] = useState(formatTime(prevTime));
  const [status, setStatus] = useState(preStatus);
  const navigate = useNavigate();
  const { userId } = useSelector((state) => state.auth);
  const [ updateAppointmentStatus, {
    isLoading, 
    isSuccess,
    isError,
    error
  }] = useUpdateAppointmentStatusMutation()
  
  useEffect(()=>{
    if(isSuccess) navigate(`/appointment/${userId}`)
    if(isError) console.log(error?.data) 
  },[isSuccess, isError])
  const handleChangeAppointment = async (e) => {
    e.preventDefault();
    await updateAppointmentStatus({id, data:{status}})
  };

  const content = (
    <div className="update-patitent">
      <h2 className="text-md text-center">Updating patitent's Appointment</h2>
      <div className="form-container">
        <form onSubmit={handleChangeAppointment}>
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
          <div className="form-group">
            <label className="form-label" htmlFor="status">
              Status
            </label>
            <select
              className="form-select"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="pending">Pending</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
          <button className="btn btn-primary">Create Appointment</button>
        </form>
      </div>
    </div>
  );
  return content;
}
