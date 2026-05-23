import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

import "./AddOfficer.css";

import AIChat from "./AIChat";

import {

  FaShieldAlt,
  FaUsers,
  FaUserShield,
  FaClipboardList,
  FaChartBar,
  FaSignOutAlt,
  FaArrowLeft,
  FaFileAlt,
  FaSave,

} from "react-icons/fa";

const AddOfficer = () => {

  const navigate = useNavigate();

  const [formData,setFormData] =
  useState({

    initials:"",
    name:"",
    email:"",
    badge:"",
    zone:"",
    active:"",
    status:"Active",

  });

  /* ================= HANDLE CHANGE ================= */

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
      e.target.value,

    });

  };

  /* ================= SAVE ================= */

  const handleSave = () => {

    const officers =

      JSON.parse(
        localStorage.getItem("officers")
      ) || [];

    const newOfficer = {

      id: Date.now(),

      ...formData,

    };

    const updatedOfficers = [

      ...officers,

      newOfficer,

    ];

    localStorage.setItem(

      "officers",

      JSON.stringify(updatedOfficers)

    );

    alert(
      "Officer Added Successfully!"
    );

    navigate("/manage-officers");

  };

  /* ================= LOGOUT ================= */

  const handleLogout = () => {

    const confirmLogout =
    window.confirm(
      "Are you sure you want to logout?"
    );

    if(confirmLogout){

      navigate("/");

    }

  };

  return (

    <div className="dashboard-container">

      {/* SIDEBAR */}

      <div className="sidebar">

        <div className="sidebar-top">

          <div className="sidebar-logo">

            <FaShieldAlt className="logo-icon" />

            <span>Report<span className="highlight">It</span></span>

          </div>

          <p className="panel-text">
            ADMIN PANEL
          </p>

          <ul className="sidebar-menu">

            <li
              onClick={() =>
                navigate("/admin-dashboard")
              }
            >

              <FaClipboardList />

              Dashboard

            </li>

            <li
              onClick={() =>
                navigate("/manage-users")
              }
            >

              <FaUsers />

              Manage Users

            </li>

            <li className="active-menu">

              <FaUserShield />

              Manage Officers

            </li>

            <li
              onClick={() =>
                navigate("/categories")
              }
            >

              <FaFileAlt />

              Categories

            </li>

            <li
              onClick={() =>
                navigate("/admin-reports")
              }
            >

              <FaChartBar />

              Reports

            </li>

          </ul>

        </div>

        {/* LOGOUT */}

        <div
          className="logout"
          onClick={handleLogout}
        >

          <FaSignOutAlt />

          Logout

        </div>

      </div>

      {/* MAIN */}

      <div className="main-content">

        {/* TOPBAR */}

        <div className="topbar">

          <div className="topbar-left">

            <button
              className="back-btn"
              onClick={() =>
                navigate(-1)
              }
            >

              <FaArrowLeft />

            </button>

            <h3>

              Add New Officer

            </h3>

          </div>

          <div className="profile-circle">

            AD

          </div>

        </div>

        {/* CONTENT */}

        <div className="add-content">

          <div className="add-card">

            <h1>

              Add Officer

            </h1>

            {/* INITIALS */}

            <div className="form-group">

              <label>
                Initials
              </label>

              <input
                type="text"
                name="initials"
                placeholder="Eg: RK"
                value={formData.initials}
                onChange={handleChange}
              />

            </div>

            {/* NAME */}

            <div className="form-group">

              <label>
                Officer Name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />

            </div>

            {/* EMAIL */}

            <div className="form-group">

              <label>
                Email
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />

            </div>

            {/* BADGE */}

            <div className="form-group">

              <label>
                Badge ID
              </label>

              <input
                type="text"
                name="badge"
                value={formData.badge}
                onChange={handleChange}
              />

            </div>

            {/* ZONE */}

            <div className="form-group">

              <label>
                Zone
              </label>

              <input
                type="text"
                name="zone"
                value={formData.zone}
                onChange={handleChange}
              />

            </div>

            {/* ACTIVE */}

            <div className="form-group">

              <label>
                Active / Resolved
              </label>

              <input
                type="text"
                name="active"
                value={formData.active}
                onChange={handleChange}
              />

            </div>

            {/* STATUS */}

            <div className="form-group">

              <label>
                Status
              </label>

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
              >

                <option value="Active">
                  Active
                </option>

                <option value="Inactive">
                  Inactive
                </option>

              </select>

            </div>

            {/* BUTTON */}

            <button
              className="save-btn"
              onClick={handleSave}
            >

              <FaSave />

              Add Officer

            </button>

          </div>

        </div>

      </div>

      <AIChat />

    </div>

  );

};

export default AddOfficer;