import React, { useState } from "react";

import "./OfficerLogin.css";

import {
  FaEnvelope,
  FaLock,
  FaArrowLeft,
  FaEye,
  FaEyeSlash,
  FaShieldAlt,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";
import { setCurrentOfficerByEmail } from "./officerSession";

const OfficerLogin = () => {

  const navigate = useNavigate();

  const [showPassword, setShowPassword] =
    useState(false);

  const [formData, setFormData] =
    useState({

      email: "",
      password: "",

    });

  /* ================= HANDLE CHANGE ================= */

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
      e.target.value,

    });

  };

  /* ================= LOGIN ================= */

  const handleLogin = (e) => {

    e.preventDefault();

    if (
      !formData.email ||
      !formData.password
    ) {

      alert(
        "Please fill all fields"
      );

      return;

    }

    if(!formData.email.endsWith("@reportit.com")){

      alert(
        "Officer email must end with @reportit.com"
      );

      return;

    }

    const loggedInOfficer =
      setCurrentOfficerByEmail(formData.email);

    if (!loggedInOfficer) {

      alert(
        "Officer not found. Please contact admin to add this officer account."
      );

      return;

    }

    if(loggedInOfficer.password !== formData.password){

      alert(
        "Incorrect officer password"
      );

      return;

    }

    alert(
      "Officer Login Successful!"
    );

    navigate(
      "/officer-dashboard"
    );

  };

  return (

    <div className="officer-login-container">

      {/* ================= LEFT ================= */}

      <div className="officer-left">

        <img
          src="/splashscreen.jpeg"
          alt="background"
          className="bg-image"
        />

        <div className="overlay"></div>

        <div className="left-content">

          <div className="logo-box">

            <FaShieldAlt className="logo-icon" />

          </div>

          <h1>

            Report
            <span>It</span>

          </h1>

          <p>
Report Crimes & Suspicious Activities

          </p>

        </div>

      </div>

      {/* ================= RIGHT ================= */}

      <div className="officer-right">

        {/* BACK BUTTON */}

        <button
          className="back-btn"
          onClick={() =>
            navigate("/user-type")
          }
        >

          <FaArrowLeft />

        </button>

        <div className="login-card">

          <h1>

            Officer Login

          </h1>

          <p>

            Login using official credentials

          </p>

          <form
            onSubmit={handleLogin}
          >

            {/* EMAIL */}

            <label>

              Official Email

            </label>

            <div className="input-box">

              <FaEnvelope className="input-icon" />

              <input
                type="email"
                name="email"
                placeholder="Enter official email"
                value={formData.email}
                onChange={handleChange}
              />

            </div>

            {/* PASSWORD */}

            <label>

              Password

            </label>

            <div className="input-box">

              <FaLock className="input-icon" />

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                name="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
              />

              <div
                className="eye-icon"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
              >

                {

                  showPassword
                  ? <FaEyeSlash />
                  : <FaEye />

                }

              </div>

            </div>

            {/* FORGOT PASSWORD */}

            <div className="forgot-password">

              Forgot Password?

            </div>

            {/* LOGIN BUTTON */}

            <button
              type="submit"
              className="login-btn"
            >

              Login

            </button>

          </form>

        </div>

      </div>

    </div>

  );

};

export default OfficerLogin;
