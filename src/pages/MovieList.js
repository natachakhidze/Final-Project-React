import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function MovieList() {
  const [movies, setMovies] = useState([]);
  const token = localStorage.getItem("token");

  const fetchMovies = async () => {
    try {
      const res = await axios.get("https://adi.duck.ge/api/movies");
      setMovies(Array.isArray(res.data) ? res.data : res.data.data || []);
    } catch (err) {
      console.error(err);
      alert("ფილმების ჩამოტვირთვისას დაფიქსირდა შეცდომა.");
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const deleteMovie = async (id) => {
    if (!token) {
      alert("გთხოვთ გაიაროთ ავტორიზაცია!");
      return;
    }

    const confirmDelete = window.confirm("დარწმუნებული ხარ რომ გინდა წაშლა?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`https://adi.duck.ge/api/movies/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("ფილმი წარმატებით წაიშალა!");
      fetchMovies();
    } catch (err) {
      console.error(err);
      alert("ფილმის წაშლისას დაფიქსირდა შეცდომა");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>ფილმების სია</h2>
      {movies.length === 0 ? (
        <p>ფილმები არ მოიძებნა.</p>
      ) : (
        <ul>
          {movies.map((movie) => (
            <li key={movie.id} style={{ marginBottom: "15px" }}>
              <strong>{movie.title}</strong> ({movie.year}) - {movie.genre}
              <div style={{ marginTop: "5px" }}>
                <Link to={`/movies/${movie.id}`}>
                  <button style={{ marginRight: "10px" }}>დეტალურად</button>
                </Link>
                {token && (
                  <button
                    onClick={() => deleteMovie(movie.id)}
                    style={{ color: "red", cursor: "pointer" }}
                  >
                    წაშლა
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
