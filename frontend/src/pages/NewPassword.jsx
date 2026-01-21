import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./NewPassword.css";
import password_icon from "../Components/Assets/password.png";

const NewPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
  setError("");
  setSuccess("");

  if (!password || !confirmPassword) {
    setError("All fields are required.");
    return;
  }

  if (password.length < 8) {
    setError("Password must be at least 8 characters.");
    return;
  }

  if (password !== confirmPassword) {
    setError("Passwords do not match.");
    return;
  }

  try {
    setLoading(true);

    const res = await fetch(`http://localhost:3000/resetpassword/${token}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Invalid or expired reset link.");
      setPassword("");
      setConfirmPassword("");
      return;
    }

    setSuccess("Password updated successfully!");
    setPassword("");
    setConfirmPassword("");

    setTimeout(() => navigate("/"), 2000);
  } catch (err) {
    console.error("New password error:", err);
    setError("Server error. Please try again.");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="new-password-container">
      <h1 className="new-password-title">Reset Your Password</h1>

      <div className="new-password-card">
        <div className="input-container">
          <img src={password_icon} width={25} height={25} alt="Password" />
          <input
            type="password"
            placeholder="New password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="input-container">
          <img src={password_icon} width={25} height={25} alt="Confirm" />
          <input
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <button
          className="submit-btn"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Updating..." : "Reset Password"}
        </button>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}
      </div>
    </div>
  );
};

export default NewPassword;
