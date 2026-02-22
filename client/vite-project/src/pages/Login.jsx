import React, { useState } from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";
export default function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const [err, setErr] = useState(false);
  const [succ, setSucc] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    console.log(response.ok);
    if (!response.ok) {
      setErr(true);
      setSucc(false);
      
    } else {
      setSucc(true);
      setErr(false);
      navigate("/Dashboard");
    }

    setPassword("");
    setUsername("");

    setTimeout(()=>{
        setErr(false);
        setSucc(false);
      },3000)
  };
  return (
    <div>
      <form className="form-data" onSubmit={handleSubmit}>
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
        {err && (
          <p
            style={{
              backgroundColor: "red",
              color: "white",
              fontWeight: "bolder",
            }}
          >
            Error in Finding User
          </p>
        )}
        {succ && (
          <p
            style={{
              backgroundColor: "green",
              color: "white",
              fontWeight: "bolder",
            }}
          >
            Logged In SuccessFully
          </p>
        )}
        <input type="submit" value="Log In" />

        <p>
          Don't have an account? <a href="/signup">Sign Up</a>
        </p>
      </form>
    </div>
  );
}
