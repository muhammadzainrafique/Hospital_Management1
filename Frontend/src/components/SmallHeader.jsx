import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const SmallHeader = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showHeader, setShowHeader] = useState(showMenu); // Set initial value of showHeader to showMenu
  const {userId, role} = useSelector(state=>state.auth)
  const toggleMenu = () => {
    setShowMenu(!showMenu);
    setShowHeader(!showMenu); // Toggle showHeader based on the current value of showMenu
  };
  const handleShowHeader = () => {
    setShowHeader(false);
    setShowMenu(!showMenu);
  };

  return (
    <nav>
      <div className="top-header">
        <label className="logo">M.Z.R</label>
        <label onClick={toggleMenu} className="logo">
          {showMenu ? "Close" : "Open"}
        </label>
      </div>
      <div
        style={{ display: showHeader ? "block" : "none" }}
        className="bottom-header"
      >
        <ul>
          <li>
            <Link onClick={handleShowHeader} className="active" to="/">
              Home
            </Link>
          </li>
          <li>
            <Link onClick={handleShowHeader} to="/doctors">
              Doctors
            </Link>
          </li>
          <li>
            <Link onClick={handleShowHeader} to="/about">
              About
            </Link>
          </li>
          <li>
            <Link onClick={handleShowHeader} to="/services">
              Services
            </Link>
          </li>
          <li>
            <Link onClick={handleShowHeader} to="/contact">
              Contact
            </Link>
          </li>
          <div style={{position:'relative'}} className="dropdown">
          {userId && (
            <>
              <Link style={{color:'white'}} className="dropbtn">Important Links</Link>
              <div style={{position:'absolute', left:'30%'}} className="dropdown-content">
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
              </div>
            </>
          )}
                <button onClick={handleShowHeader} >Logout</button>
              </div>
            </>
          )}
        </div>

          {role ? (
            <Link onClick={handleShowHeader} to="/paitent/auth">
            <button className="btn btn-secondry">logout</button>
          </Link>
            
          ) : (
            <Link onClick={handleShowHeader} to="/login">
              <button className="btn btn-secondry">Login</button>
            </Link>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default SmallHeader;
