import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const fetchFavorites = async () => {
    if (!token) {
      alert("გთხოვთ გაიაროთ ავტორიზაცია ფავორიტების სანახავად!");
      navigate("/login");
      return;
    }

    try {
      const res = await axios.get("https://adi.duck.ge/api/favorites", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFavorites(Array.isArray(res.data) ? res.data : res.data.data || []);
    } catch (err) {
      console.error(err);
      alert("ფავორიტების შენახვისას დაფიქსირდა შეცდომა.");
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  const removeFavorite = async (id) => {
    try {
      await axios.delete(`https://adi.duck.ge/api/favorites/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("ფილმი წაიშლილია ფავორიტებიდან!");
      fetchFavorites();
    } catch (err) {
      console.error(err);
      alert("ფავორიტებიდან წაშლისას დაფიქსირდა შეცდომა.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <Link to="/">
        <button style={{ marginBottom: "20px", cursor: "pointer" }}>
          უკან დაბრუნება
        </button>
      </Link>

      <h2>ჩემი ფავორიტი ფილმები</h2>

      {favorites.length === 0 ? (
        <p>ფავორიტი ფილმები ცარიელია.</p>
      ) : (
        <ul>
          {favorites.map((fav) => {
            const movie = fav.movie || fav;
            return (
              <li key={fav.id || movie.id} style={{ marginBottom: "15px" }}>
                <strong>{movie.title}</strong> ({movie.year}) - {movie.genre}
                <div style={{ marginTop: "5px" }}>
                  <Link to={`/movies/${movie.id || movie._id}`}>
                    <button style={{ marginRight: "10px", cursor: "pointer" }}>
                      დეტალურად
                    </button>
                  </Link>
                  <button
                    onClick={() => removeFavorite(fav.id || movie.id)}
                    style={{ color: "red", cursor: "pointer" }}
                  >
                    წაშლა ფავორიტებიდან
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
