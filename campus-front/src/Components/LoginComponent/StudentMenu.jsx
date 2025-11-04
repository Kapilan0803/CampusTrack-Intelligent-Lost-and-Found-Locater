import React, { useEffect, useState } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import {
  FaBoxOpen,
  FaSignOutAlt,
  FaClipboardList,
  FaSearch,
  FaUserCircle,
  FaTachometerAlt
} from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import {
  lostItemListByUser,
} from "../../Services/lostItemService.jsx";
import {
  foundItemListByUser,
} from "../../Services/foundItemService.jsx";

const StudentMenu = () => {
  const [lostCount, setLostCount] = useState(0);
  const [foundCount, setFoundCount] = useState(0);
  const [trackedCount, setTrackedCount] = useState(0);

  // ✅ Fetch counts from backend
  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const lostResponse = await lostItemListByUser();
        const foundResponse = await foundItemListByUser();

        const lostItems = Array.isArray(lostResponse.data)
          ? lostResponse.data.length
          : 0;

        const foundItems = Array.isArray(foundResponse.data)
          ? foundResponse.data.length
          : 0;

        // Example logic for tracked items (customize if needed)
        const trackedItems = lostItems + foundItems;

        setLostCount(lostItems);
        setFoundCount(foundItems);
        setTrackedCount(trackedItems);
      } catch (error) {
        console.error("Error fetching counts:", error);
      }
    };

    fetchCounts();
  }, []);

  // ✅ Stats with dynamic values
  const stats = [
    { label: "My Lost Items", value: lostCount, color: "#ef4444", icon: <FaClipboardList /> },
    { label: "My Found Items", value: foundCount, color: "#10b981", icon: <FaBoxOpen /> },
    { label: "Items Tracked", value: trackedCount, color: "#f59e0b", icon: <FaSearch /> }
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#f8f9fa" }}>
      {/* Header */}
      <div
        style={{
          background: "linear-gradient(135deg, #131593 0%, #1460e3 100%)",
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
                🔍 Lost & Found - Student Portal
              </h1>
              <p style={{ color: "#e0e7ff", margin: "5px 0 0 0", fontSize: "0.95rem" }}>
                Report and track your lost & found items
              </p>
            </div>
            
            {/* Profile & Logout Section - Moved here */}
            <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
              {/* Profile Dropdown */}
              <div style={{ position: "relative" }}>
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
              </div>

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
                href="/StudentMenu" 
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

              {/* Lost Items */}
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
                <NavDropdown.Item href="/studentlostReport">
                  <FaClipboardList className="me-2 text-danger" /> Lost Item Track
                </NavDropdown.Item>
              </NavDropdown>

              {/* Found Items */}
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
                <NavDropdown.Item href="/studentfoundReport">
                  <FaBoxOpen className="me-2 text-warning" /> Found Item Track
                </NavDropdown.Item>
              </NavDropdown>

              {/* Search */}
              <Nav.Link 
                href="/fuzzySearch" 
                style={{
                  fontWeight: "600",
                  fontSize: "0.95rem",
                  padding: "10px 16px",
                  borderRadius: "8px",
                  margin: "0 4px"
                }}
              >
                <FaSearch className="me-2" style={{ color: "#8b5cf6" }} />
                <b>Lost Item Search</b>
              </Nav.Link>

              {/* Chat */}
              <Nav.Link 
                href="/ChatMessage" 
                style={{
                  fontWeight: "600",
                  fontSize: "0.95rem",
                  padding: "10px 16px",
                  borderRadius: "8px",
                  margin: "0 4px"
                }}
              >
                <FaMessage className="me-2" style={{ color: "#06b6d4" }} />
                <b>Chat</b>
              </Nav.Link>
            </Nav>

            {/* Right side - Empty now, removed Student label and Logout */}
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
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
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
              📝 Register Lost Item
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
              href="/fuzzySearch"
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
              🔍 Search Lost Items
            </a>
            <a
              href="/ChatMessage"
              style={{
                padding: "24px",
                background: "linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)",
                color: "white",
                textDecoration: "none",
                borderRadius: "14px",
                textAlign: "center",
                fontWeight: "600",
                fontSize: "1rem",
                transition: "transform 0.3s, box-shadow 0.3s",
                boxShadow: "0 4px 12px rgba(6, 182, 212, 0.3)"
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-3px)";
                e.currentTarget.style.boxShadow = "0 8px 24px rgba(6, 182, 212, 0.4)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(6, 182, 212, 0.3)";
              }}
            >
              💬 Open Chat
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
            <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px", background: "#fef2f2", borderRadius: "10px" }}>
              <span style={{ fontSize: "1.2rem" }}>🔴</span>
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
              <span style={{ fontSize: "1.2rem" }}>🔵</span>
              <div>
                <p style={{ margin: 0, fontWeight: "600", color: "#1e293b", fontSize: "0.9rem" }}>Search performed</p>
                <p style={{ margin: "2px 0 0 0", color: "#64748b", fontSize: "0.85rem" }}>Searched for ID Card - 2 hours ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentMenu;