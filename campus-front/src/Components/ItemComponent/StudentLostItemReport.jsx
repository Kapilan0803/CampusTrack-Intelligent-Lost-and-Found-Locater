import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaClipboardList, FaArrowLeft } from "react-icons/fa";
import { lostItemListByUser } from "../../Services/lostItemService";

const StudentLostItemReport = () => {
  let navigate = useNavigate();
  const [itemList, setItemList] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    lostItemListByUser()
      .then((response) => {
        setItemList(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch lost items. Please try again later.");
        console.error(err);
        setLoading(false);
      });
  }, []);

  const returnBack = () => {
    navigate("/StudentMenu");
  };

  const handleFoundSubmission = (item) => {
    navigate("/FoundItemSubmit", { state: { item } });
  };

  return (
    <div style={{ 
      minHeight: "100vh",
      background: "linear-gradient(135deg, #08618eff 0%, #13628dff 100%)",
      padding: "40px 20px",
      position: "relative",
      overflow: "auto"
    }}>
      {/* CSS Animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          25% { transform: translateY(-20px) rotate(3deg); }
          50% { transform: translateY(-10px) rotate(-3deg); }
          75% { transform: translateY(-15px) rotate(2deg); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.05); }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes searchPulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.15); opacity: 0.8; }
        }
        .floating-icon {
          position: absolute;
          font-size: 2.5rem;
          opacity: 0.2;
          animation: float 8s ease-in-out infinite;
        }
        .table-row {
          animation: slideIn 0.5s ease-out forwards;
          opacity: 0;
        }
      `}</style>

      {/* Floating Background Icons */}
      <div className="floating-icon" style={{ top: "10%", left: "5%", animationDelay: "0s" }}>📋</div>
      <div className="floating-icon" style={{ top: "25%", right: "8%", animationDelay: "2s" }}>📱</div>
      <div className="floating-icon" style={{ bottom: "20%", left: "10%", animationDelay: "4s" }}>🎒</div>
      <div className="floating-icon" style={{ bottom: "35%", right: "12%", animationDelay: "3s" }}>💳</div>
      <div className="floating-icon" style={{ top: "50%", left: "3%", animationDelay: "1s" }}>🔑</div>
      <div className="floating-icon" style={{ top: "65%", right: "5%", animationDelay: "5s" }}>⌚</div>

      {/* Pulsing Circles */}
      <div style={{
        position: "absolute", top: "15%", right: "20%", width: "300px", height: "300px",
        borderRadius: "50%", background: "radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)",
        animation: "pulse 6s ease-in-out infinite"
      }}></div>
      <div style={{
        position: "absolute", bottom: "10%", left: "15%", width: "250px", height: "250px",
        borderRadius: "50%", background: "radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)",
        animation: "pulse 8s ease-in-out infinite 2s"
      }}></div>

      {/* Main Content */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 10 }}>
        {/* Header Section */}
        <div style={{
          textAlign: "center",
          marginBottom: "40px",
          animation: "slideIn 0.8s ease-out"
        }}>
          <div style={{ position: "relative", display: "inline-block", marginBottom: "20px" }}>
            <div style={{
              width: "100px", height: "100px",
              background: "rgba(255,255,255,0.15)",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backdropFilter: "blur(10px)",
              border: "3px solid rgba(255,255,255,0.3)",
              animation: "searchPulse 2s ease-in-out infinite"
            }}>
              <FaClipboardList size={50} color="white" />
            </div>
          </div>

          <h1 style={{
            color: "white",
            fontSize: "2.8rem",
            fontWeight: "700",
            marginBottom: "15px",
            textShadow: "2px 2px 10px rgba(0,0,0,0.3)"
          }}>
            😟 My Lost Items
          </h1>
          <p style={{
            color: "rgba(255,255,255,0.9)",
            fontSize: "1.15rem",
            maxWidth: "600px",
            margin: "0 auto"
          }}>
            Track all items you've reported as lost
          </p>
        </div>

        {/* Content Card */}
        <div style={{
          background: "rgba(255,255,255,0.98)",
          borderRadius: "24px",
          padding: "40px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255,255,255,0.3)",
          marginBottom: "30px",
          animation: "slideIn 1s ease-out"
        }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "30px"
          }}>
            <div>
              <h2 style={{
                margin: 0,
                fontSize: "1.8rem",
                fontWeight: "700",
                color: "#1e293b",
                display: "flex",
                alignItems: "center",
                gap: "12px"
              }}>
                <FaClipboardList style={{ color: "#ef4444" }} />
                Lost Item List
              </h2>
              <p style={{
                margin: "8px 0 0 0",
                fontSize: "1rem",
                color: "#64748b"
              }}>
                Campus Lost & Found Report
              </p>
            </div>
            <span style={{
              padding: "8px 20px",
              background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
              color: "white",
              borderRadius: "20px",
              fontSize: "0.95rem",
              fontWeight: "600",
              boxShadow: "0 4px 12px rgba(239, 68, 68, 0.3)"
            }}>
              {itemList.length} {itemList.length === 1 ? 'item' : 'items'}
            </span>
          </div>

          {loading && (
            <div style={{ textAlign: "center", padding: "60px" }}>
              <div style={{ fontSize: "3rem", marginBottom: "15px" }}>⏳</div>
              <p style={{ color: "#64748b", fontSize: "1.1rem" }}>Loading your lost items...</p>
            </div>
          )}

          {error && (
            <div style={{
              padding: "20px",
              background: "#fee2e2",
              color: "#dc2626",
              borderRadius: "12px",
              textAlign: "center",
              marginBottom: "20px",
              fontSize: "1rem"
            }}>
              ⚠️ {error}
            </div>
          )}

          {!loading && !error && itemList.length === 0 && (
            <div style={{ textAlign: "center", padding: "60px" }}>
              <div style={{ fontSize: "4rem", marginBottom: "20px" }}>📋</div>
              <h3 style={{ fontSize: "1.5rem", color: "#475569", marginBottom: "10px" }}>
                No lost items found
              </h3>
              <p style={{ color: "#64748b", fontSize: "1rem" }}>
                You haven't reported any lost items yet
              </p>
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
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
              }}>
                <thead>
                  <tr style={{
                    background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
                    color: "white"
                  }}>
                    <th style={{ padding: "16px 12px", textAlign: "left", fontWeight: "600", fontSize: "0.9rem" }}>Item ID</th>
                    <th style={{ padding: "16px 12px", textAlign: "left", fontWeight: "600", fontSize: "0.9rem" }}>Item Name</th>
                    <th style={{ padding: "16px 12px", textAlign: "left", fontWeight: "600", fontSize: "0.9rem" }}>Category</th>
                    <th style={{ padding: "16px 12px", textAlign: "left", fontWeight: "600", fontSize: "0.9rem" }}>Color</th>
                    <th style={{ padding: "16px 12px", textAlign: "left", fontWeight: "600", fontSize: "0.9rem" }}>Brand</th>
                    <th style={{ padding: "16px 12px", textAlign: "left", fontWeight: "600", fontSize: "0.9rem" }}>Location</th>
                    <th style={{ padding: "16px 12px", textAlign: "left", fontWeight: "600", fontSize: "0.9rem" }}>Lost Date</th>
                    <th style={{ padding: "16px 12px", textAlign: "center", fontWeight: "600", fontSize: "0.9rem" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {itemList.map((item, index) => (
                    <tr
                      key={item.itemId || index}
                      className="table-row"
                      style={{
                        borderBottom: "1px solid #e2e8f0",
                        animationDelay: `${index * 0.1}s`,
                        transition: "background 0.3s"
                      }}
                      onMouseOver={(e) => e.currentTarget.style.background = "#fef2f2"}
                      onMouseOut={(e) => e.currentTarget.style.background = "white"}
                    >
                      <td style={{ padding: "16px 12px", color: "#64748b", fontSize: "0.9rem", fontWeight: "600" }}>{item.itemId}</td>
                      <td style={{ padding: "16px 12px", color: "#1e293b", fontWeight: "700", fontSize: "0.95rem" }}>{item.itemName}</td>
                      <td style={{ padding: "16px 12px", color: "#64748b", fontSize: "0.9rem" }}>{item.category}</td>
                      <td style={{ padding: "16px 12px", color: "#64748b", fontSize: "0.9rem" }}>{item.color}</td>
                      <td style={{ padding: "16px 12px", color: "#64748b", fontSize: "0.9rem" }}>{item.brand}</td>
                      <td style={{ padding: "16px 12px", color: "#64748b", fontSize: "0.9rem" }}>{item.location}</td>
                      <td style={{ padding: "16px 12px", color: "#64748b", fontSize: "0.9rem" }}>{item.lostDate}</td>
                      <td style={{ padding: "16px 12px", textAlign: "center" }}>
                        <button
                          onClick={() => handleFoundSubmission(item)}
                          style={{
                            padding: "10px 20px",
                            background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                            color: "white",
                            border: "none",
                            borderRadius: "10px",
                            fontSize: "0.85rem",
                            fontWeight: "600",
                            cursor: "pointer",
                            transition: "all 0.3s",
                            boxShadow: "0 4px 12px rgba(16, 185, 129, 0.3)"
                          }}
                          onMouseOver={(e) => {
                            e.target.style.transform = "translateY(-2px)";
                            e.target.style.boxShadow = "0 6px 16px rgba(16, 185, 129, 0.4)";
                          }}
                          onMouseOut={(e) => {
                            e.target.style.transform = "translateY(0)";
                            e.target.style.boxShadow = "0 4px 12px rgba(16, 185, 129, 0.3)";
                          }}
                        >
                          ✅ Found Submission
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Back Button */}
        <div style={{ textAlign: "center" }}>
          <button
            onClick={returnBack}
            style={{
              padding: "14px 40px",
              background: "rgba(255,255,255,0.95)",
              color: "#334155",
              border: "2px solid rgba(255,255,255,0.3)",
              borderRadius: "14px",
              fontSize: "1rem",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.3s",
              boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
              backdropFilter: "blur(10px)",
              display: "inline-flex",
              alignItems: "center",
              gap: "10px"
            }}
            onMouseOver={(e) => {
              e.target.style.transform = "translateY(-2px)";
              e.target.style.boxShadow = "0 12px 30px rgba(0,0,0,0.2)";
              e.target.style.background = "white";
            }}
            onMouseOut={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "0 8px 20px rgba(0,0,0,0.15)";
              e.target.style.background = "rgba(255,255,255,0.95)";
            }}
          >
            <FaArrowLeft /> Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentLostItemReport;