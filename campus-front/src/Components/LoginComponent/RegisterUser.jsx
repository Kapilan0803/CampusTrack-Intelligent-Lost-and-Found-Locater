import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import '../../LoginView.css';
import { registerNewUser } from '../../Services/LoginService';
import PasswordStrengthMeter from "./PasswordStrengthMeter";
import { FaUser, FaLock, FaEnvelope, FaIdCard, FaUserShield } from "react-icons/fa";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const RegisterUser = () => {
  const [campusUser, setCampusUser] = useState({
    username: "",
    password: "",
    personName: "",
    email: "",
    role: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  let navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const saveUser = (event) => {
    event.preventDefault();
    if (campusUser.password === confirmPassword) {
      registerNewUser(campusUser).then((response) => {
        alert("User is registered successfully...Go For Login");
        navigate('/');
      });
    }
  };

  const onChangeHandler = (event) => {
    event.persist();
    const name = event.target.name;
    const value = event.target.value;
    setCampusUser(values => ({ ...values, [name]: value }));
  };

  const handleValidation = (event) => {
    event.preventDefault();
    let tempErrors = {};
    let isValid = true;

    if (!campusUser.username.trim()) {
      tempErrors.username = "User Name is required";
      isValid = false;
    }
    if (!campusUser.password.trim()) {
      tempErrors.password = "Password is required";
      isValid = false;
    }
    else if (campusUser.password.length < 5 || campusUser.password.length > 10) {
      tempErrors.password = "Password must be 5-10 characters long";
      isValid = false;
    }
    else if (campusUser.password !== confirmPassword) {
      tempErrors.password = "Both the passwords are not matched";
      isValid = false;
    }

    if (!campusUser.personName.trim()) {
      tempErrors.personName = "Personal Name is required";
      isValid = false;
    }
    if (!campusUser.email.trim()) {
      tempErrors.email = "Email is required";
      isValid = false;
    }
    else if (!emailPattern.test(campusUser.email)) {
      tempErrors.email = "Invalid Email Format";
      isValid = false;
    }

    if (!campusUser.role.trim()) {
      tempErrors.role = "Role is required";
      isValid = false;
    }
    if (!confirmPassword.trim()) {
      tempErrors.confirmPassword = "Confirm Password is required";
      isValid = false;
    }
    setErrors(tempErrors);
    if (isValid) {
      saveUser(event);
    }
  };

  const goToLogin = () => {
    navigate('/');
  };

  return (
    <div style={{
      height: "100vh",
      width: "100vw",
      overflow: "hidden",
      position: "fixed",
      top: 0,
      left: 0,
      background: "linear-gradient(135deg, #226b9fff, #1066b7ff)",
      display: "flex"
    }}>
      {/* Left Side - Animated */}
      <div style={{
        flex: 1,
        background: "linear-gradient(135deg, #09454fd8 0%, #608599ff 100%)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px",
        position: "relative",
        overflow: "hidden"
      }}>
        {/* Animated Background Circles */}
        <div style={{
          position: "absolute",
          width: "400px",
          height: "400px",
          background: "rgba(255, 255, 255, 0.2)",
          borderRadius: "50%",
          top: "-100px",
          left: "-100px",
          animation: "float 6s ease-in-out infinite"
        }}></div>
        <div style={{
          position: "absolute",
          width: "300px",
          height: "300px",
          background: "rgba(255, 255, 255, 0.15)",
          borderRadius: "50%",
          bottom: "-80px",
          right: "-80px",
          animation: "float 8s ease-in-out infinite reverse"
        }}></div>

        <style>{`
          @keyframes float {
            0%, 100% {
              transform: translateY(0) scale(1);
            }
            50% {
              transform: translateY(-30px) scale(1.05);
            }
          }
          @keyframes slideInLeft {
            from {
              opacity: 0;
              transform: translateX(-50px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
          @keyframes slideInRight {
            from {
              opacity: 0;
              transform: translateX(50px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
        `}</style>

        <h1 style={{
          fontSize: "3rem",
          fontWeight: "800",
          color: "#ecf3f6ff",
          marginBottom: "15px",
          textShadow: "2px 2px 20px rgba(0, 0, 0, 0.1)",
          position: "relative",
          zIndex: 1,
          animation: "slideInLeft 0.8s ease-out",
          textAlign: "center"
        }}>
          Join Us!
        </h1>
        <p style={{
          fontSize: "1.1rem",
          color: "#f6fafcff",
          textAlign: "center",
          maxWidth: "450px",
          position: "relative",
          zIndex: 1,
          animation: "slideInLeft 1s ease-out",
          lineHeight: 1.6,
          marginBottom: "30px"
        }}>
          Create your account to report and find lost items on campus.
        </p>

        {/* Registration Illustration */}
        <div style={{
          marginTop: "20px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          zIndex: 1
        }}>
          <svg width="320" height="320" viewBox="0 0 320 320" style={{ opacity: 0.9 }}>
            {/* User Profile Circle */}
            <circle cx="160" cy="120" r="50" fill="none" stroke="rgba(255, 255, 255, 0.95)" strokeWidth="8"/>
            
            {/* User Head */}
            <circle cx="160" cy="110" r="20" fill="rgba(255, 255, 255, 0.95)"/>
            
            {/* User Body */}
            <path d="M 130 140 Q 130 150 145 155 L 145 165 Q 160 170 175 165 L 175 155 Q 190 150 190 140 Z" 
                  fill="rgba(255, 255, 255, 0.95)"/>
            
            {/* Document/Form Icon */}
            <rect x="220" y="80" width="70" height="90" rx="5" fill="none" stroke="rgba(255, 255, 255, 0.85)" strokeWidth="5"/>
            <line x1="235" y1="100" x2="275" y2="100" stroke="rgba(255, 255, 255, 0.85)" strokeWidth="3" strokeLinecap="round"/>
            <line x1="235" y1="115" x2="275" y2="115" stroke="rgba(255, 255, 255, 0.85)" strokeWidth="3" strokeLinecap="round"/>
            <line x1="235" y1="130" x2="260" y2="130" stroke="rgba(255, 255, 255, 0.85)" strokeWidth="3" strokeLinecap="round"/>
            <line x1="235" y1="145" x2="270" y2="145" stroke="rgba(255, 255, 255, 0.85)" strokeWidth="3" strokeLinecap="round"/>
            
            {/* Checkmark */}
            <circle cx="255" cy="230" r="30" fill="none" stroke="rgba(255, 255, 255, 0.85)" strokeWidth="5"/>
            <polyline points="240,230 250,240 270,220" fill="none" stroke="rgba(255, 255, 255, 0.85)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
            
            {/* Email Envelope */}
            <rect x="30" y="100" width="70" height="50" rx="4" fill="none" stroke="rgba(255, 255, 255, 0.85)" strokeWidth="5"/>
            <polyline points="30,100 65,130 100,100" fill="none" stroke="rgba(255, 255, 255, 0.85)" strokeWidth="5" strokeLinejoin="round"/>
            
            {/* Shield Icon (Security) */}
            <path d="M 65 200 L 65 180 Q 65 170 80 170 Q 95 170 95 180 L 95 200 Q 95 220 80 230 Q 65 220 65 200 Z" 
                  fill="none" stroke="rgba(255, 255, 255, 0.85)" strokeWidth="5"/>
            <line x1="80" y1="190" x2="80" y2="210" stroke="rgba(255, 255, 255, 0.85)" strokeWidth="4" strokeLinecap="round"/>
            
            {/* Stars/Sparkles */}
            <path d="M 150 230 L 152 237 L 159 239 L 152 241 L 150 248 L 148 241 L 141 239 L 148 237 Z" 
                  fill="rgba(255, 255, 255, 0.7)"/>
            <path d="M 190 60 L 192 65 L 197 67 L 192 69 L 190 74 L 188 69 L 183 67 L 188 65 Z" 
                  fill="rgba(255, 255, 255, 0.7)"/>
            <path d="M 110 250 L 112 255 L 117 257 L 112 259 L 110 264 L 108 259 L 103 257 L 108 255 Z" 
                  fill="rgba(255, 255, 255, 0.6)"/>
            
            {/* Decorative dots */}
            <circle cx="120" cy="60" r="5" fill="rgba(255, 255, 255, 0.5)"/>
            <circle cx="200" cy="190" r="4" fill="rgba(255, 255, 255, 0.5)"/>
            <circle cx="140" cy="270" r="4" fill="rgba(255, 255, 255, 0.5)"/>
          </svg>
        </div>
      </div>

      {/* Right Side - Register Form */}
      <div style={{
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #FFFFFF, #FFFFFF)",
        padding: "30px",
        overflow: "auto"
      }}>
        <div style={{
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(10px)",
          padding: "30px 35px",
          borderRadius: "24px",
          width: "100%",
          maxWidth: "420px",
          boxShadow: "0 20px 60px rgba(5, 70, 100, 0.1)",
          border: "1px solid rgba(6, 58, 83, 0.1)",
          animation: "slideInRight 0.8s ease-out"
        }}>
          <h2 style={{
            textAlign: "center",
            marginBottom: "25px",
            fontSize: "2rem",
            fontWeight: "700",
            background: "linear-gradient(135deg, #063a53, #2bb6f0)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text"
          }}>
            New Register
          </h2>

          <div>
            {/* Username */}
            <div style={{ marginBottom: "15px" }}>
              <div style={{
                display: "flex",
                alignItems: "center",
                background: "#F5F5F5",
                borderRadius: "12px",
                padding: "10px 15px",
                border: "2px solid #FFFFFF",
                transition: "all 0.3s ease"
              }}>
                <FaUser style={{ color: "#063a53", marginRight: "12px", fontSize: "1rem" }} />
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={campusUser.username}
                  onChange={onChangeHandler}
                  style={{
                    border: "none",
                    outline: "none",
                    flex: 1,
                    background: "transparent",
                    fontSize: "0.9rem"
                  }}
                />
              </div>
              {errors.username && <p style={{ color: "#ff0000", fontSize: "0.75rem", marginTop: "3px", marginLeft: "5px" }}>{errors.username}</p>}
            </div>

            {/* Password */}
            <div style={{ marginBottom: "15px" }}>
              <div style={{
                display: "flex",
                alignItems: "center",
                background: "#F5F5F5",
                borderRadius: "12px",
                padding: "10px 15px",
                border: "2px solid #FFFFFF",
                transition: "all 0.3s ease"
              }}>
                <FaLock style={{ color: "#063a53", marginRight: "12px", fontSize: "1rem" }} />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={campusUser.password}
                  onChange={onChangeHandler}
                  style={{
                    border: "none",
                    outline: "none",
                    flex: 1,
                    background: "transparent",
                    fontSize: "0.9rem"
                  }}
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ cursor: "pointer", color: "#063a53" }}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              <PasswordStrengthMeter password={campusUser.password} />
              {errors.password && <p style={{ color: "#ff0000", fontSize: "0.75rem", marginTop: "3px", marginLeft: "5px" }}>{errors.password}</p>}
            </div>

            {/* Confirm Password */}
            <div style={{ marginBottom: "15px" }}>
              <div style={{
                display: "flex",
                alignItems: "center",
                background: "#F5F5F5",
                borderRadius: "12px",
                padding: "10px 15px",
                border: "2px solid #FFFFFF",
                transition: "all 0.3s ease"
              }}>
                <FaLock style={{ color: "#063a53", marginRight: "12px", fontSize: "1rem" }} />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  style={{
                    border: "none",
                    outline: "none",
                    flex: 1,
                    background: "transparent",
                    fontSize: "0.9rem"
                  }}
                />
                <span
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={{ cursor: "pointer", color: "#063a53" }}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              {errors.confirmPassword && <p style={{ color: "#ff0000", fontSize: "0.75rem", marginTop: "3px", marginLeft: "5px" }}>{errors.confirmPassword}</p>}
            </div>

            {/* Full Name */}
            <div style={{ marginBottom: "15px" }}>
              <div style={{
                display: "flex",
                alignItems: "center",
                background: "#F5F5F5",
                borderRadius: "12px",
                padding: "10px 15px",
                border: "2px solid #FFFFFF",
                transition: "all 0.3s ease"
              }}>
                <FaIdCard style={{ color: "#063a53", marginRight: "12px", fontSize: "1rem" }} />
                <input
                  type="text"
                  name="personName"
                  placeholder="Full Name"
                  value={campusUser.personName}
                  onChange={onChangeHandler}
                  style={{
                    border: "none",
                    outline: "none",
                    flex: 1,
                    background: "transparent",
                    fontSize: "0.9rem"
                  }}
                />
              </div>
              {errors.personName && <p style={{ color: "#ff0000", fontSize: "0.75rem", marginTop: "3px", marginLeft: "5px" }}>{errors.personName}</p>}
            </div>

            {/* Email */}
            <div style={{ marginBottom: "15px" }}>
              <div style={{
                display: "flex",
                alignItems: "center",
                background: "#F5F5F5",
                borderRadius: "12px",
                padding: "10px 15px",
                border: "2px solid #FFFFFF",
                transition: "all 0.3s ease"
              }}>
                <FaEnvelope style={{ color: "#063a53", marginRight: "12px", fontSize: "1rem" }} />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={campusUser.email}
                  onChange={onChangeHandler}
                  style={{
                    border: "none",
                    outline: "none",
                    flex: 1,
                    background: "transparent",
                    fontSize: "0.9rem"
                  }}
                />
              </div>
              {errors.email && <p style={{ color: "#ff0000", fontSize: "0.75rem", marginTop: "3px", marginLeft: "5px" }}>{errors.email}</p>}
            </div>

            {/* Role */}
            <div style={{ marginBottom: "20px" }}>
              <div style={{
                display: "flex",
                alignItems: "center",
                background: "#F5F5F5",
                borderRadius: "12px",
                padding: "10px 15px",
                border: "2px solid #FFFFFF",
                transition: "all 0.3s ease"
              }}>
                <FaUserShield style={{ color: "#13065dda", marginRight: "12px", fontSize: "1rem" }} />
                <select
                  name="role"
                  value={campusUser.role}
                  onChange={onChangeHandler}
                  style={{
                    border: "none",
                    outline: "none",
                    flex: 1,
                    background: "transparent",
                    fontSize: "0.9rem",
                    cursor: "pointer"
                  }}
                >
                  <option value="">Select Role</option>
                  <option value="Student">Student</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>
              {errors.role && <p style={{ color: "#ff0000", fontSize: "0.75rem", marginTop: "3px", marginLeft: "5px" }}>{errors.role}</p>}
            </div>

            {/* Register Button */}
            <button
              onClick={handleValidation}
              style={{
                width: "100%",
                padding: "12px",
                background: "linear-gradient(135deg, #4689a9ff)",
                color: "white",
                border: "none",
                borderRadius: "12px",
                fontSize: "1rem",
                fontWeight: "700",
                cursor: "pointer",
                transition: "all 0.4s ease",
                boxShadow: "0 8px 20px rgba(212, 196, 176, 0.4)",
                position: "relative",
                overflow: "hidden"
              }}
              onMouseOver={(e) => {
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow = "0 12px 30px rgba(212, 196, 176, 0.6)";
              }}
              onMouseOut={(e) => {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "0 8px 20px rgba(212, 196, 176, 0.4)";
              }}
            >
              Register
            </button>

            <p style={{
              textAlign: "center",
              color: "#4a5568",
              marginTop: "15px",
              fontSize: "0.85rem"
            }}>
              Already have an account?{" "}
              <span
                onClick={goToLogin}
                style={{
                  color: "#3C5A6E",
                  cursor: "pointer",
                  fontWeight: "bold",
                  textDecoration: "underline"
                }}
              >
                Sign In
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterUser;