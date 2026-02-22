import React, { useState, useEffect } from "react";
import "./Dashboard.css";

export default function Dashboard() {
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [err, setErr] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch("http://localhost:3000/show");
        const data = await res.json();
        setContacts(data);
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };
    getData();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();

    if (!name || !phone || !email) {
      setErr(true);
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, email }),
      });

      if (res.ok) {
        const newContact = await res.json();
        setContacts([...contacts, newContact]);
        setName("");
        setPhone("");
        setEmail("");
        setErr(false);
      }
    } catch (error) {
      console.error("Error saving contact:", error);
    }
  };

  return (
    <div className="dashboard-wrapper">
      
      {/* LEFT SIDEBAR: Fixed width, contains form and controls */}
      <div className="sidebar">
        <h2 className="brand-title">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '8px'}}>
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
          </svg>
          Phone Book
        </h2>

        <form className="form-container" onSubmit={handleSave}>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {err && <p className="error-msg">Please fill all fields properly</p>}

          <button type="submit" className="btn-save">
            Save Contact
          </button>

          <a href="/login" className="btn-logout" style={{ textAlign: 'center', textDecoration: 'none', display: 'block' }}>
            Logout
          </a>
        </form>
      </div>

      {/* RIGHT MAIN CONTENT: Fluid width, contains the grid */}
      <div className="content-area">
        {contacts.length > 0 ? (
          <div className="cards-grid">
            {contacts.map((contact, index) => (
              <div key={index} className="contact-card">
                <h3>{contact.name}</h3>
                <p>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line>
                  </svg>
                  {contact.phone}
                </p>
                <p>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                  {contact.email}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="empty-text" style={{ textAlign: 'center', marginTop: '40px', color: '#64748b' }}>
            No contacts found. Add your first contact!
          </p>
        )}
      </div>

    </div>
  );
}