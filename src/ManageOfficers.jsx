import React,
{
  useState,
  useEffect
}
from "react";

import { useNavigate }
from "react-router-dom";

import "./ManageOfficers.css";

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
  FaPlus,
  FaEdit,
  FaTrash,
  FaFileAlt,
  FaChartPie,

} from "react-icons/fa";

const defaultOfficers = [

  {
    id:1,
    initials:"RP",
    name:"Ravi Prakash",
    email:"ravi.prakash@reportit.com",
    password:"ravi123",
    badge:"RP-4521",
    position:"Inspector",
    zone:"Zone A",
    active:"12 / 45",
    status:"Active",
  },

  {
    id:2,
    initials:"AV",
    name:"Ananya Verma",
    email:"ananya.verma@reportit.com",
    password:"ananya123",
    badge:"AV-3218",
    position:"Sub Inspector",
    zone:"Zone B",
    active:"8 / 32",
    status:"Active",
  },

  {
    id:3,
    initials:"KD",
    name:"Karan Desai",
    email:"karan.desai@reportit.com",
    password:"karan123",
    badge:"KD-1567",
    position:"Head Constable",
    zone:"Zone C",
    active:"5 / 28",
    status:"Active",
  },

  {
    id:4,
    initials:"NK",
    name:"Nisha Khan",
    email:"nisha.khan@reportit.com",
    password:"nisha123",
    badge:"NK-7843",
    position:"Assistant Commissioner",
    zone:"Zone D",
    active:"0 / 15",
    status:"Inactive",
  },

];

const loadOfficers = () => {
  const storedOfficers =
    JSON.parse(
      localStorage.getItem("officers")
    );

  if(!storedOfficers || storedOfficers.length === 0){
    return defaultOfficers;
  }

  return storedOfficers.map((officer,index) => ({
    ...officer,
    email: officer.email?.endsWith("@reportit.com")
      ? officer.email
      : defaultOfficers[index]?.email || `${officer.initials || "officer"}@reportit.com`,
    password: officer.password || defaultOfficers[index]?.password || "officer123",
    position: officer.position || defaultOfficers[index]?.position || "Officer",
  }));
};

const ManageOfficers = () => {

  const navigate = useNavigate();

  const [searchTerm,setSearchTerm] =
  useState("");

  /* ================= PAGINATION ================= */

  const [currentPage,setCurrentPage] =
  useState(1);

  const officersPerPage = 3;

  /* ================= OFFICERS ================= */

  const [officers,setOfficers] =
  useState(
    loadOfficers()

  );

  /* ================= SAVE ================= */

  useEffect(() => {

    localStorage.setItem(

      "officers",

      JSON.stringify(officers)

    );

  }, [officers]);

  /* ================= FILTER ================= */

  const filteredOfficers =
  officers.filter((officer)=>

    officer.name
    .toLowerCase()
    .includes(
      searchTerm.toLowerCase()
    )

  );

  /* ================= PAGINATION LOGIC ================= */

  const indexOfLastOfficer =
  currentPage * officersPerPage;

  const indexOfFirstOfficer =
  indexOfLastOfficer - officersPerPage;

  const currentOfficers =
  filteredOfficers.slice(

    indexOfFirstOfficer,
    indexOfLastOfficer

  );

  const totalPages =
  Math.ceil(

    filteredOfficers.length /
    officersPerPage

  );

  /* ================= DELETE ================= */

  const handleDelete = (id) => {

    const confirmDelete =
    window.confirm(
      "Delete this officer?"
    );

    if(confirmDelete){

      const updatedOfficers =
      officers.filter(

        (item) =>
          item.id !== id

      );

      setOfficers(updatedOfficers);

      alert(
        "Officer deleted!"
      );

    }

  };

  /* ================= LOGOUT ================= */

  const handleLogout = () => {

    const confirmLogout =
    window.confirm(
      "Logout?"
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

          {/* HEADER */}

          <div className="content-header">

            <h1>

              Manage Officers

            </h1>

            <button
              className="add-btn"
              onClick={() =>
                navigate("/add-officer")
              }
            >

              <FaPlus />

              Add Officer

            </button>

          </div>

          {/* SEARCH */}

          <div className="search-box">

            <FaSearch className="search-icon" />

            <input
              type="text"
              placeholder="Search officers..."
              value={searchTerm}
              onChange={(e)=>
                setSearchTerm(
                  e.target.value
                )
              }
            />

          </div>

          {/* TABLE */}

          <div className="officers-table">

            {/* HEADER */}

            <div className="officers-table-header">

              <p>Officer</p>
              <p>Badge</p>
              <p>Zone</p>
              <p>Active / Resolved</p>
              <p>Status</p>
              <p>Actions</p>

            </div>

            {/* ROWS */}

            {

              currentOfficers.map(
                (officer)=>(

                  <div
                    className="officers-table-row"
                    key={officer.id}
                  >

                    {/* OFFICER */}

                    <div
                      className="officer-cell"
                      onClick={() =>
                        navigate(
                          `/officer-details/${officer.id}`
                        )
                      }
                    >

                      <div className="officer-avatar">

                        {officer.initials}

                      </div>

                      <div className="officer-info">

                        <h4>

                          {officer.name}

                        </h4>

                        <p>

                          {officer.email}

                        </p>

                      </div>

                    </div>

                    {/* BADGE */}

                    <p className="badge-text">

                      {officer.badge}

                    </p>

                    {/* ZONE */}

                    <p className="zone-text">

                      {officer.zone}

                    </p>

                    {/* ACTIVE */}

                    <p className="active-count">

                      {officer.active}

                    </p>

                    {/* STATUS */}

                    <span

                      className={

                        officer.status === "Active"

                        ? "active-badge"

                        : "inactive-badge"

                      }

                    >

                      {officer.status}

                    </span>

                    {/* ACTIONS */}

                    <div className="action-icons">

                      <FaEdit
                        className="edit-icon"
                        onClick={() =>
                          navigate(
                            "/edit-officer",
                            {
                              state: officer
                            }
                          )
                        }
                      />

                      <FaTrash
                        className="delete-icon"
                        onClick={() =>
                          handleDelete(
                            officer.id
                          )
                        }
                      />

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

export default ManageOfficers;
