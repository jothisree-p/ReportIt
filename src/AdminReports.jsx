import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminReports.css";
import AIChat from "./AIChat";
import {
  FaShieldAlt,
  FaClipboardList,
  FaUsers,
  FaUserShield,
  FaChartBar,
  FaSignOutAlt,
  FaArrowLeft,
  FaFileAlt,
  FaChartPie,
} from "react-icons/fa";
import {
  getComplaints,
  updateComplaint,
} from "./complaintsData";

const AdminReports = () => {

  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const reportsPerPage = 3;

  const officers = JSON.parse(localStorage.getItem("officers")) || [];

  const [complaints, setComplaints] = useState(getComplaints());

  useEffect(() => {
    localStorage.setItem("complaints", JSON.stringify(complaints));
    localStorage.setItem("officerCases", JSON.stringify(complaints));
  }, [complaints]);

  const indexOfLast  = currentPage * reportsPerPage;
  const indexOfFirst = indexOfLast - reportsPerPage;
  const currentReports = complaints.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(complaints.length / reportsPerPage);

  const handleAssign = (id, name) => {
    const selectedOfficer =
      officers.find((officer) => officer.name === name);

    const updatedComplaints = updateComplaint(id, {
      assignedOfficer: selectedOfficer?.name || "",
      assignedOfficerEmail: selectedOfficer?.email || "",
      status: selectedOfficer ? "Assigned" : "Pending",
    });

    setComplaints(updatedComplaints);
    alert("Officer Assigned Successfully!");
  };

  const handleLogout = () => {
    if(window.confirm("Are you sure you want to logout?")) navigate("/");
  };

  return (

    <div className="reports-container">

      {/* ================= SIDEBAR ================= */}

      <div className="sidebar">
        <div className="sidebar-top">

          <div className="sidebar-logo">
            <FaShieldAlt className="logo-icon" />
            <span>Report<span className="highlight">It</span></span>
          </div>

          <p className="panel-text">Admin Panel</p>

          <ul className="sidebar-menu">
            <li onClick={() => navigate("/admin-dashboard")}><FaClipboardList />Dashboard</li>
            <li onClick={() => navigate("/manage-users")}><FaUsers />Manage Users</li>
            <li onClick={() => navigate("/manage-officers")}><FaUserShield />Manage Officers</li>
            <li onClick={() => navigate("/categories")}><FaFileAlt />Categories</li>
            <li className="active-menu"><FaChartBar />Reports</li>
            <li onClick={() => navigate("/admin-statistics")}><FaChartPie />Statistics</li>
          </ul>

        </div>
        <div className="logout" onClick={handleLogout}><FaSignOutAlt />Logout</div>
      </div>

      {/* ================= MAIN ================= */}

      <div className="main-content">

        <div className="topbar">
          <div className="topbar-left">
            <button className="back-btn" onClick={() => navigate(-1)}><FaArrowLeft /></button>
            <h3>Complaint Reports</h3>
          </div>
          <div className="topbar-right">
            <div className="profile-circle" onClick={() => navigate("/admin-profile")} style={{cursor:"pointer"}}>AD</div>
          </div>
        </div>

        <div className="reports-content">

          <div className="reports-header">
            <h1>Assign Cases</h1>
            <p>Assign complaints to officers and manage investigations</p>
          </div>

          <div className="reports-table">

            <div className="reports-table-header">
              <p>Complaint ID</p>
              <p>Citizen</p>
              <p>Category</p>
              <p>Zone</p>
              <p>Status</p>
              <p>Assigned Officer</p>
              <p>Assign Officer</p>
            </div>

            {currentReports.map((item, index) => (
              <div className="reports-table-row" key={index}>

                <div className="table-cell">
                  <h4 className="complaint-id">{item.id}</h4>
                </div>

                <div className="table-cell">
                  <h4 className="citizen-name">{item.citizen}</h4>
                </div>

                <div className="table-cell">
                  <p className="category-text">{item.category}</p>
                </div>

                <div className="table-cell">
                  <p className="zone-text">{item.zone || "Zone A"}</p>
                </div>

                <div className="table-cell">
                  <span className={item.status === "Assigned" ? "assigned-badge" : "pending-badge"}>
                    {item.status}
                  </span>
                </div>

                <div className="table-cell">
                  <p className="assigned-name">{item.assignedOfficer || "Not Assigned"}</p>
                </div>

                <div className="table-cell">
                  <select
                    className="assign-select"
                    value={item.assignedOfficer}
                    onChange={(e) => handleAssign(item.id, e.target.value)}
                  >
                    <option value="">Select Officer</option>
                    {officers.map(o => (
                      <option key={o.id} value={o.name}>{o.name}</option>
                    ))}
                  </select>
                </div>

              </div>
            ))}

          </div>

          {/* PAGINATION */}
          <div className="pagination">
            <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}>Prev</button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                className={currentPage === i + 1 ? "active-page" : ""}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
            <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)}>Next</button>
          </div>

        </div>

      </div>

      <AIChat />

    </div>

  );

};

export default AdminReports;
