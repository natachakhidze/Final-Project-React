import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!username.trim() || !email.trim() || !password.trim()) {
      alert("გთხოვთ შეავსოთ სახელი, ემაილი და პაროლი!");
      return;
    }

    try {
      await axios.post("https://adi.duck.ge/api/register", {
        username,
        email,
        password,
      });

      alert("რეგისტრაცია წარმატებით დასრულდა!");
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert("რეგისტრაციის დროს დაფიქსირდა შეცდომა.");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "0 auto" }}>
      <h2>რეგისტრაცია</h2>
      <form onSubmit={handleRegister}>
        <div style={{ marginBottom: "15px" }}>
          <label>სახელი (Username):</label>
          <br />
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            placeholder="შეიყვანეთ სახელი..."
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>ელ.ფოსტა:</label>
          <br />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            placeholder="შეიყვანეთ ელფოსტა..."
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>პაროლი:</label>
          <br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            placeholder="შეიყვანეთ პაროლი..."
          />
        </div>

        <button
          type="submit"
          style={{ padding: "10px 20px", cursor: "pointer" }}
        >
          რეგისტრაცია
        </button>
      </form>

      <p style={{ marginTop: "15px" }}>
        უკვე გაქვთ შექმნილი?<Link to="/login">შესვლა</Link>
      </p>
    </div>
  );
}
