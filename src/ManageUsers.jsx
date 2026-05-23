import React,
{
  useState
}
from "react";

import { useNavigate }
from "react-router-dom";

import "./ManageUsers.css";

import AIChat from "./AIChat";

import {

  FaShieldAlt,
  FaUsers,
  FaUserShield,
  FaClipboardList,
  FaChartBar,
  FaSignOutAlt,
  FaArrowLeft,
  FaSearch,
  FaUserSlash,
  FaUserCheck,
  FaFileAlt,
  FaChartPie,

} from "react-icons/fa";
import { getComplaints } from "./complaintsData";

const defaultUsers = [
  {
    initials:"RS",
    name:"Rahul Sharma",
    fullName:"Rahul Sharma",
    email:"rahul@email.com",
    phone:"+91 98765 55555",
    password:"rahul123",
    status:"Active",
    joined:"2026-05-12",
  },
  {
    initials:"PS",
    name:"Priya Singh",
    fullName:"Priya Singh",
    email:"priya@email.com",
    phone:"+91 98765 66666",
    password:"priya123",
    status:"Active",
    joined:"2026-05-14",
  },
  {
    initials:"AK",
    name:"Amit Kumar",
    fullName:"Amit Kumar",
    email:"amit@email.com",
    phone:"+91 98765 77777",
    password:"amit123",
    status:"Active",
    joined:"2026-05-18",
  },
];

const getStoredUsers = () => {
  const users =
    JSON.parse(
      localStorage.getItem("users")
    ) || [];

  const citizenData =
    JSON.parse(
      localStorage.getItem("citizenData")
    );

  const mergedUsers = users.length > 0 ? users : defaultUsers;

  if(
    citizenData &&
    !mergedUsers.some((user) => user.email === citizenData.email)
  ){
    mergedUsers.unshift({
      id: Date.now(),
      initials:(citizenData.fullName || citizenData.name || "Citizen")
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase())
        .join(""),
      name: citizenData.fullName || citizenData.name || "Citizen",
      fullName: citizenData.fullName || citizenData.name || "Citizen",
      email: citizenData.email,
      phone: citizenData.phone || "",
      password: citizenData.password || "",
      status:"Active",
      joined: citizenData.joined || "",
    });
  }

  localStorage.setItem("users", JSON.stringify(mergedUsers));

  return mergedUsers;
};

