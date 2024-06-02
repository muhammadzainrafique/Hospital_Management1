import { useSelector } from "react-redux";
import {
  useGetAppointmentOfDoctorQuery,
  useGetAppointmentOfPaitentQuery,
} from "./appointmentApiSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function GetAppointments() {
  const navigate = useNavigate();
  const { userId, role } = useSelector((state) => state.auth);
  console.log(role)
  const { isLoading, isError, error, isSuccess, data } =
    useGetAppointmentOfDoctorQuery(userId, {
      skip: role !== "doctor",
    });

  const {
    isLoading: isPaitentLoading,
    isError: isPaitentError,
    error: PaitentError,
    isSuccess: isPaitentSuccess,
    data: PaitentData,
  } = useGetAppointmentOfPaitentQuery(userId, {
    skip: role !== "paitent",
  });

  const [content, setContent] = useState(<p>Loading...</p>);

  useEffect(() => {
    if (isLoading || isPaitentLoading) {
      setContent(<p>Loading...</p>);
      return;
    }

    if (isError) {
      setContent(<p>Error: {error?.message}</p>);
      return;
    }

    if (isPaitentError) {
      setContent(<p>Error: {PaitentError?.message}</p>);
      return;
    }

    if (isSuccess || isPaitentSuccess) {
      setContent(
        <div className="appointments">
          <h1>Here are your Appointments</h1>
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Sr.no</th>
                  {role === "doctor" && <th>Patient Name</th>}
                  {role === "paitent" && <th>Doctor Name</th>}
                  <th>Date</th>
                  <th>Time</th>
                  <th>Status</th>
                  <th>Update</th>
                </tr>
              </thead>
              <tbody>
                {role === "doctor" &&
                  (data?.Message?.length ? (
                    data.Message.map((appointment, index) => (
                      <tr key={index}>
                        <td>{index + 1}.</td>
                        <td>{appointment?.paitent?.name}</td>
                        <td>{appointment?.date}</td>
                        <td>{appointment?.time}</td>
                        <td
                          style={{
                            color:
                              appointment?.status === "completed"
                                ? "green"
                                : appointment?.status === "cancelled"
                                ? "red"
                                : appointment?.status === "confirmed"
                                ? "purple"
                                : "black",
                            fontWeight: "bold",
                          }}
                        >
                          {appointment?.status}
                        </td>
                        <td>
                          <button
                            onClick={() =>
                              navigate(
                                `/appointment/update-doctor/${appointment?._id}/${appointment?.status}/${appointment?.paitent?.name}`
                              )
                            }
                            className="btn btn-primary"
                          >
                            Update
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6">No Appointment found Yet</td>
                    </tr>
                  ))}
                {role === "paitent" &&
                  (PaitentData?.Message?.length ? (
                    PaitentData.Message.map((appointment, index) => (
                      <tr key={index}>
                        <td>{index + 1}.</td>
                        <td>{appointment?.doctor?.name}</td>
                        <td>{appointment?.date}</td>
                        <td>{appointment?.time}</td>
                        <td
                          style={{
                            color:
                              appointment?.status === "completed"
                                ? "green"
                                : appointment?.status === "cancelled"
                                ? "red"
                                : appointment?.status === "confirmed"
                                ? "purple"
                                : "black",
                            fontWeight: "bold",
                          }}
                        >
                          {appointment?.status}
                        </td>
                        <td>
                          <button
                            onClick={() =>
                              navigate(
                                `/appointment/update-patitent/${appointment?._id}/${appointment?.status}/${appointment?.date}/${appointment?.time}`
                              )
                            }
                            className="btn btn-primary"
                          >
                            Update
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6">No Appointment found Yet</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    }
  }, [
    isLoading,
    isPaitentLoading,
    isError,
    error,
    isSuccess,
    data,
    isPaitentError,
    PaitentError,
    isPaitentSuccess,
    PaitentData,
    role,
    navigate,
  ]);

  return content;
}
