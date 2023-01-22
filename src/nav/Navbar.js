import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import Image from "../assets/logo1.png";

const Navbar = () => {

  const logout = () => {
    localStorage.clear();
    window.location.href = '/';
    console.log("logout");
  }
  return (
    <div className="navContainer">
      <div className="app-title">
        <img src={Image} alt="logo" className="gkv-logo" />
      </div>
      <div className="nav-footer">
        <Link to="/" className="nav-home ">
          Home
        </Link>
        <Link to="/course" className="nav-course  ">
          Course
        </Link>
        <Link to="/class" className="nav-data  ">
          Class Data
        </Link>
        <Link to="/attendance" className="nav-download  ">
          Download Attendance
        </Link>
        <Link to="/create-course" className="nav-create  ">
          Create Course
        </Link>
      </div>
      <div className="user-name">
        <select className="logout">
          <option style={{ color: "black" }}>
            Hi {localStorage.getItem("name")}
          </option>

        </select>

      </div>
    </div>
  );
};

export default Navbar;
