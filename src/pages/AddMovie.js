import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function AddMovie() {
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [year, setYear] = useState("");
  const [description, setDescription] = useState("");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleAddMovie = async (e) => {
    e.preventDefault();

    if (!token) {
      alert("გთხოვთ გაიაროთ ავტორიზაცია ფილმის დასამატებლად!");
      navigate("/login");
      return;
    }

    if (!title.trim() || !genre.trim() || !year.trim()) {
      alert("გთხოვთ შეავსოთ: სათაური, ჟანრი და წელი!");
      return;
    }

    try {
      await axios.post(
        "https://adi.duck.ge/api/movies",
        {
          title,
          genre,
          year: Number(year),
          description,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      alert("ფილმი წარმატებით დაემატა!");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("ფილმის დამატებისას დაფიქსირდა შეცდომა.");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "500px", margin: "0 auto" }}>
      <Link to="/">
        <button style={{ marginBottom: "20px", cursor: "pointer" }}>
          უკან დაბრუნება
        </button>
      </Link>

      <h2>ახალი ფილმის დამატება</h2>
      <form onSubmit={handleAddMovie}>
        <div style={{ marginBottom: "15px" }}>
          <label>ფილმის სათაური:</label>
          <br />
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            placeholder="მაგ: I Origins"
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>ჟანრი:</label>
          <br />
          <input
            type="text"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            placeholder="მაგ: Serial Experiments Lain"
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>გამოშვების წელი:</label>
          <br />
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            placeholder="მაგ: 2014"
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>აღწერა:</label>
          <br />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{
              width: "100%",
              padding: "8px",
              marginTop: "5px",
              height: "100px",
            }}
            placeholder="ფილმის მოკლე აღწერა..."
          />
        </div>

        <button
          type="submit"
          style={{ padding: "10px 20px", cursor: "pointer" }}
        >
          დამატება
        </button>
      </form>
    </div>
  );
}
