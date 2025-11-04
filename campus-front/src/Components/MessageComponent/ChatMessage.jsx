import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { getUserDetails } from "../../Services/LoginService";
import { FaComments, FaUsers, FaPaperPlane, FaArrowLeft, FaTachometerAlt } from "react-icons/fa";

let stompClient = null;

function ChatMessage() {
  const navigate = useNavigate();
  const [connected, setConnected] = useState(false);
  const [username, setUsername] = useState("");
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem("chatMessages");
    return saved ? JSON.parse(saved) : [];
  });
  const [input, setInput] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await getUserDetails();
        const user = response.data?.username || response.data?.name || response.data;
        if (user) {
          setUsername(user);
          connect(user);
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();

    return () => {
      if (stompClient) {
        stompClient.deactivate();
        stompClient = null;
      }
    };
  }, []);

  const connect = (autoName = username) => {
    if (!autoName.trim() || (stompClient && stompClient.active)) return;

    const socket = new SockJS("http://localhost:9999/lost-found/ws");

    stompClient = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      onConnect: () => {
        setConnected(true);
        stompClient.publish({
          destination: "/app/register",
          body: JSON.stringify({ sender: autoName }),
        });
        stompClient.subscribe("/topic/messages", (payload) => {
          const msg = JSON.parse(payload.body);
          setMessages((prev) => [...prev, msg]);
        });
        stompClient.subscribe("/topic/users", (payload) => {
          const list = JSON.parse(payload.body);
          setUsers(list);
        });
      },
      onStompError: (frame) => {
        console.error("Broker error:", frame.headers["message"]);
      },
    });

    stompClient.activate();
  };

  const sendMessage = () => {
    if (!stompClient || !stompClient.connected || !input.trim()) return;

    const msg = { sender: username, content: input };
    stompClient.publish({
      destination: "/app/sendMessage",
      body: JSON.stringify(msg),
    });
    setInput("");
  };

  const returnBack = () => {
    navigate("/StudentMenu");
  };

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg, #08618eff 0%, #13628dff 100%)" }}>
        <div style={{ textAlign: "center", color: "white" }}>
          <div style={{ fontSize: "3rem", marginBottom: "20px" }}>💬</div>
          <h3 style={{ fontSize: "1.5rem" }}>Loading Chat...</h3>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#f8f9fa" }}>
      {/* CSS Animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        .message-bubble {
          animation: fadeIn 0.3s ease-out;
        }
        .user-item {
          animation: slideIn 0.3s ease-out;
        }
        .online-indicator {
          animation: pulse 2s ease-in-out infinite;
        }
      `}</style>

      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #131593 0%, #1460e3 100%)",
        padding: "25px 0",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
      }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <h1 style={{
                color: "white",
                margin: 0,
                fontSize: "2rem",
                fontWeight: "700",
                textShadow: "2px 2px 8px rgba(0,0,0,0.3)",
                display: "flex",
                alignItems: "center",
                gap: "12px"
              }}>
                <FaComments /> Live Chat
              </h1>
              <p style={{ color: "#e0e7ff", margin: "5px 0 0 0", fontSize: "0.95rem" }}>
                Connect and communicate with other users in real-time
              </p>
            </div>
            
            <div style={{ display: "flex", gap: "12px" }}>
              <button
                onClick={returnBack}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  background: "rgba(255,255,255,0.15)",
                  padding: "10px 20px",
                  borderRadius: "10px",
                  color: "white",
                  border: "none",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "all 0.3s"
                }}
                onMouseOver={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.25)"}
                onMouseOut={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.15)"}
              >
                <FaTachometerAlt />
                Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "40px 20px" }}>
        {!connected ? (
          <div style={{
            background: "white",
            padding: "60px 40px",
            borderRadius: "20px",
            textAlign: "center",
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            animation: "fadeIn 0.5s ease-out"
          }}>
            <div style={{ fontSize: "4rem", marginBottom: "20px" }}>💬</div>
            <h2 style={{ color: "#1e293b", marginBottom: "10px" }}>Connecting to Chat...</h2>
            <p style={{ color: "#64748b" }}>Please wait while we establish the connection</p>
          </div>
        ) : (
          <div style={{
            display: "grid",
            gridTemplateColumns: "300px 1fr",
            gap: "24px",
            height: "calc(100vh - 220px)"
          }}>
            {/* Sidebar - Online Users */}
            <div style={{
              background: "white",
              borderRadius: "16px",
              padding: "20px",
              boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
              border: "1px solid #f1f5f9",
              display: "flex",
              flexDirection: "column"
            }}>
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "20px",
                paddingBottom: "15px",
                borderBottom: "2px solid #f1f5f9"
              }}>
                <div style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "10px",
                  background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white"
                }}>
                  <FaUsers size={20} />
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: "1.1rem", color: "#1e293b" }}>Online Users</h3>
                  <p style={{ margin: 0, fontSize: "0.85rem", color: "#64748b" }}>{users.length} active</p>
                </div>
              </div>

              <div style={{ flex: 1, overflowY: "auto" }}>
                {users.map((user, i) => (
                  <div
                    key={i}
                    className="user-item"
                    style={{
                      padding: "12px 15px",
                      background: user === username ? "#e0f2fe" : "#f8fafc",
                      borderRadius: "10px",
                      marginBottom: "8px",
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      transition: "all 0.3s",
                      border: user === username ? "2px solid #0ea5e9" : "2px solid transparent"
                    }}
                  >
                    <div
                      className="online-indicator"
                      style={{
                        width: "10px",
                        height: "10px",
                        borderRadius: "50%",
                        background: "#10b981",
                        boxShadow: "0 0 8px rgba(16, 185, 129, 0.6)"
                      }}
                    />
                    <span style={{
                      fontSize: "0.95rem",
                      fontWeight: user === username ? "600" : "500",
                      color: "#1e293b"
                    }}>
                      {user} {user === username && "(You)"}
                    </span>
                  </div>
                ))}
                {users.length === 0 && (
                  <div style={{ textAlign: "center", padding: "40px 20px", color: "#64748b" }}>
                    <div style={{ fontSize: "2rem", marginBottom: "10px" }}>👥</div>
                    <p>No users online</p>
                  </div>
                )}
              </div>
            </div>

            {/* Chat Content */}
            <div style={{
              background: "white",
              borderRadius: "16px",
              boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
              border: "1px solid #f1f5f9",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden"
            }}>
              {/* Chat Header */}
              <div style={{
                background: "linear-gradient(135deg, #131593 0%, #1460e3 100%)",
                padding: "20px 25px",
                color: "white",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}>
                <div>
                  <h3 style={{ margin: 0, fontSize: "1.3rem", fontWeight: "700" }}>💬 General Chat</h3>
                  <p style={{ margin: "4px 0 0 0", fontSize: "0.85rem", opacity: 0.9 }}>Public conversation room</p>
                </div>
                <div style={{
                  padding: "8px 16px",
                  background: "rgba(255,255,255,0.2)",
                  borderRadius: "10px",
                  fontSize: "0.9rem",
                  fontWeight: "600"
                }}>
                  {username}
                </div>
              </div>

              {/* Messages Area */}
              <div style={{
                flex: 1,
                padding: "25px",
                overflowY: "auto",
                background: "linear-gradient(to bottom, #f8fafc 0%, #ffffff 100%)",
                display: "flex",
                flexDirection: "column",
                gap: "12px"
              }}>
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className="message-bubble"
                    style={{
                      display: "flex",
                      justifyContent: msg.sender === username ? "flex-end" : "flex-start"
                    }}
                  >
                    <div style={{
                      maxWidth: "70%",
                      padding: "12px 16px",
                      borderRadius: msg.sender === username ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                      background: msg.sender === username 
                        ? "linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)"
                        : "white",
                      color: msg.sender === username ? "white" : "#1e293b",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                      border: msg.sender === username ? "none" : "1px solid #e2e8f0"
                    }}>
                      {msg.sender !== username && (
                        <div style={{
                          fontSize: "0.8rem",
                          fontWeight: "600",
                          color: "#0ea5e9",
                          marginBottom: "4px"
                        }}>
                          {msg.sender}
                        </div>
                      )}
                      <div style={{ fontSize: "0.95rem", lineHeight: "1.5" }}>
                        {msg.content}
                      </div>
                    </div>
                  </div>
                ))}
                {messages.length === 0 && (
                  <div style={{
                    textAlign: "center",
                    padding: "60px 20px",
                    color: "#64748b"
                  }}>
                    <div style={{ fontSize: "3rem", marginBottom: "15px" }}>💬</div>
                    <h3 style={{ marginBottom: "8px", color: "#475569" }}>No messages yet</h3>
                    <p style={{ fontSize: "0.95rem" }}>Start the conversation by sending a message!</p>
                  </div>
                )}
              </div>

              {/* Input Area */}
              <div style={{
                padding: "20px 25px",
                borderTop: "2px solid #f1f5f9",
                background: "white",
                display: "flex",
                gap: "12px"
              }}>
                <input
                  type="text"
                  placeholder="Type your message..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  style={{
                    flex: 1,
                    padding: "12px 18px",
                    border: "2px solid #e2e8f0",
                    borderRadius: "12px",
                    fontSize: "0.95rem",
                    outline: "none",
                    transition: "all 0.3s"
                  }}
                  onFocus={(e) => e.target.style.borderColor = "#0ea5e9"}
                  onBlur={(e) => e.target.style.borderColor = "#e2e8f0"}
                />
                <button
                  onClick={sendMessage}
                  disabled={!input.trim()}
                  style={{
                    padding: "12px 28px",
                    background: input.trim() 
                      ? "linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)"
                      : "#cbd5e1",
                    color: "white",
                    border: "none",
                    borderRadius: "12px",
                    fontWeight: "600",
                    cursor: input.trim() ? "pointer" : "not-allowed",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    transition: "all 0.3s",
                    fontSize: "0.95rem"
                  }}
                  onMouseOver={(e) => {
                    if (input.trim()) {
                      e.currentTarget.style.transform = "translateY(-2px)";
                      e.currentTarget.style.boxShadow = "0 4px 12px rgba(14, 165, 233, 0.4)";
                    }
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <FaPaperPlane /> Send
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ChatMessage;