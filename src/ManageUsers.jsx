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

const ManageUsers = () => {

  const navigate = useNavigate();

  const [searchTerm,setSearchTerm] =
  useState("");

  /* ================= PAGINATION ================= */

  const [currentPage,setCurrentPage] =
  useState(1);

  const usersPerPage = 3;

  /* ================= USERS ================= */

  const users = [

    {
      initials:"RS",
      name:"Rahul Sharma",
      email:"rahul@email.com",
      phone:"+91 98765 55555",
      complaints:3,
      status:"Active",
    },

    {
      initials:"PS",
      name:"Priya Singh",
      email:"priya@email.com",
      phone:"+91 98765 66666",
      complaints:2,
      status:"Active",
    },

    {
      initials:"AK",
      name:"Amit Kumar",
      email:"amit@email.com",
      phone:"+91 98765 77777",
      complaints:1,
      status:"Active",
    },

    {
      initials:"SR",
      name:"Sneha Reddy",
      email:"sneha@email.com",
      phone:"+91 98765 88888",
      complaints:1,
      status:"Active",
    },

    {
      initials:"KM",
      name:"Karan Mehta",
      email:"karan@email.com",
      phone:"+91 98765 99999",
      complaints:1,
      status:"Blocked",
    },

  ];

  /* ================= FILTER ================= */

  const filteredUsers =
  users.filter((user)=>

    user.name
    .toLowerCase()
    .includes(
      searchTerm.toLowerCase()
    )

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

                        <FaUserSlash className="block-icon" />

                        :

                        <FaUserCheck className="unblock-icon" />

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

        </div>

      </div>

      {/* ================= AI CHAT ================= */}

      <AIChat />

    </div>

  );

};

export default ManageUsers;