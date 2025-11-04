import React, { useState, useEffect } from 'react';
import { FaUserCircle, FaEnvelope, FaPhone, FaIdCard, FaUniversity, FaMapMarkerAlt, FaEdit, FaSave, FaTimes, FaClipboardList, FaBoxOpen, FaSearch, FaSignOutAlt, FaTachometerAlt, FaCalendar } from 'react-icons/fa';
import { getUserDetails } from '../../Services/LoginService';

const StudentProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState({
    name: "",
    studentId: "",
    email: "",
    phone: "",
    department: "",
    year: "",
    hostel: "",
    joinDate: ""
  });

  const [editedProfile, setEditedProfile] = useState({...profile});

  const stats = [
    { label: "Lost Items Reported", value: "3", color: "#ef4444", icon: <FaClipboardList /> },
    { label: "Found Items Submitted", value: "2", color: "#10b981", icon: <FaBoxOpen /> },
    { label: "Items Recovered", value: "1", color: "#8b5cf6", icon: <FaSearch /> }
  ];

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await getUserDetails();
        const userData = response.data;
        
        const userProfile = {
          name: userData.personName || "",
          studentId: userData.username || "",
          email: userData.email || "",
          phone: userData.phone || "+1 (555) 123-4567",
          department: userData.department || "Computer Science",
          year: userData.year || "3rd Year",
          hostel: userData.hostel || "Block A, Room 205",
          joinDate: userData.joinDate || "August 2022"
        };
        
        setProfile(userProfile);
        setEditedProfile(userProfile);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user details:", error);
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setProfile({...editedProfile});
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedProfile({...profile});
    setIsEditing(false);
  };

  const handleChange = (field, value) => {
    setEditedProfile({...editedProfile, [field]: value});
  };

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f8f9fa" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "2rem", marginBottom: "10px" }}>⏳</div>
          <p style={{ color: "#64748b", fontSize: "1.1rem" }}>Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#f8f9fa", overflowY: "auto" }}>
      {/* Header */}
      <div
        style={{
          background: "linear-gradient(135deg, #08618eff 0%, #13628dff 100%)",
          padding: "25px 0",
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
        }}
      >
        <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <h1
                style={{
                  color: "white",
                  margin: 0,
                  fontSize: "2rem",
                  fontWeight: "700",
                  textShadow: "2px 2px 8px rgba(0,0,0,0.3)"
                }}
              >
                👤 Student Profile
              </h1>
              <p style={{ color: "#e0e7ff", margin: "5px 0 0 0", fontSize: "0.95rem" }}>
                Manage your account and view your activity
              </p>
            </div>
            
            <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
              <a 
                href="/StudentMenu"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  background: "rgba(255,255,255,0.15)",
                  padding: "8px 16px",
                  borderRadius: "10px",
                  color: "white",
                  textDecoration: "none",
                  fontWeight: "600",
                  transition: "all 0.3s"
                }}
                onMouseOver={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.25)"}
                onMouseOut={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.15)"}
              >
                <FaTachometerAlt size={20} />
                <span>Dashboard</span>
              </a>
              <a 
                href="/"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  background: "rgba(239, 68, 68, 0.9)",
                  padding: "8px 16px",
                  borderRadius: "10px",
                  color: "white",
                  textDecoration: "none",
                  fontWeight: "600",
                  transition: "all 0.3s"
                }}
                onMouseOver={(e) => e.currentTarget.style.background = "#dc2626"}
                onMouseOut={(e) => e.currentTarget.style.background = "rgba(239, 68, 68, 0.9)"}
              >
                <FaSignOutAlt />
                <span>Logout</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "40px 20px", paddingBottom: "60px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "350px 1fr", gap: "24px" }}>
          
          {/* Left Column - Profile Card */}
          <div>
            <div
              style={{
                background: "white",
                padding: "35px",
                borderRadius: "16px",
                boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
                border: "1px solid #f1f5f9",
                textAlign: "center"
              }}
            >
              <div
                style={{
                  width: "120px",
                  height: "120px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 20px",
                  boxShadow: "0 8px 24px rgba(59, 130, 246, 0.3)"
                }}
              >
                <FaUserCircle size={80} color="white" />
              </div>
              <h2 style={{ margin: "0 0 8px 0", color: "#1e293b", fontSize: "1.5rem", fontWeight: "700" }}>
                {profile.name || "Student"}
              </h2>
              <p style={{ margin: "0 0 6px 0", color: "#64748b", fontSize: "0.9rem" }}>
                <FaIdCard style={{ marginRight: "6px" }} />
                {profile.studentId || "N/A"}
              </p>
              <p style={{ margin: "0 0 20px 0", color: "#64748b", fontSize: "0.9rem" }}>
                <FaUniversity style={{ marginRight: "6px" }} />
                {profile.department || "N/A"}
              </p>

              <div
                style={{
                  padding: "12px",
                  background: "#f1f5f9",
                  borderRadius: "10px",
                  marginBottom: "20px"
                }}
              >
                <p style={{ margin: "0 0 4px 0", fontSize: "0.85rem", color: "#64748b" }}>Member Since</p>
                <p style={{ margin: 0, fontSize: "1rem", color: "#1e293b", fontWeight: "600" }}>
                  <FaCalendar style={{ marginRight: "6px" }} />
                  {profile.joinDate || "N/A"}
                </p>
              </div>

              {!isEditing && (
                <button
                  onClick={handleEdit}
                  style={{
                    width: "100%",
                    padding: "12px",
                    background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
                    color: "white",
                    border: "none",
                    borderRadius: "10px",
                    fontWeight: "600",
                    cursor: "pointer",
                    fontSize: "0.95rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    transition: "all 0.3s"
                  }}
                  onMouseOver={(e) => e.currentTarget.style.transform = "translateY(-2px)"}
                  onMouseOut={(e) => e.currentTarget.style.transform = "translateY(0)"}
                >
                  <FaEdit /> Edit Profile
                </button>
              )}
            </div>
          </div>

          {/* Right Column */}
          <div>
            {/* Personal Information */}
            <div
              style={{
                background: "white",
                padding: "35px",
                borderRadius: "16px",
                boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
                border: "1px solid #f1f5f9",
                marginBottom: "24px"
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
                <h3 style={{ margin: 0, color: "#1e293b", fontSize: "1.3rem", fontWeight: "700" }}>
                  📋 Personal Information
                </h3>
                {isEditing && (
                  <div style={{ display: "flex", gap: "10px" }}>
                    <button
                      onClick={handleSave}
                      style={{
                        padding: "8px 16px",
                        background: "#10b981",
                        color: "white",
                        border: "none",
                        borderRadius: "8px",
                        fontWeight: "600",
                        cursor: "pointer",
                        fontSize: "0.9rem",
                        display: "flex",
                        alignItems: "center",
                        gap: "6px"
                      }}
                    >
                      <FaSave /> Save
                    </button>
                    <button
                      onClick={handleCancel}
                      style={{
                        padding: "8px 16px",
                        background: "#64748b",
                        color: "white",
                        border: "none",
                        borderRadius: "8px",
                        fontWeight: "600",
                        cursor: "pointer",
                        fontSize: "0.9rem",
                        display: "flex",
                        alignItems: "center",
                        gap: "6px"
                      }}
                    >
                      <FaTimes /> Cancel
                    </button>
                  </div>
                )}
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                <div>
                  <label style={{ display: "block", color: "#64748b", fontSize: "0.85rem", marginBottom: "6px", fontWeight: "600" }}>
                    Full Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedProfile.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      style={{
                        width: "100%",
                        padding: "10px",
                        border: "2px solid #e2e8f0",
                        borderRadius: "8px",
                        fontSize: "0.95rem"
                      }}
                    />
                  ) : (
                    <p style={{ margin: 0, color: "#1e293b", fontSize: "1rem", fontWeight: "600" }}>{profile.name || "N/A"}</p>
                  )}
                </div>

                <div>
                  <label style={{ display: "block", color: "#64748b", fontSize: "0.85rem", marginBottom: "6px", fontWeight: "600" }}>
                    Student ID
                  </label>
                  <p style={{ margin: 0, color: "#1e293b", fontSize: "1rem", fontWeight: "600" }}>{profile.studentId || "N/A"}</p>
                </div>

                <div>
                  <label style={{ display: "block", color: "#64748b", fontSize: "0.85rem", marginBottom: "6px", fontWeight: "600" }}>
                    <FaEnvelope style={{ marginRight: "4px" }} /> Email
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={editedProfile.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      style={{
                        width: "100%",
                        padding: "10px",
                        border: "2px solid #e2e8f0",
                        borderRadius: "8px",
                        fontSize: "0.95rem"
                      }}
                    />
                  ) : (
                    <p style={{ margin: 0, color: "#1e293b", fontSize: "1rem", fontWeight: "600" }}>{profile.email || "N/A"}</p>
                  )}
                </div>

                <div>
                  <label style={{ display: "block", color: "#64748b", fontSize: "0.85rem", marginBottom: "6px", fontWeight: "600" }}>
                    <FaPhone style={{ marginRight: "4px" }} /> Phone
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={editedProfile.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      style={{
                        width: "100%",
                        padding: "10px",
                        border: "2px solid #e2e8f0",
                        borderRadius: "8px",
                        fontSize: "0.95rem"
                      }}
                    />
                  ) : (
                    <p style={{ margin: 0, color: "#1e293b", fontSize: "1rem", fontWeight: "600" }}>{profile.phone || "N/A"}</p>
                  )}
                </div>

                <div>
                  <label style={{ display: "block", color: "#64748b", fontSize: "0.85rem", marginBottom: "6px", fontWeight: "600" }}>
                    Department
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedProfile.department}
                      onChange={(e) => handleChange('department', e.target.value)}
                      style={{
                        width: "100%",
                        padding: "10px",
                        border: "2px solid #e2e8f0",
                        borderRadius: "8px",
                        fontSize: "0.95rem"
                      }}
                    />
                  ) : (
                    <p style={{ margin: 0, color: "#1e293b", fontSize: "1rem", fontWeight: "600" }}>{profile.department || "N/A"}</p>
                  )}
                </div>

                <div>
                  <label style={{ display: "block", color: "#64748b", fontSize: "0.85rem", marginBottom: "6px", fontWeight: "600" }}>
                    Year
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedProfile.year}
                      onChange={(e) => handleChange('year', e.target.value)}
                      style={{
                        width: "100%",
                        padding: "10px",
                        border: "2px solid #e2e8f0",
                        borderRadius: "8px",
                        fontSize: "0.95rem"
                      }}
                    />
                  ) : (
                    <p style={{ margin: 0, color: "#1e293b", fontSize: "1rem", fontWeight: "600" }}>{profile.year || "N/A"}</p>
                  )}
                </div>

                <div style={{ gridColumn: "1 / -1" }}>
                  <label style={{ display: "block", color: "#64748b", fontSize: "0.85rem", marginBottom: "6px", fontWeight: "600" }}>
                    <FaMapMarkerAlt style={{ marginRight: "4px" }} /> Hostel Address
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedProfile.hostel}
                      onChange={(e) => handleChange('hostel', e.target.value)}
                      style={{
                        width: "100%",
                        padding: "10px",
                        border: "2px solid #e2e8f0",
                        borderRadius: "8px",
                        fontSize: "0.95rem"
                      }}
                    />
                  ) : (
                    <p style={{ margin: 0, color: "#1e293b", fontSize: "1rem", fontWeight: "600" }}>{profile.hostel || "N/A"}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Activity Stats */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "16px",
                marginBottom: "24px"
              }}
            >
              {stats.map((stat, idx) => (
                <div
                  key={idx}
                  style={{
                    background: "white",
                    padding: "20px",
                    borderRadius: "12px",
                    boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
                    border: "1px solid #f1f5f9",
                    textAlign: "center"
                  }}
                >
                  <div
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "12px",
                      background: `${stat.color}15`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: stat.color,
                      fontSize: "1.5rem",
                      margin: "0 auto 12px"
                    }}
                  >
                    {stat.icon}
                  </div>
                  <h3 style={{ margin: "0 0 4px 0", color: "#1e293b", fontSize: "1.8rem", fontWeight: "700" }}>
                    {stat.value}
                  </h3>
                  <p style={{ margin: 0, color: "#64748b", fontSize: "0.85rem", fontWeight: "500" }}>
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;