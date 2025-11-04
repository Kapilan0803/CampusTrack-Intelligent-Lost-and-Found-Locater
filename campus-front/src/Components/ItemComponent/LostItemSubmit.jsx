import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { getUserDetails } from "../../Services/LoginService";
import { lostItemSubmission, lostItemIdGenerator } from '../../Services/lostItemService';
import { FaBoxOpen } from "react-icons/fa";

const LostItemSubmit = () => {
  let navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [newId, setNewId] = useState(0);
  const [campusUser, setCampusUser] = useState({
    username: "",
    password: "",
    personName: "",
    email: "",
    role: "",
  });
  const [item, setItem] = useState({
    lostitemId: "",
    username: "",
    userEmail: "",
    itemName: "",
    category: "",
    color: "",
    brand: "",
    location: "",
    lostDate: new Date(),
    status: false,
  });

  let [ldate, setLdate] = useState("");

  const setLostItemId = () => {
    lostItemIdGenerator()
      .then(response => {
        setNewId(response.data);
      })
      .catch(err => {
        console.error('Failed to get new lost item id', err);
        alert('Unable to fetch new Item Id. Some features may not work – please try again.');
      });
  };

  const setUserDetails = () => {
    getUserDetails()
      .then(response => {
        setCampusUser(response.data);
      })
      .catch(err => {
        console.error('Failed to fetch user details', err);
        alert('Unable to fetch user details. Please login again.');
      });
  };

  useEffect(() => {
    setLostItemId();
    setUserDetails();
  }, []);

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setItem(values => ({ ...values, [name]: value }));
  };

  const lostItemFormSubmit = (event) => {
    event.preventDefault();
    if (!handleValidation()) return;
    item.itemId = newId;
    item.username = campusUser.username;
    item.userEmail = campusUser.email;
    item.lostDate = ldate;
    lostItemSubmission(item)
      .then(() => {
        alert("Lost Item Form Submitted Successfully!");
        navigate(campusUser.role === "Admin" ? '/AdminMenu' : '/StudentMenu');
      })
      .catch(err => {
        console.error('Lost item submission failed', err);
        const message = (err && err.response && err.response.status === 403)
          ? 'You are not authorized to perform this action (403). Please contact admin.'
          : 'Failed to submit lost item. Please try again.';
        alert(message);
      });
  };

  const handleValidation = () => {
    let tempErrors = {};
    let isValid = true;

    if (!item.itemName.trim()) {
      tempErrors.itemName = "Item Name is required";
      isValid = false;
    }
    if (!item.category.trim()) {
      tempErrors.category = "Category is required";
      isValid = false;
    }
    if (!item.color.trim()) {
      tempErrors.color = "Color is required";
      isValid = false;
    }
    if (!item.brand.trim()) {
      tempErrors.brand = "Brand is required";
      isValid = false;
    }
    if (!item.location.trim()) {
      tempErrors.location = "Lost Location is required";
      isValid = false;
    }
    if (!ldate) {
      tempErrors.ldate = "Lost Date is required";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const returnBack = () => {
    navigate(campusUser.role === "Admin" ? '/AdminMenu' : '/StudentMenu');
  };

  return (
    <div style={{ 
      display: "flex", 
      height: "100vh", 
      width: "100vw",
      overflow: "hidden",
      position: "fixed",
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
        @keyframes searchPulse {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
          50% { transform: translate(-50%, -50%) scale(1.15); opacity: 0.8; }
        }
        @keyframes ripple {
          0% { transform: scale(0.8); opacity: 1; }
          100% { transform: scale(2); opacity: 0; }
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
        <div className="particle" style={{ top: "15%", left: "20%", animationDelay: "0s", background: "rgba(255,255,255,0.4)" }}></div>
        <div className="particle" style={{ top: "40%", right: "25%", animationDelay: "2s", background: "rgba(255,255,255,0.4)" }}></div>
        <div className="particle" style={{ bottom: "25%", left: "30%", animationDelay: "4s", background: "rgba(255,255,255,0.4)" }}></div>
        <div className="particle" style={{ top: "70%", right: "20%", animationDelay: "1s", background: "rgba(255,255,255,0.4)" }}></div>
        <div className="particle" style={{ top: "35%", left: "15%", animationDelay: "3s", background: "rgba(255,255,255,0.4)" }}></div>

        {/* Main Content */}
        <div style={{ textAlign: "center", zIndex: 10, padding: "40px", animation: "fadeInUp 1s ease-out" }}>
          <h1 style={{ fontSize: "3rem", color: "#e0e7ff", marginBottom: "20px", textShadow: "2px 2px 8px rgba(0,0,0,0.3)" }}>
            😟 Lost Something?
          </h1>
          <p style={{ fontSize: "1.2rem", color: "#e8f4f8", marginBottom: "30px" }}>
            Report it now and we'll help you find it!
          </p>
          
          {/* Search/Lost Animation */}
          <div style={{ position: "relative", width: "200px", height: "200px", margin: "40px auto" }}>
            {/* Magnifying Glass */}
            <div style={{
              position: "absolute", width: "100px", height: "100px", 
              border: "8px solid rgba(255,255,255,0.9)", borderRadius: "50%", 
              top: "30px", left: "30px"
            }}>
              <div style={{
                position: "absolute", fontSize: "50px", color: "rgba(255,255,255,0.9)",
                top: "50%", left: "50%", transform: "translate(-50%, -50%)",
                animation: "searchPulse 2s ease-in-out infinite"
              }}>?</div>
            </div>
            {/* Handle */}
            <div style={{
              position: "absolute", width: "60px", height: "8px",
              background: "rgba(255,255,255,0.9)", 
              top: "110px", left: "120px",
              transform: "rotate(45deg)",
              borderRadius: "4px"
            }}></div>
            
            {/* Ripple Effects */}
            <div style={{
              position: "absolute", width: "120px", height: "120px",
              border: "3px solid rgba(255,255,255,0.5)", borderRadius: "50%",
              top: "20px", left: "20px",
              animation: "ripple 3s ease-out infinite"
            }}></div>
            <div style={{
              position: "absolute", width: "120px", height: "120px",
              border: "3px solid rgba(255,255,255,0.5)", borderRadius: "50%",
              top: "20px", left: "20px",
              animation: "ripple 3s ease-out infinite 1.5s"
            }}></div>
            
            {/* Sparkles */}
            <div style={{ position: "absolute", top: 0, left: 0, fontSize: "30px", animation: "sparkle 2s ease-in-out infinite 0s", filter: "drop-shadow(0 0 5px rgba(255,255,255,0.8))" }}>✨</div>
            <div style={{ position: "absolute", top: 0, right: 0, fontSize: "30px", animation: "sparkle 2s ease-in-out infinite 0.5s", filter: "drop-shadow(0 0 5px rgba(255,255,255,0.8))" }}>✨</div>
            <div style={{ position: "absolute", bottom: 0, left: 0, fontSize: "30px", animation: "sparkle 2s ease-in-out infinite 1s", filter: "drop-shadow(0 0 5px rgba(255,255,255,0.8))" }}>✨</div>
            <div style={{ position: "absolute", bottom: 0, right: 0, fontSize: "30px", animation: "sparkle 2s ease-in-out infinite 1.5s", filter: "drop-shadow(0 0 5px rgba(255,255,255,0.8))" }}>✨</div>
          </div>

          <p style={{ fontSize: "1rem", marginTop: "30px", opacity: 0.9, color: "#e8f4f8" }}>
            Register your lost item with details<br />
            We'll notify you when it's found!
          </p>
        </div>
      </div>

      {/* Left Side - Form */}
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
          maxWidth: "550px", 
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
              Lost Item Registration
            </h2>
            <p style={{ margin: "6px 0 0 0", fontSize: "0.9rem", opacity: 0.9 }}>
              Campus Lost & Found Portal
            </p>
          </div>

          {/* Form Body */}
          <div style={{ padding: "50px 35px 50px 35px" }}>
            <form onSubmit={lostItemFormSubmit}>
              {/* Item Id */}
              <div style={{ marginBottom: "10px", display: "flex", alignItems: "center", gap: "15px" }}>
                <label style={{ fontWeight: "600", color: "#054b63", fontSize: "0.85rem", minWidth: "130px", textAlign: "right" }}>
                  Item ID
                </label>
                <input
                  type="text"
                  name="itemId"
                  value={item.lostitemId ? item.lostitemId : newId}
                  readOnly
                  style={{
                    flex: 1, padding: "8px 12px", border: "2px solid transparent", 
                    borderRadius: "10px", fontSize: "0.85rem", background: "rgba(224, 231, 233, 0.95)", 
                    color: "#64748b", cursor: "not-allowed"
                  }}
                />
              </div>

              {/* Item Name */}
              <div style={{ marginBottom: "10px", display: "flex", alignItems: "center", gap: "15px" }}>
                <label style={{ fontWeight: "600", color: "#054b63", fontSize: "0.85rem", minWidth: "130px", textAlign: "right" }}>
                  Item Name *
                </label>
                <div style={{ flex: 1 }}>
                  <input
                    type="text"
                    name="itemName"
                    placeholder="Enter lost item name"
                    value={item.itemName}
                    onChange={onChangeHandler}
                    style={{
                      width: "100%", padding: "8px 12px", 
                      border: "2px solid transparent", 
                      borderRadius: "10px", fontSize: "0.85rem", outline: "none",
                      background: "rgba(224, 231, 233, 0.95)",
                      color: "#054b63",
                      transition: "all 0.3s"
                    }}
                    onFocus={(e) => e.target.style.borderColor = "#1d8cccff"}
                    onBlur={(e) => e.target.style.borderColor = "transparent"}
                  />
                  {errors.itemName && <p style={{ color: "#ff6b6b", fontSize: "0.75rem", marginTop: "3px", marginLeft: "0" }}>{errors.itemName}</p>}
                </div>
              </div>

              {/* Category */}
              <div style={{ marginBottom: "10px", display: "flex", alignItems: "center", gap: "15px" }}>
                <label style={{ fontWeight: "600", color: "#054b63", fontSize: "0.85rem", minWidth: "130px", textAlign: "right" }}>
                  Category *
                </label>
                <div style={{ flex: 1 }}>
                  <input
                    type="text"
                    name="category"
                    placeholder="Enter item category"
                    value={item.category}
                    onChange={onChangeHandler}
                    style={{
                      width: "100%", padding: "8px 12px", 
                      border: "2px solid transparent", 
                      borderRadius: "10px", fontSize: "0.85rem", outline: "none",
                      background: "rgba(224, 231, 233, 0.95)",
                      color: "#054b63",
                      transition: "all 0.3s"
                    }}
                    onFocus={(e) => e.target.style.borderColor = "#1d8cccff"}
                    onBlur={(e) => e.target.style.borderColor = "transparent"}
                  />
                  {errors.category && <p style={{ color: "#ff6b6b", fontSize: "0.75rem", marginTop: "3px", marginLeft: "0" }}>{errors.category}</p>}
                </div>
              </div>

              {/* Two Columns: Color & Brand */}
              <div style={{ marginBottom: "10px", display: "flex", alignItems: "flex-start", gap: "15px" }}>
                <label style={{ fontWeight: "600", color: "#054b63", fontSize: "0.85rem", minWidth: "130px", textAlign: "right", paddingTop: "8px" }}>
                  Color & Brand *
                </label>
                <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                  {/* Color */}
                  <div>
                    <input
                      type="text"
                      name="color"
                      placeholder="Color"
                      value={item.color}
                      onChange={onChangeHandler}
                      style={{
                        width: "100%", padding: "8px 12px", 
                        border: "2px solid transparent", 
                        borderRadius: "10px", fontSize: "0.85rem", outline: "none",
                        background: "rgba(224, 231, 233, 0.95)",
                        color: "#054b63",
                        transition: "all 0.3s"
                      }}
                      onFocus={(e) => e.target.style.borderColor = "#1d8cccff"}
                      onBlur={(e) => e.target.style.borderColor = "transparent"}
                    />
                    {errors.color && <p style={{ color: "#ff6b6b", fontSize: "0.75rem", marginTop: "3px" }}>{errors.color}</p>}
                  </div>

                  {/* Brand */}
                  <div>
                    <input
                      type="text"
                      name="brand"
                      placeholder="Brand"
                      value={item.brand}
                      onChange={onChangeHandler}
                      style={{
                        width: "100%", padding: "8px 12px", 
                        border: "2px solid transparent", 
                        borderRadius: "10px", fontSize: "0.85rem", outline: "none",
                        background: "rgba(224, 231, 233, 0.95)",
                        color: "#054b63",
                        transition: "all 0.3s"
                      }}
                      onFocus={(e) => e.target.style.borderColor = "#1d8cccff"}
                      onBlur={(e) => e.target.style.borderColor = "transparent"}
                    />
                    {errors.brand && <p style={{ color: "#ff6b6b", fontSize: "0.75rem", marginTop: "3px" }}>{errors.brand}</p>}
                  </div>
                </div>
              </div>

              {/* Location */}
              <div style={{ marginBottom: "10px", display: "flex", alignItems: "center", gap: "15px" }}>
                <label style={{ fontWeight: "600", color: "#054b63", fontSize: "0.85rem", minWidth: "130px", textAlign: "right" }}>
                  Lost Location *
                </label>
                <div style={{ flex: 1 }}>
                  <input
                    type="text"
                    name="location"
                    placeholder="Where did you lose it?"
                    value={item.location}
                    onChange={onChangeHandler}
                    style={{
                      width: "100%", padding: "8px 12px", 
                      border: "2px solid transparent", 
                      borderRadius: "10px", fontSize: "0.85rem", outline: "none",
                      background: "rgba(224, 231, 233, 0.95)",
                      color: "#054b63",
                      transition: "all 0.3s"
                    }}
                    onFocus={(e) => e.target.style.borderColor = "#1d8cccff"}
                    onBlur={(e) => e.target.style.borderColor = "transparent"}
                  />
                  {errors.location && <p style={{ color: "#ff6b6b", fontSize: "0.75rem", marginTop: "3px", marginLeft: "0" }}>{errors.location}</p>}
                </div>
              </div>

              {/* Lost Date */}
              <div style={{ marginBottom: "15px", display: "flex", alignItems: "center", gap: "15px" }}>
                <label style={{ fontWeight: "600", color: "#054b63", fontSize: "0.85rem", minWidth: "130px", textAlign: "right" }}>
                  Lost Date *
                </label>
                <div style={{ flex: 1 }}>
                  <input
                    type="date"
                    value={ldate}
                    onChange={(event) => setLdate(event.target.value)}
                    style={{
                      width: "100%", padding: "8px 12px", 
                      border: "2px solid transparent", 
                      borderRadius: "10px", fontSize: "0.85rem", outline: "none",
                      background: "rgba(224, 231, 233, 0.95)",
                      color: "#054b63",
                      transition: "all 0.3s"
                    }}
                    onFocus={(e) => e.target.style.borderColor = "#1d8cccff"}
                    onBlur={(e) => e.target.style.borderColor = "transparent"}
                  />
                  {errors.ldate && <p style={{ color: "#ff6b6b", fontSize: "0.75rem", marginTop: "3px", marginLeft: "0" }}>{errors.ldate}</p>}
                </div>
              </div>

              {/* Buttons */}
              <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end", paddingLeft: "145px" }}>
                <button
                  type="button"
                  onClick={returnBack}
                  style={{
                    padding: "10px 24px", background: "white", color: "#64748b", 
                    border: "none", borderRadius: "10px", fontSize: "0.9rem", 
                    fontWeight: "600", cursor: "pointer", transition: "all 0.3s",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
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
                  ← Back
                </button>
                <button
                  type="submit"
                  style={{
                    padding: "10px 30px", 
                    background: "linear-gradient(135deg, #0e4796ff 0%, #2bb6f0 100%)", 
                    color: "white", border: "none", borderRadius: "10px", 
                    fontSize: "0.9rem", fontWeight: "700", cursor: "pointer", 
                    transition: "all 0.3s", boxShadow: "0 8px 20px rgba(43, 169, 220, 0.3)"
                  }}
                  onMouseOver={(e) => { 
                    e.target.style.transform = "translateY(-2px)"; 
                    e.target.style.boxShadow = "0 12px 30px rgba(43, 169, 220, 0.4)"; 
                  }}
                  onMouseOut={(e) => { 
                    e.target.style.transform = "translateY(0)"; 
                    e.target.style.boxShadow = "0 8px 20px rgba(43, 169, 220, 0.3)"; 
                  }}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LostItemSubmit;