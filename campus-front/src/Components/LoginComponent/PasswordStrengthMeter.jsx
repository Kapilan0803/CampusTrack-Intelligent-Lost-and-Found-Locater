import React from "react";
import "./../../LoginView.css"; // reuse your same CSS

const getStrength = (password) => {
  let score = 0;

  if (password.length >= 6) score++;            // length check
  if (/[A-Z]/.test(password)) score++;          // uppercase
  if (/[0-9]/.test(password)) score++;          // number
  if (/[^A-Za-z0-9]/.test(password)) score++;   // special char

  if (score <= 1) return { label: "Weak", color: "red", level: 25 };
  if (score === 2) return { label: "Medium", color: "orange", level: 50 };
  if (score === 3) return { label: "Good", color: "#ffcc00", level: 75 };
  return { label: "Strong", color: "green", level: 100 };
};

const PasswordStrengthMeter = ({ password }) => {
  if (!password) return null;
  const { label, color, level } = getStrength(password);

  return (
    <div className="password-strength-container">
      <div className="strength-bar">
        <div
          className="strength-fill"
          style={{ width: `${level}%`, backgroundColor: color }}
        ></div>
      </div>
      <p className="strength-text">Strength: {label}</p>
      <p className="strength-hint">
        Hint: Use uppercase letters, numbers, and special characters.
      </p>
    </div>
  );
};

export default PasswordStrengthMeter;
