import React, { useState, useEffect } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import {
  FaUserGraduate,
  FaBoxOpen,
  FaClipboardList,
  FaChartBar,
  FaSignOutAlt,
  FaUserCircle,
  FaTachometerAlt
} from "react-icons/fa";
import { getAllStudents } from "../../Services/LoginService";
import { getAllLostItems } from "../../Services/lostItemService";
import { getAllFoundItems } from "../../Services/foundItemService";

const AdminMenu = () => {
  const [studentCount, setStudentCount] = useState(0);
  const [lostItemCount, setLostItemCount] = useState(0);
  const [foundItemCount, setFoundItemCount] = useState(0);
  const [resolvedCount, setResolvedCount] = useState(0);

  useEffect(() => {
    // Fetch student count
    getAllStudents()
      .then((response) => {
        setStudentCount(response.data.length);
      })
      .catch((error) => {
        console.error("Error fetching students:", error);
      });

    // Fetch lost items count
    getAllLostItems()
      .then((response) => {
        setLostItemCount(response.data.length);
      })
      .catch((error) => {
        console.error("Error fetching lost items:", error);
      });

    // Fetch found items count
    getAllFoundItems()
      .then((response) => {
        setFoundItemCount(response.data.length);
        // Assuming resolved count is the found items count (you can adjust logic)
        setResolvedCount(response.data.length);
      })
      .catch((error) => {
        console.error("Error fetching found items:", error);
      });
  }, []);

  const stats = [
    { label: "Total Students", value: studentCount, color: "#3b82f6", icon: <FaUserGraduate /> },
    { label: "Lost Items", value: lostItemCount, color: "#ef4444", icon: <FaClipboardList /> },
    { label: "Found Items", value: foundItemCount, color: "#10b981", icon: <FaBoxOpen /> },
    { label: "Resolved Cases", value: resolvedCount, color: "#f59e0b", icon: <FaChartBar /> }
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#f8f9fa" }}>
      {/* Header */}
      <div
        style={{
          background: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
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
                🔍 Lost & Found - Admin Portal
              </h1>
              <p style={{ color: "#e0e7ff", margin: "5px 0 0 0", fontSize: "0.95rem" }}>
                Manage students, items & reports efficiently
              </p>
            </div>
            
            {/* Profile & Logout Section */}
            <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
              {/* Profile Link */}
              <a 
                href="/personal"
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
                <FaUserCircle size={24} />
                <span>Profile</span>
              </a>

              {/* Logout Button */}
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

      {/* Navbar */}
      <Navbar 
        expand="lg" 
        style={{ 
          backgroundColor: "white",
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          padding: "12px 0"
        }}
      >
        <div style={{ maxWidth: "1400px", margin: "0 auto", width: "100%", padding: "0 20px" }}>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {/* Left side menu */}
            <Nav className="me-auto">
              {/* Dashboard */}
              <Nav.Link 
                href="/AdminMenu" 
                style={{
                  fontWeight: "600",
                  fontSize: "0.95rem",
                  padding: "10px 16px",
                  borderRadius: "8px",
                  margin: "0 4px"
                }}
              >
                <FaTachometerAlt className="me-2" style={{ color: "#3b82f6" }} />
                <b>Dashboard</b>
              </Nav.Link>

              {/* Student Menu */}
              <NavDropdown
                title={
                  <span style={{ fontWeight: "600" }}>
                    <FaUserGraduate className="me-2" style={{ color: "#3b82f6" }} />
                    <b>Students</b>
                  </span>
                }
                id="student-dropdown"
                style={{ margin: "0 4px" }}
              >
                <NavDropdown.Item href="/StudentList">
                  <FaUserGraduate className="me-2 text-info" /> Student List
                </NavDropdown.Item>
              </NavDropdown>

              {/* Lost Item Menu */}
              <NavDropdown
                title={
                  <span style={{ fontWeight: "600" }}>
                    <FaClipboardList className="me-2" style={{ color: "#ef4444" }} />
                    <b>Lost Items</b>
                  </span>
                }
                id="lost-items-dropdown"
                style={{ margin: "0 4px" }}
              >
                <NavDropdown.Item href="/LostItemsubmit">
                  <FaClipboardList className="me-2 text-primary" /> Lost Item Registration
                </NavDropdown.Item>
                <NavDropdown.Item href="/LostItemReport">
                  <FaClipboardList className="me-2 text-success" /> Lost Item List
                </NavDropdown.Item>
                <NavDropdown.Item href="">
                  <FaClipboardList className="me-2 text-warning" /> Lost Item Track
                </NavDropdown.Item>
              </NavDropdown>

              {/* Found Item Menu */}
              <NavDropdown
                title={
                  <span style={{ fontWeight: "600" }}>
                    <FaBoxOpen className="me-2" style={{ color: "#10b981" }} />
                    <b>Found Items</b>
                  </span>
                }
                id="found-items-dropdown"
                style={{ margin: "0 4px" }}
              >
                <NavDropdown.Item href="/FoundItemSubmit">
                  <FaBoxOpen className="me-2 text-info" /> Found Item Submission
                </NavDropdown.Item>
                <NavDropdown.Item href="/FoundItemReport">
                  <FaBoxOpen className="me-2 text-warning" /> Found Item List
                </NavDropdown.Item>
              </NavDropdown>

              {/* Reports Menu */}
              <NavDropdown
                title={
                  <span style={{ fontWeight: "600" }}>
                    <FaChartBar className="me-2" style={{ color: "#8b5cf6" }} />
                    <b>Reports</b>
                  </span>
                }
                id="reports-dropdown"
                style={{ margin: "0 4px" }}
              >
                <NavDropdown.Item href="/LostItemReport">
                  <FaChartBar className="me-2 text-danger" /> Lost Item Report
                </NavDropdown.Item>
                <NavDropdown.Item href="/FoundItemReport">
                  <FaChartBar className="me-2 text-success" /> Found Item Report
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>

            {/* Right side - Empty now, Profile and Logout moved to header */}
            <Nav className="ms-auto">
              {/* Empty - Profile and Logout moved to header */}
            </Nav>
          </Navbar.Collapse>
        </div>
      </Navbar>

      {/* Dashboard Content */}
      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "40px 20px" }}>
        {/* Stats Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "24px",
            marginBottom: "40px"
          }}
        >
          {stats.map((stat, idx) => (
            <div
              key={idx}
              style={{
                background: "white",
                padding: "28px",
                borderRadius: "16px",
                boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
                display: "flex",
                alignItems: "center",
                gap: "20px",
                transition: "transform 0.3s, box-shadow 0.3s",
                border: "1px solid #f1f5f9"
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.12)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.08)";
              }}
            >
              <div
                style={{
                  width: "70px",
                  height: "70px",
                  borderRadius: "16px",
                  background: `${stat.color}15`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: stat.color,
                  fontSize: "1.8rem"
                }}
              >
                {stat.icon}
              </div>
              <div>
                <p style={{ margin: 0, color: "#64748b", fontSize: "0.9rem", fontWeight: "500" }}>
                  {stat.label}
                </p>
                <h3 style={{ margin: "6px 0 0 0", color: "#1e293b", fontSize: "2.2rem", fontWeight: "700" }}>
                  {stat.value}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div
          style={{
            background: "white",
            padding: "35px",
            borderRadius: "16px",
            boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
            marginBottom: "30px",
            border: "1px solid #f1f5f9"
          }}
        >
          <h3 style={{ margin: "0 0 24px 0", color: "#1e293b", fontSize: "1.4rem", fontWeight: "700" }}>
            ⚡ Quick Actions
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px" }}>
            <a
              href="/StudentList"
              style={{
                padding: "24px",
                background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
                color: "white",
                textDecoration: "none",
                borderRadius: "14px",
                textAlign: "center",
                fontWeight: "600",
                fontSize: "1rem",
                transition: "transform 0.3s, box-shadow 0.3s",
                boxShadow: "0 4px 12px rgba(59, 130, 246, 0.3)"
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-3px)";
                e.currentTarget.style.boxShadow = "0 8px 24px rgba(59, 130, 246, 0.4)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(59, 130, 246, 0.3)";
              }}
            >
              👥 Manage Students
            </a>
            <a
              href="/LostItemsubmit"
              style={{
                padding: "24px",
                background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
                color: "white",
                textDecoration: "none",
                borderRadius: "14px",
                textAlign: "center",
                fontWeight: "600",
                fontSize: "1rem",
                transition: "transform 0.3s, box-shadow 0.3s",
                boxShadow: "0 4px 12px rgba(239, 68, 68, 0.3)"
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-3px)";
                e.currentTarget.style.boxShadow = "0 8px 24px rgba(239, 68, 68, 0.4)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(239, 68, 68, 0.3)";
              }}
            >
              📋 Register Lost Item
            </a>
            <a
              href="/FoundItemSubmit"
              style={{
                padding: "24px",
                background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                color: "white",
                textDecoration: "none",
                borderRadius: "14px",
                textAlign: "center",
                fontWeight: "600",
                fontSize: "1rem",
                transition: "transform 0.3s, box-shadow 0.3s",
                boxShadow: "0 4px 12px rgba(16, 185, 129, 0.3)"
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-3px)";
                e.currentTarget.style.boxShadow = "0 8px 24px rgba(16, 185, 129, 0.4)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(16, 185, 129, 0.3)";
              }}
            >
              ✅ Submit Found Item
            </a>
            <a
              href="/LostItemReport"
              style={{
                padding: "24px",
                background: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
                color: "white",
                textDecoration: "none",
                borderRadius: "14px",
                textAlign: "center",
                fontWeight: "600",
                fontSize: "1rem",
                transition: "transform 0.3s, box-shadow 0.3s",
                boxShadow: "0 4px 12px rgba(139, 92, 246, 0.3)"
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-3px)";
                e.currentTarget.style.boxShadow = "0 8px 24px rgba(139, 92, 246, 0.4)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(139, 92, 246, 0.3)";
              }}
            >
              📊 View Reports
            </a>
          </div>
        </div>

        {/* Recent Activity */}
        <div
          style={{
            background: "white",
            padding: "30px",
            borderRadius: "16px",
            boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
            border: "1px solid #f1f5f9"
          }}
        >
          <h3 style={{ margin: "0 0 20px 0", color: "#1e293b", fontSize: "1.3rem", fontWeight: "700" }}>
            📋 Recent Activity
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px", background: "#f8fafc", borderRadius: "10px" }}>
              <span style={{ fontSize: "1.2rem" }}>🔵</span>
              <div>
                <p style={{ margin: 0, fontWeight: "600", color: "#1e293b", fontSize: "0.9rem" }}>New lost item reported</p>
                <p style={{ margin: "2px 0 0 0", color: "#64748b", fontSize: "0.85rem" }}>Blue Backpack - 5 mins ago</p>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px", background: "#f0fdf4", borderRadius: "10px" }}>
              <span style={{ fontSize: "1.2rem" }}>🟢</span>
              <div>
                <p style={{ margin: 0, fontWeight: "600", color: "#1e293b", fontSize: "0.9rem" }}>Found item submitted</p>
                <p style={{ margin: "2px 0 0 0", color: "#64748b", fontSize: "0.85rem" }}>Mobile Phone - 15 mins ago</p>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px", background: "#fffbeb", borderRadius: "10px" }}>
              <span style={{ fontSize: "1.2rem" }}>🟡</span>
              <div>
                <p style={{ margin: 0, fontWeight: "600", color: "#1e293b", fontSize: "0.9rem" }}>Item matched successfully</p>
                <p style={{ margin: "2px 0 0 0", color: "#64748b", fontSize: "0.85rem" }}>Water Bottle returned - 1 hour ago</p>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px", background: "#f8fafc", borderRadius: "10px" }}>
              <span style={{ fontSize: "1.2rem" }}>👤</span>
              <div>
                <p style={{ margin: 0, fontWeight: "600", color: "#1e293b", fontSize: "0.9rem" }}>New student registered</p>
                <p style={{ margin: "2px 0 0 0", color: "#64748b", fontSize: "0.85rem" }}>John Doe - 2 hours ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminMenu;