import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function login(e) {
    e.preventDefault();
    const url = "https://adi.duck.ge/api/login";

    try {
      const res = await axios.post(url, {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      alert("შესვლა წარმატებით დასრულდა!");
      navigate("/dashboard");
    } catch (error) {
      alert("შესვლისას დაფიქსირდა შეცდომა.");
    }
  }

  return (
    <div className="container">
      <h2>ავტორიზაცია</h2>
      <form onSubmit={login}>
        <input
          type="email"
          placeholder="ელ. ფოსტა..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="პაროლი..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">შესვლა</button>
      </form>
    </div>
  );
}

export default Login;
