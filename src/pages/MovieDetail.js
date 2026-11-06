import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

export default function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [commentText, setCommentText] = useState("");
  const token = localStorage.getItem("token");

  const fetchMovieDetails = async () => {
    try {
      const res = await axios.get(`https://adi.duck.ge/api/movies/${id}`);
      setMovie(res.data);
    } catch (err) {
      console.error(err);
      alert("ფილმის დეტალების ჩამოტვირთვისას დაფიქსირდა შეცდომა!");
    }
  };

  useEffect(() => {
    fetchMovieDetails();
  }, [id]);

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!token) {
      alert("კომენტარის დასაწერად გთხოვთ გაიაროთ ავტორიზაცია!");
      return;
    }
    if (!commentText.trim()) {
      alert("კომენტარი არის ცარიელი!");
      return;
    }

    try {
      await axios.post(
        `https://adi.duck.ge/api/movies/${id}/comments`,
        { text: commentText },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setCommentText("");
      fetchMovieDetails();
      alert("კომენტარი წარმატებით დაემატა!");
    } catch (err) {
      console.error(err);
      alert("კომენტარის დამატებისას დაფიქსრიდა შეცდომა.");
    }
  };

  if (!movie) {
    return <div style={{ padding: "20px" }}>იტვირთება...</div>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <Link to="/">
        <button style={{ marginBottom: "20px" }}>უკან დაბრუნება</button>
      </Link>

      <h2>{movie.title}</h2>
      <p>
        <strong>ჟანრი:</strong> {movie.genre}
      </p>
      <p>
        <strong>წელი:</strong> {movie.year}
      </p>
      <p>
        <strong>აღწერა:</strong> {movie.description || "აღწერა ცარიელია."}
      </p>

      <hr style={{ margin: "20px 0" }} />

      <h3>კომენტარები</h3>
      {movie.comments && movie.comments.length === 0 ? (
        <p>კომენტარები ცარიელია.</p>
      ) : (
        <ul>
          {movie.comments?.map((comment, index) => (
            <li key={index} style={{ marginBottom: "10px" }}>
              <strong>{comment.user?.username || "მომხმარებელი"}:</strong>{" "}
              {comment.text}
            </li>
          ))}
        </ul>
      )}

      {token ? (
        <form onSubmit={handleAddComment} style={{ marginTop: "20px" }}>
          <textarea
            placeholder="დაწერე კომენტარი..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            style={{ width: "100%", height: "80px", marginBottom: "10px" }}
          />
          <br />
          <button type="submit">კომენტარის დამატება</button>
        </form>
      ) : (
        <p style={{ color: "gray", marginTop: "20px" }}>
          კომენტარის დასატოვებლად გთხოვთ{" "}
          <Link to="/login">გაიაროთ ავტორიზაცია</Link>.
        </p>
      )}
    </div>
  );
}
