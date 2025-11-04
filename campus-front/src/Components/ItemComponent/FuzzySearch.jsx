import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fuzzySearching } from "../../Services/lostItemService";
import { FaSearch } from "react-icons/fa";

const FuzzySearch = () => {
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!keyword.trim()) {
      setError("Please enter a keyword to search.");
      setResults([]);
      return;
    }
    
    setIsSearching(true);
    setError("");
    
    try {
      const response = await fuzzySearching(keyword);
      setResults(response.data);
      setError("");
    } catch (err) {
      setError("Failed to fetch search results. Please try again.");
      setResults([]);
      console.error("Fuzzy search error:", err);
    } finally {
      setTimeout(() => setIsSearching(false), 500);
    }
  };

  const returnBack = () => {
    navigate("/StudentMenu");
  };

  return (
    <div style={{
  minHeight: "100vh",
  background: "linear-gradient(135deg, #08618eff 0%, #13628dff 100%)",
  padding: "40px 20px",
  overflowY: "auto",
  position: "relative"
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
        @keyframes ripple {
          0% { transform: scale(0.8); opacity: 1; }
          100% { transform: scale(2.5); opacity: 0; }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes searchBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        .search-item {
          animation: slideIn 0.5s ease-out forwards;
          opacity: 0;
        }
        .search-item:nth-child(1) { animation-delay: 0.1s; }
        .search-item:nth-child(2) { animation-delay: 0.2s; }
        .search-item:nth-child(3) { animation-delay: 0.3s; }
        .search-item:nth-child(4) { animation-delay: 0.4s; }
        .search-item:nth-child(5) { animation-delay: 0.5s; }
        .floating-icon {
          position: absolute;
          font-size: 2.5rem;
          opacity: 0.2;
          animation: float 8s ease-in-out infinite;
        }
        .search-input-wrapper:focus-within {
          transform: translateY(-2px);
          box-shadow: 0 12px 40px rgba(43, 182, 240, 0.3) !important;
        }
        .result-card:hover {
          transform: translateY(-4px) scale(1.02);
          box-shadow: 0 12px 30px rgba(0,0,0,0.15);
        }
      `}</style>

      {/* Floating Background Icons */}
      <div className="floating-icon" style={{ top: "10%", left: "5%", animationDelay: "0s" }}>🔍</div>
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
      <div style={{ maxWidth: "900px", margin: "0 auto", position: "relative", zIndex: 10 }}>
        {/* Header Section */}
        <div style={{
          textAlign: "center",
          marginBottom: "40px",
          animation: "slideIn 0.8s ease-out"
        }}>
          {/* Search Icon with Ripples */}
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
              animation: "searchBounce 2s ease-in-out infinite"
            }}>
              <FaSearch size={40} color="white" />
            </div>
            {/* Ripple Effects */}
            <div style={{
              position: "absolute", top: "50%", left: "50%",
              transform: "translate(-50%, -50%)",
              width: "100px", height: "100px",
              border: "3px solid rgba(255,255,255,0.4)",
              borderRadius: "50%",
              animation: "ripple 3s ease-out infinite"
            }}></div>
            <div style={{
              position: "absolute", top: "50%", left: "50%",
              transform: "translate(-50%, -50%)",
              width: "100px", height: "100px",
              border: "3px solid rgba(255,255,255,0.3)",
              borderRadius: "50%",
              animation: "ripple 3s ease-out infinite 1.5s"
            }}></div>
          </div>

          <h1 style={{
            color: "white",
            fontSize: "2.8rem",
            fontWeight: "700",
            marginBottom: "15px",
            textShadow: "2px 2px 10px rgba(0,0,0,0.3)"
          }}>
            🔍 Lost Item Search
          </h1>
          <p style={{
            color: "rgba(255,255,255,0.9)",
            fontSize: "1.15rem",
            maxWidth: "600px",
            margin: "0 auto"
          }}>
            Find items similar to your search with our smart fuzzy matching
          </p>
        </div>

        {/* Search Card */}
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
          <form onSubmit={handleSearch}>
            <div className="search-input-wrapper" style={{
              display: "flex",
              gap: "15px",
              marginBottom: error ? "20px" : "0",
              transition: "all 0.3s ease"
            }}>
              <div style={{ flex: 1, position: "relative" }}>
                <input
                  type="text"
                  placeholder="Enter keyword (e.g., 'blue water bottle', 'iPhone', 'red backpack')"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "16px 20px 16px 50px",
                    fontSize: "1rem",
                    border: "2px solid #e0e7ff",
                    borderRadius: "14px",
                    outline: "none",
                    transition: "all 0.3s ease",
                    background: "#f8fafc"
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#2bb6f0";
                    e.target.style.background = "white";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#e0e7ff";
                    e.target.style.background = "#f8fafc";
                  }}
                />
                <FaSearch style={{
                  position: "absolute",
                  left: "18px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#64748b",
                  fontSize: "1.1rem"
                }} />
              </div>
              <button
                type="submit"
                disabled={isSearching}
                style={{
                  padding: "16px 40px",
                  background: isSearching 
                    ? "linear-gradient(135deg, #64748b 0%, #94a3b8 100%)"
                    : "linear-gradient(135deg, #0e4796ff 0%, #2bb6f0 100%)",
                  color: "white",
                  border: "none",
                  borderRadius: "14px",
                  fontSize: "1.05rem",
                  fontWeight: "700",
                  cursor: isSearching ? "not-allowed" : "pointer",
                  transition: "all 0.3s ease",
                  boxShadow: "0 8px 20px rgba(43, 182, 240, 0.3)",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  minWidth: "140px",
                  justifyContent: "center"
                }}
                onMouseOver={(e) => {
                  if (!isSearching) {
                    e.target.style.transform = "translateY(-2px)";
                    e.target.style.boxShadow = "0 12px 30px rgba(43, 182, 240, 0.4)";
                  }
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = "translateY(0)";
                  e.target.style.boxShadow = "0 8px 20px rgba(43, 182, 240, 0.3)";
                }}
              >
                {isSearching ? (
                  <>
                    <div style={{
                      width: "18px",
                      height: "18px",
                      border: "3px solid rgba(255,255,255,0.3)",
                      borderTop: "3px solid white",
                      borderRadius: "50%",
                      animation: "spin 0.8s linear infinite"
                    }}></div>
                    Searching...
                  </>
                ) : (
                  <>
                    <FaSearch />
                    Search
                  </>
                )}
              </button>
            </div>

            {error && (
              <div style={{
                padding: "12px 18px",
                background: "#fee2e2",
                color: "#dc2626",
                borderRadius: "10px",
                fontSize: "0.9rem",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                animation: "slideIn 0.3s ease-out"
              }}>
                <span style={{ fontSize: "1.2rem" }}>⚠️</span>
                {error}
              </div>
            )}
          </form>
        </div>

        {/* Results Section */}
        {results.length > 0 && (
          <div style={{
            background: "rgba(255,255,255,0.98)",
            borderRadius: "24px",
            padding: "35px",
            boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255,255,255,0.3)",
            marginBottom: "30px"
          }}>
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "25px"
            }}>
              <h2 style={{
                margin: 0,
                fontSize: "1.5rem",
                fontWeight: "700",
                color: "#1e293b",
                display: "flex",
                alignItems: "center",
                gap: "12px"
              }}>
                <span style={{ fontSize: "1.8rem" }}>📋</span>
                Search Results
              </h2>
              <span style={{
                padding: "6px 16px",
                background: "linear-gradient(135deg, #0e4796ff 0%, #2bb6f0 100%)",
                color: "white",
                borderRadius: "20px",
                fontSize: "0.9rem",
                fontWeight: "600"
              }}>
                {results.length} {results.length === 1 ? 'item' : 'items'} found
              </span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
              {results.map((item, index) => (
                <div
                  key={item.lostitemId || index}
                  className="search-item result-card"
                  style={{
                    padding: "20px 25px",
                    background: "linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)",
                    border: "2px solid #e2e8f0",
                    borderRadius: "16px",
                    transition: "all 0.3s ease",
                    cursor: "pointer"
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "20px" }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "10px" }}>
                        <h3 style={{
                          margin: 0,
                          fontSize: "1.25rem",
                          fontWeight: "700",
                          color: "#1e293b"
                        }}>
                          {item.itemName}
                        </h3>
                        <span style={{
                          padding: "4px 12px",
                          background: "#dbeafe",
                          color: "#1e40af",
                          borderRadius: "8px",
                          fontSize: "0.75rem",
                          fontWeight: "600"
                        }}>
                          {item.category}
                        </span>
                      </div>

                      <div style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                        gap: "12px",
                        marginTop: "12px"
                      }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          <span style={{ fontSize: "1.1rem" }}>🎨</span>
                          <span style={{ color: "#64748b", fontSize: "0.9rem" }}>
                            <strong>Color:</strong> {item.color}
                          </span>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          <span style={{ fontSize: "1.1rem" }}>🏷️</span>
                          <span style={{ color: "#64748b", fontSize: "0.9rem" }}>
                            <strong>Brand:</strong> {item.brand}
                          </span>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          <span style={{ fontSize: "1.1rem" }}>📍</span>
                          <span style={{ color: "#64748b", fontSize: "0.9rem" }}>
                            <strong>Location:</strong> {item.location}
                          </span>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          <span style={{ fontSize: "1.1rem" }}>📅</span>
                          <span style={{ color: "#64748b", fontSize: "0.9rem" }}>
                            <strong>Lost on:</strong> {new Date(item.lostDate).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div style={{
                      padding: "8px 16px",
                      background: "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)",
                      borderRadius: "10px",
                      textAlign: "center",
                      minWidth: "100px"
                    }}>
                      <div style={{ fontSize: "0.75rem", color: "#64748b", marginBottom: "4px" }}>
                        Item ID
                      </div>
                      <div style={{ fontSize: "1.1rem", fontWeight: "700", color: "#1e40af" }}>
                        #{item.lostitemId}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* No Results Message */}
        {!isSearching && results.length === 0 && keyword && !error && (
          <div style={{
            background: "rgba(255,255,255,0.98)",
            borderRadius: "24px",
            padding: "60px 40px",
            textAlign: "center",
            boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
            animation: "slideIn 0.5s ease-out"
          }}>
            <div style={{ fontSize: "4rem", marginBottom: "20px" }}>🔍</div>
            <h3 style={{ fontSize: "1.5rem", color: "#475569", marginBottom: "10px" }}>
              No items found
            </h3>
            <p style={{ color: "#64748b", fontSize: "1rem" }}>
              Try adjusting your search terms or checking for typos
            </p>
          </div>
        )}

        {/* Back Button */}
        <div style={{ textAlign: "center", marginTop: "30px" }}>
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
              transition: "all 0.3s ease",
              boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
              backdropFilter: "blur(10px)"
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
            ← Back to Menu
          </button>
        </div>
      </div>
    </div>
  );
};

export default FuzzySearch;