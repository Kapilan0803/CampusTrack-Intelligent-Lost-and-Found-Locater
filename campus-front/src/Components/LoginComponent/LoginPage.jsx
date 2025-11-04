import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { validateUser } from '../../Services/LoginService';

const LoginPage = () => {
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  let navigate = useNavigate();

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const validateLogin = () => {
    let tempErrors = {};
    if (!loginData.username.trim()) {
      tempErrors.username = "Username is required";
    }
    if (!loginData.password.trim()) {
      tempErrors.password = "Password is required";
    }
    
    setErrors(tempErrors);
    
    if (Object.keys(tempErrors).length === 0) {
      validateUser(loginData.username, loginData.password)
        .then((response) => {
          let role = String(response.data);
          console.log(role);
          if (role === "Admin") {
            navigate('/AdminMenu');
          } else if (role === "Student") {
            navigate('/StudentMenu');
          } else {
            alert("Invalid credentials. Please check your username and password.");
          }
        })
        .catch((error) => {
          console.error(error);
          alert("Login failed. Please try again.");
        });
    }
  };

  const registerNewUser = () => {
    // Navigate to register page
    navigate('/register');
  };

  return (
    <div style={{ 
      minHeight: "100vh", 
      height: "100vh",
      width: "100vw",
      background: "linear-gradient(135deg, #08618eff, #13628dff)",
      overflow: "hidden",
      position: "fixed",
      top: 0,
      left: 0,
      display: "flex",
      flexDirection: "column"
    }}>
      {/* Animated Background */}
      <style>{`
        @keyframes float1 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(30px, -30px) rotate(5deg); }
          66% { transform: translate(-20px, 20px) rotate(-5deg); }
        }
        @keyframes float2 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(-25px, 25px) rotate(-8deg); }
          66% { transform: translate(35px, -15px) rotate(8deg); }
        }
        @keyframes float3 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(20px, 30px) rotate(6deg); }
          66% { transform: translate(-30px, -20px) rotate(-6deg); }
        }
        @keyframes float4 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(-35px, -25px) rotate(-10deg); }
          66% { transform: translate(25px, 35px) rotate(10deg); }
        }
        @keyframes float5 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(40px, 20px) rotate(7deg); }
          66% { transform: translate(-15px, -30px) rotate(-7deg); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes fadeInOut {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.5; }
        }
        @keyframes drift {
          0% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-20px) translateX(10px); }
          100% { transform: translateY(0) translateX(0); }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.3); }
        }
        @keyframes wave {
          0%, 100% { transform: translateY(0); }
          25% { transform: translateY(-5px); }
          50% { transform: translateY(0); }
          75% { transform: translateY(5px); }
        }
        .float-item {
          position: absolute;
          opacity: 0.4;
        }
        .particle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: rgba(255, 255, 255, 0.6);
          border-radius: 50%;
        }
      `}</style>

      {/* Floating Icons */}
      <div className="float-item" style={{ top: "10%", left: "5%", animation: "float1 20s ease-in-out infinite" }}>
        <svg width="60" height="60" viewBox="0 0 60 60">
          <rect x="10" y="10" width="35" height="25" rx="2" fill="none" stroke="rgba(255, 255, 255, 0.6)" strokeWidth="2"/>
          <line x1="15" y1="18" x2="40" y2="18" stroke="rgba(255, 255, 255, 0.6)" strokeWidth="1.5"/>
          <line x1="15" y1="23" x2="35" y2="23" stroke="rgba(255, 255, 255, 0.6)" strokeWidth="1"/>
          <line x1="15" y1="28" x2="32" y2="28" stroke="rgba(255, 255, 255, 0.6)" strokeWidth="1"/>
        </svg>
      </div>

      <div className="float-item" style={{ top: "15%", right: "8%", animation: "float2 18s ease-in-out infinite" }}>
        <svg width="50" height="50" viewBox="0 0 50 50">
          <rect x="10" y="5" width="18" height="30" rx="3" fill="none" stroke="rgba(255, 255, 255, 0.6)" strokeWidth="2"/>
          <circle cx="19" cy="32" r="1.5" fill="rgba(255, 255, 255, 0.6)"/>
          <line x1="14" y1="10" x2="24" y2="10" stroke="rgba(255, 255, 255, 0.6)" strokeWidth="1"/>
        </svg>
      </div>

      <div className="float-item" style={{ top: "70%", left: "10%", animation: "float3 22s ease-in-out infinite" }}>
        <svg width="55" height="55" viewBox="0 0 55 55">
          <circle cx="25" cy="25" r="6" fill="none" stroke="rgba(255, 255, 255, 0.6)" strokeWidth="2"/>
          <line x1="29" y1="29" x2="38" y2="38" stroke="rgba(255, 255, 255, 0.6)" strokeWidth="2" strokeLinecap="round"/>
          <line x1="33" y1="33" x2="33" y2="36" stroke="rgba(255, 255, 255, 0.6)" strokeWidth="2"/>
        </svg>
      </div>

      <div className="float-item" style={{ bottom: "15%", right: "12%", animation: "float4 19s ease-in-out infinite" }}>
        <svg width="50" height="50" viewBox="0 0 50 50">
          <circle cx="20" cy="15" r="6" fill="none" stroke="rgba(255, 255, 255, 0.6)" strokeWidth="2"/>
          <line x1="24" y1="19" x2="32" y2="27" stroke="rgba(255, 255, 255, 0.6)" strokeWidth="2" strokeLinecap="round"/>
          <line x1="26" y1="21" x2="26" y2="25" stroke="rgba(255, 255, 255, 0.6)" strokeWidth="2"/>
          <line x1="29" y1="24" x2="29" y2="27" stroke="rgba(255, 255, 255, 0.6)" strokeWidth="2"/>
        </svg>
      </div>

      <div className="float-item" style={{ top: "45%", left: "3%", animation: "float5 21s ease-in-out infinite" }}>
        <svg width="45" height="45" viewBox="0 0 45 45">
          <path d="M 20 10 Q 20 5 23 3 Q 26 5 26 10 Q 23 18 23 25 Q 23 18 20 10 Z" 
                fill="none" stroke="rgba(255, 255, 255, 0.6)" strokeWidth="2"/>
          <circle cx="23" cy="8" r="2" fill="rgba(255, 255, 255, 0.6)"/>
        </svg>
      </div>

      <div className="float-item" style={{ top: "55%", right: "5%", animation: "float1 23s ease-in-out infinite" }}>
        <svg width="50" height="50" viewBox="0 0 50 50">
          <rect x="12" y="12" width="25" height="15" rx="2" fill="none" stroke="rgba(255, 255, 255, 0.6)" strokeWidth="2"/>
          <line x1="17" y1="17" x2="32" y2="17" stroke="rgba(255, 255, 255, 0.6)" strokeWidth="1.5"/>
          <line x1="17" y1="21" x2="28" y2="21" stroke="rgba(255, 255, 255, 0.6)" strokeWidth="1"/>
        </svg>
      </div>

      <div className="float-item" style={{ bottom: "8%", left: "15%", animation: "float2 24s ease-in-out infinite" }}>
        <svg width="48" height="48" viewBox="0 0 48 48">
          <circle cx="24" cy="24" r="8" fill="none" stroke="rgba(255, 255, 255, 0.6)" strokeWidth="2"/>
          <text x="24" y="30" fontSize="14" fill="rgba(255, 255, 255, 0.6)" textAnchor="middle" fontWeight="bold">?</text>
        </svg>
      </div>

      {/* Pulsing Background Circles */}
      <div style={{ position: "absolute", top: "20%", left: "15%", width: "200px", height: "200px", borderRadius: "50%", background: "radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)", animation: "pulse 8s ease-in-out infinite" }}></div>
      <div style={{ position: "absolute", bottom: "10%", right: "20%", width: "250px", height: "250px", borderRadius: "50%", background: "radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)", animation: "pulse 10s ease-in-out infinite 2s" }}></div>
      <div style={{ position: "absolute", top: "60%", left: "8%", width: "180px", height: "180px", borderRadius: "50%", background: "radial-gradient(circle, rgba(255,255,255,0.09) 0%, transparent 70%)", animation: "pulse 12s ease-in-out infinite 4s" }}></div>

      {/* Twinkling Stars/Dots */}
      <div className="particle" style={{ top: "12%", left: "25%", animation: "twinkle 3s ease-in-out infinite" }}></div>
      <div className="particle" style={{ top: "25%", left: "72%", animation: "twinkle 4s ease-in-out infinite 1s" }}></div>
      <div className="particle" style={{ top: "78%", left: "18%", animation: "twinkle 3.5s ease-in-out infinite 2s" }}></div>
      <div className="particle" style={{ top: "82%", right: "25%", animation: "twinkle 4.5s ease-in-out infinite 0.5s" }}></div>
      <div className="particle" style={{ top: "35%", right: "15%", animation: "twinkle 3.8s ease-in-out infinite 1.5s" }}></div>
      <div className="particle" style={{ top: "50%", left: "12%", animation: "twinkle 4.2s ease-in-out infinite 2.5s" }}></div>
      <div className="particle" style={{ top: "65%", right: "35%", animation: "twinkle 3.3s ease-in-out infinite 1.8s" }}></div>
      <div className="particle" style={{ top: "40%", left: "85%", animation: "twinkle 3.9s ease-in-out infinite 0.8s" }}></div>

      {/* Floating Particles */}
      <div className="particle" style={{ top: "18%", left: "50%", animation: "drift 15s ease-in-out infinite" }}></div>
      <div className="particle" style={{ top: "75%", left: "45%", animation: "drift 18s ease-in-out infinite 3s" }}></div>
      <div className="particle" style={{ top: "30%", left: "90%", animation: "drift 16s ease-in-out infinite 5s" }}></div>
      <div className="particle" style={{ top: "88%", left: "70%", animation: "drift 20s ease-in-out infinite 2s" }}></div>

      {/* Shimmer/Light Rays */}
      <div style={{
        position: "absolute",
        top: "0",
        left: "0",
        right: "0",
        height: "100%",
        background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.03), transparent)",
        animation: "shimmer 8s ease-in-out infinite",
        pointerEvents: "none"
      }}></div>

      {/* Wave Lines */}
      <svg style={{ position: "absolute", bottom: 0, left: 0, width: "100%", height: "150px", opacity: 0.15 }}>
        <path d="M0,75 Q150,50 300,75 T600,75 T900,75 T1200,75 T1500,75 T1800,75 T2100,75" 
              fill="none" 
              stroke="rgba(255,255,255,0.4)" 
              strokeWidth="2"
              style={{ animation: "wave 8s ease-in-out infinite" }}>
        </path>
        <path d="M0,90 Q150,110 300,90 T600,90 T900,90 T1200,90 T1500,90 T1800,90 T2100,90" 
              fill="none" 
              stroke="rgba(255,255,255,0.3)" 
              strokeWidth="2"
              style={{ animation: "wave 10s ease-in-out infinite 1s" }}>
        </path>
      </svg>

      {/* More Floating Icons */}
      <div className="float-item" style={{ top: "32%", right: "25%", animation: "float3 25s ease-in-out infinite" }}>
        <svg width="40" height="40" viewBox="0 0 40 40">
          <rect x="8" y="12" width="24" height="16" rx="2" fill="none" stroke="rgba(255, 255, 255, 0.5)" strokeWidth="1.5"/>
          <path d="M 14 20 L 20 23 L 26 20" fill="none" stroke="rgba(255, 255, 255, 0.5)" strokeWidth="1.5"/>
        </svg>
      </div>

      <div className="float-item" style={{ bottom: "25%", left: "25%", animation: "float4 26s ease-in-out infinite" }}>
        <svg width="45" height="45" viewBox="0 0 45 45">
          <circle cx="22" cy="22" r="8" fill="none" stroke="rgba(255, 255, 255, 0.5)" strokeWidth="2"/>
          <line x1="22" y1="14" x2="22" y2="18" stroke="rgba(255, 255, 255, 0.5)" strokeWidth="2"/>
          <line x1="22" y1="26" x2="22" y2="30" stroke="rgba(255, 255, 255, 0.5)" strokeWidth="2"/>
          <line x1="14" y1="22" x2="18" y2="22" stroke="rgba(255, 255, 255, 0.5)" strokeWidth="2"/>
          <line x1="26" y1="22" x2="30" y2="22" stroke="rgba(255, 255, 255, 0.5)" strokeWidth="2"/>
        </svg>
      </div>

      <div className="float-item" style={{ top: "8%", left: "35%", animation: "float5 23s ease-in-out infinite" }}>
        <svg width="42" height="42" viewBox="0 0 42 42">
          <path d="M 21 10 L 25 18 L 34 19 L 27 26 L 29 35 L 21 30 L 13 35 L 15 26 L 8 19 L 17 18 Z" 
                fill="none" stroke="rgba(255, 255, 255, 0.5)" strokeWidth="1.5"/>
        </svg>
      </div>

      <div className="float-item" style={{ bottom: "35%", right: "8%", animation: "float1 27s ease-in-out infinite" }}>
        <svg width="48" height="48" viewBox="0 0 48 48">
          <rect x="14" y="10" width="20" height="28" rx="2" fill="none" stroke="rgba(255, 255, 255, 0.5)" strokeWidth="2"/>
          <line x1="19" y1="15" x2="29" y2="15" stroke="rgba(255, 255, 255, 0.5)" strokeWidth="1.5"/>
          <line x1="19" y1="20" x2="29" y2="20" stroke="rgba(255, 255, 255, 0.5)" strokeWidth="1.5"/>
          <line x1="19" y1="25" x2="26" y2="25" stroke="rgba(255, 255, 255, 0.5)" strokeWidth="1.5"/>
        </svg>
      </div>

      {/* Main Content Container */}
      <div style={{
        display: "flex",
        flex: 1,
        overflow: "hidden",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        position: "relative",
        zIndex: 10
      }}>
        {/* Left Side - Title Section */}
        <div style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          paddingLeft: "60px",
          paddingRight: "40px"
        }}>
          <h1 style={{
            color: "#e3e9ecff",
            fontSize: "3.5rem",
            fontWeight: "bold",
            margin: 0,
            textShadow: "2px 2px 8px rgba(229, 237, 240, 0.25)",
            marginBottom: "15px",
            textAlign: "center"
          }}>
            🔍 Lost and Found Locator
          </h1>
          <p style={{
            color: "#e8f4f8",
            fontSize: "1.2rem",
            margin: 0,
            marginBottom: "30px",
            textAlign: "center"
          }}>
            Reuniting people with their lost belongings through smart campus tracking
          </p>
          
          {/* Illustration - Centered */}
          <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}>
            <svg width="300" height="300" viewBox="0 0 300 300" style={{ opacity: 0.9 }}>
              {/* Magnifying Glass Circle */}
              <circle cx="120" cy="120" r="60" fill="none" stroke="rgba(255, 255, 255, 0.95)" strokeWidth="8"/>
              
              {/* Question Mark inside magnifying glass */}
              <text x="120" y="140" fontSize="60" fill="rgba(255, 255, 255, 0.95)" textAnchor="middle" fontWeight="bold">?</text>
              
              {/* Magnifying Glass Handle */}
              <line x1="165" y1="165" x2="200" y2="200" stroke="rgba(255, 255, 255, 0.95)" strokeWidth="8" strokeLinecap="round"/>
              
              {/* Phone Icon */}
              <rect x="50" y="200" width="35" height="60" rx="5" fill="none" stroke="rgba(255, 255, 255, 0.85)" strokeWidth="4"/>
              <circle cx="67.5" cy="250" r="3" fill="rgba(255, 255, 255, 0.85)"/>
              <line x1="58" y1="210" x2="77" y2="210" stroke="rgba(255, 255, 255, 0.85)" strokeWidth="2"/>
              
              {/* ID Card Icon */}
              <rect x="180" y="80" width="70" height="45" rx="4" fill="none" stroke="rgba(255, 255, 255, 0.85)" strokeWidth="4"/>
              <line x1="190" y1="95" x2="240" y2="95" stroke="rgba(255, 255, 255, 0.85)" strokeWidth="3" strokeLinecap="round"/>
              <line x1="190" y1="105" x2="230" y2="105" stroke="rgba(255, 255, 255, 0.85)" strokeWidth="2" strokeLinecap="round"/>
              <line x1="190" y1="113" x2="225" y2="113" stroke="rgba(255, 255, 255, 0.85)" strokeWidth="2" strokeLinecap="round"/>
              
              {/* Key Icon */}
              <circle cx="220" cy="190" r="12" fill="none" stroke="rgba(255, 255, 255, 0.85)" strokeWidth="4"/>
              <line x1="228" y1="198" x2="250" y2="220" stroke="rgba(255, 255, 255, 0.85)" strokeWidth="4" strokeLinecap="round"/>
              <line x1="238" y1="208" x2="238" y2="214" stroke="rgba(255, 255, 255, 0.85)" strokeWidth="4" strokeLinecap="round"/>
              <line x1="244" y1="214" x2="244" y2="220" stroke="rgba(255, 255, 255, 0.85)" strokeWidth="4" strokeLinecap="round"/>
              
              {/* Location Pin */}
              <path d="M 140 210 Q 140 195 150 190 Q 160 195 160 210 Q 150 225 150 240 Q 150 225 140 210 Z" 
                    fill="none" stroke="rgba(255, 255, 255, 0.85)" strokeWidth="4"/>
              <circle cx="150" cy="205" r="5" fill="rgba(255, 255, 255, 0.85)"/>
              
              {/* Decorative dots */}
              <circle cx="100" cy="80" r="4" fill="rgba(255, 255, 255, 0.5)"/>
              <circle cx="240" cy="150" r="4" fill="rgba(255, 255, 255, 0.5)"/>
              <circle cx="80" cy="170" r="3" fill="rgba(255, 255, 255, 0.5)"/>
              <circle cx="190" cy="240" r="3" fill="rgba(255, 255, 255, 0.5)"/>
            </svg>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingRight: "60px"
        }}>
          <div style={{
            background: "rgba(188, 198, 208, 0.98)",
            backdropFilter: "blur(6px)",
            padding: "40px",
            borderRadius: "20px",
            width: "100%",
            maxWidth: "450px",
            boxShadow: "0 10px 30px rgba(15, 90, 120, 0.08)",
            border: "1px solid rgba(11, 125, 160, 0.08)"
          }}>
            {/* User Icon */}
            <div style={{
              width: "80px",
              height: "80px",
              background: "rgba(110, 220, 250, 0.12)",
              borderRadius: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: "0 auto 25px",
              backdropFilter: "blur(6px)",
              border: "3px solid #e2e9edff",
              boxShadow: "0 0 20px rgba(66, 173, 225, 0.12)"
            }}>
              <FaUser size={40} color="#0586ad" />
            </div>

            <h2 style={{
              color: "#063a53",
              textAlign: "center",
              marginBottom: "10px",
              fontSize: "2rem",
              fontWeight: "700",
              textShadow: "0 0 6px rgba(137, 210, 236, 0.14)"
            }}>
              Welcome Back
            </h2>
            <p style={{
              color: "rgba(6, 74, 102, 0.75)",
              textAlign: "center",
              marginBottom: "30px",
              fontSize: "0.9rem"
            }}>
              Sign in to access your account
            </p>

            <div>
              {/* Username */}
              <div style={{ marginBottom: "18px" }}>
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  background: "rgba(224, 231, 233, 0.95)",
                  borderRadius: "10px",
                  padding: "12px 15px",
                  border: "2px solid transparent",
                  transition: "all 0.3s"
                }}>
                  <FaUser style={{ color: "#1d8cccff", marginRight: "12px" }} />
                  <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={loginData.username}
                    onChange={handleChange}
                    style={{
                      border: "none",
                      outline: "none",
                      flex: 1,
                      background: "transparent",
                      fontSize: "0.95rem",
                      color: "#054b63"
                    }}
                  />
                </div>
                {errors.username && (
                  <p style={{ color: "#ff6b6b", fontSize: "0.8rem", marginTop: "4px", marginLeft: "5px" }}>
                    {errors.username}
                  </p>
                )}
              </div>

              {/* Password */}
              <div style={{ marginBottom: "20px" }}>
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  background: "rgba(222, 225, 230, 0.95)",
                  borderRadius: "10px",
                  padding: "12px 15px",
                  border: "2px solid transparent",
                  transition: "all 0.3s"
                }}>
                  <FaLock style={{ color: "#2a85e5ff", marginRight: "12px" }} />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    value={loginData.password}
                    onChange={handleChange}
                    style={{
                      border: "none",
                      outline: "none",
                      flex: 1,
                      background: "transparent",
                      fontSize: "0.95rem",
                      color: "#054b63"
                    }}
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    style={{ cursor: "pointer", color: "#B3B3B3" }}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
                {errors.password && (
                  <p style={{ color: "#ff6b6b", fontSize: "0.8rem", marginTop: "4px", marginLeft: "5px" }}>
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Login Button */}
              <button
                onClick={validateLogin}
                style={{
                  width: "100%",
                  padding: "12px",
                  background: "linear-gradient(135deg, #0e4796ff, #2bb6f0)",
                  color: "white",
                  border: "none",
                  borderRadius: "10px",
                  fontSize: "1rem",
                  fontWeight: "700",
                  cursor: "pointer",
                  transition: "all 0.3s",
                  boxShadow: "0 8px 20px rgba(43, 169, 220, 0.18)"
                }}
                onMouseOver={(e) => {
                  e.target.style.transform = "translateY(-2px)";
                  e.target.style.boxShadow = "0 12px 30px rgba(43, 169, 220, 0.22)";
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = "translateY(0)";
                  e.target.style.boxShadow = "0 8px 20px rgba(43, 169, 220, 0.18)";
                }}
              >
                Login
              </button>

              <p style={{
                textAlign: "center",
                color: "rgba(43, 43, 43, 0.7)",
                marginTop: "15px",
                fontSize: "0.9rem"
              }}>
                Don't have an account?{" "}
                <span
                  onClick={registerNewUser}
                  style={{
                    color: "#0e4796ff",
                    fontWeight: "bold",
                    cursor: "pointer",
                    textDecoration: "underline",
                    transition: "all 0.3s"
                  }}
                  onMouseOver={(e) => {
                    e.target.style.color = "#09587cff";
                  }}
                  onMouseOut={(e) => {
                    e.target.style.color = "#0c4977ff";
                  }}
                >
                  Create an account
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;