const ManageUsers = () => {

  const navigate = useNavigate();

  const [searchTerm,setSearchTerm] =
  useState("");

  const [selectedUser,setSelectedUser] =
  useState(null);

  /* ================= PAGINATION ================= */

  const [currentPage,setCurrentPage] =
  useState(1);

  const usersPerPage = 3;

  /* ================= USERS ================= */

  const complaints = getComplaints();
  const users =
    getStoredUsers().map((user) => ({
      ...user,
      complaints: complaints.filter(
        (complaint) =>
          complaint.citizenEmail === user.email ||
          complaint.citizen === user.name ||
          complaint.citizen === user.fullName
      ).length,
    }));

  /* ================= FILTER ================= */

  const filteredUsers =
  users.filter((user)=>

    [
      user.name,
      user.fullName,
      user.email,
      user.phone,
    ]
    .join(" ")
    .toLowerCase()
    .includes(searchTerm.toLowerCase())

  );

  /* ================= PAGINATION LOGIC ================= */

  const indexOfLastUser =
  currentPage * usersPerPage;

  const indexOfFirstUser =
  indexOfLastUser - usersPerPage;

  const currentUsers =
  filteredUsers.slice(

    indexOfFirstUser,
    indexOfLastUser

  );

  const totalPages =
  Math.ceil(

    filteredUsers.length /
    usersPerPage

  );

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

    <div className="manage-container">

      {/* ================= SIDEBAR ================= */}

      <div className="sidebar">

        <div className="sidebar-top">

          {/* LOGO */}

          <div className="sidebar-logo">

            <FaShieldAlt className="logo-icon" />

            <span>Report<span className="highlight">It</span></span>

          </div>

          <p className="panel-text">

            ADMIN PANEL

          </p>

          {/* MENU */}

          <ul className="sidebar-menu">

            <li
              onClick={() =>
                navigate("/admin-dashboard")
              }
            >

              <FaClipboardList />

              Dashboard

            </li>

            <li className="active-menu">

              <FaUsers />

              Manage Users

            </li>

            <li
              onClick={() =>
                navigate("/manage-officers")
              }
            >

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

            <li
              onClick={() =>
                navigate("/admin-statistics")
              }
            >

              <FaChartPie />

              Statistics

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

      {/* ================= MAIN ================= */}

      <div className="main-content">

        {/* ================= TOPBAR ================= */}

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

              Welcome back,
              Admin !

            </h3>

          </div>

          <div className="topbar-right">

            <div
              className="profile-circle"
              onClick={() =>
                navigate("/admin-profile")
              }
            >

              AD

            </div>

          </div>

        </div>

        {/* ================= CONTENT ================= */}

        <div className="manage-content">

          <h1>

            Manage Users

          </h1>

          {/* SEARCH */}

          <div className="search-box">

            <FaSearch className="search-icon" />

            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e)=>
                setSearchTerm(
                  e.target.value
                )
              }
            />

          </div>

          {/* ================= TABLE ================= */}

          <div className="users-table">

            {/* HEADER */}

            <div className="users-table-header">

              <p>Name</p>
              <p>Email</p>
              <p>Phone</p>
              <p>Complaints</p>
              <p>Status</p>
              <p>Actions</p>

            </div>

            {/* ROWS */}

            {

              currentUsers.map(
                (user,index)=>(

                  <div
                    className="users-table-row"
                    key={index}
                    onClick={() =>
                      setSelectedUser(user)
                    }
                  >

                    {/* NAME */}

                    <div className="user-cell">

                      <div className="user-avatar">

                        {user.initials}

                      </div>

                      <div className="user-info">

                        <h4>

                          {user.name}

                        </h4>

                      </div>

                    </div>

                    {/* EMAIL */}

                    <p className="email-text">

                      {user.email}

                    </p>

                    {/* PHONE */}

                    <p className="email-text">

                      {user.phone}

                    </p>

                    {/* COMPLAINTS */}

                    <p className="complaint-text">

                      {user.complaints}

                    </p>

                    {/* STATUS */}

                    <div>

                      <span

                        className={

                          user.status === "Active"

                          ? "active-badge"

                          : "blocked-badge"

                        }

                      >

                        {user.status}

                      </span>

                    </div>

                    {/* ACTION */}

                    <div className="action-icons">

                      {

                        user.status === "Active"

                        ?

                        <FaUserSlash
                          className="block-icon"
                          onClick={(e) => e.stopPropagation()}
                        />

                        :

                        <FaUserCheck
                          className="unblock-icon"
                          onClick={(e) => e.stopPropagation()}
                        />

                      }

                    </div>

                  </div>

                )
              )

            }

          </div>

          {/* ================= PAGINATION ================= */}

          <div className="pagination">

            <button

              disabled={
                currentPage === 1
              }

              onClick={() =>
                setCurrentPage(
                  currentPage - 1
                )
              }

            >

              Prev

            </button>

            {

              [...Array(totalPages)].map(
                (_,index)=>(

                  <button

                    key={index}

                    className={
                      currentPage === index + 1
                      ? "active-page"
                      : ""
                    }

                    onClick={() =>
                      setCurrentPage(
                        index + 1
                      )
                    }

                  >

                    {index + 1}

                  </button>

                )
              )

            }

            <button

              disabled={
                currentPage === totalPages
              }

              onClick={() =>
                setCurrentPage(
                  currentPage + 1
                )
              }

            >

              Next

            </button>

          </div>

          {

            selectedUser && (

              <div
                className="user-modal-overlay"
                onClick={() => setSelectedUser(null)}
              >

                <div
                  className="user-modal"
                  onClick={(e) => e.stopPropagation()}
                >

                  <button
                    className="user-modal-close"
                    onClick={() => setSelectedUser(null)}
                  >

                    X

                  </button>

                  <div className="user-modal-header">

                    <div className="user-modal-avatar">

                      {selectedUser.initials}

                    </div>

                    <div>

                      <h2>{selectedUser.fullName || selectedUser.name}</h2>

                      <p>{selectedUser.email}</p>

                    </div>

                  </div>

                  <div className="user-detail-grid">

                    <div>
                      <span>Full Name</span>
                      <strong>{selectedUser.fullName || selectedUser.name}</strong>
                    </div>

                    <div>
                      <span>Email</span>
                      <strong>{selectedUser.email}</strong>
                    </div>

                    <div>
                      <span>Phone</span>
                      <strong>{selectedUser.phone || "Not Provided"}</strong>
                    </div>

                    <div>
                      <span>Password</span>
                      <strong>{selectedUser.password || "Not Set"}</strong>
                    </div>

                    <div>
                      <span>Status</span>
                      <strong>{selectedUser.status}</strong>
                    </div>

                    <div>
                      <span>Joined</span>
                      <strong>{selectedUser.joined || "Not Available"}</strong>
                    </div>

                    <div>
                      <span>Total Complaints</span>
                      <strong>{selectedUser.complaints}</strong>
                    </div>

                  </div>

                </div>

              </div>

            )

          }

        </div>

      </div>

      {/* ================= AI CHAT ================= */}

      <AIChat />

    </div>

  );

};

export default ManageUsers;
