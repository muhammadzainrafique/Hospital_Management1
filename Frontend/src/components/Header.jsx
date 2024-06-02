import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
// import { useLogoutMutation } from "../features/auth/authApiSlice";
import { useLogoutMutation } from "../features/auth/authApiSlice";

export default function Header() {
  const navigate = useNavigate();
  const { userId, role } = useSelector((state) => state.auth);
  const [logout, { isLoading, isSuccess, isError, error }] =
    useLogoutMutation();
  useEffect(() => {
    if (isSuccess) {
      console.log("success", isSuccess);
      navigate("/");
    }
  }, [isSuccess, navigate]);
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>{error?.data || "Something went wrong"}</p>;
  const handleLogout = async () => {
    await logout();
    console.log("Logged out");
  };

  const content = (
    <nav className="header-nav nav">
      <h2>Logo</h2>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/doctors">Doctors</Link>
        <Link to="/about">About Us</Link>
        {!userId && <Link to="/services">Services</Link>}
        <Link to="/contact">Contact</Link>
        <div className="dropdown">
          {userId && (
            <>
              <Link className="dropbtn">Important Links</Link>
              <div className="dropdown-content">
                { 
                  role!=="admin"?
                  <>
                    <Link to="/user/profile">Profile</Link>
                    <Link to={`/appointment/${userId}`}>Appointments</Link>
                  </>:
                  <>
                    <Link to="/admin/doctors/all">View All Doctors</Link>
                    <Link to={`/admin/paitent/all`}>View All Paitents</Link>
                    <Link to={`/admin/new`}>Create Admin</Link>
                  </>
                }
                <button onClick={handleLogout}>Logout</button>
              </div>
            </>
          )}
        </div>
      </div>
      {userId ? (
        <button className="btn btn-primary" onClick={handleLogout}>
          Logout
        </button>
      ) : (
        <div className="buttons-group">
          <Link to="/paitent/auth">
            <button className="btn btn-primary">Login</button>
          </Link>
          <Link to="/paitent/register">
            <button className="btn btn-secondary">Sign Up</button>
          </Link>
        </div>
      )}
    </nav>
  );
  return content;
}
