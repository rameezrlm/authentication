import React, { useState, useEffect } from 'react';

export default function Dashboard() {
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [err, setErr] = useState(false);

  // Fetch contacts from backend
  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetch("http://localhost:3000/show");
        const response = await data.json();
        setContacts(response);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    }; 
    getData();
  }, []);

  // Handle saving new contact
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
      } else {
        setErr(true);
      }
    } catch (error) {
      console.error("Error adding contact:", error);
      setErr(true);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <br /> <br /><br /><br />
      <hr />
      <br />
      <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#007bff" }}>Phone Book</h2>
      <hr />
      <br /><br />  

      
      {/* Input form */}
      <form 
        onSubmit={handleSave} 
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          maxWidth: "400px",
          margin: "0 auto 30px auto",
          padding: "20px",
          borderRadius: "15px",
          boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
          backgroundColor: "#f9f9f9"
        }}
      >
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "10px",
            border: "1px solid #ddd",
            fontSize: "16px"
          }}
        />
        <input
          type="text"
          placeholder="Phone"
          value={phone}
          onChange={e => setPhone(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "10px",
            border: "1px solid #ddd",
            fontSize: "16px"
          }}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "10px",
            border: "1px solid #ddd",
            fontSize: "16px"
          }}
        />
        {err && (
          <p style={{ color: "white", backgroundColor: "red", padding: "8px", borderRadius: "8px", textAlign: "center" }}>
            Please fill all fields correctly!
          </p>
        )}
        <button 
          type="submit"
          style={{
            padding: "12px",
            border: "none",
            borderRadius: "12px",
            background: "linear-gradient(90deg, #007bff, #00a8ff)",
            color: "#fff",
            fontWeight: "bold",
            cursor: "pointer",
            transition: "all 0.3s ease"
          }}
          onMouseEnter={e => e.currentTarget.style.transform="scale(1.05)"}
          onMouseLeave={e => e.currentTarget.style.transform="scale(1)"}
        >
          Save Contact
        </button>
         <a 
  href="/login"
  style={{
    display: "inline-block",
    padding: "10px 20px",
    borderRadius: "12px",
    backgroundColor: "#ff4d4f",
    color: "#fff",
    fontWeight: "bold",
    textDecoration: "none",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    cursor: "pointer",
    marginTop: "20px"
  }}
  onMouseEnter={e => {
    e.currentTarget.style.backgroundColor = "#ff7875";
    e.currentTarget.style.transform = "scale(1.05)";
    e.currentTarget.style.boxShadow = "0 6px 15px rgba(0,0,0,0.2)";
  }}
  onMouseLeave={e => {
    e.currentTarget.style.backgroundColor = "#ff4d4f";
    e.currentTarget.style.transform = "scale(1)";
    e.currentTarget.style.boxShadow = "0 4px 10px rgba(0,0,0,0.1)";
  }}
>
  Logout
</a>
      </form>

      {/* Contacts list */}
      {contacts.length > 0 ? (
        <div 
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: "20px"
          }}
        >
          {contacts.map((contact, index) => (
            <div 
              key={index}
              style={{
                padding: "15px 20px",
                borderRadius: "15px",
                boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                backgroundColor: "#f9f9f9",
                cursor: "pointer"
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,0.2)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 5px 15px rgba(0,0,0,0.1)";
              }}
            >
              <p style={{ margin: "5px 0", fontWeight: "bold", fontSize: "16px", color: "#333" }}>
                {contact.name}
              </p>
              <p style={{ margin: "5px 0", color: "#555" }}>
                <strong>Phone:</strong> {contact.phone}
              </p>
              <p style={{ margin: "5px 0", color: "#555" }}>
                <strong>Email:</strong> {contact.email}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p style={{ textAlign: "center", color: "#777" }}>Loading contacts or no contacts found...</p>
      )}
    </div>
  );
}