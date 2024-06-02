import React from "react";
import { useGetAllDoctorsQuery } from "../features/doctor/doctorApiSlice";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Doctor() {
  const { isLoading, isError, error, data, isSuccess } =
    useGetAllDoctorsQuery();
  const { userId } = useSelector((state) => state.auth);
  let content;
  const navigate = useNavigate();

  if (isLoading) content = <p>Loading...</p>;
  if (isError) content = <p>{error?.data || "Something Went Wrong"}</p>;

  const handleAppointment = (doctor, event) => {
    event.preventDefault();
    userId ? navigate(`/appointment/new/${doctor._id}`) : navigate("/paitent/auth");
  };

  if (isSuccess) {
    console.log(data);
    content = (
      <div className="doctors-page">
        <h2 className="text-md text-center">Our Doctors</h2>
        <div className="services-list">
          {data?.Message?.length
            ? data?.Message?.map((doctor, index) => (
                <div key={index} className="service-card">
                  <img
                    src="https://media.istockphoto.com/id/1470505351/photo/portrait-of-a-smiling-doctor-holding-glasses-and-a-mobile-phone-at-the-office.jpg?s=612x612&w=0&k=20&c=OQX6SG1K5Mn15e3VEli23NhJSbu5k3j-6Ms5ocqBsHY="
                    alt="doctor img"
                  />
                  <h3 className="service-category">{doctor?.name}</h3>
                  <h3 className="service-category">Heart Specialist</h3>
                  <p style={{marginBottom:'1rem'}} className="text-sm">Experience : {doctor?.experience || 1} Year </p>
                  <Link
                    to=""
                    onClick={(event) => handleAppointment(doctor, event)}
                    className="service-link"
                  >
                    Get Appointment
                  </Link>
                </div>
              ))
            : "No doctors available"}
        </div>
      </div>
    );
  }

  return content;
}
