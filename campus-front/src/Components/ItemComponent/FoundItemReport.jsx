import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { FaBoxOpen, FaArrowLeft } from "react-icons/fa";
import { getAllFoundItems } from '../../Services/foundItemService';

const FoundItemReport = () => {
  let navigate = useNavigate();
  const [itemList, setItemList] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const showAllfoundItems = () => {
    getAllFoundItems()
      .then((response) => {
        setItemList(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch found items. Please try again later.");
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    showAllfoundItems();
  }, []);

  const returnBack = () => {
    navigate('/AdminMenu');
  };

  return (
    <div style={{ 
      display: "flex", 
      height: "100vh", 
      width: "100vw",
      overflow: "hidden",
      position: "auto",
      top: 0,
      left: 0
    }}>
      {/* CSS for animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          25% { transform: translateY(-30px) rotate(5deg); }
          50% { transform: translateY(-20px) rotate(-5deg); }
          75% { transform: translateY(-40px) rotate(3deg); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes boxFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        @keyframes checkPulse {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
          50% { transform: translate(-50%, -50%) scale(1.1); opacity: 0.8; }
        }
        @keyframes sparkle {
          0%, 100% { transform: scale(0) rotate(0deg); opacity: 0; }
          50% { transform: scale(1.2) rotate(180deg); opacity: 1; }
        }
        @keyframes particleFloat {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          50% { transform: translateY(-100px) translateX(50px); }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .floating-icon {
          position: absolute;
          font-size: 3rem;
          opacity: 0.3;
          animation: float 6s ease-in-out infinite;
        }
        .particle {
          position: absolute;
          width: 8px;
          height: 8px;
          background: rgba(16, 185, 129, 0.4);
          border-radius: 50%;
          animation: particleFloat 8s ease-in-out infinite;
        }
        .table-row {
          animation: slideIn 0.5s ease-out forwards;
          opacity: 0;
        }
        @media (max-width: 1024px) {
          .animation-section { display: none !important; }
          .form-section { flex: 1 !important; }
        }
      `}</style>

      {/* Right Side - Animation */}
      <div className="animation-section" style={{ 
        flex: 1, 
        background: "linear-gradient(135deg, #08618eff 0%, #13628dff 100%)", 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center", 
        position: "relative", 
        overflow: "hidden"
      }}>
        {/* Floating Icons */}
        <div className="floating-icon" style={{ top: "10%", left: "10%", animationDelay: "0s", color: "rgba(255,255,255,0.3)" }}>🎒</div>
        <div className="floating-icon" style={{ top: "20%", right: "15%", animationDelay: "1s", color: "rgba(255,255,255,0.3)" }}>📱</div>
        <div className="floating-icon" style={{ bottom: "20%", left: "15%", animationDelay: "2s", color: "rgba(255,255,255,0.3)" }}>💳</div>
        <div className="floating-icon" style={{ bottom: "30%", right: "10%", animationDelay: "3s", color: "rgba(255,255,255,0.3)" }}>🔑</div>
        <div className="floating-icon" style={{ top: "50%", left: "8%", animationDelay: "1.5s", color: "rgba(255,255,255,0.3)" }}>⌚</div>
        <div className="floating-icon" style={{ top: "60%", right: "12%", animationDelay: "2.5s", color: "rgba(255,255,255,0.3)" }}>💻</div>

        {/* Particles */}
        <div className="particle" style={{ top: "15%", left: "20%", animationDelay: "0s" }}></div>
        <div className="particle" style={{ top: "40%", right: "25%", animationDelay: "2s" }}></div>
        <div className="particle" style={{ bottom: "25%", left: "30%", animationDelay: "4s" }}></div>
        <div className="particle" style={{ top: "70%", right: "20%", animationDelay: "1s" }}></div>
        <div className="particle" style={{ top: "35%", left: "15%", animationDelay: "3s" }}></div>

        {/* Main Content */}
        <div style={{ textAlign: "center", zIndex: 10, padding: "40px", animation: "fadeInUp 1s ease-out" }}>
          <h1 style={{ fontSize: "3rem", color: "#e0e7ff", marginBottom: "20px", textShadow: "2px 2px 8px rgba(0,0,0,0.3)" }}>
            ✅ Found Items Report
          </h1>
          <p style={{ fontSize: "1.2rem", color: "#e8f4f8", marginBottom: "30px" }}>
            Track and manage all found items
          </p>
          
          {/* Box Animation */}
          <div style={{ position: "relative", width: "200px", height: "200px", margin: "40px auto" }}>
            <div style={{
              position: "absolute", width: "140px", height: "140px", 
              border: "8px solid rgba(255,255,255,0.9)", borderRadius: "20px", 
              top: "30px", left: "30px", animation: "boxFloat 3s ease-in-out infinite"
            }}>
              <div style={{
                position: "absolute", fontSize: "70px", color: "rgba(255,255,255,0.9)",
                top: "50%", left: "50%", transform: "translate(-50%, -50%)",
                animation: "checkPulse 2s ease-in-out infinite"
              }}>✓</div>
            </div>
            <div style={{ position: "absolute", top: 0, left: 0, fontSize: "30px", animation: "sparkle 2s ease-in-out infinite 0s", filter: "drop-shadow(0 0 5px rgba(255,255,255,0.8))" }}>✨</div>
            <div style={{ position: "absolute", top: 0, right: 0, fontSize: "30px", animation: "sparkle 2s ease-in-out infinite 0.5s", filter: "drop-shadow(0 0 5px rgba(255,255,255,0.8))" }}>✨</div>
            <div style={{ position: "absolute", bottom: 0, left: 0, fontSize: "30px", animation: "sparkle 2s ease-in-out infinite 1s", filter: "drop-shadow(0 0 5px rgba(255,255,255,0.8))" }}>✨</div>
            <div style={{ position: "absolute", bottom: 0, right: 0, fontSize: "30px", animation: "sparkle 2s ease-in-out infinite 1.5s", filter: "drop-shadow(0 0 5px rgba(255,255,255,0.8))" }}>✨</div>
          </div>

          <p style={{ fontSize: "1rem", marginTop: "30px", opacity: 0.9, color: "#e8f4f8" }}>
            Total Found Items: <strong>{itemList.length}</strong>
          </p>
        </div>
      </div>

      {/* Left Side - Table */}
      <div className="form-section" style={{ 
        flex: "0 0 50%", 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center", 
        padding: "45px 20px",
        background: "linear-gradient(135deg, #08618eff 0%, #13628dff 100%)",
        overflow: "auto"
      }}>
        <div style={{ 
          width: "100%", 
          maxWidth: "1000px", 
          background: "rgba(188, 198, 208, 0.98)", 
          borderRadius: "20px", 
          boxShadow: "0 10px 30px rgba(15, 90, 120, 0.15)",
          overflow: "hidden",
          backdropFilter: "blur(6px)"
        }}>
          {/* Header */}
          <div style={{ 
            background: "linear-gradient(135deg, #0e4796ff 0%, #2bb6f0 100%)", 
            padding: "20px 30px", 
            textAlign: "center", 
            color: "white" 
          }}>
            <div style={{ 
              width: "50px", 
              height: "50px", 
              background: "rgba(255,255,255,0.2)", 
              borderRadius: "50%", 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center", 
              margin: "0 auto 10px",
              backdropFilter: "blur(10px)"
            }}>
              <FaBoxOpen size={25} />
            </div>
            <h2 style={{ margin: 0, fontSize: "1.5rem", fontWeight: "700" }}>
              📦 Found Item List
            </h2>
            <p style={{ margin: "6px 0 0 0", fontSize: "0.9rem", opacity: 0.9 }}>
              Campus Lost & Found Report
            </p>
          </div>

          {/* Table Body */}
          <div style={{ padding: "30px", maxHeight: "calc(100vh - 250px)", overflowY: "auto" }}>
            {loading && (
              <div style={{ textAlign: "center", padding: "40px" }}>
                <div style={{ fontSize: "2rem", marginBottom: "10px" }}>⏳</div>
                <p style={{ color: "#64748b" }}>Loading found items...</p>
              </div>
            )}

            {error && (
              <div style={{ 
                padding: "20px", 
                background: "#fee2e2", 
                color: "#dc2626", 
                borderRadius: "10px", 
                textAlign: "center",
                marginBottom: "20px"
              }}>
                {error}
              </div>
            )}

            {!loading && !error && itemList.length === 0 && (
              <div style={{ textAlign: "center", padding: "40px" }}>
                <p style={{ color: "#64748b", fontSize: "1.1rem" }}>No found items submitted yet.</p>
              </div>
            )}

            {!loading && !error && itemList.length > 0 && (
              <div style={{ overflowX: "auto" }}>
                <table style={{ 
                  width: "100%", 
                  borderCollapse: "collapse",
                  background: "white",
                  borderRadius: "12px",
                  overflow: "hidden",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
                }}>
                  <thead>
                    <tr style={{ background: "linear-gradient(135deg, #10b981 0%, #059669 100%)", color: "white" }}>
                      <th style={{ padding: "12px 10px", textAlign: "left", fontWeight: "600", fontSize: "0.85rem" }}>ID</th>
                      <th style={{ padding: "12px 10px", textAlign: "left", fontWeight: "600", fontSize: "0.85rem" }}>Item Name</th>
                      <th style={{ padding: "12px 10px", textAlign: "left", fontWeight: "600", fontSize: "0.85rem" }}>Category</th>
                      <th style={{ padding: "12px 10px", textAlign: "left", fontWeight: "600", fontSize: "0.85rem" }}>Color</th>
                      <th style={{ padding: "12px 10px", textAlign: "left", fontWeight: "600", fontSize: "0.85rem" }}>Brand</th>
                      <th style={{ padding: "12px 10px", textAlign: "left", fontWeight: "600", fontSize: "0.85rem" }}>Location</th>
                      <th style={{ padding: "12px 10px", textAlign: "left", fontWeight: "600", fontSize: "0.85rem" }}>Date</th>
                      <th style={{ padding: "12px 10px", textAlign: "left", fontWeight: "600", fontSize: "0.85rem" }}>User</th>
                      <th style={{ padding: "12px 10px", textAlign: "left", fontWeight: "600", fontSize: "0.85rem" }}>Email</th>
                    </tr>
                  </thead>
                  <tbody>
                    {itemList.map((item, index) => (
                      <tr 
                        key={item.founditemId || index}
                        className="table-row"
                        style={{ 
                          borderBottom: "1px solid #e2e8f0",
                          animationDelay: `${index * 0.05}s`,
                          transition: "background 0.3s"
                        }}
                        onMouseOver={(e) => e.currentTarget.style.background = "#f0fdf4"}
                        onMouseOut={(e) => e.currentTarget.style.background = "white"}
                      >
                        <td style={{ padding: "12px 10px", color: "#64748b", fontSize: "0.85rem" }}>{item.founditemId}</td>
                        <td style={{ padding: "12px 10px", color: "#1e293b", fontWeight: "600", fontSize: "0.85rem" }}>{item.itemName}</td>
                        <td style={{ padding: "12px 10px", color: "#64748b", fontSize: "0.85rem" }}>{item.category}</td>
                        <td style={{ padding: "12px 10px", color: "#64748b", fontSize: "0.85rem" }}>{item.color}</td>
                        <td style={{ padding: "12px 10px", color: "#64748b", fontSize: "0.85rem" }}>{item.brand}</td>
                        <td style={{ padding: "12px 10px", color: "#64748b", fontSize: "0.85rem" }}>{item.location}</td>
                        <td style={{ padding: "12px 10px", color: "#64748b", fontSize: "0.85rem" }}>{item.foundDate}</td>
                        <td style={{ padding: "12px 10px", color: "#64748b", fontSize: "0.85rem" }}>{item.username}</td>
                        <td style={{ padding: "12px 10px", color: "#64748b", fontSize: "0.8rem" }}>{item.userEmail}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Back Button */}
            <div style={{ marginTop: "30px", textAlign: "center" }}>
              <button
                onClick={returnBack}
                style={{
                  padding: "12px 30px",
                  background: "white",
                  color: "#64748b",
                  border: "none",
                  borderRadius: "10px",
                  fontSize: "0.95rem",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "all 0.3s",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px"
                }}
                onMouseOver={(e) => {
                  e.target.style.transform = "translateY(-2px)";
                  e.target.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = "translateY(0)";
                  e.target.style.boxShadow = "0 2px 8px rgba(0,0,0,0.1)";
                }}
              >
                <FaArrowLeft /> Back to Admin Menu
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoundItemReport;