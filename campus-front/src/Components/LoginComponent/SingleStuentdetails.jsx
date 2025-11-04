import React, { useEffect, useState } from "react";
import { getUserDetails } from "../../Services/LoginService";
import { FaUserCircle } from "react-icons/fa";
import '../../LoginView.css';

const SingleStudentDetails = () => {
  const [user, setUser] = useState({
    username: "",
    personName: "",
    email: "",
    role: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await getUserDetails();
        console.log(response.data.username);
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserDetails();
  }, []);

  if (loading) {
    return <div className="text-center mt-5">Loading user details...</div>;
  }

  return (
    <div style={{ background: "linear-gradient(135deg, #000000, #0044ff)" }}>
        <div
      className="container d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh", background: "linear-gradient(135deg, #000000, #0044ff)" }}
    >
      <div
        className="card shadow-lg p-4"
        style={{
          width: "450px",
          borderRadius: "20px",
          backgroundColor: "#ffffff",
        }}
      >
        <div className="text-center mb-4">
          <FaUserCircle size={80} color="#4CAF50" />
          <h3 className="mt-3" style={{ color: "#333" }}>
            Student Profile
          </h3>
        </div>

        <div
          className="p-3"
          style={{
            borderRadius: "12px",
            backgroundColor: "#f8f9fa",
          }}
        >
          <div
            className="d-flex justify-content-between align-items-center mb-3"
            style={{ borderBottom: "1px solid #e0e0e0", paddingBottom: "8px" }}
          >
            <strong>Username</strong>
            <span>{user.username}</span>
          </div>

          <div
            className="d-flex justify-content-between align-items-center mb-3"
            style={{ borderBottom: "1px solid #e0e0e0", paddingBottom: "8px" }}
          >
            <strong>Person Name</strong>
            <span>{user.personName}</span>
          </div>

          <div
            className="d-flex justify-content-between align-items-center mb-3"
            style={{ borderBottom: "1px solid #e0e0e0", paddingBottom: "8px" }}
          >
            <strong>Email</strong>
            <span>{user.email}</span>
          </div>

          <div
            className="d-flex justify-content-between align-items-center"
            style={{ paddingBottom: "5px" }}
          >
            <strong>Role</strong>
            <span>{user.role}</span>
          </div>
        </div>
      </div>
    </div>
    </div>
    
  );
};

export default SingleStudentDetails;
