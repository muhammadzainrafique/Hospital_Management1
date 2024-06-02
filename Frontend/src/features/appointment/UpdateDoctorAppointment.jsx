import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useUpdateAppointmentStatusMutation } from "./appointmentApiSlice";
import { useSelector } from "react-redux";

export default function UpdateDoctorsAppointment() {
    const { name, status:preStatus, id} = useParams();
    const [status, setStatus] = useState(preStatus);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const {userId} = useSelector(state=>state.auth);
    const [updateAppointmentStatus,{
        isLoading, isSuccess
    }] = useUpdateAppointmentStatusMutation();
    const handleUpdateStatus = async (e)=>{
        e.preventDefault();
        console.log(status);
        await updateAppointmentStatus({id, data:{status}})
    }
    useEffect(()=>{
        if(isLoading)
            setMessage("Loading...")
        if(isSuccess){
            alert("Updated");
            navigate(`/appointment/${userId}`)
        }
    },[isLoading, isSuccess]);
  let content = (
    <div className="update-doctor-appointment">
        <p className="text-md text-center">Updating Appointment's Status</p>
        <div className="form-container">
        <h2 className="text-md text-center">Update Appointment</h2>
        <form onSubmit={handleUpdateStatus}>
      <div className="form-group">
        <label className="form-label" htmlFor="name">Name</label>
        <p>{name}</p>
      </div>
      <div className="form-group">
        <label className="form-label" htmlFor="status">Status</label>
        <select className="form-select" value={status} onChange={(e)=>setStatus(e.target.value)}>
            <option  value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="confirmed">Confirmed</option>
            <option value="cancelled">Cancelled</option>
        </select>
      </div>
      <button className="btn btn-primary">Change Status</button>
    </form>
    </div>
    </div>
  )
  return content;
}
