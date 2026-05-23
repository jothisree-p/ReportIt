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

const AdminReports = () => {

  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const reportsPerPage = 3;

  const officers = JSON.parse(localStorage.getItem("officers")) || [];

  const [complaints, setComplaints] = useState(
    JSON.parse(localStorage.getItem("complaints")) || [
      { id:"CMP-2024-001", citizen:"Rahul Sharma",  category:"Theft",        zone:"Zone A", date:"12 May 2026", status:"Pending",  assignedOfficer:"" },
      { id:"CMP-2024-002", citizen:"Priya Singh",   category:"Accident",     zone:"Zone B", date:"14 May 2026", status:"Pending",  assignedOfficer:"" },
      { id:"CMP-2024-003", citizen:"Sneha Reddy",   category:"Street Crime", zone:"Zone C", date:"18 May 2026", status:"Assigned", assignedOfficer:"Inspector Patel" },
      { id:"CMP-2024-004", citizen:"Karan Mehta",   category:"Robbery",      zone:"Zone D", date:"20 May 2026", status:"Pending",  assignedOfficer:"" },
      { id:"CMP-2024-005", citizen:"Aditi Sharma",  category:"Cyber Crime",  zone:"Zone A", date:"22 May 2026", status:"Assigned", assignedOfficer:"Officer Verma" },
    ]
  );

  useEffect(() => {
    localStorage.setItem("complaints", JSON.stringify(complaints));
  }, [complaints]);

  const indexOfLast  = currentPage * reportsPerPage;
  const indexOfFirst = indexOfLast - reportsPerPage;
  const currentReports = complaints.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(complaints.length / reportsPerPage);

  const handleAssign = (id, name) => {
    setComplaints(complaints.map(item =>
      item.id === id
        ? { ...item, assignedOfficer: name, status: name ? "Assigned" : "Pending" }
        : item
    ));
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
                  <p className="zone-text">{item.zone}</p>
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