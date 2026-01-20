import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ResetPassword.css";
import email_icon from "../Components/Assets/email.png"; // same as login page

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleReset = async () => {
    setError("");
    setSuccess("");

    if (!email) {
      setError("Please enter your email.");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/resetpassword", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim().toLowerCase() }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "User not found");
        return;
      }

      setSuccess("Email Sent!");
      setEmail("");
    } catch (err) {
      console.error("Reset password fetch error:", err);
      setError("Server error. Please try again later.");
    }
  };

  return (
    <div className="reset-title-container">
      <h1 className="reset-title">Forgot Password?</h1>

      <div className="reset-card">
        <div className="input-container">
          <img src={email_icon} width={25} height={25} alt="Email" />
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <button className="submit-btn" onClick={handleReset}>
          Submit
        </button>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        <button
          className="back-login"
          onClick={() => navigate("/")}
        >
          Back to Login
        </button>
      </div>
    </div>
  );
};

export default ResetPassword;
