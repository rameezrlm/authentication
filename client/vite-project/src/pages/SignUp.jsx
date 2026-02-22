import React, { useState } from "react";
import "../App.css";
export default function SignUp() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [err, setErr] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:3000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        username,
        password,
      }),
    });

    if (!response.ok) {
      setErr(true);
    } else {
      setErr(false);
      setEmail("");
      setPassword("");
      setUsername("");
    }
  };
  return (
    <div>
      <form className="form-data" onSubmit={handleSubmit}>
        <input
          type="text"
          className="content"
          placeholder="Enter Email..."
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <input
          type="text"
          className="content"
          placeholder="Enter Username..."
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />

        <input
          type="password"
          className="content"
          placeholder="Enter Password..."
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        {err ? (
          <p
            style={{
              backgroundColor: "red",
              color: "white",
              fontWeight: "bolder",
            }}
          >
            User Already Exists!!
          </p>
        ) : null}
        <input type="submit" value="Sign Up" />

        <p>Already have an account? <a href="/login">Login</a></p>
      </form>
    </div>
  );
}
