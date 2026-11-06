import React from "react";
import { Link } from "react-router-dom";

export default function MovieCard({ movie, onDelete, token }) {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "15px",
        marginBottom: "15px",
        backgroundColor: "#f9f9f9",
      }}
    >
      <h3 style={{ margin: "0 0 10px 0" }}>{movie.title}</h3>
      <p style={{ margin: "5px 0" }}>
        <strong>ჟანრი:</strong> {movie.genre}
      </p>
      <p style={{ margin: "5px 0" }}>
        <strong>წელი:</strong> {movie.year}
      </p>

      <div style={{ marginTop: "10px" }}>
        <Link to={`/movies/${movie.id}`}>
          <button style={{ marginRight: "10px", cursor: "pointer" }}>
            დეტალურად
          </button>
        </Link>

        {token && onDelete && (
          <button
            onClick={() => onDelete(movie.id)}
            style={{ color: "red", cursor: "pointer" }}
          >
            წაშლა
          </button>
        )}
      </div>
    </div>
  );
}
